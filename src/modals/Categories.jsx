import React from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";

const Categories = ({ visible, onClose, onSelectOption, categoryData }) => {

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          {categoryData?.length > 0 && categoryData?.map((i, ind) => (
            <Pressable key={ind} onPress={() => onSelectOption(i.name)}
              style={styles.optionContainer}>
              <Text style={styles.optionText}>{i.name}</Text>
              <Text style={styles.optionText}>{`(${i.count})`}</Text>
            </Pressable>
          ))}
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
    width: "70%", // Adjusted modal width
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  optionContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default Categories;
