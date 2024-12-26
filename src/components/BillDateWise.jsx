import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { DateFormatLong } from "../utils/utils";

const BillDateWise = ({ date = "", subbill, title }) => {
  const { selectedProfile } = useSelector((state) => state.account);

  const groupByDate = (data) => {
    const groupedData = {};

    data?.map(item => {
      const date = item.orderDate.split('T')[0];

      if (!groupedData[date]) {
        groupedData[date] = [];
      }

      groupedData[date].push(item);
    });

    return groupedData;
  };

  const groupedByDate = groupByDate(subbill?.itemWiseTaxation);

  return (
    <View className="mt-6">

      {Object.entries(groupedByDate).map(([key, value]) => (
        <>
          <Text className="font-pregular text-xs text-gray-400 mb-3 ml-1">
            {DateFormatLong(key)}
          </Text>
          {value?.map((item, i) => (
            <View key={i} className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center space-x-2 flex-1">
                <View
                  className={`rounded-full border w-10 h-10 items-center justify-center ${selectedProfile.type === "user"
                    ? "border-green-400 bg-green-200"
                    : "border-purple-400 bg-purple-200"
                    }`}
                >
                  <Text className="font-psemibold text-base pt-0.5 text-white">
                    {item.quantity}
                  </Text>
                </View>
                <Text className="font-pregular text-base text-black">X</Text>
                <Text className="font-pregular text-base text-black">
                  {item.itemName}
                </Text>
              </View>
              <View className="w-24 items-end">
                <Text className="font-pmedium text-base text-black mb-3">
                  Rs. {item.unitPrice * item.quantity}
                </Text>
              </View>
            </View>
          ))}
        </>
      ))}
    </View>
  );
};

export default BillDateWise;
