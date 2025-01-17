import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { BackArrowIcon } from '../assets/images/Icons/ArrowIcon';
import Payment from "../modals/Payment";
import { useNavigation, useRoute } from '@react-navigation/native';
import { AddFandBItemsToCart, GetFandBCart } from '../services/servicesService';
import CircularLoader from './CircularLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setFAndBCartId, setRestaurantCart, setRoomServiceCart } from '../redux/servicesRedux';

export default function ViewCart() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const { roomServiceCart, fAndBCartId } = useSelector(state => state.services);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const type = route?.params?.type || "";

    // useEffect(() => {
    //     if (route.params?.cartItem) {
    //         const newItem = route.params.cartItem;
    //         setItems(currentItems => {
    //             const existingItemIndex = currentItems.findIndex(item => item.name === newItem.name);

    //             if (existingItemIndex >= 0) {
    //                 const updatedItems = [...currentItems];
    //                 updatedItems[existingItemIndex] = {
    //                     ...updatedItems[existingItemIndex],
    //                     quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
    //                 };
    //                 return updatedItems;
    //             } else {
    //                 return [...currentItems, newItem];
    //             }
    //         });
    //     }
    // }, [route.params?.cartItem]);

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await GetFandBCart(fAndBCartId);
            dispatch(setRoomServiceCart(res.data.data));
            setItems(res.data.data.cartResponse)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    // const incrementQuantity = (index) => {
    //     const newItems = [...items];
    //     newItems[index].quantity += 1;
    //     setItems(newItems);
    // };

    // const decrementQuantity = (index) => {
    //     const newItems = [...items];
    //     if (newItems[index].quantity > 1) {
    //         newItems[index].quantity -= 1;
    //     } else {
    //         newItems.splice(index, 1);
    //     }
    //     setItems(newItems);
    // };


    const handleCart = async (item, type) => {
        try {
            const payload = {
                itemId: item.itemId,
                operation: type,
                hotelId: selectedProperty.XipperID,
                roomNumber: selectedProperty.roomNumber,
                checkInId: selectedProperty.checkInId
            };

            const res = await AddFandBItemsToCart(payload);
            await getCart();
            if (res.data.message === "Cart not found" || res.data.cart === "Cart Empty") {
                dispatch(setRoomServiceCart({}));
            }

            return res;
        } catch (e) {
            console.log(e);
        }
    };

    const incrementQuantity = async (item) => {
        setLoading(true);
        await handleCart(item, "add");
        setLoading(false);
    };

    const decrementQuantity = async (item) => {
        setLoading(true);
        await handleCart(item, "remove");
        setLoading(false);
    };
    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const DELIVERY_FEE = 25;
    const TAXES = 45.28;
    const RESTAURANT_CHARGES = 25;
    const PLATFORM_FEE = 10;

    const calculateTotal = () => {
        return calculateSubtotal() + DELIVERY_FEE + TAXES + RESTAURANT_CHARGES + PLATFORM_FEE;
    };

    const handleOrder = () => {
        setModalVisible(true);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView
            className={(Platform.OS === 'ios') ? `flex-1 h-full bg-gray-100 p-${type === "screen" ? 10 : 6}`: `flex-1 h-full bg-gray-100 p-${type === "screen" ? 4 : 2}`}
            showsVerticalScrollIndicator={false}>
            {type === "screen" && (
                <View className="flex-row items-center mb-4 justify-between">
                    <Pressable onPress={handleBack}>
                        <Text className="text-lg">
                            <BackArrowIcon />
                        </Text>
                    </Pressable>
                    <Text className={`text-xl font-semibold text-${selectedProfile.type}`}>Your Cart</Text>
                    <View></View>
                </View>
            )}

            {roomServiceCart?.cartResponse?.length > 0 ? (
                roomServiceCart?.cartResponse?.map((item, index) => (
                    <View key={index} className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-2">
                        <View className="flex-1">
                            <Text className="text-lg font-normal text-black">{item.itemName}</Text>
                            <Text className="text-lg font-normal text-gray-800">₹ {item.totalPrice}</Text>
                        </View>
                        <View className={`bg-gray-200 p-1 rounded border border-${selectedProfile.type}`}>
                            <View className="flex-row items-center space-x-2">
                                <Pressable
                                    onPress={() => decrementQuantity(item)}
                                    className="px-3 py-1 rounded"
                                >
                                    <Text className={`text-lg text-${selectedProfile.type}`}>-</Text>
                                </Pressable>
                                <Text className={`text-lg text-${selectedProfile.type}`}>{item.quantity}</Text>
                                <Pressable
                                    onPress={() => incrementQuantity(item)}
                                    className="px-3 py-1  rounded"
                                >
                                    <Text className={`text-lg text-${selectedProfile.type}`}>+</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                ))
            ) : (
                <View className="p-4 bg-white rounded-lg shadow mb-2">
                    <Text className="text-center text-gray-500">Your cart is empty</Text>
                </View>
            )}

            <View className="p-4 bg-white rounded-lg shadow mt-4">
                <Text className="text-gray-400">Add cooking requests</Text>
            </View>

            <View className="p-4 bg-white rounded-lg shadow mt-4">
                <Text className="text-lg font-semibold text-black">Coupon Codes</Text>
                <View className="flex-row items-center mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <TextInput
                        placeholder="Have a Coupon Code?"
                        className="flex-1 p-2 text-black"
                    />
                    <Pressable className="px-4 py-2 mr-3">
                        <Text className="text-gray font-semibold">Apply</Text>
                    </Pressable>
                </View>
            </View>

            {roomServiceCart?.bill?.priceBreakup?.length > 0 && (
                <View className="p-4 bg-white rounded-lg shadow mt-4">
                    <Text className="text-lg font-semibold mb-2 text-black">Price Breakup</Text>
                    {roomServiceCart?.bill?.priceBreakup?.map((item, index) => (
                        <View key={index} className="mb-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-base text-black">{item.itemName}</Text>
                                <Text className="text-black">₹ {item.totalItemPriceAfterTax}</Text>
                            </View>
                            <Text className="text-sm text-gray-500">{item.quantity} x ₹ {item.unitPrice}</Text>
                        </View>
                    ))}

                    <View className="mt-4 space-y-2">
                        {/* <View className="flex-row justify-between">
                            <Text className="text-sm text-black">Delivery Fee</Text>
                            <Text className="text-black">₹ {DELIVERY_FEE}</Text>
                        </View> */}
                        {roomServiceCart.bill.totalPriceBeforeTax && <View className="flex-row justify-between">
                            <Text className="text-sm text-black">Total Before Tax</Text>
                            <Text className="text-black">₹ {roomServiceCart.bill.totalPriceBeforeTax}</Text>
                        </View>}
                        {roomServiceCart.bill.totalTax && <View className="flex-row justify-between">
                            <Text className="text-sm text-black">Total Taxes</Text>
                            <Text className="text-black">₹ {roomServiceCart.bill.totalTax}</Text>
                        </View>}
                        {/* <View className="flex-row justify-between">
                            <Text className="text-sm text-black">Restaurant Charges</Text>
                            <Text className="text-black">₹ {RESTAURANT_CHARGES}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-sm text-black">Platform Fee</Text>
                            <Text className="text-black">₹ {PLATFORM_FEE}</Text>
                        </View> */}
                    </View>
                    <View className="flex-row justify-between mt-4 pt-2 border-t border-gray-200">
                        <Text className={`text-lg font-semibold ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>Amount To Pay</Text>
                        <Text className={`text-lg font-semibold ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>
                            ₹ {roomServiceCart.bill.grandTotal}
                        </Text>
                    </View>
                </View>
            )}
            {loading && <CircularLoader />}
            {items?.length > 0 && (
                <Pressable
                    className={`mt-6 mb-6 py-3 rounded-lg mx-auto px-8 bg-${selectedProfile.type}`}
                    onPress={handleOrder}
                >
                    <Text className="text-center text-white font-semibold text-lg">Pay</Text>
                </Pressable>
            )}
            <Payment visible={modalVisible}
                onBack={() => setModalVisible(false)}
                onClose={() => {
                    dispatch(setRestaurantCart([]));
                    dispatch(setFAndBCartId(""));
                    setModalVisible(false);
                    navigation.navigate("HotelDetails");
                }}
                cartId={fAndBCartId} />
        </ScrollView>
    );
}
