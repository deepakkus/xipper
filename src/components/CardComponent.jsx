import { View, Text, Pressable } from "react-native";
import React from "react";
import { ThreeDotIcon } from "../assets/images/Icons/ArrowIcon";
import { AxisAccount, VisaAccount } from "../assets/images/Icons/FinacialIcons";
import { useSelector } from "react-redux";

const CardComponent = ({ item, toggleDeleteModal }) => {
  const formattedCardNumber = item.cardnumber
    .replace(/\d(?=\d{4})/g, "*")
    .replace(/(.{4})/g, "$1 ");

    const { selectedProfile } = useSelector((state) => state.account);

  return (
    <View className={` p-5 rounded-md my-3 ${selectedProfile.type === 'user'?'bg-user': selectedProfile.type === 'company'?'bg-company':'bg-seller'}`}>
      <View className="flex-row items-center justify-between">
        <Text className="font-pregular text-sm text-white ">
          {item.cardname}
        </Text>
        <Pressable onPress={() => toggleDeleteModal(item)}>
          <ThreeDotIcon color={"#fff"} />
        </Pressable>
      </View>
      <Text className="text-xl text-white font-pregular mt-2 mb-2">
        {formattedCardNumber.trim()}
      </Text>

      <View className="flex-row items-center justify-between">
        <Text className="font-pregular text-sm text-white">{item.name}</Text>
        <Text className="font-pregular text-sm text-white mr-4">
          Expiry - MM/YY
        </Text>
        {item.type === "visa" ? <VisaAccount /> : <AxisAccount />}
      </View>
    </View>
  );
};

export default CardComponent;