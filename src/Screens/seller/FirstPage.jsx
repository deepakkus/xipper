import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BigEmptyFiveStarIcon, BigFiveStarIcon } from "../../assets/images/Icons/HomeIcon";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";

const InputField = ({ label, placeholder, value, onChangeText }) => (
  <View className="mb-3">
    <Text className="mb-2 font-pmedium text-lg">{label}</Text>
    <TextInput
      className="mb-3 font-pmedium text-sm text-gray-400 px-4 border border-gray-200 rounded-md py-2"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={label === "When was this Property Built" ? "numeric" : "default"}
    />
  </View>
);

const FirstPage = ({ onContinue, onBack, updateData }) => {
  const [propertyName, setPropertyName] = useState("");
  const [propertyBuilt, setPropertyBuilt] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyRating, setPropertyRating] = useState("");

  const handleContinue = () => {
    const data = {
      name: propertyName,
      propertyBuilt,
      propertyType,
      hotelStarRating: propertyRating,
    };
    updateData(data);
    onContinue();
  };

  return (
    <View
    style={styles.card}
    // className="mx-5 border border-gray-100 bg-white p-4 rounded-md"
    >
      <TouchableOpacity className="mb-5 flex-row items-center space-x-3" onPress={onBack}>
        <BackArrowIcon />
        <Text className="font-pmedium text-lg">Back</Text>
      </TouchableOpacity>

      <View className="mb-3">
        <Text className="mb-2 font-pmedium text-lg">Basic Details of Your Property</Text>
        <Text className="mb-3 font-pmedium text-base text-gray-400">
          Entering these details is mandatory for setting up your account
        </Text>
      </View>

      <InputField
        label="Name of Property"
        placeholder="Enter Property name"
        value={propertyName}
        onChangeText={setPropertyName}
      />
      <InputField
        label="When was this Property Built"
        placeholder="Enter a Year"
        value={propertyBuilt}
        onChangeText={setPropertyBuilt}
      />
      <InputField
        label="Type of Property"
        placeholder="Choose your respective Property type"
        value={propertyType}
        onChangeText={setPropertyType}
      />

      <View className="mb-3">
        <Text className="mb-2 font-pmedium text-lg">Rating of Property</Text>
        <View className="flex-row items-center space-x-3">
          <TextInput
            className="font-pmedium text-sm text-gray-400 px-4 border border-gray-200 rounded-md py-2 flex-2"
            placeholder="Rating"
            value={propertyRating}
            onChangeText={setPropertyRating}
            keyboardType="numeric" // Set keyboard type for numeric input
          />
          <View className="flex-1 flex-row justify-evenly">
            {[...Array(5)].map((_, index) => (
              index < propertyRating ? (
                <BigFiveStarIcon key={index} />
              ) : (
                <BigEmptyFiveStarIcon key={index} />
              )
            ))}
          </View>
        </View>
      </View>

      {/* <TouchableOpacity onPress={handleContinue} className="mt-5 items-end px-3">
        <Text className="p-3 bg-primary rounded-md font-pmedium text-sm text-white">
          Continue
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      marginHorizontal: 20,
  },
});

export default FirstPage;
