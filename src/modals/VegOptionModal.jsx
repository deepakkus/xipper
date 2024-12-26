import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import RadioButton from "../components/RadioButton";

const VegOptionsModal = ({ visible, onClose, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (onSelectOption) {
      onSelectOption(option);  
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View
            style={styles.optionContainer}
          >
            <RadioButton
              onPress={() => handleOptionSelect("Veg")}
              selected={selectedOption === "Veg"} />
            <Text style={styles.optionText}>Veg</Text>
          </View>

          <View
            style={styles.optionContainer}
          >
            <RadioButton
              onPress={() => handleOptionSelect("Non-Veg")}
              selected={selectedOption === "Non-Veg"} />
            <Text style={styles.optionText}>Non-Veg</Text>
          </View>

          <View

            style={styles.optionContainer}
          >
            <RadioButton
              onPress={() => handleOptionSelect("Egg")}
              selected={selectedOption === "Egg"} />
            <Text style={styles.optionText}>Egg</Text>
          </View>
        </View>
      </Pressable>
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
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginBottom: 12,
    marginLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
});

export default VegOptionsModal;
