import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CrossIcon, BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const ViewBill = () => {
    const navigation = useNavigation();

    const handleSubmit = () => {
        navigation.replace('GuestCheckOut'); 
    };

    return (
        
           
            <View className="bg-white bg-opacity-90 rounded-lg shadow-md flex items-center w-11/12 max-w-md ">
               
                <View className="w-full flex-row justify-between ">
                    <Pressable onPress={() => navigation.goBack()} className="z-10">
                        <BackArrowIcon />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('GuestCheckOut')} className="z-10">
                        <CrossIcon />
                    </Pressable>
                </View>

                <Text className="text-lg font-bold mb-8 text-[#FE830C]">
                    Check Out
                </Text>

                <Text className="text-lg text-black text-center mb-4 px-4 font-bold">
                Please collect the bill before check out
                </Text>

                <TouchableOpacity 
                     className="bg-[#FE830C] py-2 px-4 rounded-[8px]"
                    onPress={handleSubmit}
                >
                    <Text className="text-white text-sm font-bold">View Bill</Text>
                </TouchableOpacity>
            </View>
    );
};

export default ViewBill;
