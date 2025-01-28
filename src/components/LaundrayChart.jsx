import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import SearchBar from "../components/SearchBar";
import { BackArrowIcon } from "../assets/images/Icons/ArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AddLaundryItemsToCart, GetLaundryCart, RemoveLaundryItemsToCart } from "../services/servicesService";
import { setLaundryCart, setLaundryCartId } from "../redux/servicesRedux";
import CircularLoader from "./CircularLoader";
import SingleProduct from "./SingleProduct";

const LaundrayChart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [cart, setCart] = useState({})
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const { laundryCartId } = useSelector(state => state.services);
    const { userServices } = useSelector(state => state.business);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(userServices?.Laundry[0]?.subCategories || []);

    const filteredItems = items?.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    const updateCart = async (itemId, res) => {
        try {
            const item = items?.find(item => item.itemId === itemId);
            if (!item) return;

            if (res.data.message === "Cart not found" || res.data.cart === "Cart Empty") {
                setItems(items.map(item => ({ ...item, quantity: 0 })));
                dispatch(setLaundryCart({}));
                setCart([]);
            } else {
                setCart(res.data.cart.cartOrderItems);
                const updatedItems = items.map(item => {
                    const cartItem = res.data.cart.cartOrderItems.find(cartItem => cartItem.itemId === item.itemId);
                    return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
                });
                setItems(updatedItems);
                console.log(res.data.cart);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const AddItem = async (ind, item) => {
        try {
            setLoading(true);
            const response = await AddLaundryItemsToCart(selectedProperty, item.itemId);
            if ([200, 201].includes(response.status)) {
                console.log("Item added successfully:", response);
                dispatch(setLaundryCartId(response?.data?.cart?.cartId));
                updateCart(item.itemId, response);
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const RemoveItem = async (ind, item) => {
        try {
            setLoading(true);
            const response = await RemoveLaundryItemsToCart(selectedProperty, item.itemId);
            if ([200, 201].includes(response.status)) {
                console.log("Item removed successfully:", response);
                updateCart(item.itemId, response);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = () => {
        const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
        navigation.navigate("LaundaryCart", {
            cartItems: items,
            totalCount: totalCount
        });
    };

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await GetLaundryCart(laundryCartId);
            const cartItems = res?.data?.cartResponse || [];
            setCart(cartItems);
            const updatedItems = items.map(item => {
                const cartItem = cartItems.find(cartItem => cartItem.itemName === item.name);
                return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
            });
            setItems(updatedItems);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <View className="flex-1">
            <View className={(Platform.OS === 'ios') ? "flex flex-row items-center mt-10 ml-2" : "flex flex-row items-center mt-1 ml-2"}>
                <Pressable onPress={() => navigation.navigate("HotelDetails")}>
                    <BackArrowIcon />
                </Pressable>
                <Text className={`text-center flex-1 p-2 font-header text-header mr-6 ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Laundry Services</Text>
            </View>

            <View className="flex-row items-center justify-between ml-6 mt-4">
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    className="mx-4 mb-4"
                />
            </View>
            <View className="pl-8 pr-4">
                <SingleProduct
                    items={filteredItems}
                    incrementQuantity={AddItem}
                    decrementQuantity={RemoveItem}
                />

            </View>
            {loading && <CircularLoader />}
            {cart?.length > 0 && (
                <View className="absolute bottom-4 left-4 right-4 bg-[#06A77D] rounded-xl p-4 flex-row justify-between items-center shadow-lg">
                    <Text className="text-white text-base font-medium">
                        {`${cart?.length} ${cart?.length > 1 ? "items in cart" : "item added to the cart"}`}
                    </Text>
                    <Pressable onPress={handleView}>
                        <Text className="text-white text-base font-bold">{"View Cart >"}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default LaundrayChart;
