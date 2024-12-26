import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import ServiceModel from "../components/ServiceModel";

const TourCard = () => {
  const [modalVisible, setModalVisible] = useState(false); 

  return (
    <View className="p-4 rounded-lg relative">

      <View className="absolute top-2 left-2 bg-purple-500 px-3 py-1 rounded-full z-10">
        <Text className="text-white text-xs font-bold">Best price Guarantee</Text>
      </View>


      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/132/777/256/vacation-costa-adeje-gran-hotel-best-hotels-of-2017-resort-wallpaper-preview.jpg' }} 
          className="w-full h-40 rounded-md"
        />
      </TouchableOpacity>

      <View className="flex-row items-center mt-3">
        <View className="flex-row items-center bg-purple-200 px-2 py-1 rounded-full">
          <Text className="text-xs font-bold text-purple-600">4.2</Text>
        </View>
        <Text className="ml-2 text-xs text-gray-600">Very good (120 reviews)</Text>
      </View>

      <Text className="text-lg font-bold text-black mt-2">South Goa Tour by Luxury Coach</Text>

      <View className="flex-row mt-1">
        <Text className="text-sm text-gray-600">Easy refund | Instant Cancellation</Text>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-400 line-through">$2200</Text>
        <Text className="text-xl font-bold text-black">$1026</Text>
      </View>

      {/* Service Modal */}
      <ServiceModel visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default TourCard;
