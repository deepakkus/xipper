import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import CheckBox from "../../components/CheckBox";

const SixPage = ({ onContinue, onBack, updateData }) => {
  const [selectedData1, setSelectedData1] = useState([]);
  const [selectedData2, setSelectedData2] = useState([]);
  const [selectedData3, setSelectedData3] = useState([]);
  const [customPolicy1, setCustomPolicy1] = useState("");
  const [customPolicy2, setCustomPolicy2] = useState("");
  const [customPolicy3, setCustomPolicy3] = useState("");

  const handleContinue = () => {
    const data = {
      accessibility: selectedData1,
      bedPolicy: selectedData2,
      mealPolicy: selectedData3,
    };
    updateData(data);
    onContinue();
  };

  const data1 = [
    "Wheelchair",
    "Parking",
    "Lift",
    "Audio Descriptions",
    "Other",
    "Translators",
    "Escalators",
  ];

  const data2 = [
    "Provide extra bed to adults only",
    "Provide extra bed to kids only",
    "Don't provide any extra beds",
    "Option Text",
  ];

  const data3 = [
    "Order once placed cannot be cancelled",
    "Buffet cannot be shared with other people",
  ];

  const handleCheckBoxPress = (category, value) => {
    const setStateMap = {
      data1: setSelectedData1,
      data2: setSelectedData2,
      data3: setSelectedData3,
    };

    setStateMap[category](prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
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
        <Section
          title="Accessibility features at your Property"
          description="Entering these details is mandatory for setting up your account"
          data={data1}
          selectedData={selectedData1}
          handleCheckBoxPress={handleCheckBoxPress}
          handleAddMore={() => handleAddMore("data1")}
          customPolicy={customPolicy1}
          setCustomPolicy={setCustomPolicy1}
        />
      </View>

      <View style={styles.card}>
        <Section
          title="Bed Policies at your property"
          description="Entering these details are mandatory for setting up your account"
          data={data2}
          selectedData={selectedData2}
          handleCheckBoxPress={handleCheckBoxPress}
          handleAddMore={() => handleAddMore("data2")}
          customPolicy={customPolicy2}
          setCustomPolicy={setCustomPolicy2}
        />
      </View>

      <View style={styles.card}>
        <Section
          title="Meal Policy at your Property"
          description="Entering these details are mandatory for setting up your account"
          data={data3}
          selectedData={selectedData3}
          handleCheckBoxPress={handleCheckBoxPress}
          handleAddMore={() => handleAddMore("data3")}
          customPolicy={customPolicy3}
          setCustomPolicy={setCustomPolicy3}
        />
        <TouchableOpacity onPress={handleContinue} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Section = ({ title, description, data, selectedData, handleCheckBoxPress, handleAddMore, customPolicy, setCustomPolicy }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
    </View>
    {data.map((item, index) => (
      <View style={styles.checkboxContainer} key={index}>
        <CheckBox
          label={item}
          value={item}
          isChecked={selectedData.includes(item)}
          onPress={() => handleCheckBoxPress(title.toLowerCase(), item)}
        />
        <Text style={styles.checkboxLabel}>{item}</Text>
      </View>
    ))}
    <View style={styles.addMoreContainer}>
      <Text style={styles.addMoreTitle}>Add more</Text>
      <TextInput
        style={styles.input}
        placeholder="You can write any other policy for above"
        value={customPolicy}
        onChangeText={setCustomPolicy}
      />
      <TouchableOpacity onPress={handleAddMore} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  </>
);

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
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Pmedium",
    fontSize: 18,
  },
  sectionDescription: {
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
  input: {
    flex: 1,
    fontFamily: "Pmedium",
    fontSize: 14,
    padding: 10,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontFamily: "Pmedium",
    fontSize: 14,
    textAlign: "center",
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

export default SixPage;
