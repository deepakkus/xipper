import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calender } from '../assets/images/Icons/TravalIons';

const ServiceModel = () => {
    const [travelers, setTravelers] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState('Car, Guide & Lunch');
    const [selectedSlot, setSelectedSlot] = useState('Check Availibility');


    const increaseTravelers = () => {
        setTravelers(prev => prev + 1);
    };

    const decreaseTravelers = () => {
        if (travelers > 1) {
            setTravelers(prev => prev - 1);
        }
    };

    return (
        <SafeAreaView className=" p-3">
            <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    className="mb-4"
                >
                    {/* First Row */}
                    <View className="flex-row">
                        <Pressable
                            onPress={() => setSelectedSlot('Check Availability')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Check Availability' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Check Availability' ? 'text-white' : 'text-black'}>
                                Check Availability
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSelectedSlot('Highlights')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Highlights' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Highlights' ? 'text-white' : 'text-black'}>
                                Highlights
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSelectedSlot('Itinerary')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Itinerary' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Itinerary' ? 'text-white' : 'text-black'}>
                                Itinerary
                            </Text>
                        </Pressable>
                    </View>

                    {/* Second Row */}
                    <View className="flex-row mt-2">
                        <Pressable
                            onPress={() => setSelectedSlot('Terms&Conditions')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Terms&Conditions' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Terms&Conditions' ? 'text-white' : 'text-black'}>
                                Terms & Conditions
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSelectedSlot('Cancelation Policy')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Cancelation Policy' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Cancelation Policy' ? 'text-white' : 'text-black'}>
                                Cancellation Policy
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSelectedSlot('Reviews')}
                            className={`px-4 py-2 rounded-md mr-1 ${selectedSlot === 'Reviews' ? 'bg-purple-500' : 'bg-gray-200'}`}
                        >
                            <Text className={selectedSlot === 'Reviews' ? 'text-white' : 'text-black'}>
                                Reviews
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>


                {selectedSlot === 'Check Availability' && (
                    <>
                        <View className="rounded-lg p-4 mb-4 px-2 w-full h-70 bg-white shadow-md mt-4">
                            <Text className="text-gray-500 mb-2">Price varies by group size</Text>
                            <Text className="text-[#6D38C3] mb-2">Best Price Guarentee</Text>

                            <View className="flex-row justify-between items-center mb-4">
                                <View className="flex-row items-center">
                                    <Text className="font-bold text-sm mr-2 text-black">Date</Text>
                                    <Pressable className="border border-gray-300 px-4 py-2 rounded-md mr-1">
                                        <Text className="text-purple-500 text-xs font-bold">25th June, 2024</Text>
                                    </Pressable>
                                </View>
                                <View className="flex-row items-center">
                                    <Text className="font-bold text-sm mr-2 text-black">Travellers</Text>
                                    <View className="flex-row items-center">
                                        <View className="flex-row items-center border border-[#6D38C3] rounded-md p-1 bg-[#E6D7FF]">

                                            <Pressable onPress={decreaseTravelers}>
                                                <Text className="text-purple-500">-</Text>
                                            </Pressable>
                                            <Text className="px-4 text-[#6D38C3]">{travelers}</Text>
                                            <Pressable onPress={increaseTravelers}>
                                                <Text className="text-[#6D38C3]">+</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="font-bold text-sm text-black">Select the slot</Text>
                                <View className="border border-gray-300 px-4 py-2 rounded-md w-52 ml-2">
                                    <Text className="text-gray-500">Select</Text>
                                </View>
                            </View>
                            <Pressable className="bg-purple-500 mt-4 py-3 rounded-md w-2/4 mx-auto">
                                <Text className="text-white text-center font-bold">Check Availability</Text>
                            </Pressable>
                        </View>
                    </>
                )}
                {selectedSlot === 'Highlights' && (
                    <>
                        <View className="rounded-lg p-4 mb-4 px-2 w-full h-70 bg-white shadow-md mt-4">
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black">See the best of South Goa in the comfort of a luxury coach service</Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black mt-1">The tour includes convenient pick up and drop off from major locations in South and North Goa</Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black mt-1">Your day will cover a great mix of beautiful beaches, jetties, and a boat cruise</Text>
                            </View>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black mt-1">Understand the deep connection of the locals with their beliefs as you visit 4 popular religious sites.</Text>
                            </View>
                        </View>
                    </>
                )}

                {selectedSlot === 'Itinerary' && (
                    <>
                        <View className="p-4 bg-white rounded-lg shadow-md mb-3">
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Time: 08:30-19:30</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Total: 11 hour(s) and 0 minute(s)</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Hotel pick up from Calangute, Baga, Candolim, Sinquerim, Arpora, and Porvorim areas</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">1 hour sightseeing by boat or dolphin safari</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Dona Paula</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Bom Jesus of Basilica Church</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Se Cathedral</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Mangueshi Temple</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Shantadurga Temple or Balaji Temple</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">River cruise</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <Text className="text-black font-bold mr-1">•</Text>
                                <Text className="text-black">Hotel drop off in Calangute, Baga, Candolim, Sinquerim, Arpora, and Porvorim areas</Text>
                            </View>
                        </View>

                    </>
                )}
                {selectedSlot === 'Terms&Conditions' && (
                    <>
                        <View className="bg-white rounded-lg p-4 shadow-lg mb-5">
                            <Text className="text-lg font-bold mb-2 text-black">Confirmation</Text>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black">You'll get confirmation within minutes. If you don't see any confirmation, reach out to our customer support.</Text>
                            </View>

                            <Text className="text-lg font-bold mb-2 text-black mt-3">Prohibitions & Limitations</Text>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black">This activity is not recommended for anyone with impaired physical mobility</Text>
                            </View>

                            <Text className="text-lg font-bold mb-2 text-black mt-3">Eligibility</Text>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black">Children aged 0-4 can join this activity free of charge</Text>
                            </View>
                        </View>

                    </>
                )}
                {selectedSlot === 'Cancelation Policy' && (
                    <>
                        <View className="bg-white rounded-lg p-4 shadow-lg mb-5">
                            <Text className="text-lg font-bold mb-2 text-black">Cancelation Policy</Text>
                            <View className="flex-row items-start">
                                <Text className="text-black font-bold mr-2">•</Text>
                                <Text className="text-black">You'll get a full refund if you cancel at least 48 hour(s) before the activity starts</Text>
                            </View>
                        </View>
                    </>
                )}
                {/* {selectedSlot === 'Reviews' && (
                    <></>
                )} */}
            </View>

            {/* Package Selection */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                <Pressable
                    onPress={() => setSelectedPackage('Car, Guide & Lunch')}
                    className={`px-4 py-2 rounded-md mr-1 ${selectedPackage === 'Car, Guide & Lunch' ? 'bg-purple-500' : 'bg-gray-200'}`}
                >
                    <Text className={selectedPackage === 'Car, Guide & Lunch' ? 'text-white' : 'text-black'}>
                        Car, Guide & Lunch
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => setSelectedPackage('Lunch Excluded')}
                    className={`px-4 py-2 rounded-md mr-1 ${selectedPackage === 'Lunch Excluded' ? 'bg-purple-500' : 'bg-gray-200'}`}
                >
                    <Text className={selectedPackage === 'Lunch Excluded' ? 'text-white' : 'text-black'}>
                        Lunch Excluded
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => setSelectedPackage('Car, Guide')}
                    className={`px-4 py-2 rounded-md mr-2 ${selectedPackage === 'Car, Guide' ? 'bg-purple-500' : 'bg-gray-200'}`}
                >
                    <Text className={selectedPackage === 'Car, Guide' ? 'text-white' : 'text-black'}>
                        Car, Guide
                    </Text>
                </Pressable>
            </ScrollView>

            <View className="p-4 rounded-lg mb-4 w-full">
                {selectedPackage === 'Lunch Excluded' && (
                    <>
                        <Text className="text-lg font-bold mb-2">Lunch Excluded Package</Text>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-gray-400 line-through">₹2200</Text>
                            <Text className="font-bold text-lg">₹2000</Text>
                        </View>
                        <Text className="text-gray-500 mb-2">Pickup included</Text>
                        <Text className="text-gray-500 mb-2">Free cancellation before Jul 23 (local time)</Text>
                        <Text className="text-gray-500 mb-2">Includes: Private Car with Driver + Private Guides + Entrance & activities</Text>
                        <Text className="text-gray-500 mb-2">Charges mentioned in the itinerary.</Text>

                        <View className="flex items-center">
                            <Pressable className="bg-purple-300 py-3 rounded-full mt-4 w-40">
                                <Text className="text-center font-bold">Selected</Text>
                            </Pressable>
                        </View>

                    </>
                )}

                {selectedPackage === 'Car, Guide & Lunch' && (
                    <>
                        <Text className="text-lg font-bold mb-2">Car, Guide & Lunch Package</Text>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-gray-400 line-through">₹2400</Text>
                            <Text className="font-bold text-lg">₹2200</Text>
                        </View>
                        <Text className="text-gray-500 mb-2">Pickup included</Text>
                        <Text className="text-gray-500 mb-2">Free cancellation before Jul 30 (local time)</Text>
                        <Text className="text-gray-500 mb-2">Includes: Private Car with Driver + Private Guides + Entrance, activities, and Lunch.</Text>
                        <View className="flex items-center">
                            <Pressable className="bg-purple-300 py-3 rounded-full mt-4 w-40">
                                <Text className="text-center font-bold">Selected</Text>
                            </Pressable>
                        </View>
                    </>
                )}

                {selectedPackage === 'Car, Guide' && (
                    <>
                        <Text className="text-lg font-bold mb-2">Car & Guide Package</Text>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-gray-400 line-through">₹2000</Text>
                            <Text className="font-bold text-lg">₹1800</Text>
                        </View>
                        <Text className="text-gray-500 mb-2">Pickup not included</Text>
                        <Text className="text-gray-500 mb-2">Free cancellation before Aug 15 (local time)</Text>
                        <Text className="text-gray-500 mb-2">Includes: Private Car with Driver + Private Guides.</Text>
                        <View className="flex items-center">
                            <Pressable className="bg-purple-300 py-3 rounded-full mt-4 w-40">
                                <Text className="text-center font-bold">Selected</Text>
                            </Pressable>
                        </View>
                    </>
                )}

            </View>

            <Pressable className="bg-purple-500 py-3 rounded-md w-3/4 mx-auto">
                <Text className="text-white text-center font-bold">Continue Booking</Text>
            </Pressable>
        </SafeAreaView >
    );
};

export default ServiceModel;
