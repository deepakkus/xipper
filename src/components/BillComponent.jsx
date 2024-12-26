import { View, Text } from "react-native";
import React from "react";
import BillDateWise from "../components/BillDateWise";
import SubTotal from "../components/SubTotal";

const BillComponent = ({ title, request, type }) => {
  return (
    <View>
      {type === "Services" ? (
        <View>
          <BillDateWise subbill={request} title={title} />
          <SubTotal data={request} title="Services" />
        </View>
      ) : (
        Object.entries(request).map(([key, value]) => (
          <View key={key}>
            <BillDateWise subbill={value} title={title} />
            <SubTotal data={value} title={key} />
          </View>
        ))
      )}
    </View>
  );
};

export default BillComponent;
