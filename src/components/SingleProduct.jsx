import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const SingleProduct = ({ items, incrementQuantity, decrementQuantity }) => {
    const { selectedProfile } = useSelector((state) => state.account);

    return (
        <View>
            {items.map((item, index) => (
                <View
                    key={index}
                    className="flex-row items-center justify-between my-2"
                >
                    <View className="flex-1">
                        <Text className="font-medium text-md text-black">
                            {item.name} {item?.size ? `(${item?.size})` : ""}
                        </Text>

                        {item.price && (
                            <Text className="font-medium text-md text-black">
                                Rs. {item.price}
                            </Text>
                        )}
                        {item.description && (
                            <Text className="text-md text-black">
                                {item.description}
                            </Text>
                        )}
                    </View>

                    {item.quantity < 1 ? (
                        <Pressable
                            className="px-3 bg-white mx-5 rounded-md border border-gray-300 py-1 w-24"
                            onPress={() => incrementQuantity(index, item)}
                            accessibilityLabel={`Add ${item.name}`}
                        >
                            <Text className="font-pregular text-base text-black text-center">
                                Add
                            </Text>
                        </Pressable>
                    ) : (
                        <View
                            className={`flex-row justify-between px-2 bg-gray-200 border border-purple-500 mx-5 rounded-md w-24 ${selectedProfile?.type === 'user'
                                    ? 'border-user'
                                    : 'border-company'
                                }`}
                        >
                            <Pressable
                                onPress={() => decrementQuantity(index, item)}
                                accessibilityLabel={`Decrease ${item.name} quantity`}
                                className="p-2"
                            >
                                <Text className="font-pmedium text-md text-black">-</Text>
                            </Pressable>
                            <Text className="font-pmedium text-md text-black p-2">
                                {item.quantity}
                            </Text>
                            <Pressable
                                onPress={() => incrementQuantity(index, item)}
                                accessibilityLabel={`Increase ${item.name} quantity`}
                                className="p-2"
                            >
                                <Text className="font-pmedium text-md text-black">+</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

export default SingleProduct;
