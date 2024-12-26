import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { LocationIcon } from "../../assets/images/Icons/HomeIcon";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";

const SecPage = ({ onContinue, onBack, updateData }) => {
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");

    const handleContinue = () => {
        const data = {
            address,
            pincode,
            city,
        };
        updateData(data);
        onContinue();
    };

    return (
        <View 
        style={styles.card}
        // className="mx-5 border border-gray-100 bg-white p-4 rounded-md"
        >
            {/* <View className="mb-5 flex-row items-center space-x-3">
                <TouchableOpacity onPress={onBack} className="flex-row items-center">
                    <BackArrowIcon />
                    <Text className="font-pmedium text-lg">Back</Text>
                </TouchableOpacity>
            </View> */}

            <View className="mb-3">
                <Text className="mb-2 font-pmedium text-lg">Location of your Property</Text>
                <Text className="mb-3 font-pmedium text-base text-gray-400">
                    Entering these details is mandatory for setting up your account
                </Text>
            </View>

            <View className="flex-row items-center space-x-2 mb-4">
                <View className="flex-row px-4 border items-center justify-between border-gray-200 rounded-md">
                    <TextInput
                        placeholder="Search Location"
                        className="py-2 mr-2 font-pmedium text-sm text-gray-400"
                    />
                    <Image source={require("../../assets/images/Action/search.png")} />
                </View>
                <View className="flex-row px-4 items-center rounded-md bg-primary h-full">
                    <LocationIcon />
                    <Text className="font-pmedium text-sm text-white">Current Location</Text>
                </View>
            </View>

            <View className="mb-3">
                <Text className="mb-2 font-pmedium text-lg">Locality / Area / Sector / Street</Text>
                <TextInput
                    className="mb-3 font-pmedium text-sm text-gray-400 px-4 border border-gray-200 rounded-md py-2"
                    placeholder="Please add details"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

            <View className="mb-3">
                <Text className="mb-2 font-pmedium text-lg">Pincode</Text>
                <TextInput
                    className="mb-3 font-pmedium text-sm text-gray-400 px-4 border border-gray-200 rounded-md py-2"
                    placeholder="Please add valid pincode"
                    value={pincode}
                    onChangeText={setPincode}
                />
            </View>

            <View className="mb-3">
                <Text className="mb-2 font-pmedium text-lg">City, State</Text>
                <TextInput
                    className="mb-3 font-pmedium text-sm text-gray-400 px-4 border border-gray-200 rounded-md py-2"
                    placeholder="Please add details"
                    value={city}
                    onChangeText={setCity}
                />
            </View>

            <View className="mb-3">
                <View className="w-full h-[200px] rounded-lg bg-gray-400 items-center justify-center"></View>
                <TouchableOpacity onPress={handleContinue} className="mt-5 items-end px-3">
                    <Text className="p-3 bg-primary rounded-md font-pmedium text-sm text-white">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 20
    },
});

export default SecPage;