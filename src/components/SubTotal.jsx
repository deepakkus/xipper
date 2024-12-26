import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const SubTotal = ({ data, title = "" }) => {

  const { selectedProfile } = useSelector((state) => state.account);
  return (
    <View className="ml-1">
      {data?.totalTaxation && Object.entries(data?.totalTaxation).map(([key, value]) => (
        <View className="flex-row justify-between items-center mt-2">
          <Text className="font-medium text-base text-black">{key}</Text>
          <Text className="font-medium text-base text-black">Rs. {value}</Text>
        </View>
      ))}
      {/* <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">Amount Paid</Text>
        <Text className="font-pmedium text-base text-black">Rs. 2005</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">Amount Due</Text>
        <Text className="font-pmedium text-base text-black">Rs. 2005</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">Delivery Fee</Text>
        <Text className="font-pmedium text-base text-black">Rs. 10</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">Taxes</Text>
        <Text className="font-pmedium text-base text-black">Rs. 698</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">
          Restaurant Charges
        </Text>
        <Text className="font-pmedium text-base text-black">Rs. 235</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black">Platform Fee</Text>
        <Text className="font-pmedium text-base text-black">Rs. 50</Text>
      </View> */}


      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-medium text-base text-black">
          Total Taxes
        </Text>
        <Text className="font-medium text-base text-black">Rs. {data.totalTaxationAmount}</Text>
      </View>

      <View className="w-full border border-gray-100 my-3 rounded-lg"></View>
      <View className="flex-row justify-between items-center">
        <Text className={`font-pmedium text-base text-${selectedProfile.type}`}>
          {`${title} Total`}
        </Text>
        <Text className={`font-pmedium text-base text-${selectedProfile.type}`}>
          Rs. {data?.totalPriceAfterTax}
        </Text>
      </View>
      <View className="w-full border border-gray-100 mt-3 rounded-lg"></View>
    </View>
  );
};

export default SubTotal;
