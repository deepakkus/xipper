import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useSelector } from "react-redux";
import { RequestHouseKeeping } from "../../services/userdataservice";

const RoomCleaning = ({data}) => {
    const { selectedProfile } = useSelector((state) => state.account);
    const [message, setMessage] = useState(""); 

    const requestHouseKeeping = async () => {
        try {
            const res = await RequestHouseKeeping(data);
            if (res.status === 201) {
                setMessage("Order placed"); 
            } else {
                setMessage("Failed to place order"); 
            }
        } catch (e) {
            console.error("Error requesting housekeeping:", e);
            setMessage("An error occurred"); 
        }
    };

    return (
        <View>
            <Pressable
                onPress={requestHouseKeeping}
                className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${
                    selectedProfile.type === "user" ? "bg-user" : "bg-company"
                }`}
            >
                <Text className="text-white text-center mx-16">Request</Text>
            </Pressable>
            
            {message ? (
                <Text className="text-center text-green-500 mt-4">{message}</Text>
            ) : null}
        </View>
    );
};

export default RoomCleaning;
