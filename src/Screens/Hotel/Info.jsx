import { View, Text } from "react-native";
import React from "react";

const Wifi = () => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 3,
                }}
            >
                <Text className="font-pmedium text-sm mr-2 text-black mb-2">
                    Wifi Name
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2">
                    Hotel
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 3,
                }}
            >
                <Text className="font-pmedium text-sm mr-2 text-black mb-2">
                    Wifi Password
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2">
                    Password
                </Text>
            </View>
        </>
    );
};

const Pool = () => {
    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 3,
                }}
            >
                <Text className="font-pmedium text-sm mr-2 text-black mb-2">
                    Timing
                </Text>
                <View>
                    <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2">
                        10 AM - 1 PM
                    </Text>

                    <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2">
                        05 PM - 9 PM
                    </Text>
                    {/* <Text>Hotel</Text> */}
                </View>
            </View>

            <Text className="font-pmedium text-sm mr-2 text-black mb-2">
                Rules to follow
            </Text>
            <Text className="font-pmedium text-sm mr-2 text-gray-400">
                {`\u2022`} Check-in/Check-out times compliance required.
            </Text>
            <Text className="font-pmedium text-sm mr-2 text-gray-400">
                {`\u2022`} No-smoking policy with designated areas.
            </Text>
            <Text className="font-pmedium text-sm mr-2 text-gray-400">
                {`\u2022`} Maintain noise levels; observe quiet hours.
            </Text>
            <Text className="font-pmedium text-sm mr-2 text-gray-400">
                {`\u2022`} Guests liable for property damage costs.
            </Text>
        </View>
    );
};

const Res = () => {
    return (
        <View>
            <Text className="font-pmedium text-base mr-2 text-black mb-2 text-center">
                Timing
            </Text>
            <View className="flex-row justify-evenly mt-2 ">
                <Text className="font-pmedium text-sm mr-2 text-black mb-2 ">
                    Breakfast
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2 ">
                    7 AM - 10 PM
                </Text>
            </View>
            <View className="flex-row justify-evenly ">
                <Text className="font-pmedium text-sm mr-2 text-black mb-2 ">
                    Lunch
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2 ">
                    12 PM - 3 PM
                </Text>
            </View>
            <View className="flex-row justify-evenly ">
                <Text className="font-pmedium text-sm mr-2 text-black mb-2 ">
                    Snacks
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2 ">
                    5 PM - 6 PM
                </Text>
            </View>
            <View className="flex-row justify-evenly ">
                <Text className="font-pmedium text-sm mr-2 text-black mb-2 ">
                    Dinner
                </Text>
                <Text className="font-pmedium text-sm mr-2 text-gray-400 mb-2 ">
                    8 PM - 11 PM
                </Text>
            </View>
        </View>
    );
};

const Info = ({ title }) => {
    let ComponentToRender;

    switch (title.toLowerCase()) {
        case "wifi":
            ComponentToRender = Wifi;
            break;
        case "pool":
            ComponentToRender = Pool;
            break;
        case "res":
            ComponentToRender = Res;
            break;
        default:
            ComponentToRender = () => <Text>Info</Text>;
    }

    return (
        <View>
            <ComponentToRender />
        </View>
    );
};

export default Info;