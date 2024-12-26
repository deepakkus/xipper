import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { BackArrowIcon, CrossIcon } from "../assets/images/Icons/ArrowIcon";
import { useSelector } from "react-redux";


const SortedByModal = ({ isModalVisible, toggleModal, handleBack = () => { }, content, heading }) => {
  const {selectedProfile} = useSelector(state => state.account);
  return (
    <ScrollView className="flex-1">
      <Modal
        backdropColor="rgba(0, 0, 0, 0.5)" // Customize the backdrop color and opacity
        backdropOpacity={0.7}
        isVisible={isModalVisible}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            {heading === "Guest Concierge"
              ? (
                <Pressable onPress={handleBack}>
                  <BackArrowIcon />
                </Pressable>
              ) : (
                <View></View>
              )}
            <Pressable onPress={toggleModal}>
              <CrossIcon />
            </Pressable>
          </View>
          <Text className="text-user" style={[styles.text, { color: selectedProfile.type === 'user' ? '#06A77D' : '#6D38C3' }]}>
            {heading}
          </Text>
          {content}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
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
});

export default SortedByModal;
