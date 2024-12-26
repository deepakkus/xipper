import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { FiveStarIcon, FourStarIcon, ThreeStarIcon, TwoStarIcon, OneStarIcon } from "../assets/images/Icons/HomeIcon";

const Ratings = ({ visible, onClose, onSelectOption }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => onSelectOption("All One-Star Dishes")} style={styles.optionContainer}>
            <Text style={styles.optionText}>
              <OneStarIcon />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("All Two-Star Dishes")} style={styles.optionContainer}>
            <Text style={styles.optionText}>
              <TwoStarIcon />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("All Three-Star Dishes")} style={styles.optionContainer}>
            <Text style={styles.optionText}>
              <ThreeStarIcon />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("All Four-Star Dishes")} style={styles.optionContainer}>
            <Text style={styles.optionText}>
              <FourStarIcon />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("Top-Rated Only")} style={styles.optionContainer}>
            <Text style={styles.optionText}>
              <FiveStarIcon />
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "70%", // Reduced modal width
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  optionContainer: {
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },
});

export default Ratings;
