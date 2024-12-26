import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import SingleProduct from "../../components/SingleProduct";
import { useSelector } from "react-redux";

const Towel = () => {
    const { selectedProfile } = useSelector((state) => state.account);
    const [items, setItems] = useState([
        { name: "Hand Towel", quantity: 0 },
        { name: "Bath Towel", quantity: 0 },
    ]);
    const incrementQuantity = (index) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity += 1;
            return updatedItems;
        });
    };

    const decrementQuantity = (index) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            if (updatedItems[index].quantity > 0) {
                updatedItems[index].quantity -= 1;
            }
            return updatedItems;
        });
    };
    return (
        <View>
            <SingleProduct
                items={items}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
            />
            <Pressable className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile.type === 'user'? 'bg-user' :'bg-company'}`}>
                <Text className="text-white text-center   mx-16">Request</Text>
            </Pressable>
        </View>
    );
};

export default Towel;