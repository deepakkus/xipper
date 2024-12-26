
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Dropdown = ({ options, selectedValue, onSelect, visible, toggleDropdown }) => {
    return (
        <View className="relative">
            {/* <TouchableOpacity onPress={toggleDropdown}>
                <Text className="my-2 text-lg font-psemibold">{selectedValue}</Text>
            </TouchableOpacity> */}

            {visible && (
                <View className="absolute p-3 bg-white border border-gray-200 rounded-lg z-50">
                    {options.map((option, index) => (
                        <View key={index} className="flex flex-row items-center">
                            <RadioButton
                                value={option.value}
                                status={selectedValue === option.value ? 'checked' : 'unchecked'}
                                onPress={() => onSelect(option.value)}
                                color="#6D38C3"
                                uncheckedColor="#CCCCCC"
                            />
                            <Text className="font-psemibold text-base">{option.label}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default Dropdown;
