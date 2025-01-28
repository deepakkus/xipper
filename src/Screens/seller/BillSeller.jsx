import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import CheckOutPopup from "./CheckOutPopup"; 
import BillComponent from './BillComponent';
import Total from "./Total";
import ConfirmingCheckOut from "./ConfirmingCheckOut"; 
import RoomNumber from "./RoomNumber";
import { GetBill, GetCustomersList } from "../../services/sellerService";
import { useDispatch, useSelector } from 'react-redux';

const BillSeller = () => {
    const navigation = useNavigation();
    const { selectedProfile } = useSelector((state) => state.account);

    const [isModalVisible, setModalVisible] = useState(false); 
    const [isCodeModalVisible, setCodeModalVisible] = useState(false); 
    const [isConfirmingCheckOutVisible, setConfirmingCheckOutVisible] = useState(false); 
    const [isCollectDisabled, setCollectDisabled] = useState(false); 
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('Room Number'); 
    const [collectButtonText, setCollectButtonText] = useState("Collect");
    const [customerDetails, setCustomerDetails] = useState({});
    const [billDetailsFood, setBillDetailsFood] = useState({});
    const [billDetailsBeverage, setBillDetailsBeverage] = useState({});
    const [billDetailsServices, setBillDetailsServices] = useState({});

    const [billTotalFood, setBillTotalFood] = useState('0');
    const [billTotalBeverage, setBillTotalBeverage] = useState('0');
    const [billTotalServices, setBillTotalServices] = useState('0');

    const [finalBillData, setFinalBillData] = useState(0);
    

    useEffect(() => {
        getCustomerListData();
      }, [selectedProfile]);

      const events = [
        { date: "2025-01-23T10:26:43.135Z", description: "Meeting", startTime: "11:00", endTime: "12:00" },
        { date: "2025-01-23T10:26:43.135Z", description: "Coference", startTime: "18:00", endTime: "19:00" },
        { date: "2025-01-23T10:26:43.135Z", description: "Team Coference", startTime: "18:00", endTime: "19:00" },
        { date: "2025-01-28T10:26:43.135Z", description: "Happy hour cocktail" },
        { date: "2025-01-28T10:26:43.135Z", description: "MEditation Class" },
        { date: "2025-01-25T10:26:43.135Z", description: "MEditation Class" },
    ];
    
    const groupBy = (arr, criteria) =>
        arr.reduce((obj, item) => {
            let key = typeof criteria === "function" ? criteria(item) : item[criteria];
            if (!obj.hasOwnProperty(key)) obj[key] = [];
            obj[key].push(item);
            return obj;
        }, {});
        //let newDate = date.substring(0, 10);
    const grouped = groupBy(events, "date");
        //console.log('llll'+ JSON.stringify(grouped))

    const fetchbill = async () => {
        try {
            const response = await GetBill(selectedProfile?.XipperID, customerDetails[0]?.bookingId, customerDetails[0]?.roomNumber);
            console.log(JSON.stringify(response?.data?.data?.bill?.billBreakdown))
            //setBillDetailsFood(response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Food?.itemWiseTaxation);
            setFinalBillData(response?.data?.data?.bill?.finalBill);
            // const grouping = _.groupBy(response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Food?.itemWiseTaxation, 
            //     element => element.orderDate.substring(0, 10))
            // const sections = _.map(grouping, (items, date) => ({
            // date: date,
            // items: items
            // }));

            const groupedFood = groupBy(response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Food?.itemWiseTaxation, "orderDate");
            const groupedBeverage = groupBy(response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Beverage?.itemWiseTaxation, "orderDate");
            const groupedServices = groupBy(response?.data?.data?.bill?.billBreakdown?.Services?.itemWiseTaxation, "orderDate");

            const groupedFoodTotal = response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Food?.totalPayablePriceAfterTax;
            const groupedBeverageTotal = response?.data?.data?.bill?.billBreakdown?.["Food and Beverage"]?.Beverage?.totalPayablePriceAfterTax;
            const groupedServicesTotal = response?.data?.data?.bill?.billBreakdown?.Services?.totalPayablePriceAfterTax;
            const finalBillAmount = response?.data?.data?.bill?.finalBill;
           
            //console.log('lll99l'+ JSON.stringify(grouped))
            setBillDetailsFood(groupedFood)
            setBillDetailsBeverage(groupedBeverage)
            setBillDetailsServices(groupedServices)

            setBillTotalFood(groupedFoodTotal)
            setBillTotalBeverage(groupedBeverageTotal)
            setBillTotalServices(groupedServicesTotal)
            setFinalBillData(finalBillAmount);

            //console.log('sections==='+sections);
        } catch (err) {
            console.log(err);
        }
    };
    
      const getCustomerListData = async () => {
        try {
          const response = await GetCustomersList(selectedProfile?.XipperID);
          if (response && response.status === 200) {
            setCustomerDetails(response.data.data.bookingDetails);
          }
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        fetchbill();
    }, [customerDetails, selectedProfile]);

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
                    {/* {Object.entries(billDetails).map(([key,val])=>
                        (
                            <BillComponent title={"Food"} billDetails={val} key={key}/>
                        )
                    )}             */}
                    <BillComponent title={"Food"} billDetails={billDetailsFood}/>
                </View>
                <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
                    <BillComponent title={"Services"} billDetails={billDetailsServices}/>
                </View>
                <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
                    {/* <Total foodTotal={billTotalFood} beverageTotal={billTotalBeverage} servicesTotal={billTotalServices} finalBillAmountData={finalBillData}/> */}
                    <Total foodTotal={billTotalFood} beverageTotal={billTotalBeverage} servicesTotal={billTotalServices} finalBillAmountData={finalBillData} />
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
