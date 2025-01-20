import { View, Text, Pressable, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";
import SortedByModal from "../modals/SortedByModal";
import { useDispatch, useSelector } from "react-redux";
import { AddFandBItemsToCart, GetFandBCart, GetFandBItems } from "../services/servicesService";
import CircularLoader from "./CircularLoader";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "../utils/utils";
import { Calender } from "../assets/images/Icons/TravalIons";
import { setFAndBCartId, setRoomServiceCart } from "../redux/servicesRedux";
import ViewCart from "./ViewCart";
import { BackArrowIcon } from "../assets/images/Icons/ArrowIcon";

const Buffet = ({ type }) => {
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const { roomServiceCart, fAndBCartId } = useSelector(state => state.services);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [cartId, setCartId] = useState(fAndBCartId || "");

    useEffect(() => {
        fetchItems();
    }, [type]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await GetFandBItems(selectedProperty.XipperID, type);
            const subCategories = response.data?.subCategories || [];
            const cart = cartId ? await getCart() : null;
            const cartItems = cart?.cartResponse || [];

            const updatedItems = subCategories.map(item => {
                const cartItem = cartItems.find(cartItem => cartItem.itemName === item.name);
                return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
            });
            setItems(updatedItems);
        } catch (error) {
            console.error("Error fetching F&B items:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCart = async () => {
        try {
            const res = await GetFandBCart(cartId);
            dispatch(setRoomServiceCart(res.data.data));
            return res.data.data;
        } catch (e) {
            console.error("Error fetching cart:", e);
        }
    };

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


            if (res.data.message === "Cart not found" || res.data.cart === "Cart Empty") {
                setCartId("");
                setItems(items.map(item => ({ ...item, quantity: 0 })));
                dispatch(setRoomServiceCart({}));
            } else {
                const updatedItems = items.map(item => {
                    const cartItem = res.data.data.cart.cartOrderItems.find(cartItem => cartItem.itemId === item.itemId);
                    return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
                });
                setItems(updatedItems);
                setCartId(res.data.data.cart.cartId);
                dispatch(setRoomServiceCart(res.data.data.cart));
                dispatch(setFAndBCartId(res.data.data.cart.cartId));
                console.log(res.data.data.cart);
            }

            return res;
        } catch (e) {
            console.log(e);
        }
    };

    const incrementQuantity = async (index, item) => {
        setLoading(true);
        await handleCart(item, "add");
        setLoading(false);
    };

    const decrementQuantity = async (index, item) => {
        setLoading(true);
        await handleCart(item, "remove");
        setLoading(false);
    };

    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            const formattedDate = formatDate(date);
            setSelectedDate(formattedDate);
            setItems(prevItems => prevItems.map(item => ({ ...item, date: formattedDate })));
        }
        setShowDatePicker(false);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleNext = () => {
        if (!selectedDate && type === "Buffet") {
            return;
        } else {
            setIsModal(true);
        }
    }

    return (
        <View>
            {loading && <CircularLoader />}

            {isModal ? (
                <View className="h-[600px]">
                    <View className="flex-row items-center -mt-12 mb-10 justify-between">
                        <Pressable onPress={() => setIsModal(false)}>
                            <BackArrowIcon />
                        </Pressable>
                    </View>
                    <ViewCart />
                </View>
            ) : (
                <>
                    <SingleProduct
                        items={items}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                    />

                    {type === "Buffet" && (
                        <Pressable onPress={toggleDatePicker} className="p-2 border border-gray-300 flex-row space-x-2 w-[50%] rounded-md mt-5">
                            <Calender color={"#ccc"} />
                            <Text className="font-pmedium text-base text-black">
                                {selectedDate || "Select a date"}
                            </Text>
                        </Pressable>
                    )}
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date(selectedDate || Date.now())}
                            mode="date"
                            minimumDate={new Date()}
                            display={Platform.OS === 'ios' ? 'inline' : ''}
                            onChange={(e, date) => handleDateChange(e, date)}
                        />
                    )}

                    <Pressable
                        className={`px-3 py-2 rounded-md my-10 mx-auto ${selectedProfile.type === "user" ? "bg-user" : "bg-company"}`}
                        onPress={handleNext}
                    >
                        <Text className="text-white text-center mx-16">Next</Text>
                    </Pressable>
                </>
            )}
            {/* <SortedByModal
                heading={"Payment"}
                isModalVisible={isModal}
                toggleModal={() => setIsModal(!isModal)}
                content={<View className="h-[600px]"><ViewCart /></View>}
            /> */}
        </View>
    );
};

export default Buffet;
