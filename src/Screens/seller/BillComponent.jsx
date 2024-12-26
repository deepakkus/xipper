import { View, Text } from "react-native";
import React from "react";
import BillDateWise from "./BillDateWise";
import SubTotal from "./SubTotal";

const BillComponent = ({ title }) => {
  return (
    <View>
      <Text className=" font-pmedium text-base mb-3 text-black font-bold">{title}</Text>
      <BillDateWise date="27 July 24" />
      <BillDateWise date="28 July 24" />
      <SubTotal title={title} />
    </View>
  );
};

export default BillComponent;
