import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import SortedByModal from "../modals/SortedByModal";
import { useNavigation } from "@react-navigation/native";
import { setSelectedProfile } from "../redux/accountRedux";
import { useSelector } from "react-redux";

const PriceBreakup = ({ title, items }) => {
    const [isModal, setIsModal] = useState(false);
    const { selectedProfile } = useSelector(state => state.account);
    const nav = useNavigation();

    return (
        <>
            <View className="bg-white px-3 py-4 rounded-md">
                <View className="flex-row justify-between items-center my-2">
                    <Text className="font-pmedium text-lg text-black">Price Breakup</Text>
                </View>
                {items.map((item, i) => item.quantity > 0 && (
                    <View key={i} className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center space-x-2 flex-1">
                            <View className="rounded-full border border-purple-400 bg-purple-200 w-10 h-10 items-center justify-center">
                                <Text className="font-psemibold text-base pt-0.5 text-white">
                                    {item.quantity}
                                </Text>
                            </View>
                            <Text className="font-psemibold text-base text-black">X</Text>
                            <Text className="font-psemibold text-base text-black">{item.name}</Text>
                            {item.isPaid && (
                                <Text className="font-pregular text-xs ml-1 text-primary">Paid</Text>
                            )}
                        </View>
                        <View className="w-24 items-end">
                            <Text className="font-pmedium text-base text-black mb-3">Rs. {item.price * (item?.quantity || 1)}</Text>
                        </View>
                    </View>
                ))}
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="font-pmedium text-base text-black">Delivery Fee</Text>
                    <Text className="font-pmedium text-base text-black">Rs. 10</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="font-pmedium text-base text-black">Taxes</Text>
                    <Text className="font-pmedium text-base text-black">Rs. 698</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="font-pmedium text-base text-black">Restaurant Charges</Text>
                    <Text className="font-pmedium text-base text-black">Rs. 235</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="font-pmedium text-base text-black">Platform Fee</Text>
                    <Text className="font-pmedium text-base text-black">Rs. 50</Text>
                </View>

                <View className="w-full border border-gray-100 my-3 rounded-lg"></View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className={`font-pmedium text-base ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Amount to Pay</Text>
                    <Text className={`font-pmedium text-base text-primary ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Rs. 5605</Text>
                </View>
            </View>
            <Pressable
                className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile.type === 'user' ? "bg-user" : "bg-company"}`}
                onPress={() => setIsModal(!isModal)}
            >
                <Text className="text-white text-center mx-16">Order</Text>
            </Pressable>

            <SortedByModal
                heading={"Payment"}
                isModalVisible={isModal}
                toggleModal={() => setIsModal(!isModal)}
                content={
                    <View className="flex-row justify-evenly">
                        <Pressable className={`px-8 py-2 rounded-md mb-2 my-5 mx-auto  ${selectedProfile.type === 'user' ? "bg-user" : "bg-company"}`}>
                            <Text className="text-white text-center">Pay Now</Text>
                        </Pressable>
                        <Pressable
                            className={`px-8 py-2 rounded-md mb-2 my-5 mx-auto  ${selectedProfile.type === 'user' ? "bg-user" : "bg-company"}`}
                            onPress={() => {
                                nav.navigate("HotelDetails");
                            }}
                        >
                            <Text className="text-white text-center">Add to bill</Text>
                        </Pressable>
                    </View>
                }
            />
        </>
    );
};

export default PriceBreakup;
