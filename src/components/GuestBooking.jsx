import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const BookingForm = () => {
  const [bookingFor, setBookingFor] = useState('myself');
  const [selectedOption, setSelectedOption] = useState('Xipper ID');
  const [showDropdownIndex, setShowDropdownIndex] = useState(null); 

  const options = ['Xipper ID', 'Fill form'];

  const Dropdown = ({ value, options, onSelect, index }) => (
    <View className="relative">
      <Pressable
        className="flex-row items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md bg-white"
        onPress={() => setShowDropdownIndex(showDropdownIndex === index ? null : index)} 
      >
        <Text className="text-gray-700">{value}</Text>
        <Text className="text-gray-500">{showDropdownIndex === index ? '▲' : '▼'}</Text>
      </Pressable>

      {showDropdownIndex === index && (
        <View className="absolute top-full right-0 mt-1 w-32 border border-gray-300 rounded-md bg-white z-10 shadow-lg">
          {options.map((option) => (
            <Pressable
              key={option}
              className={`px-3 py-2 ${option === value ? 'bg-gray-50' : ''}`}
              onPress={() => {
                onSelect(option);
                setShowDropdownIndex(null); 
              }}
            >
              <Text className={`text-sm ${option === value ? 'text-gray-900' : 'text-gray-700'}`}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView className="bg-white p-6 rounded-lg mx-4" showsVerticalScrollIndicator={false}>
      <Text className="text-lg font-semibold text-gray-900">I am booking for</Text>
      <View className="flex-row justify-between mt-4">
        <RadioButton
          label="Myself"
          selected={bookingFor === 'myself'}
          onPress={() => setBookingFor('myself')}
        />
        <RadioButton
          label="Someone else"
          selected={bookingFor === 'someoneElse'}
          onPress={() => setBookingFor('someoneElse')}
        />
      </View>

      <Text className="text-lg font-semibold text-gray-500 mt-6">Fill details</Text>

      {[1, 2, 3].map((guest) => (
        <View key={guest} className="mt-3 bg-white p-1 rounded-lg shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900">Guest {guest}</Text>
            {guest === 1 ? (
              <Dropdown
                value={selectedOption}
                options={options}
                onSelect={(value) => {
                  setSelectedOption(value);
                  setShowDropdownIndex(null);
                }}
                index={guest} 
              />
            ) : (
              <Dropdown
                value="Fill form" 
                options={options}
                onSelect={(value) => {
                  setSelectedOption(value);
                  setShowDropdownIndex(null); 
                }}
                index={guest} 
              />
            )}
          </View>

          {guest === 1 && selectedOption === 'Xipper ID' ? (
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 mt-2"
              placeholder="Fill your Xipper ID x2400000000"
              placeholderTextColor="gray"
            />

          ) : (
            <>
              <View className="flex-row space-x-4 mb-4">
                <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Title" placeholderTextColor="gray" />
                <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="First name" placeholderTextColor="gray" />
                <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Last name" placeholderTextColor="gray" />
              </View>
              <TextInput className="border border-gray-300 rounded-lg px-3 py-2 mb-4" placeholder="Email ID" placeholderTextColor="gray" />
              <View className="flex-row space-x-4">
                <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="ISD Code" placeholderTextColor="gray" />
                <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Mobile number" placeholderTextColor="gray" />
              </View>
            </>
          )}
          <View className="h-px bg-gray-300 mt-4" />
        </View>
      ))}
    </ScrollView>
  );
};

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <Pressable onPress={onPress} className="flex-row items-center space-x-2">
      <View className={`w-4 h-4 rounded-full border-2 ${selected ? 'border-user bg-user' : 'border-gray-400'}`} />
      <Text className="text-gray-900">{label}</Text>
    </Pressable>
  );
};

export default styled(BookingForm);
