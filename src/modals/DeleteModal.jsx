import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import { useSelector } from "react-redux";

const DeleteModal = ({
  isDeleteModalVisible,
  toggleDeleteModal,
  deleteItem,
  heading,
  selectedItem,
}) => {
  const { selectedProfile } = useSelector((state) => state.account);
  const textColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';
 

  return (
    <Modal isVisible={isDeleteModalVisible} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={toggleDeleteModal}>
            <BackArrowIcon />
          </Pressable>
          <Pressable onPress={toggleDeleteModal}>
            <CrossIcon />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>{heading}</Text>
        <Text style={[styles.text, { color: textColor }]}>
          {selectedItem.number
            ? "+91" + selectedItem.number
            : selectedItem.cardname || selectedItem.email ||
              selectedItem.upi ||
              selectedItem.bankName + "-" + selectedItem.accountnumber}
        </Text>
        <Pressable style={styles.verifyButton} onPress={deleteItem}>
          <Text style={styles.verifyButtonText}>Remove</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  subSubtitle: {
    fontSize: 12,
    color: "#7f8387",
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  countryCode: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 42,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  verifyButton: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 60,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteModal;
