import { View, Text, TextInput, Pressable} from "react-native";
import React from "react";
import { Buildings } from "../../assets/images/Icons/Hotel";
import { useSelector } from "react-redux";

const Report = ({ title }) => {
    const { selectedProfile } = useSelector((state) => state.account);
    return (
        <View>
            {title == "Contact" ? (
                <>
                    <Text className="font-pmedium text-base mt-3 text-center ">
                        Contact with your hotel
                    </Text>
                </>
            ) : (
                <>
                    <View className="flex-row items-center px-3 py-2 border  rounded-md border-gray-200">
                        <Buildings />
                        <TextInput className="ml-3" placeholder="Message here" placeholderTextColor={'#000'} />
                    </View>
                </>
            )}
            <Pressable className={`px-3 py-2 rounded-md mb-2  mt-7 mx-auto ${selectedProfile.type === 'user'? 'bg-user':'bg-company'}`}>
                <Text className="text-white text-center   mx-16">Report</Text>
                </Pressable>
        </View>
    );
};

export default Report;