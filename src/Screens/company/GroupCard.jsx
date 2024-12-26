import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useSelector } from 'react-redux';

const GroupCard = () => {
  const { selectedProfile } = useSelector((state) => state.account);
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-md p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-black">Group: Senior Manager</Text>
          <Pressable>
            <Text className={`${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>hjvschjvasj</Text>
          </Pressable>
        </View>

        <View className="flex-row space-x-2 mt-2">
          <Pressable className="border border-gray-300 px-3 py-1 rounded-lg">
            <Text className="text-black text-sm">Services</Text>
          </Pressable>
          <Pressable className="border border-gray-300  px-3 py-1 rounded-lg">
            <Text className="text-black text-sm">Liquor</Text>
          </Pressable>
          <Pressable className="border border-gray-300  px-3 py-1 rounded-lg">
            <Text className="text-black text-sm">Company Pay</Text>
          </Pressable>
        </View>

        <View className="flex-row space-x-2 mt-2">
        <Pressable className="border border-gray-300  px-3 py-1 rounded-lg mt-2">
        <Text className="text-gray-700 text-sm">
          Hotel Spend Limit: ₹ 10,000{' '}
        </Text>
        </Pressable>
         <Pressable>
            <Text className={`mt-4 ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>View all</Text>
          </Pressable>
        </View>

        <Text className="text-gray-600 text-sm mt-3">
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna.
        </Text>

        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center space-x-2">
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg' }}
              className="w-8 h-8 rounded-full"
            />
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg' }}
              className="w-8 h-8 rounded-full"
            />
            <Text className="text-sm text-gray-700">18+ members</Text>
          </View>
          <Pressable>
            <Text className={`${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>View all</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GroupCard;
