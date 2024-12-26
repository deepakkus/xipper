import React from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import {
  BackArrowIcon,
  CrossIcon,
} from "../assets/images/Icons/ArrowIcon";
import { DynamicStars, LocationIcon } from "../assets/images/Icons/HomeIcon";
import { Calender, Door, Guest } from "../assets/images/Icons/TravalIons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HotelModal = ({ isModalVisible, toggleModal, data }) => {
  const nav = useNavigation();
  const { selectedProfile } = useSelector((state) => state.account);

  const bookTextColor =
    selectedProfile.type === 'user'
      ? '#06A77D'
      : '#6D38C3'

  return (
    <Modal isVisible={isModalVisible} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={toggleModal}>
            <CrossIcon />
          </Pressable>
        </View>
        <Text style={[styles.text, { color: bookTextColor }]}>Book</Text>
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>{data.name}</Text>
          <DynamicStars rating={5} />
        </View>
        <View style={styles.locationInfo}>
          <LocationIcon color={"#999"} />
          <Text style={styles.locationText}>{data.address}</Text>
        </View>

        <View style={styles.roomsGuestsContainer}>
          <View style={styles.container2}>
            <Calender color={"#999"} />
            <Text style={styles.text2}>Check In</Text>
          </View>
          <View style={styles.container2}>
            <Calender color={"#999"} />
            <Text style={styles.text2}>Check Out</Text>
          </View>
        </View>
        <View style={styles.roomsGuestsContainer}>
          <View style={styles.container2}>
            <Guest />
            <Text style={styles.text2}>Guests</Text>
          </View>
          <View style={styles.container2}>
            <Door />
            <Text style={styles.text2}>No. of Rooms</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            nav.push("ViewRoom", data);
            toggleModal();
          }}
          style={[styles.viewRoomButton, { backgroundColor: bookTextColor }]}
        >
          <Text style={styles.viewRoomText}>View Room</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
    marginBottom: 10,
  },
  hotelInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 5
  },
  hotelName: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    marginLeft: 3,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#999",
  },
  roomsGuestsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    width: "48%",
  },
  text2: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#999",
    fontSize: 12,
  },
  viewRoomButton: {
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  viewRoomText: {
    textAlign: "center",
    fontFamily: "Poppins-Semibold",
    color: "white",
  },
});

export default HotelModal;
