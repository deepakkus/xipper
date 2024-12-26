import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bed, BreakFast, Measurement } from "../../assets/images/Icons/Hotel";
import { useNavigation } from "@react-navigation/native";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";

const RoomComponent = ({ data, mainData }) => {
    const nav = useNavigation();

    return (
        <View className="p-5 m-5 bg-white rounded-lg border border-gray-100">
            <TouchableOpacity onPress={() => nav.pop()} className="my-2">
                <BackArrowIcon />
            </TouchableOpacity>
            <View className="flex-row space-x-1">
                <Text className="font-psemibold text-md">{data?.name}.</Text>
                <Text className="font-psemibold text-md text-gray-400">2 Adults</Text>
            </View>
            <View className="flex-row space-x-2 mt-2"> 
                <View className="bg-gray-200 rounded-lg h-32 flex-1"></View>
                <View className="flex-1">
                    <View className="flex-row items-center">
                        <Measurement />
                        <Text className="font-psemibold text-xs text-gray-400 ml-1">
                            120 sq. ft
                        </Text>
                    </View>
                    <View className="flex-row items-center mt-2">
                        <Bed />
                        <Text className="font-psemibold text-xs text-gray-400 ml-1">
                            {data?.bedType}
                        </Text>
                    </View>
                    <Text className="font-psemibold text-md text-primary ml-1 mt-6">
                        View all
                    </Text>
                </View>
            </View>
            <Text className="font-psemibold text-md text-black ml-1 mt-6">
                {data?.description}
            </Text>
            <View className="flex-row items-center">
                <BreakFast />
                <Text className="font-pregular text-md text-gray-400 ml-2">
                    Free Breakfast
                </Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="font-pregular text-md text-gray-400 ml-2">
                    Non - Refundable
                </Text>
                <Text className="font-pregular text-md text-gray-400 ml-2 line-through">
                    1600
                </Text>
            </View>
            <View className="items-end">
                <Text className="font-pregular text-lg text-black">
                    {data?.basePrice}
                </Text>
                <Text className="font-pregular text-sm text-gray-400 text-right">
                    + 336 taxes & {"\n"} service fees{"\n"} per night
                </Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="font-psemibold text-md text-primary ml-1 mt-6">
                    More Details
                </Text>
                <TouchableOpacity
                    onPress={() => nav.navigate("Review", { data, mainData })}
                    className="px-5 border rounded-md mt-6 border-primary"
                >
                    <Text className="font-pregular text-md text-primary">Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RoomComponent;
