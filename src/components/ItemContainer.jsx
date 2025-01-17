import { GreaterArrowIcon } from "../assets/images/Icons/ArrowIcon";
import { useNavigation } from "@react-navigation/native"; 
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const ItemContainer = ({ title, onPress, showBorder, IconComponent }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center ${
        showBorder ? "border-b-2 pb-2 mb-4 border-greyFour" : ""
      }`}
      onPress={() => title !== "India"
          ? onPress()
          : null
      }
    >
      <View className="flex-row">
        <View className="justify-center">
          {title !== "India" ? (
            <IconComponent />
          ) : (
            <Image source={require("../assets/images/Flag.png")} />
          )}
        </View>
        <Text className="font-poppins font-normal text-[16px] text-md text-black ml-5 items-center">
          {title}
        </Text>
      </View>
      {/* {title !== "DD MM YYYY" && title !== "India" ? ( */}
        {isNaN(new Date(title)) !== false  && title !== "India" ? (     
        <GreaterArrowIcon />
      ) : null}
    </TouchableOpacity>
  );
};

export default ItemContainer;
