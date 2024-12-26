import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

const CircularLoader = ({ size = "large" }) => {
    const { selectedProfile } = useSelector(state => state.account);

    const circolor =
        selectedProfile?.type === 'user' ? '#06A77D' :
        selectedProfile?.type === 'company' ? '#6D38C3' :
        '#FE830C';

    return (
        <View
            className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-50 flex justify-center items-center z-50"
            style={{ opacity: 0.5 }}
        >
            <ActivityIndicator size={size} color={circolor} />
        </View>
    );
};

export default CircularLoader;
