import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    BackArrowIcon,
    GreaterArrowIcon,
} from "../assets/images/Icons/ArrowIcon"
import { Edit } from "../assets/images/Icons/Hotel";

import { useNavigation } from "@react-navigation/native";

const ServiceHeader = () => {
    const nav = useNavigation();
    return (
        <View className="flex-row mt-8 p-5  mx-3 border rounded-md border-gray-300  bg-white justify-between items-center  ">
            <View className="flex-row  justify-between items-center ">
                <Pressable onPress={() => nav.pop()}>
                    <BackArrowIcon />
                </Pressable>
                <View className="ml-3">
                    <Text className="font-pmedium text-md  text-black ">
                        Goa
                    </Text>
                    <Text className="font-pregular text-sm text-gray-400 ">
                        Tour | 27 July 2024
                    </Text>
                </View>
            </View>
            <View>
                <Edit />
                <Text>Edit</Text>
            </View>
        </View>
    );
};

export default ServiceHeader;
