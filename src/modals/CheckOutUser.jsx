import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import { useSelector } from "react-redux";
import { checkOut } from "../services/userdataservice";

const CheckOutUser = ({ visible, onClose, onBack, hotelData }) => {
  const { selectedProfile } = useSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  const bgColor = selectedProfile?.type === "user" ? "#06A77D" : "#6D38C3";

  const check = async () => {
    try {
      setLoading(true);
      const res = await checkOut();
      console.log(res, "res");
      if (res?.status === 200) {
        onClose();
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={onBack}>
              <BackArrowIcon />
            </Pressable>
            <Pressable onPress={onClose}>
              <CrossIcon />
            </Pressable>
          </View>

          {/* Body */}
          <Text style={styles.modalHeading}>
            Are you sure you want to checkout?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.leftButton, { backgroundColor: bgColor }]}
              onPress={check}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.rightButton, { backgroundColor: bgColor }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  rightButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CheckOutUser;
