import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import SearchBar from "../components/SearchBar";
import { BackArrowIcon, GreaterArrowIcon } from '../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const services = [
    {
        id: 1,
        title: 'Blow Dry',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 2,
        title: 'Body Massage',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 3,
        title: 'Body Massage',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

export default function SpaChart() {
    const navigation = useNavigation();
    const { selectedProfile } = useSelector((state) => state.account);
    const [quantities, setQuantities] = useState(
        services.reduce((acc, service) => {
            acc[service.id] = 0;
            return acc;
        }, {})
    );

    const handleAdd = (id) => {
        setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const handleRemove = (id) => {
        setQuantities((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 0) }));
    };

    return (
        <View className="flex-1">
            <View className="flex flex-row items-center mt-1 ml-2">
                <Pressable onPress={() => navigation.goBack()}>
                    <BackArrowIcon />
                </Pressable>
                <Text className={`text-base text-center flex-1 p-2 font-bold text-xl mr-6 ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Minibar Services</Text>
            </View>
            <View className="flex-row items-center justify-between ml-6 mt-5">
                <SearchBar
                    className="mx-4 mb-4"
                />
            </View>

            <Pressable className="flex-row items-center px-3 py-1 border border-gray-200 rounded-md mx-6 my-2 w-32 h-8">
                <Text className="text-gray-400 font-bold text-sm flex-1">Categories</Text>
                <GreaterArrowIcon />
            </Pressable>

            <ScrollView>
                {services.map((service) => (
                    <View
                        key={service.id}
                        className="flex-row items-start px-4 py-4 border-b border-gray-200"
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-lg font-bold text-black mx-2">{service.title}</Text>
                            <Text className="text-black mt-1 font-bold mx-2">₹ {service.price}</Text>
                            <Text className="text-gray-500 mt-1 mx-2">{service.description}</Text>

                        </View>

                        <View className="relative w-32 h-40 items-center">
                            <Image
                                source={{ uri: service.image }}
                                className="w-32 h-32 rounded-lg"
                            />

                            <View className="absolute bottom-0">
                                {quantities[service.id] === 0 ? (
                                    <Pressable
                                        onPress={() => handleAdd(service.id)}
                                        className="bg-pink-100 px-4 py-3 rounded-lg"
                                    >
                                        <Text className="text-pink-600 font-bold">ADD +</Text>
                                    </Pressable>
                                ) : (
                                    <View className="flex-row items-center bg-gray-200 rounded border border-[#06A77D] px-2 py-1 mb-2 ">
                                        <Pressable
                                            onPress={() => handleRemove(service.id)}
                                            className="px-3 py-1"
                                        >
                                            <Text className="text-gray-800 font-bold">-</Text>
                                        </Pressable>

                                        <Text className="mx-4 text-black font-bold">
                                            {quantities[service.id]}
                                        </Text>

                                        <Pressable
                                            onPress={() => handleAdd(service.id)}
                                            className="px-3 py-1"
                                        >
                                            <Text className="text-gray-800 font-bold">+</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
