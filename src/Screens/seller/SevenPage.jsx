import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
  import UploadButton from "../../components/UploadButton";
  import { AlertIcon } from "../../assets/images/Icons/Account";
  import CheckBox from "../../components/CheckBox";
  
  const SevenPage = ({ onContinue, onBack }) => {
    return (
      <>
        <Section
          title="Financial and Legal"
          description="Entering these details is mandatory for setting up your account"
          type="header"
          onBack={onBack}
        />
  
        <Section
          title="Ownership of your Property"
          description="Entering these details are mandatory for setting up your account"
        >
          <TextInput style={styles.input} placeholder="Choose ownership type" />
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadText}>Upload registration document of property</Text>
            <Text style={styles.fileFormatText}>PNG, JPG</Text>
            <UploadButton />
          </View>
          <AlertMessage />
        </Section>
  
        <Section
          title="Bank details of your Property"
          description="Entering these details are mandatory for setting up your account"
        >
          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>Same as Company</Text>
          </View>
          {renderBankDetailsInputs()}
          <TouchableOpacity onPress={onContinue} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </Section>
      </>
    );
  };
  
  const Section = ({ title, description, type, onBack, children }) => (
    <View 
    style={styles.card}
    >
        {type === "header" && (
            <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBack}>
              <BackArrowIcon />
            </TouchableOpacity>
            <Text style={styles.headerText}>Back</Text>
            
          </View>
        )}
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      {children}
    </View>
  );
  
  const AlertMessage = () => (
    <View style={styles.alertContainer}>
      <AlertIcon color={"#d1d5db"} />
      <Text style={styles.alertText}>Address on document should match with property address</Text>
    </View>
  );
  
  const renderBankDetailsInputs = () => {
    const bankDetailFields = [
      { label: "Account number", placeholder: "Enter your bank account number" },
      { label: "Re-enter Account number", placeholder: "Re-enter bank account number" },
      { label: "IFSC Code", placeholder: "Enter IFSC Code" },
      { label: "Bank name", placeholder: "Choose your respective Bank" },
      { label: "Registered UPI ID", placeholder: "Enter your verified UPI ID" },
    ];
  
    return bankDetailFields.map((field, index) => (
      <View key={index} style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{field.label}</Text>
        <TextInput style={styles.input} placeholder={field.placeholder} />
      </View>
    ));
  };
  
  const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderColor: "#e5e5e5",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
    headerContainer: {
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    headerText: {
      fontFamily: "Pmedium",
      fontSize: 18,
      marginLeft: 10,
    },
    sectionContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
      borderColor: "#e5e5e5",
      borderWidth: 1,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
    },
    sectionTitle: {
      fontFamily: "Pmedium",
      fontSize: 18,
    },
    sectionDescription: {
      fontFamily: "Pmedium",
      fontSize: 14,
      color: "#A0AEC0",
      marginBottom: 10,
    },
    inputContainer: {
      marginBottom: 10,
    },
    inputLabel: {
      fontFamily: "Pmedium",
      fontSize: 16,
    },
    input: {
      fontFamily: "Pmedium",
      fontSize: 14,
      padding: 10,
      borderColor: "#D1D5DB",
      borderWidth: 1,
      borderRadius: 5,
    },
    uploadContainer: {
      marginBottom: 10,
    },
    uploadText: {
      fontFamily: "Pmedium",
      fontSize: 16,
    },
    fileFormatText: {
      fontFamily: "Pregular",
      fontSize: 12,
    },
    alertContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    alertText: {
      fontFamily: "Pmedium",
      fontSize: 12,
      color: "#A0AEC0",
      marginLeft: 5,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    checkboxLabel: {
      fontFamily: "Pmedium",
      fontSize: 16,
    },
    nextButton: {
      backgroundColor: "#4F46E5",
      borderRadius: 5,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 20,
    },
    nextButtonText: {
      color: "white",
      fontFamily: "Pmedium",
      fontSize: 16,
    },
  });
  
  export default SevenPage;
  