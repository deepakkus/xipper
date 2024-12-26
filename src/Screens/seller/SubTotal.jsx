import { View, Text } from "react-native";
import React from "react";

const SubTotal = ({ title }) => {
  return (
    <View className="ml-1">
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Amount Paid</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 2005</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Amount Due</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 2005</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Delivery Fee</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 10</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Taxes</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 698</Text>
      </View>
      <View className="flex-row justify-between items-cent er mt-2">
        <Text className="font-pmedium text-base text-black font-bold">
          Restaurant Charges
        </Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 235</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Platform Fee</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 50</Text>
      </View>

      <View className="w-full border border-gray-100 my-3 rounded-lg"></View>
      <View className="flex-row justify-between items-center my-2">
        <Text className="font-bold text-base text-[#FE830C] font-bold">
          {!title ? "Beverage" : title} Total
        </Text>
        <Text className="font-bold text-base text-[#FE830C] font-bold">
          Rs. 5605
        </Text>
      </View>
      <View className="w-full border border-gray-100 mt-3 rounded-lg"></View>
    </View>
  );
};

export default SubTotal;
