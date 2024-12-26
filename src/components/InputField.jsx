import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const InputField = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.row}>
    <Text style={styles.subtitle}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    // marginBottom: 8,
    fontFamily: "Poppins-Medium",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default InputField;