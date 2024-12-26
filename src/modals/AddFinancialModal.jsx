import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import InputField from "../components/InputField";
import { useSelector } from "react-redux";

const AddFinancialModal = ({ title, isModalVisible, toggleModal, addData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    number1: "",
    number2: "",
    number3: "",
  });
  const { selectedProfile } = useSelector((state) => state.account);
  const textColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';
  const bgColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';


  const inputFields = () => {
    if (title === "Shopping") {
      return [
        {
          label: "Shopping account",
          placeholder: "Fill phone or email",
          value: formData.name,
          key: "name",
        },
        {
          label: "Account password",
          placeholder: "password",
          value: formData.number1,
          key: "number1",
        },
      ];
    } else if (title === "OTT") {
      return [
        {
          label: "OTT Account",
          placeholder: "Fill phone or email",
          value: formData.name,
          key: "name",
        },
        {
          label: "Account password",
          placeholder: "password",
          value: formData.number1,
          key: "number1",
        },
      ];
    } else {
      return [
        {
          label: title !== "Bank Account" ? "Card name" : "Select Bank",
          placeholder:
            title !== "Bank Account"
              ? "Add a valid name on card"
              : "Select Bank",
          value: formData.name,
          key: "name",
        },
        {
          label: title !== "Bank Account" ? "Expiry Date" : "Provide IFSC Code",
          placeholder:
            title !== "Bank Account" ? "DD MM YYYY" : "Provide IFSC Code",
          value: formData.number1,
          key: "number1",
        },
        {
          label: title !== "Bank Account" ? "CVV" : "Provide Account Number",
          placeholder:
            title !== "Bank Account" ? "Enter CVV" : "Fill Account Number",
          value: formData.number2,
          key: "number2",
        },
        {
          label:
            title !== "Bank Account" ? "Card number" : "Provide Account Name",
          placeholder:
            title !== "Bank Account" ? "9999-9999-9999" : "Fill account name",
          value: formData.number3,
          key: "number3",
        },
      ];
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const handleAddData = () => {
    if (title === "Shopping" || title === "OTT") {
      addData({
        name: formData.name,
      });
    } else if (title !== "Bank Account") {
      addData({
        name: "Rushi G",
        cardname: formData.name,
        cardnumber: formData.number3,
        type: "visa",
      });
    } else {
      addData({
        name: formData.number3,
        IFSCCode: formData.number1,
        accountnumber: formData.number2,
        bankName: formData.name,
      });
    }
    toggleModal();
  };

  const renderContent = () => {
    if (currentPage === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={toggleModal}>
              <BackArrowIcon />
            </Pressable>
            <Pressable onPress={toggleModal}>
              <CrossIcon />
            </Pressable>
          </View>
          <Text style={[styles.text, { color: textColor }]}>Add {title}</Text>
          {inputFields().map((field) => (
            <InputField
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              onChangeText={(text) => handleInputChange(field.key, text)}
            />
          ))}
          <Pressable style={[styles.verifyButton,{backgroundColor:bgColor}]} onPress={nextPage}>
            <Text style={styles.verifyButtonText}>
              {title !== "Bank Account" ? "Verify" : "Add Account"}
            </Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <BackArrowIcon onPress={prevPage} />
            <Pressable onPress={handleAddData}>
              <CrossIcon />
            </Pressable>
          </View>
          <Text style={styles.text}>
            Your {title}
            {"\n"}was updated
          </Text>
        </View>
      );
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
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
    marginBottom: 10,
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

export default AddFinancialModal;