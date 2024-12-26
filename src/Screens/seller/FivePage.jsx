import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import CheckBox from "../../components/CheckBox";

const FivePage = ({ onContinue, onBack, updateData }) => {
  const [selectedData1, setSelectedData1] = useState([]);
  const [selectedData2, setSelectedData2] = useState([]);
  const [selectedData3, setSelectedData3] = useState([]);
  const [customPolicy1, setCustomPolicy1] = useState("");
  const [customPolicy2, setCustomPolicy2] = useState("");
  const [customPolicy3, setCustomPolicy3] = useState("");

  const handleContinue = () => {
    const data = {
      acceptedIdentityProofs: selectedData2,
      guestRules: selectedData1,
      propertyRestrictions: selectedData3,
    };
    updateData(data);
    onContinue();
  };

  const data1 = [
    "Allow unmarried couples",
    "Allow guests below 18 years of age at your property",
    "Groups with only male guests are allowed",
    "Group having male and female guests are allowed",
  ];

  const data2 = [
    "Aadhar card",
    "Passport",
    "Driving License",
    "Any Government ID",
    "School / College ID",
  ];

  const data3 = [
    "Private parties are allowed",
    "Smoking is allowed within property premises",
    "Guests can invite outdoor people to their room during stay",
    "Pets allowed in the property",
  ];

  const handleCheckBoxPress = (category, value) => {
    const setStateMap = {
      data1: setSelectedData1,
      data2: setSelectedData2,
      data3: setSelectedData3,
    };

    setStateMap[category](prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleAddMore = (category) => {
    const setStateMap = {
      data1: [setSelectedData1, customPolicy1, setCustomPolicy1],
      data2: [setSelectedData2, customPolicy2, setCustomPolicy2],
      data3: [setSelectedData3, customPolicy3, setCustomPolicy3],
    };

    const [setState, policy, setPolicy] = setStateMap[category];
    
    if (policy.trim()) {
      setState(prev => [...prev, policy.trim()]);
      setPolicy("");
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerText}>Back</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Rules of your Property</Text>
          <Text style={styles.sectionSubtitle}>
            Entering these details is mandatory for setting up your account
          </Text>
        </View>
        {data1.map((item, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <CheckBox
              label={item}
              value={item}
              isChecked={selectedData1.includes(item)}
              onPress={() => handleCheckBoxPress("data1", item)}
            />
            <Text style={styles.checkboxLabel}>{item}</Text>
          </View>
        ))}
        <View style={styles.addMoreContainer}>
          <Text style={styles.addMoreTitle}>Add more</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="You can write any other restriction"
              value={customPolicy1}
              onChangeText={setCustomPolicy1}
            />
            <TouchableOpacity
              onPress={() => handleAddMore("data1")}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Identity Proofs Section */}
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceptable Identity proofs at your Property</Text>
          <Text style={styles.sectionSubtitle}>
            Entering these details is mandatory for setting up your account
          </Text>
        </View>
        <View style={styles.checkboxWrapper}>
          {data2.map((item, index) => (
            <View style={styles.checkboxContainer} key={index}>
              <CheckBox
                label={item}
                value={item}
                isChecked={selectedData2.includes(item)}
                onPress={() => handleCheckBoxPress("data2", item)}
              />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.addMoreContainer}>
          <Text style={styles.addMoreTitle}>Add more</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="You can write any other restriction"
              value={customPolicy2}
              onChangeText={setCustomPolicy2}
            />
            <TouchableOpacity
              onPress={() => handleAddMore("data2")}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Property Restrictions Section */}
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property restrictions</Text>
          <Text style={styles.sectionSubtitle}>
            Entering these details is mandatory for setting up your account
          </Text>
        </View>
        {data3.map((item, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <CheckBox
              label={item}
              value={item}
              isChecked={selectedData3.includes(item)}
              onPress={() => handleCheckBoxPress("data3", item)}
            />
            <Text style={styles.checkboxLabel}>{item}</Text>
          </View>
        ))}
        <View style={styles.addMoreContainer}>
          <Text style={styles.addMoreTitle}>Add more</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="You can write any other restriction"
              value={customPolicy3}
              onChangeText={setCustomPolicy3}
            />
            <TouchableOpacity
              onPress={() => handleAddMore("data3")}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "Pmedium",
    fontSize: 18,
    marginLeft: 10,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Pmedium",
    fontSize: 18,
  },
  sectionSubtitle: {
    fontFamily: "Pmedium",
    fontSize: 14,
    color: "#A0AEC0",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontFamily: "Pmedium",
    fontSize: 14,
  },
  addMoreContainer: {
    marginTop: 20,
  },
  addMoreTitle: {
    fontFamily: "Pmedium",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Pmedium",
    fontSize: 14,
    padding: 10,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "white",
    fontFamily: "Pmedium",
    fontSize: 14,
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

export default FivePage;
