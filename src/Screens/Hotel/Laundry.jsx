import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; 
import { useSelector } from "react-redux";

const Laundry = () => {
    const nav = useNavigation();
    const {selectedProfile} = useSelector((state) => state.account);

    return (
        <TouchableOpacity
            className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
            onPress={() => nav.navigate("LaundrayChart")} 
        >
            <Text className="text-white text-center mx-16">View Chart</Text>
        </TouchableOpacity>
    );
};

export default Laundry;
