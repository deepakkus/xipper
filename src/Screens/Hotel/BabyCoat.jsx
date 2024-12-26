import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SingleProduct from "../../components/SingleProduct";
import PriceBreakup from "../../components/PriceBreakup";

const BabyCoat = () => {
    const [number, setNumber] = useState(1);
    const [items, setItems] = useState([
        {
            name: "Small Coat",
            quantity: 0,
            price: 350,
        },
        {
            name: "Large Coat",
            quantity: 0,
            price: 350,
        },
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
            {number == 1 ? (
                <>
                    <SingleProduct
                        items={items}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                    />
                    <TouchableOpacity
                        className="bg-primary px-3 py-2 rounded-md mb-2 my-5 mx-auto"
                        onPress={() => setNumber(2)}
                    >
                        <Text className="text-white text-center   mx-16">Next</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <PriceBreakup items={items} />
                </>
            )}
        </View>
    );
};

export default BabyCoat;