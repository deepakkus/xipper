import { View, Text } from "react-native";
import React from "react";

const Total = ({foodTotal, beverageTotal, servicesTotal, finalBillAmountData}) => {
  return (
    <View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Food Total</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {foodTotal}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">
          Beverages Total
        </Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {beverageTotal}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">
          Services Total
        </Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {servicesTotal}</Text>
      </View>

      <View className="w-full border border-gray-100 my-3 rounded-lg"></View>
      <View className="flex-row justify-between items-center my-2">
        <Text className="font-pmedium text-base text-[#FE830C] font-bold">Final Total</Text>
        <Text className="font-pmedium text-base text-[#FE830C] font-bold">Rs. {finalBillAmountData}</Text>
      </View>
      <View className="w-full border border-gray-100 mt-3 rounded-lg"></View>
    </View>
  );
};

export default Total;
