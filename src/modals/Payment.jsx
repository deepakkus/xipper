import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import { AddItemsToBill } from "../services/servicesService";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../components/CircularLoader";
import { setMessageModalShow } from "../redux/commonRedux";

const Payment = ({ visible, onClose, onBack, cartId }) => {
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector(state => state.account);
  const [loading, setLoading] = useState(false);
  const bgColor = selectedProfile.type === 'user' ? '#06A77D' : '#6D38C3';

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await AddItemsToBill(cartId);
      if ([200, 201].includes(response.status)) {
        dispatch(setMessageModalShow({ show: true, type: "success", message: `Items Added to Bill, You can pay at the time of checkout!` }));
        onClose();
      }
    } catch (err) {
      console.log("Error adding items to bill:----------------", err.response.data, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onBack}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Pressable onPress={onBack}>
              <BackArrowIcon />
            </Pressable>
            <Pressable onPress={onClose}>
              <CrossIcon />
            </Pressable>
          </View>
          <Text style={styles.modalHeading}>Payment</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.leftButton, { backgroundColor: bgColor }]} onPress={onClose}>
              <Text style={styles.buttonText}>Pay Now</Text>
            </Pressable>
            <Pressable style={[styles.rightButton, { backgroundColor: bgColor }]} onPress={handlePayment}>
              <Text style={styles.buttonText}>Add to bill</Text>
            </Pressable>
          </View>
        </View>
        {loading && <CircularLoader />}
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
    marginBottom: 5,
    color: "black"
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
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

export default Payment;
