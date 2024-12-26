import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CheckBoxIcon } from "../assets/images/Icons/Account"; // Ensure this is the correct path to your icon

const CheckBox = ({ isChecked, onPress }) => {
  return (
    <Pressable
      onPress={onPress || console.log("")}
      style={styles.container}
    >
      <View style={[styles.box, isChecked && styles.checkedBox]}>
        {isChecked && <CheckBoxIcon />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#FE830C", // Change the color as needed
    borderRadius: 4,
  },
  checkedBox: {
    backgroundColor: "#FE830C", // Change the fill color as needed
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckBox;