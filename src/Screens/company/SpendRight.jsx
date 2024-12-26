import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CrossIcon } from '../../assets/images/Icons/ArrowIcon';

const SpendRight = () => {
    return (
        <View className="p-4 bg-white h-full  rounded-lg shadow-xl">

            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-900">Spend Rights</Text>
                <TouchableOpacity>
                    <CrossIcon />
                </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <View className="flex-row space-x-2 mb-4 ">
                {['Travel', 'Food', 'Services', 'Health', 'Shopping'].map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`px-4 py-2 rounded-full ${index === 0 ? 'bg-purple-500' : 'bg-gray-200'
                            }`}
                    >
                        <Text className={index === 0 ? 'text-white' : 'text-gray-800'}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {[
                {
                    title: 'Hotel',
                    inputs: [
                        { label: 'Room Budget', placeholder: '₹ 6000' },
                        { label: 'Services Budget', placeholder: '₹ 6000' },
                        { label: 'Meal Budget', placeholder: '₹ 6000' },
                        { label: 'Liquor Budget', placeholder: 'Enter price' },
                    ],
                },
                {
                    title: 'Flight',
                    inputs: [
                        { label: 'Class', placeholder: 'Economy' },
                        { label: 'Flight Budget', placeholder: '₹ 6000' },
                        { label: 'Meal Budget', placeholder: '₹ 6000' },
                    ],
                },
                {
                    title: 'Car Rent',
                    inputs: [
                        { label: 'Car Type', placeholder: 'Mini' },
                        { label: 'Airport Transfer Budget', placeholder: '₹ 6000' },
                        { label: 'Cab Budget', placeholder: '₹ 6000' },
                    ],
                },
                {
                    title: 'Services',
                    inputs: [
                        { label: 'Services Included', placeholder: 'No' },
                        { label: 'Services Budget', placeholder: 'Enter price' },
                    ],
                },
                {
                    title: 'Visa',
                    inputs: [{ label: 'Budget', placeholder: '₹6000' }],
                },
            ].map((section, index) => (
                <View key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <Text className="text-lg font-semibold mb-2">{section.title}</Text>
                    {section.inputs.reduce((result, input, idx, array) => {
                        if (idx % 2 === 0) {
                            result.push(array.slice(idx, idx + 2));
                        }
                        return result;
                    }, []).map((pair, pairIdx) => (
                        <View key={pairIdx} className="flex-row justify-between mb-3">
                            {pair.map((input, inputIdx) => (
                                <View key={inputIdx} className={`flex-1 ${inputIdx !== pair.length - 1 ? 'mr-2' : ''}`}>
                                    <Text className="text-sm text-gray-700 mb-1">{input.label}</Text>
                                    <TextInput
                                        placeholder={input.placeholder}
                                        className="border border-gray-300 rounded-lg p-2 text-gray-800"
                                    />
                                </View>
                            ))}
                        </View>
                    ))}

                </View>
            ))}
        </View>
    );
};

export default SpendRight;
