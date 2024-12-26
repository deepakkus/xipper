import { View, Text, Pressable } from "react-native";
import React from "react";
import { AddDataIcon } from "../assets/images/Icons/ArrowIcon";

const AddButton = ({ title, Icon, onPress }) => {
  return (
    <Pressable
      className=" absolute w-full left-5 bottom-20"
      onPress={onPress}
    >
      <View className="flex-row  items-center  justify-between  bg-gray-200 p-3 rounded-lg">
        <View className="flex-row item-center ">
          <View className=" px-2 mt-0.5 ">{Icon}</View>
          <Text className="font-pregular text-md  ml-3 mt-1  text-gray-400 items-center">
            {title}
          </Text>
        </View>
        <AddDataIcon />
      </View>
    </Pressable>
  );
};

export default AddButton;