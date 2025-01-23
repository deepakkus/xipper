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
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';

const ErrorModal = ({
  isModalVisible,
  toggleErrorModal,
  heading,
  content
}) => {
  const { selectedProfile } = useSelector((state) => state.account);
  const textColor = selectedProfile.type === "user" ? '#06A77D' : selectedProfile.type === 'company' ? '#6D38C3' : '#FE830C';
 

  return (
    <Modal isVisible={isModalVisible} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={toggleErrorModal}>
            <BackArrowIcon />
          </Pressable>
          <View style={styles.headerContent}>
            <ErrorIcon name="error" size={25} color="red" style={styles.errorIcon} />
            <Text style={styles.subtitle}>{heading}</Text>
          </View>
          <Pressable onPress={toggleErrorModal}>
            <CrossIcon />
          </Pressable>
        </View>
       
        <Text style={[styles.text, { color: textColor }]}>{content}</Text>
        <Pressable style={styles.doneButton} onPress={toggleErrorModal}>
          <Text style={styles.doneButtonText}>Done</Text>
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
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
  },
  subtitle: {
    fontSize: 20,
    color: "red",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    fontWeight: 'bold'
  },
  subSubtitle: {
    fontSize: 12,
    color: "#7f8387",
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 10
  },
  doneButton: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 60,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorIcon: {
    justifyContent: 'center'
  },
});

export default ErrorModal;
