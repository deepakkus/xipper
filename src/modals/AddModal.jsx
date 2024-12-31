import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,

} from "react-native";
import Modal from "react-native-modal";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import OtpComponent from "../components/OtpComponent";
import AdharInput from "../components/AdharInput";
import PassportInput from "../Screens/Auth/Passport";
import { sendAadhaarOTP, verifyAadhaarOTP, VerifyDrivingLicence, VerifyPan, VerifyPassport } from "../services/governmentIdService";
import { OTPLESS_APP_ID } from "../Screens/helper";
import { OtplessHeadlessModule } from "otpless-react-native";
import { useSelector } from "react-redux";

const AddModal = ({ isModalVisible, toggleModal, addNumber, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const headlessModule = new OtplessHeadlessModule();
  const [isIosHeadlessInit, setIosHeadlessInit] = useState(false);
  const [token, setToken] = useState("")
  const appId = OTPLESS_APP_ID;
  const [passportData, setPassportData] = useState({
    file_number: '',
    dob: null,
  });

  const handlePassportChange = newPassportData => {
    setPassportData(newPassportData);
  };

  const { selectedProfile } = useSelector((state) => state.account);
  const textColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';
  const bgColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';

  useEffect(() => {
    if (type === "phone" || type === "email") {
      if (Platform.OS === 'android') {
        headlessModule.initHeadless(appId);
        headlessModule.setHeadlessCallback(onHeadlessResult);
        console.log("Otpless: android headless init done");
      }
      headlessModule.setWebViewInspectable(true);
      return () => {
        headlessModule.clearListener();
      };
    }
  }, [type]);


  const startHeadless = async () => {
    try {
      if (Platform.OS === 'ios' && !isIosHeadlessInit) {
        headlessModule.initHeadless(appId);
        headlessModule.setHeadlessCallback(onHeadlessResult);
        setIosHeadlessInit(true);
        console.log("Otpless: ios headless init done and returning");
        return;
      }
      let headlessRequest = {};
      if (inputValue.length < 10) {
        Alert.alert("Invalid Entry", "Please enter a valid Mobile Number or Email ID!.");
        throw new Error("Invalid Mobile or Email")
        return;
      }
      if (inputValue) {
        if (isNaN(Number(inputValue))) {
          headlessRequest = { email: inputValue, otp: otp || undefined };
        } else {
          headlessRequest = { phone: inputValue, countryCode: "+91", otp: otp || undefined };
        }
      } else {
        headlessRequest = { channelType };
      }
      console.log("success", type)
      headlessModule.startHeadless(headlessRequest);
    } catch (e) {
      console.log(e)
    } finally {
    }
  };

  const onHeadlessResult = async (data) => {
    try {
      console.log("=====onHeadlessResult======");
      console.log(data);

      if (data.statusCode === 200) {
        if (data.responseType === "VERIFY") {
          console.log("Verified");
        } else if (data.responseType === "ONETAP") {
          setToken(data.response.token)
          console.log("success", type)
        }
      } else {
        console.log(data.response, "hihi");
        Alert.alert("Error", data.response.errorMessage);
      }
    } catch (error) {
      console.log("Error in onHeadlessResult:", error);
    } finally {
    }
  };

  const handleAdd = async () => {
    try {
      let res;

      switch (type) {
        case "pan":
          res = await VerifyPan(inputValue);
          break;
        case "driving":
          res = await VerifyDrivingLicence(passportData.file_number, passportData.dob);
          break;
        case "passport":
          res = await VerifyPassport(passportData.file_number, passportData.dob);
          break;
        default:
          throw new Error("Invalid verification type");
      }

      console.log("Verification Response:", res);

      if (res.status === 200) {
        next2Page();
      } else {
        setError(`Invalid ${getTypeText()}`);
      }
    } catch (error) {
      console.log("Error during verification:", error);
      setError("An error occurred during verification. Please try again.");
    }
  };

  const sendOTP = async () => {
    try {
      let res;

      switch (type) {
        case "aadhar":
          res = await sendAadhaarOTP(inputValue);
          break;
        case "phone":
         res = startHeadless();
          break;
        case "email":
          startHeadless();
          break;
        default:
          throw new Error("Invalid verification type");
      }

      console.log("Verification Response:", res);

      if (["phone", "email"].includes(type) || res.status === 200) {
        nextPage();
      } else {
        setError(`Invalid ${getTypeText()}`);
      }
    } catch (error) {
      console.log("Error during verification:", error);
      setError("An error occurred during verification. Please try again.");
    }
  };

  const verifyOTP = async () => {
    try {
      let res;

      switch (type) {
        case "aadhar":
          res = await verifyAadhaarOTP(otp);
          break;
        case "phone":
          startHeadless();
          break;
        case "email":
          startHeadless();
          break;
        default:
          throw new Error("Invalid verification type");
      }

      console.log("Verification Response:", res);

      if (["phone", "email"].includes(type) || res.status === 200) {
        nextPage();
      } else {
        setError(`Invalid ${getTypeText()}`);
      }
    } catch (error) {
      console.log("Error during verification:", error);
      setError("An error occurred during verification. Please try again.");
    }
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const next2Page = () => setCurrentPage(currentPage + 2);
  const prevPage = () => setCurrentPage(type === "phone" || type === "email" || type === "aadhar" ? currentPage - 1 : currentPage - 2);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const getPlaceholderText = () => {
    switch (type) {
      case "phone":
        return "Please enter your number";
      case "email":
        return "Add a valid Email address";
      case "pan":
        return "Please enter your PAN number";
      case "driving":
        return "Please enter your driving license number";
      case "passport":
        return "Please enter your passport number";
      case "aadhar":
        return "Please enter your Aadhaar number";
      case "upi":
        return "Please enter your UPI id";
      default:
        return "";
    }
  };

  const getTypeText = () => {
    switch (type) {
      case "phone":
        return "Number";
      case "email":
        return "Email address";
      case "pan":
        return "PAN";
      case "driving":
        return "Driving License";
      case "passport":
        return "Passport";
      case "aadhar":
        return "Aadhaar number";
      case "upi":
        return "UPI Id";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable onPress={toggleModal}>
                <BackArrowIcon onPress={toggleModal} />
              </Pressable>
              <Pressable onPress={toggleModal}>
                <CrossIcon />
              </Pressable>
            </View>
            <Text style={[styles.text, { color: textColor }]}>Add {getTypeText()}</Text>
            <Text style={styles.subtitle}>Provide new {getTypeText()}</Text>
            <View style={styles.row}>
              {type === "phone" && (
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
              )}
              {type === "aadhar" ? (
                <AdharInput value={inputValue} onChangeText={setInputValue} />
              ) : type === "passport" || type === "driving" ? (
                <PassportInput value={passportData} onChangeText={handlePassportChange} placeholderText={getPlaceholderText()} />
              ) : (
                <TextInput
                  placeholder={getPlaceholderText()}
                  style={styles.textInput}
                  value={inputValue}
                  keyboardType={type === "phone" ? "number-pad" : "default"}
                  onChangeText={(text) => setInputValue(text)}
                  placeholderTextColor={"#000000"}
                />
              )}
            </View>
            {error.length > 0 && <Text className="text-red-500 mt-2">{error}</Text>}
            {type === "phone" || type === "email" || type === "aadhar" ? (
              <Pressable
                style={[styles.verifyButton, { backgroundColor: bgColor }]}
                onPress={sendOTP}
              >
                <Text style={styles.verifyButtonText}>Send OTP</Text>
              </Pressable>
            ) : (
              <Pressable style={[styles.verifyButton, { backgroundColor: bgColor }]} onPress={handleAdd}>
                <Text style={styles.verifyButtonText}>Add</Text>
              </Pressable>
            )}
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable onPress={prevPage}>
                <BackArrowIcon />
              </Pressable>
              <Pressable onPress={toggleModal}>
                <CrossIcon />
              </Pressable>
            </View>
            <Text style={[styles.text, { color: textColor }]}>Verify OTP</Text>
            <Text style={styles.subtitle}>Provide OTP</Text>
            <Text style={styles.subSubtitle}>
              Please provide OTP received on your {getTypeText()}
            </Text>
            <OtpComponent length={6} onChange={handleOtpChange} />
            <Pressable style={[styles.verifyButton, { backgroundColor: bgColor }]} onPress={verifyOTP}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </Pressable>
          </View>
        );
      case 3:
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <BackArrowIcon onPress={prevPage} />
              <Pressable
                onPress={() => {
                  toggleModal();
                  addNumber(inputValue, ["phone", "email"].includes(type) ? token : "");
                }}
              >
                <CrossIcon />
              </Pressable>
            </View>
            <Text style={styles.text}>
              Your {getTypeText()}
              {"\n"} was updated
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isVisible={isModalVisible} style={styles.modal}>
      {renderContent()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
    maxHeight: Platform.OS === 'ios' ? 250 : 0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  subSubtitle: {
    fontSize: 12,
    color: "#7f8387",
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  countryCode: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 42,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    color:'black',
  },
  verifyButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 60,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddModal;