import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; 
import { useSelector } from "react-redux";

const OpenMenu = () => {
  const nav = useNavigation();
  const {selectedProfile} = useSelector((state) => state.account);
  
  return (
    <TouchableOpacity
      className={`mx-5 py-2 rounded-md ${selectedProfile.type === 'user' ? 'bg-user': 'bg-company'}`}
      onPress={() => {
        nav.navigate("FoodCard"); 
      }}
    >
      <Text className="text-center text-white font-psemibold">View Menu</Text>
    </TouchableOpacity>
  );
};

export default OpenMenu;
