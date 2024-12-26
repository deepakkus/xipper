import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { RightArrow } from "../../assets/images/Icons/ArrowIcon";
import { AC, Bags, Seats } from '../assets/images/Icons/Hotel';

const CarCard = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white border border-gray-200   rounded-md mb-4 "
    >
      <View className="flex-row  py-3 px-2">
        <View className="flex-1 justify-evenly">
          <Text className="font-pregular text-sm text-gray-400 ">
            Etios or Equivalent
          </Text>
          <View>
            <Text className="font-pregular text-lg text-black font-bold"> ₹ 5,900</Text>
            <Text className="font-pregular text-sm text-gray-400 ">
              Inclusive of GST
            </Text>
          </View>
          <View className="flex-row items-center justify-evenly pr-3">
            <Seats />
            <Text className="font-pregular text-xs text-gray-400 ">
              4 Seater
            </Text>
            <Bags />
            <Text className="font-pregular text-xs text-gray-400 ">2 Bags</Text>
            <AC />
            <Text className="font-pregular text-xs text-gray-400 ">AC</Text>
          </View>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          width={"100%"}
          height={150}
          resizeMode="fill"
          className="flex-1 rounded-md"
        />
      </View>

      {/* <View className="p-1 mt-2 justify-end items-end">
        <RightArrow />
      </View> */}
    </Pressable>
  );
};

export default CarCard;
