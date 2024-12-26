import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackArrowIcon,
  GreaterArrowIcon,
} from "../assets/images/Icons/ArrowIcon"
import { Edit } from "../assets/images/Icons/Hotel";

import { useNavigation } from "@react-navigation/native";

const SearchHeader = () => {
  const nav = useNavigation();
  return (
    <View className="flex-row mt-8 p-5  mx-3 border rounded-md border-gray-300  bg-white justify-between items-center  ">
      <View className="flex-row  justify-between items-center ">
        <TouchableOpacity onPress={() => nav.pop()}>
          <BackArrowIcon />
        </TouchableOpacity>
        <View className="ml-3">
          <Text className="font-pmedium text-md  text-black ">
            Bhubaneshwar - Varanasi
          </Text>
          <Text className="font-pregular text-sm text-gray-400 ">
            5 Aug | 2 Adult | Economy
          </Text>
        </View>
      </View>
      <View>
        <Edit />
        <Text>Edit</Text>
      </View>
    </View>
  );
};

export default SearchHeader;
