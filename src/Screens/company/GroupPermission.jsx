import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { BackArrowIcon, AddIcon } from "../../assets/images/Icons/ArrowIcon";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import GroupCard from "./GroupCard"; 

const GroupPage = () => {
    const {selectedProfile} = useSelector((state) => state.account);
    const navigation = useNavigation();
    const onClick = () => {
        navigation.goBack();
    };
    return (
        <View className="flex-1 bg-gray-100">
            <View className="shadow-md py-4 px-6">
                <View className="flex flex-row items-center">
                    <Pressable onPress={onClick}>
                        <BackArrowIcon width={24} height={24} fill="black" />
                    </Pressable>
                    <View className="px-8">
                        <Text className="text-xl font-bold text-black ml-4">Groups Permission</Text>
                    </View>
                </View>
                <View className="flex flex-row space-x-4 mt-4 px-10">
                    <Pressable className={`py-2 px-2 rounded-md flex flex-row items-center ${selectedProfile.type === 'user'? 'bg-user' : 'bg-company'}`}>
                        <Text className="text-white font-semibold text-sm ml-2">Create New Group</Text>
                        <AddIcon width={16} height={16} fill="white" />
                    </Pressable>
                    <Pressable className={`py-2 px-2 rounded-md flex flex-row items-center ${selectedProfile.type === 'user'? 'bg-user' : 'bg-company'}`}>
                        <Text className="text-white font-semibold text-sm ml-2">Invite Users</Text>
                        <AddIcon width={16} height={16} fill="white" />
                    </Pressable>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-1">
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </ScrollView>
        </View>
    );
};

export default GroupPage;
