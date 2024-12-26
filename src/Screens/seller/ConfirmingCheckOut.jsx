import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CrossIcon, BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const ConfirmingCheckOut = () => {
    const navigation = useNavigation();
    const [isClickYes, setIsClickYes] = useState(false); 

    const handleYes = () => {
        setIsClickYes(true); 
    };

    return (
        <View className="bg-white bg-opacity-90 rounded-lg shadow-md flex items-center w-11/12 max-w-md">

            <View className="w-full flex-row justify-between">
                <Pressable onPress={() => navigation.navigate('CheckinRequest')} className="z-10">
                    <BackArrowIcon />
                </Pressable>
                <Pressable onPress={() => navigation.navigate()} className="z-10">
                    <CrossIcon />
                </Pressable>
            </View>

            {isClickYes ? (
                <View className="mt-4">
                <Text className="text-lg text-black font-bold text-[#FE830C] text-center">
                    Thank You!
                </Text>
                <Text className="text-lg text-black text-center mb-4 px-4 font-bold">
                    Check-out is Completed
                </Text>
            </View>
            ) : (
                <>
                    <Text className="text-lg text-black font-bold mb-8 text-[#FE830C]">
                        Check Out
                    </Text>
                    <Text className="text-lg text-black text-center mb-4 px-4 font-bold">
                        Are you sure you want to check-out?
                    </Text>
                    
                   
                    <View className="flex-row justify-between w-full px-4">
                        <Pressable
                            className="bg-[#FE830C] py-2 px-4 rounded-[8px] mb-4 mr-4 flex-1"
                            onPress={handleYes} 
                        >
                            <Text className="text-white text-sm font-bold text-center">Yes</Text>
                        </Pressable>

                        <Pressable
                            className="bg-white border border-[#FE830C] py-2 px-4 rounded-[8px] mb-4 flex-1"
                            onPress={() => navigation.goBack()} 
                        >
                            <Text className="text-[#FE830C] text-sm font-bold text-center">No</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
};

export default ConfirmingCheckOut;
