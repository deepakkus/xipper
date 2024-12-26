import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Buildings } from "../../assets/images/Icons/Hotel";
import { useSelector } from "react-redux";

const RoomChange = ({ roomchange, setRoomChange }) => {
    const { selectedProfile } = useSelector((state) => state.account);
    
    return (
        <View>
            <Text className="font-pmedium text-base mt-3 ">
                Problem in the current room
            </Text>
            <View className="flex-row items-center px-3 py-2 border mt-3  rounded-md border-gray-200">
                <Buildings />
                <TextInput
                    className="ml-3 flex-1 text-sm text-gray-700"
                    placeholder="Message here"
                    placeholderTextColor="#000000"
                    multiline
                    value={roomchange?.current}
                    onChangeText={(val) => setRoomChange({ ...roomchange, current: val })}
                />
            </View>
            <Text className="font-pmedium text-base mt-3 ">
                Any specific requirement for new room?
            </Text>
            <View className="flex-row items-center px-3 py-2 border mt-3  rounded-md border-gray-200">
                <Buildings />
                <TextInput
                    className="ml-3 flex-1 text-sm text-gray-700"
                    placeholder="Message here"
                    placeholderTextColor="#000000"
                    multiline
                    value={roomchange?.new}
                    onChangeText={(val) => setRoomChange({ ...roomchange, new: val })}
                />
            </View>
        </View>
    );
};

export default RoomChange;