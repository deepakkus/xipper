import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Bed, BreakFast, Measurement } from "../assets/images/Icons/Hotel";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const RoomComponent = ({ data, mainData }) => {
  const { selectedProfile } = useSelector(state => state.account);
  console.log("data from room", data);
  const nav = useNavigation();
  return (
    <View >
      <View className="flex-row  space-x-1">
        <Text className="font-psemibold text-md">{data.name}.</Text>
      </View>
      <View className="flex-row space-x-2 mt-2">
      <View className="bg-gray-200 rounded-lg h-20 w-60 flex-1"></View>

        <View className="flex-1 ">
          <View className="flex-row items-center">
            <Measurement />
            <Text className="font-bold text-xs text-black ml-1">
              120 sq. ft
            </Text>
          </View>
          <View className="flex-row items-center  mt-2">
            <Bed />
            <Text className="font-bold text-xs text-black ml-1">
              Double Bed
            </Text>
            <Text className="font-psemibold text-xs text-gray-400">
              {data.bedType}
            </Text>
          </View>

        </View>

      </View>
      <Text className="font-bold text-md text-black mt-2">
        Room With Breakfast
      </Text>


      <View className="mt-3">
        <View className="flex-row items-center">
          <BreakFast />
          <Text className="font-pregular text-md text-black">
            Free Breakfast
          </Text>
        </View>
      </View>


      <View className="flex-row justify-between">
        <Text className="font-pregular text-md text-black">
          Non - Refundable
        </Text>
        <Text className="font-pregular text-md text-gray-400 ml-2 line-through ">
          1600
        </Text>
      </View>
      <View className=" items-end ">
        <Text className="font-bold text-sm text-black text-right">
          Rs 3600
        </Text>
        <Text className="font-pregular text-sm text-gray-400  text-right  ">
          + 336 taxes & {"\n"} service fees{"\n"} per night
        </Text>
      </View>
      <View className="flex-row justify-end">
        <TouchableOpacity
          onPress={() => nav.push("Review", { data, mainData })}
          className={`px-5 border  rounded-md mt-6 ${selectedProfile.type === 'user' ? 'border-user' : 'border-company'
            }`}
        >
          <Text className={`font-pregular text-md ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
            }`}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomComponent;
