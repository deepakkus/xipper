import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import CheckOutPopup from "./CheckOutPopup"; 
import BillComponent from './BillComponent';
import Total from "./Total";
import ConfirmingCheckOut from "./ConfirmingCheckOut"; 
import RoomNumber from "./RoomNumber";
import { GetBill } from "../../services/sellerService";

const BillSeller = () => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false); 
    const [isCodeModalVisible, setCodeModalVisible] = useState(false); 
    const [isConfirmingCheckOutVisible, setConfirmingCheckOutVisible] = useState(false); 
    const [isCollectDisabled, setCollectDisabled] = useState(false); 
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('Room Number'); 
    const [collectButtonText, setCollectButtonText] = useState("Collect");

    const fetchbill = async () => {
        try {
            const response = await GetBill();
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchbill();
    }, []);

    const handleCheckOut = () => {
        if (isCollectDisabled) {

            setConfirmingCheckOutVisible(true); 
            setCollectButtonText("Paid");
        } else {
            setModalVisible(true); 
        }
    };
    const handleCollect = () => {
        setCollectDisabled(true); 
        setCollectButtonText("Paid"); 
        setCodeModalVisible(true); 
    };


    const handleCloseModal = () => {
        setModalVisible(false); 
    };

    const handleCloseCodeModal = () => {
        setCodeModalVisible(false); 
    };

    const handleCloseConfirmingCheckOut = () => {
        setConfirmingCheckOutVisible(false); 
    };

    return (
        <>
            <StatusBar hidden={false} />
                <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
                    <BillComponent title={"Food"} />
                    <BillComponent />
                </View>
                <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
                    <BillComponent title={"Services"} />
                </View>
                <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
                    <Total />
                </View>
                <View className="flex-row justify-between mx-5 my-5">
                    <Pressable
                        className="flex-1 mx-2 py-3 bg-orange-500 rounded-lg"
                        onPress={handleCheckOut}>
                        <Text className="text-center text-white font-semibold text-lg">Check-Out</Text>
                    </Pressable>

                    <Pressable
                        className={`flex-1 mx-2 py-3 ${isCollectDisabled ? 'bg-[#FE830C82]' : 'bg-[#FE830C]'} rounded-lg`}
                        disabled={isCollectDisabled} 
                        onPress={handleCollect}>
                        <Text className="text-center text-white font-semibold text-lg">{collectButtonText}</Text>
                    </Pressable>

                </View>

           
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}>
                <View className="flex-1 justify-center items-center  bg-opacity-80">
                    <View className="w-11/12 p-8 rounded-lg bg-white justify-center items-center">
                        <CheckOutPopup onClose={handleCloseModal} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isCodeModalVisible}
                onRequestClose={handleCloseCodeModal}>
                <View className="flex-1 justify-center items-center  bg-opacity-80">
                    <View className="w-11/12 p-8 rounded-lg bg-white justify-center items-center">
                        <RoomNumber
                            selectedRoomNumber={selectedRoomNumber}
                            setSelectedRoomNumber={setSelectedRoomNumber}
                            onClose={handleCloseCodeModal}
                        />
                    </View>
                </View>
            </Modal>


           
            <Modal
                animationType="slide"
                transparent={true}
                visible={isConfirmingCheckOutVisible}
                onRequestClose={handleCloseConfirmingCheckOut}>
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50"
                >
                    <View className="bg-white p-5 rounded-lg items-center justify-center w-11/12"
                    >
                        <ConfirmingCheckOut onClose={handleCloseConfirmingCheckOut} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default BillSeller;
