import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";
import SortedByModal from "../modals/SortedByModal";
import PriceBreakup from "./PriceBreakup";
import { useSelector } from "react-redux";
import { GetFandBItems, GetTravelDeskServices } from "../services/servicesService";
import CircularLoader from "./CircularLoader";

const WaterBottle = ({ service }) => {
    const [isModal, setIsModel] = useState(false);
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await GetTravelDeskServices(selectedProperty.XipperID, service);
            setItems(response.data.map((i) => ({ ...i, quantity: 0 })));
            console.log(response)
        } catch (error) {
            console.error("Error fetching Travel items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);


    const updateQuantity = (index, amount) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity + amount);
            return updatedItems;
        });
    };

    const incrementQuantity = (index) => updateQuantity(index, 1);
    const decrementQuantity = (index) => updateQuantity(index, -1);

    return (
        <View className="">
            <SingleProduct
                items={items}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
            />

            <TouchableOpacity
                className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile.type === "user" ? "bg-user" : "bg-company"
                    }`}
                onPress={() => setIsModel(!isModal)}
            >
                <Text className="text-white text-center mx-16">Request</Text>
            </TouchableOpacity>
            {loading && <CircularLoader />}
        </View>
    );
};

export default WaterBottle;
