import { View, Text } from "react-native";
import React from "react";
import { Upload } from "../assets/images/Icons/Account";

const UploadButton = () => {
  return (
    <View
      className="flex-row justify-center items-center py-2 bg-greyFour border border-dotted border-gray-200 rounded-md space-x-2"
      style={{ borderStyle: "dotted" }}
    >
      <Upload />
      <Text className="font-pregular text-lg text-primary">Upload</Text>
    </View>
  );
};

export default UploadButton;