import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { CrossIcon } from "../assets/images/Icons/ArrowIcon";
import { useDispatch, useSelector } from "react-redux";
import { setResetMessageModal } from "../redux/commonRedux";

const MessageModal = () => {
  const dispatch = useDispatch();
  const { messageModal } = useSelector((state) => state.common);
  const { selectedProfile } = useSelector((state) => state.account);

  const modalContent = {
    success: {
      message: messageModal.message || "",
      heading: "Success",
      bgColor: "#fff",
    },
    error: {
      message: messageModal.message || "",
      bgColor: "#FEE2E2", // Light red background for error
      heading: "Error"
    },
  };

  const { message, bgColor, heading } = modalContent[messageModal.type] || {};

  const onClose = () => {
    dispatch(setResetMessageModal());
  };

  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={0.7}
      isVisible={messageModal.show}
      style={styles.modal}
    >
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.header}>
          <View></View>
          <Text className={`text-${selectedProfile.type}`}
            style={[styles.text, { marginTop: 0, fontSize: 22 }]}>
            {heading}
          </Text>
          <Pressable onPress={onClose}>
            <CrossIcon width={20} height={20} fill="black" />
          </Pressable>
        </View>

        <Text
          className={`text-${selectedProfile.type}`}
          style={[styles.text]}
        >
          {message}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  container: {
    padding: 20,
    borderRadius: 16,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
    marginTop: 20,
  },
});

export default MessageModal;
