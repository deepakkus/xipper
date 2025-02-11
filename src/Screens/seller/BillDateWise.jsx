import { View, Text } from "react-native";
import React from "react";

const BillDateWise = ({ date, bill }) => {
  return (
    <View className="">
      <Text className="font-pregular text-xs text-gray-400 mb-3 ml-1">
        {date}
      </Text>

     {/* { Object.entries(bill).forEach(([i, item]) =>{ */}
      { bill.length > 0 && bill.map((item, i) => {
       
        return (
          <View key={i} className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center space-x-2 flex-1">
            <View className="rounded-full border border-[#FE830C82] bg-[#FE830C82] w-10 h-10 items-center justify-center">
                <Text className="font-psemibold text-base pt-0.5 text-white">
                  {item.qty}
                </Text>
              </View>
              <Text className="font-pregular text-base text-black font-bold">X</Text>
              <Text className="font-pregular text-base text-black font-bold">
                {item.name}
              </Text>
              {item.status === 'Paid' && (
                <Text className="font-pregular text-xs ml-1 text-[#FE830C]">
                  Paid
                </Text>
              )}
            </View>
            <View className="w-24 items-end">
              <Text className="font-pmedium text-base text-black mb-3 font-bold">
                Rs. {item.price && item.price.charAt(0) === '$' ? item.price.substring(1) : item.price}
              </Text>
            </View>
          </View>
        );
       })}
    {/* })} */}
    </View>
  );
};

export default BillDateWise;
