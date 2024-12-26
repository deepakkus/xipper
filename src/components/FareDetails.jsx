import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaggageInfo from './BaggageInfo'; 
import FarePolicy from '../components/FarePolicy';
import FareBreakup from '../components/FareBreakUp'; 
import FlexiPlus from '../components/FlexiPlus'; 

const FareDetails = () => {
    const [selectedFare, setSelectedFare] = useState('Saver'); 
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="flex-row justify-between p-4">
                    {["Fare Options", "Fare Breakup", "Baggage Information", "Fare Policy"].map((fare) => (
                        <Pressable
                            key={fare}
                            onPress={() => setSelectedFare(fare)} 
                            className={`px-3 py-3 mx-1 rounded-md border border-gray-300 ${
                                selectedFare === fare ? 'bg-purple-600' : 'bg-gray-200'
                            }`}
                            style={{
                                borderRadius: 20, 
                                paddingHorizontal: 10, 
                                paddingVertical: 8, 
                            }}
                        >
                            <Text
                                className={`text-center ${
                                    selectedFare === fare ? 'text-white' : 'text-gray-700'
                                }`}
                                style={{ fontSize: 10 }} 
                                numberOfLines={1} 
                            >
                                {fare}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View className="flex-row justify-center flex-wrap mb-4 p-4">
                    {['Saver', 'Flexi Plus', 'Super 6E'].map((fare) => (
                        <Pressable
                            key={fare}
                            onPress={() => setSelectedFare(fare)} 
                            className={`px-3 py-3 mx-1 rounded-md border border-gray-300 ${
                                selectedFare === fare ? 'bg-purple-600' : 'bg-gray-200'
                            }`}
                            style={{
                                borderRadius: 20, 
                                paddingHorizontal: 10, 
                                paddingVertical: 8, 
                            }}
                        >
                            <Text
                                className={`text-center ${
                                    selectedFare === fare ? 'text-white' : 'text-gray-700'
                                }`}
                                style={{ fontSize: 10 }}
                                numberOfLines={1}
                            >
                                {fare}
                            </Text>
                        </Pressable>
                    ))}
                </View>

               
                {selectedFare === "Baggage Information" && <BaggageInfo />}
                {selectedFare === "Fare Policy" && <FarePolicy />}
                {selectedFare === "Fare Breakup" && <FareBreakup />}
                {selectedFare === "Flexi Plus" && <FlexiPlus />}
                {selectedFare === "Saver" && <FlexiPlus />}
                {selectedFare === "Super 6E" && <FlexiPlus />}
                {selectedFare === "Fare Options" && <FlexiPlus />}

                {/* Continue Booking Button */}
                <View className="flex items-center">
                    <Pressable
                        style={{ backgroundColor: '#6D38C3' }}
                        className="rounded-md px-2 py-2 my-6 w-60"
                    >
                        <Text className="text-white text-center text-lg">Continue Booking</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FareDetails;
