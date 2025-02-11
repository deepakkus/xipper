import { View, Text } from "react-native";
import React from "react";

const SubTotal = ({ title, billSubTotals }) => {
  return (
    <>
    {/* {billSubTotals && Object.entries(billSubTotals).map(([key,subtotal])=> ( */}
    <View className="ml-1">
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Amount Paid</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {billSubTotals.amountPaid}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Amount Due</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {billSubTotals.amountDue}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Delivery Fee</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 0.00</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Taxes</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. {billSubTotals.totalTax}</Text>
      </View>
      <View className="flex-row justify-between items-cent er mt-2">
        <Text className="font-pmedium text-base text-black font-bold">
          Restaurant Charges
        </Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 0.00</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-pmedium text-base text-black font-bold">Platform Fee</Text>
        <Text className="font-pmedium text-base text-black font-bold">Rs. 0.00</Text>
      </View>

      <View className="w-full border border-gray-100 my-3 rounded-lg"></View>
      <View className="flex-row justify-between items-center my-2">
        <Text className="font-bold text-base text-[#FE830C] font-bold">
          {/* {!title ? "Beverage" : title} Total */}
          {title } Total
        </Text>
        <Text className="font-bold text-base text-[#FE830C] font-bold">
          Rs. {billSubTotals.totalPriceAfterTax}
        </Text>
      </View>
      <View className="w-full border border-gray-100 mt-3 rounded-lg"></View>
    </View>
     {/* ))}  */}
     </>
  );
};

export default SubTotal;
