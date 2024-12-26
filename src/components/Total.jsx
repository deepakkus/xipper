import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Total = ({ isVisible }) => {
  const { selectedProfile } = useSelector((state) => state.account);
  return (
    <>
      {isVisible ? (
        <View className="bg-white p-4 rounded-lg shadow-sm mr-4 ml-4">
          <View className="mb-4">
            <Text className="font-pbold text-xl text-black font-bold">Price Breakup</Text>
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-pmedium text-base text-black">Main Course</Text>
            <Text className="font-pmedium text-base text-black">Rs. 1,499</Text>
          </View>
          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-pmedium text-base text-black">Appetizers</Text>
            <Text className="font-pmedium text-base text-black">Rs. 699</Text>
          </View>
          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-pmedium text-base text-black">Desserts</Text>
            <Text className="font-pmedium text-base text-black">Rs. 299</Text>
          </View>
          

          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center my-2">
            <Text className={`font-pbold text-lg ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
            }`}>Grand Total</Text>
            <Text className={`font-pbold text-lg ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
            }`}>Rs. 2,497</Text>
          </View>

          <View className="w-full border border-gray-100 mt-3 rounded-lg" />
        </View>
      ) : (
        <>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="font-pmedium text-base text-black">Main Course</Text>
            <Text className="font-pmedium text-base text-black">Rs. 1,499</Text>
          </View>
          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center mt-2">
            <Text className="font-pmedium text-base text-black">Appetizers</Text>
            <Text className="font-pmedium text-base text-black">Rs. 699</Text>
          </View>
          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center mt-2">
            <Text className="font-pmedium text-base text-black">Desserts</Text>
            <Text className="font-pmedium text-base text-black">Rs. 299</Text>
          </View>

          <View className="w-full border border-gray-100 my-3 rounded-lg" />

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-pbold text-lg text-primary">Grand Total</Text>
            <Text className="font-pbold text-lg text-primary">Rs. 2,497</Text>
          </View>

          <View className="w-full border border-gray-100 mt-3 rounded-lg" />
        </>
      )}
    </>
  );
};

export default Total;
