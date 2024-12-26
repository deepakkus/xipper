import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleStepper from "../../components/CircleStepper";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import RadioButton from "../../components/RadioButton";
import { useNavigation } from "@react-navigation/native";
import { RegisterCompany, SendOTPforDIN, VerifyBankDetails, VerifyCIN, VerifyCompanyPan, VerifyDIN, VerifyEmail, VerifyGST, VerifyOTPforDIN, VerifyUPI } from "../../services/companyOnboardingService";
import CircularLoader from "../../components/CircularLoader";
import OtpComponent from "../../components/OtpComponent";
import { OtplessHeadlessModule } from "otpless-react-native";
import { OTPLESS_APP_ID } from "../helper";
import { useSelector } from "react-redux";
import { GetCompanyList } from "../../services/companyService";

const CompanyOnboarding = () => {
  const navigation = useNavigation();
  const headlessModule = new OtplessHeadlessModule();
  const { resumeRegistrattionCompany } = useSelector((state) => state.company);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isIosHeadlessInit, setIosHeadlessInit] = useState(false);
  const [stepStatus, setStepStatus] = useState({});
  const [formData, setFormData] = useState({
    companyType: "Select",
    cinNumber: "",
    dinNumber: "",
    directorAadhaar: "",
    businessName: "",
    dinOTPVerify: { dinOTPSent: false, ref_id: "" },
    emailOTPVerify: { emailOTPSent: false, otplessToken: "" },
    directorAadhaarOTP: "",
    panNumber: "",
    gstinNumber: "",
    udyogAadhar: "",
    accountNumber: "",
    reEnterAccountNumber: "",
    ifscCode: "",
    companyId: "",
    email: "",
    countryCode: "+91",
    otp: "",
    channelType: ""
  });
  const appId = OTPLESS_APP_ID;
  const [companyList, setCompanyList] = useState([]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await GetCompanyList();
      console.log(res);
      if (res && res.result) {
        setCompanyList(res.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const mergedData = { ...formData, ...resumeRegistrattionCompany };
    console.log(resumeRegistrattionCompany, mergedData);
    setFormData(mergedData);
  }, [resumeRegistrattionCompany]);

  const steps = [
    {
      title: "Type of your Company",
      key: "companyType",
      fields: [
        {
          field: "companyType",
          type: "select",
          label: "Company Type",
        },
      ],
    },
    ...(formData.companyType !== "Sole proprietor" ? [
      {
        title: "Verify your CIN Number",
        key: "cinNumber",
        fields: [
          {
            field: "cinNumber",
            type: "input",
            label: "Registered CIN Number",
            placeholder: "L01631KA2010PTC096843",
            needsVerification: true,
          },
        ],
      },
      {
        title: "Verify your DIN Number",
        key: "dinNumber",
        fields: [
          {
            field: "dinNumber",
            type: "input",
            label: "Registered DIN Number",
            placeholder: "PDES03028F",
            needsVerification: true,
          },
          ...(formData.dinOTPVerify.dinOTPSent ? [{
            field: "directorAadhaarOTP",
            type: "otp",
            label: "Aadhaar OTP",
            placeholder: "000000",
            needsVerification: true,
          }] : []),
          ...(!formData.dinOTPVerify.dinOTPSent && formData?.["dinNumberVerified"]?.["status"] === "pending" ? [{
            field: "directorAadhaar",
            type: "input",
            label: `Aadhaar Number of ${formData?.dinNumberVerified?.data?.dinData.name || "Director"}`,
            placeholder: "PDES03028F",
            needsVerification: true,
          }] : [])
        ],
      }
    ] : []),
    ...(formData.companyType === "Sole proprietor" ? [{
      title: "Verify your PAN Number",
      key: "panNumber",
      fields: [
        {
          field: "businessName",
          type: "input",
          label: "Registered Business Name",
          placeholder: "ABC LTD.",
          needsVerification: false,
        },
        {
          field: "panNumber",
          type: "input",
          label: "Registered PAN Number",
          placeholder: "ABCTY1234D",
          needsVerification: true,
        },
      ],
    }] : []),
    {
      title: "Verify your GSTIN",
      key: "gstinNumber",
      fields: [
        {
          field: "gstinNumber",
          type: "input",
          label: "Registered GSTIN Number",
          placeholder: "22AAAAA0000A1Z5",
          needsVerification: true,
        },
      ],
    },
    {
      title: "Verify your Udyog Aadhar",
      key: "udyogAadhar",
      fields: [
        {
          field: "udyogAadhar",
          type: "input",
          label: "Registered Udyog Aadhar Number",
          placeholder: "UDYAM-XY-07-1234567",
          needsVerification: true,
        },
      ],
    },
    {
      title: "Verify your Bank Details",
      key: "bankDetails",
      fields: [
        {
          field: "accountNumber",
          type: "input",
          label: "Bank Account Number",
          placeholder: "Enter Account Number",
        },
        {
          field: "reEnterAccountNumber",
          type: "input",
          label: "Re-enter Account Number",
          placeholder: "Re-enter Account number",
        },
        {
          field: "ifscCode",
          type: "input",
          label: "IFSC Code",
          placeholder: "Enter IFSC Code",
          needsVerification: true,
        },
      ],
    },
    {
      title: "Verify your Domain & Email",
      key: "email",
      fields: [
        {
          field: "domain",
          type: "input",
          label: "Registered Domain",
          placeholder: "Domain.com",
          needsVerification: false,
        },
        {
          field: "email",
          type: "input",
          label: "Registered Email Address",
          placeholder: "xyz@mail.com",
          needsVerification: true,
        },
        ...(formData.emailOTPVerify.emailOTPSent ? [{
          field: "otp",
          type: "otp",
          label: "Email OTP",
          placeholder: "",
          needsVerification: true,
        }] : [])
      ],
    },
  ];

  const fetchLastCompletedStep = async () => {
    try {
      setLoading(true);

      const stepValue = null;
      const companyType = formData?.companyType;
      companyType && handleInputChange("companyType", companyType)

      const soleProprietorStepMap = {
        null: 0,
        PAN: 1,
        GST: 2,
        UDYOG: 3,
        BANK: 4,
        DOMAIN: 5,
      };

      const otherCompanyStepMap = {
        null: 0,
        CIN: 1,
        DIN: 2,
        GST: 3,
        UDYOG: 4,
        BANK: 5,
        DOMAIN: 6,
      };

      const currentStep = companyType === "Sole proprietor"
        ? (soleProprietorStepMap[stepValue])
        : (otherCompanyStepMap[stepValue]);

      if (currentStep) {
        setCurrentStep(currentStep);
      }
    } catch (e) {
      console.error("Error fetching last completed step:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastCompletedStep();
    setFormData({
      companyType: "Select",
      cinNumber: "",
      dinNumber: "",
      directorAadhaar: "",
      businessName: "",
      dinOTPVerify: { dinOTPSent: false, ref_id: "" },
      emailOTPVerify: { emailOTPSent: false, otplessToken: "" },
      directorAadhaarOTP: "",
      panNumber: "",
      gstinNumber: "",
      udyogAadhar: "",
      accountNumber: "",
      reEnterAccountNumber: "",
      ifscCode: "",
      companyId: "",
      email: "",
      countryCode: "+91",
      otp: "",
      channelType: ""
    })
    if ((currentStep === 5 && formData.companyType === "Sole proprietor")
      || (currentStep === 6 && formData.companyType !== "Sole proprietor")) {
      if (Platform.OS === 'android') {
        headlessModule.initHeadless(appId);
        headlessModule.setHeadlessCallback(onHeadlessResult);
        console.log("Otpless: android headless init done");
      }
      headlessModule.setWebViewInspectable(true);
    };
    return () => {
      headlessModule.clearListener();
    };
  }, []);

  const startHeadless = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios' && !isIosHeadlessInit) {
        headlessModule.initHeadless(appId);
        headlessModule.setHeadlessCallback(onHeadlessResult);
        setIosHeadlessInit(true);
        console.log("Otpless: ios headless init done and returning");
        return;
      }
      let headlessRequest = {};
      const { email, countryCode, otp, channelType } = formData;
      console.log("emsil", email, otp);
      if (email.length < 10) {
        Alert.alert("Invalid Entry", "Please enter a valid Email ID!.");
        throw new Error("Invalid Email")
        return;
      }
      if (email) {
        if (isNaN(Number(email))) {
          headlessRequest = { email: email, otp: otp || undefined };
        } else {
          headlessRequest = { phone: email, countryCode, otp: otp || undefined };
        }
        handleInputChange("emailOTPVerify", { ...formData?.["emailOTPVerify"], emailOTPSent: otp ? false : true });
      } else {
        headlessRequest = { channelType };
      }
      headlessModule.startHeadless(headlessRequest);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);

    }
  };

  const onHeadlessResult = async (data) => {
    try {
      setLoading(true);
      console.log("=====onHeadlessResult======");
      console.log(JSON.stringify(data));

      if (data.statusCode === 200) {
        if (data.responseType === "VERIFY") {
          console.log("Verified");
        } else if (data.responseType === "ONETAP") {
          console.log(data);
          handleInputChange("emailOTPVerify", { ...formData.emailOTPVerify, otplessToken: data.response.token })
        }
      } else {
        console.log(data.response);
        Alert.alert("Error", data.response.errorMessage);
      }
    } catch (error) {
      console.log("Error in onHeadlessResult:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleVerify = async (key) => {
    try {
      const companyId = formData?.["cinNumberVerified"]?.["data"]?.["companyId"] || formData?.["panNumberVerified"]?.["data"]?.["companyId"] || ""
      setLoading(true);
      let res;
      if (!formData?.[key].trim()) {
        throw new Error("Mandatory field missing");
        return;
      }
      switch (key) {
        case "panNumber":
          if (!formData?.["businessName"].trim()) {
            throw new Error("Please add Business Name!.");
          };
          res = await VerifyCompanyPan(formData.panNumber, formData.companyType, formData.businessName);
          console.log("res", res);
          break;
        case "gstinNumber":
          if (formData.gstinNumber.match(/([A-Z]{5}\d{4}[A-Z])/) !== formData.panNumber) {
            throw new Error("PAN & GST Number mismatch!.");
          }
          res = await VerifyGST(formData.gstinNumber, companyId);
          break;
        case "cinNumber":
          res = await VerifyCIN(formData.cinNumber, formData.companyType);
          break;
        case "dinNumber":
          res = await VerifyDIN(formData.dinNumber, companyId);
          break;
        case "directorAadhaar":
          res = await SendOTPforDIN(formData.directorAadhaar);
          break;
        case "directorAadhaarOTP":
          res = await VerifyOTPforDIN(formData.directorAadhaar, formData?.["dinOTPVerify"]?.ref_id, formData.directorAadhaarOTP,  formData.dinNumber, companyId);
          break;
        case "upiId":
          res = await VerifyUPI(formData.upiId);
          break;
        case "emailOTP":
          res = await VerifyEmail(formData.email, companyId, formData?.emailVerifiedToken);
          break;
        case "email":
          res = await startHeadless();
          break;
        case "otp":
          res = await startHeadless();
          break;
        case "ifscCode":
          if (!formData?.["accountNumber"].trim()) {
            throw new Error("Please enter Account Number!.");
          };
          if (formData?.["accountNumber"].trim() !== formData?.["reEnterAccountNumber"].trim()) {
            throw new Error("Account Number Mismatch!.");
          };
          if (!formData?.["ifscCode"].trim()) {
            throw new Error("Please enter valid IFSC Code!.");
          };
          res = await VerifyBankDetails(formData, companyId);
          break;
      }
      console.log(res, "res")
      if (["email", "otp"].includes(key)) {
        return;
      }
      if (["VALID", "SUCCESS", 200].includes(res.status)) {
        if (key === "dinNumber") {
          handleInputChange(`${key}Verified`, { verified: false, data: res.data, status: "pending" });
        } else if (key === "directorAadhaar") {
          handleInputChange("dinOTPVerify", { "dinOTPSent": true, ref_id: res.data.ref_id });
        } else if (key === "directorAadhaarOTP") {
          handleInputChange(`${key}Verified`, { verified: true, data: res.data });
        } else {
          handleInputChange(`${key}Verified`, { verified: true, data: res.data });
        }
      } else {
        setError(res.data.message)
      }
      console.log(res)

    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
    console.log(`Verifying ${key}: ${formData[key]}`);
  };


  const renderStep = () => {
    const step = steps[currentStep];

    return (
      <View style={styles.inputContainer}>
        {step.fields.map((field, index) => {
          switch (field.type) {
            case 'select':
              return (
                <View key={field.field} style={styles.inputField}>
                <Text style={styles.label}>{field.label}</Text>
                {loading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Picker
                    selectedValue={formData[field.field]}
                    onValueChange={(value) => handleInputChange(field.field, value)}
                    style={styles.picker}
                    placeholder="Select Company Type"
                  >
                    <Picker.Item label="Select" value="" />
                    {companyList.map((companyType, index) => (
                      <Picker.Item key={index} label={companyType} value={companyType} />
                    ))}
                  </Picker>
                )}
              </View>
          
              );

            case 'input':
              return (
                <View key={index} style={styles.inputField}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData[field.field]}
                    onChangeText={(text) => handleInputChange(field.field, text)}
                    placeholder={field.placeholder}
                  />
                  {field.needsVerification && (
                    <Pressable style={styles.verifyButton} onPress={() => handleVerify(field.field)}
                      disabled={!!formData?.[`${field.field}Verified`]?.["verified"]}
                    >
                      <Text style={styles.verifyButtonText}>Verify</Text>
                    </Pressable>
                  )}
                </View>
              );

            case "title":
              return (
                <Text key={index} style={styles.stepTitle} className="mt-5">{field.label}</Text>
              );

            case "subtitle":
              return (
                <Text key={index} style={styles.stepDescription}>{field.label}</Text>
              );

            case 'radio':
              return (
                <View key={index} style={styles.radioContainer}>
                  {field.options.map((option, idx) => (
                    <RadioButton
                      key={idx}
                      label={option.label}
                      selected={formData.paymentMethod === option.value}
                      onPress={() => handleInputChange("paymentMethod", option.value)}
                    />
                  ))}
                </View>
              );

            case "button":
              return (
                <TouchableOpacity key={index} style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>{field.label}</Text>
                </TouchableOpacity>
              );
            case "otp":
              return (
                <View key={index} style={styles.inputField}>
                  <Text style={styles.label}>{field.label}</Text>
                  <OtpComponent length={6} onChange={(val) => handleInputChange(field.field, val)} />
                  {field.needsVerification && (
                    <TouchableOpacity style={styles.verifyButton} onPress={() => handleVerify(field.field)}
                      disabled={formData?.[`${field.field}Verified`]?.["verified"] ? true : false}
                    >
                      <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                  )}
                </View>

              )
            default:
              return null;
          }
        })}
      </View>
    );
  };

  const handleSteps = async () => {
    try {
      setLoading(true);
      let verifiedKey;
      let isVerified;

      const soleProprietorVerificationMap = {
        0: { key: "companyType", value: formData.companyType !== "Select" },
        1: {
          key: "pan",
          value: formData.panNumberVerified?.["verified"],
        },
        2: {
          key: "gst",
          value: formData.gstinNumberVerified?.["verified"],
        },
        3: {
          key: "udyogAadhar",
          value: formData.udyogAadharVerified?.["verified"],
        },
        4: {
          key: "bank",
          value: formData.ifscCodeVerified?.["verified"],
        },
        5: {
          key: "email",
          value: formData.emailVerified?.["verified"],
        },
      };

      const otherCompanyVerificationMap = {
        0: { key: "companyType", value: formData.companyType !== "Select" },
        1: {
          key: "cin",
          value: formData.cinNumberVerified?.["verified"],
        },
        2: {
          key: "din",
          value: formData.dinNumberVerified?.["verified"],
        },
        3: {
          key: "gst",
          value: formData.gstinNumberVerified?.["verified"],
        },
        4: {
          key: "udyogAadhar",
          value: formData.udyogAadharVerified?.["verified"],
        },
        5: {
          key: "bank",
          value: formData.upiIdVerified?.["verified"],
        },
        6: {
          key: "email",
          value: formData.emailVerified?.["verified"],
        },
      };

      const currentVerificationMap =
        formData.companyType === "Sole proprietor"
          ? soleProprietorVerificationMap
          : otherCompanyVerificationMap;

      const currentStepData = currentVerificationMap[currentStep];

      if (currentStepData) {
        if (currentStepData.condition === undefined || currentStepData.condition) {
          verifiedKey = currentStepData.key;
          isVerified = currentStepData.value;

          setStepStatus({ ...stepStatus, [verifiedKey]: isVerified });

          if (isVerified || (["gst", "udyogAadhar"].includes(verifiedKey) && !isVerified)) {
            setError("");
            if (verifiedKey === "email") {
              await RegisterCompany(formData?.["cinNumberVerified"]?.["data"]?.["companyId"]);
            } else {
              setCurrentStep((prevStep) => prevStep + 1);
            }
          } else {
            setError(`${steps[currentStep].title.split(" ").slice(-2).join(" ")} verification Pending!.`);
            console.log("step not verified");
            // setCurrentStep((prevStep) => prevStep + 1);
          }
        }
      }

    } catch (e) {
      console.log(e, "An error occurred while handling steps.");
      setError("An error occurred. Please try again.", e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card} className="mb-5">
          <Text style={styles.headerTitle}>Business Onboarding</Text>
          <CircleStepper currentStep={currentStep} steps={steps} />
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : navigation.goBack()}
          >
            <BackArrowIcon />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.stepInfo}>
            <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
            <Text style={styles.stepDescription}>
              {`${currentStep === 0 ? "Selection" : "Verification"} of ${steps[currentStep].title.split(" ").pop()} is mandatory for setting up your account`}
            </Text>
          </View>

          {renderStep()}

          <Text>{error}</Text>
          {formData?.["cinNumberVerified"]?.["verified"] && currentStep === 1 && formData.companyType !== "Sole proprietor" && (
            <View>
              {/* <Text>Company ID: {formData?.cinNumberVerified?.data?.companyId}</Text> */}
              <Text>Company Name: {formData?.cinNumberVerified?.data?.cinData?.company_name || formData?.cinNumberVerified?.data?.cinData?.cinName }</Text>
              {/* <Text>Registration Number: {formData?.cinNumberVerified?.data?.cinData?.cinNumber}</Text> */}
              {/* <Text>CIN Status: {formData?.cinNumberVerified?.data?.cinData?.cinStatus}</Text> */}
              {/* <Text>Incorporation Date: {formData?.cinNumberVerified?.data?.cinData?.incorporation_date}</Text> */}
            </View>
          )}
          {formData?.["panNumberVerified"]?.["verified"] && currentStep === 1 && formData.companyType === "Sole proprietor" && (
            <View>
              <Text>Company ID: {formData?.panNumberVerified?.data?.companyId}</Text>
            </View>
          )}
          {formData?.["dinNumberVerified"]?.["verified"] && currentStep === 2 && formData.companyType !== "Sole proprietor" && (
            <View>
              <Text>Director Name: {formData?.dinNumberVerified?.data?.dinData.name}</Text>
            </View>
          )}
          {formData?.["gstinNumberVerified"]?.["verified"] &&
            (currentStep === 4 && formData.companyType === "Sole proprietor" || currentStep === 5 && formData.companyType !== "Sole proprietor") && (
              <View>
                <Text>GST Legal Business Name: {formData?.gstinNumberVerified?.data?.gstData.legal_name_of_business}</Text>
              </View>
            )}
          {formData?.["ifscCodeVerified"]?.["verified"] &&
            (currentStep === 4 && formData.companyType === "Sole proprietor" || currentStep === 5 && formData.companyType !== "Sole proprietor") && (
              <View>
                <Text>Account Name: {formData?.ifscCodeVerified?.data?.bankAccountData.name_at_bank}</Text>
              </View>
            )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSteps}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  stepInfo: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: "#06A77D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#06A77D",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 10,
    width: 110,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default CompanyOnboarding;
