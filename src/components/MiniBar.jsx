import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import SearchBar from "../components/SearchBar";
import { BackArrowIcon, GreaterArrowIcon } from '../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AddFandBItemsToCart, GetFandBCart, GetFandBItems } from '../services/servicesService';
import { extractUniqueCategoryAndItemTypes } from '../utils/utils';
import CircularLoader from './CircularLoader';
import { setFAndBCartId, setRestaurantCart } from '../redux/servicesRedux';

const services = [
    {
        id: 1,
        title: 'Blow Dry',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 2,
        title: 'Body Massage',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 3,
        title: 'Body Massage',
        price: 240,
        description: 'A small description about the treatment',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

export default function MiniBar() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [cart, setCart] = useState({})
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const { fAndBCartId, restaurantCart } = useSelector(state => state.services);
    const { userServices } = useSelector(state => state.business);
    const [uniqueDataSet, setUniqueDataSet] = useState({});
    const [minibarData, setMinibarData] = useState([])
    const [loading, setLoading] = useState(false);
    const [apiData, setAPIData] = useState([]);


    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await GetFandBItems(selectedProperty.XipperID, "Minibar");
            const subCategories = res?.subCategories || [];
            setAPIData(subCategories.map((i) => ({ ...i, size: i?.quantity, quantity: 0 })));
            const { uniqueCategories, uniqueItemTypes } = extractUniqueCategoryAndItemTypes(subCategories);
            setUniqueDataSet({ uniqueCategories, uniqueItemTypes });

            const cart = fAndBCartId ? await getCart() : null;
            const cartItems = cart?.cartResponse || [];
            const updatedItems = subCategories.map(item => {
                const cartItem = cartItems.find(cartItem => cartItem.itemName === item.name);
                return cartItem ? { ...item, size: item?.quantity, quantity: cartItem.quantity } : { ...item, size: item?.quantity, quantity: 0 };
            });
            setMinibarData(updatedItems);
        } catch (error) {
            console.error("Error fetching F&B items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const getCart = async (cartId = "") => {
        try {
            setLoading(true);
            const res = await GetFandBCart(cartId || fAndBCartId);
            dispatch(setRestaurantCart(res.data.cartResponse));
            setCart(res.data.cartResponse);
            return res.data;
        } catch (e) {
            console.error("Error fetching cart:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleItem = async (item, type) => {
        try {
            setLoading(true);
            const payload = {
                "itemId": item.itemId,
                "operation": type,
                "hotelId": selectedProperty.XipperID,
                "roomNumber": selectedProperty.roomNumber,
                "checkInId": selectedProperty.checkInId
            };
            const res = await AddFandBItemsToCart(payload);
            if (res.data.message === "Cart not found" || res.data.cart === "Cart Empty") {
                dispatch(setRestaurantCart([]));
                dispatch(setFAndBCartId(""));
                setCart([]);
                setMinibarData(apiData);
            } else if ([200, 201].includes(res.status)) {
                dispatch(setFAndBCartId(res?.data?.cart?.cartId));
                const cart = res?.data?.cart?.cartId || fAndBCartId ? await getCart(res?.data?.cart?.cartId) : null;
                const cartItems = cart?.cartResponse || [];
                const updatedItems = minibarData.map(item => {
                    const cartItem = cartItems.find(cartItem => cartItem.itemName === item.name);
                    return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
                });
                setMinibarData(updatedItems);
            }
        } catch (error) {
            console.error("Error adding/removing item from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = minibarData?.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    return (
        <View className="flex-1">
            <View className={(Platform.OS === 'ios') ? "flex flex-row items-center mt-10 p-2 ml-2": "flex flex-row items-center mt-1 ml-2"}>
                <Pressable onPress={() => navigation.goBack()}>
                    <BackArrowIcon />
                </Pressable>
                <Text className={`text-center flex-1 p-2 font-bold text-xl mr-6 ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Minibar Services</Text>
            </View>
            <View className="flex-row items-center justify-between ml-6 mt-5">
                <SearchBar
                    className="mx-4 mb-4"
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
            </View>

            <ScrollView>
                {filteredItems.map((service, ind) => (
                    <View
                        key={ind}
                        className="flex-row items-start px-4 py-4 border-b border-gray-200"
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-lg font-bold text-black mx-2">{service.name}</Text>
                            <Text className="text-black mt-1 font-bold mx-2">₹ {service.price}</Text>
                            {service?.size && <Text className="text-black mt-1 mx-2">{service?.size}</Text>}
                        </View>

                        <View className="relative w-32 h-40 items-center">
                            <Image
                                source={{ uri: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                                className="w-32 h-32 rounded-lg"
                            />

                            <View className="absolute bottom-0">
                                {service.quantity === 0 ? (
                                    <Pressable
                                        onPress={() => handleItem(service, "add")}
                                        className="bg-pink-100 px-4 py-3 rounded-lg border border-[#EE1E25]"
                                    >
                                        <Text className="text-[#EE1E25] font-bold">ADD +</Text>
                                    </Pressable>
                                ) : (
                                    <View className="flex-row items-center bg-gray-200 rounded border border-[#06A77D] px-2 py-1 mb-2 ">
                                        <Pressable
                                            onPress={() => handleItem(service, "remove")}
                                            className="px-3 py-1"
                                        >
                                            <Text className="text-gray-800 font-bold">-</Text>
                                        </Pressable>

                                        <Text className="mx-4 text-black font-bold">
                                            {service.quantity}
                                        </Text>

                                        <Pressable
                                            onPress={() => handleItem(service, "add")}
                                            className="px-3 py-1"
                                        >
                                            <Text className="text-gray-800 font-bold">+</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>

            {loading && <CircularLoader />}
            {cart?.length > 0 && (
                <View className="absolute bottom-4 left-4 right-4 bg-[#06A77D] rounded-xl p-4 flex-row justify-between items-center shadow-lg">
                    <Text className="text-white text-base font-medium">
                        {`${cart?.length} ${cart?.length > 1 ? "items in cart" : "item added to the cart"}`}
                    </Text>
                    <Pressable onPress={() => navigation.navigate("ViewCart", { type: "screen" })}>
                        <Text className="text-white text-base font-bold">{"View Cart >"}</Text>
                    </Pressable>
                </View>
            )}

        </View>
    );
}
