import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { RightArrow } from "../assets/images/Icons/ArrowIcon";
import FareDetails from "./FareDetails";  // Import the FareDetails component

const FlightCard = () => {
  // State to handle modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <View className="bg-white border border-gray-200 p-3 rounded-md mb-4">
        <View className="flex-row justify-between items-center space-x-2">
          <View className="flex-row items-center space-x-2">
            <Image source={require("../assets/images/flight.png")} />
            <Text className="font-pregular text-sm text-gray-400">Indigo</Text>
          </View>
        </View>

        <View className="flex-row space-x-3 mt-2">
          <Text>3h 10m Layover at Kolkata</Text>
        </View>

        <View className="flex-row justify-between mt-3 items-center">
          <View>
            <Text className="font-psemibold text-md text-black">13:05</Text>
            <Text className="font-pregular text-sm text-gray-400">Bhuvneswar</Text>
          </View>
          <View className="items-center">
            <Text className="font-pregular text-sm text-gray-400 py-1 border-b-2 px-2 border-b-primary">
              5h 50m
            </Text>
            <View className="bg-black rounded-full w-2 h-2 items-center mt-[-5px]"></View>
            <Text className="font-pregular text-sm text-gray-400 py-1 px-2">1 Stop(s)</Text>
          </View>
          <View>
            <Text className="font-psemibold text-md text-black">20:55</Text>
            <Text className="font-pregular text-sm text-gray-400">Bhuvneswar</Text>
          </View>
          <View>
            <Text className="font-psemibold text-md text-black"> ₹ 5,900</Text>
            <Text className="font-pregular text-sm text-gray-400">Per Adult</Text>
          </View>
        </View>

        {/* Student Badge and Buttons */}
        <View className="flex-row space-x-3 items-center mt-3">
          <Text className="font-pregular text-sm text-white bg-primary p-1 rounded-xl px-3">
            Non Refundable
          </Text>

          <Pressable className="px-3 py-1 rounded-full">
            <Text className="font-pregular text-sm text-white bg-primary p-1 rounded-xl px-3">STUDENT</Text>
          </Pressable>

          <Pressable className="px-3 py-1 rounded-full">
            <Text className="font-pregular text-sm text-white bg-primary p-1 rounded-xl px-3">Economy</Text>
          </Pressable>
        </View>

        <View className="p-1 mt-2 justify-end items-end">
          <Pressable onPress={toggleModal}>
            <RightArrow />
          </Pressable>
        </View>
      </View>

      {/* Render FareDetails only when modalVisible is true */}
      {modalVisible && <FareDetails modalVisible={modalVisible} toggleModal={toggleModal} />}
    </View>
  );
};

export default FlightCard;
