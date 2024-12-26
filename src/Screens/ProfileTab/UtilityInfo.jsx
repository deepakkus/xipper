import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import ItemContainer from "../../components/ItemContainer";

import { UtilityIcon } from "../../assets/images/Icons/AssetsIcon";

const UtilityInfo = () => {


  const data = [
    {
      title: "Electricity Bill",
      onPress: "",
      IconComponent: UtilityIcon,
    },
    {
      title: "Mobile Bill",
      onPress: "",
      IconComponent: UtilityIcon,
    },
    {
      title: "Gas Bill",
      onPress: "",
      IconComponent: UtilityIcon,
    },
    {
      title: "Water Bill",
      onPress: "",
      IconComponent: UtilityIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Utility Information
        </Text>
        <View className="bg-white rounded-md p-6  mb-8 ">
          {data.map((item, index) => (
            <ItemContainer
              key={index}
              title={item.title}
              showBorder={index !== data.length - 1}
              onPress={item.onPress}
              IconComponent={item.IconComponent}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UtilityInfo;
