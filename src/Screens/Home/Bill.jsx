// import { View, Text, Pressable, ScrollView,StatusBar } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
// import { useNavigation } from '@react-navigation/native';
// import BillComponent from "../../components/BillComponent";
// import Total from "../../components/Total";

// const Bill = () => {
//   const nav = useNavigation();
//   return (
//     <SafeAreaView className="bg-greyFour flex-1">
//       <StatusBar hidden={false} />
//       <ScrollView>
//         <Pressable onPress={() => nav.pop()} className="mt-5 px-5 ">
//           <BackArrowIcon />
//         </Pressable>
//         <Text className=" font-psemibold text-lg ml-2 mr-2 text-black text-center">
//           Your Bill
//         </Text>

//         <View className="mt-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
//           <BillComponent title={"Food"} />
//           <BillComponent />
//         </View>
//         <View className="mt-4 mb-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
//           <BillComponent title={"Services"} />
//         </View>
//         <View className="mt-4 mb-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
//           <Total />
//         </View>
//         <Pressable className=" bg-primary mx-20 my-5 p-1 rounded-lg">
//           <Text className=" font-psemibold text-base  text-white text-center">
//             Pay
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Bill;

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import BillComponent from "../../components/BillComponent";
import Orders from '../seller/Order';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ViewBill } from '../../services/hotelService';


export default function Bill({ orderData, hotelData, request }) {
  const nav = useNavigation();
  const { selectedProfile, selectedProperty } = useSelector(state => state.account);
  const [showBillComponent, setShowBillComponent] = useState(true);
  const [showBeveragesComponent, setShowBeveragesComponent] = useState(false);
  const [showOrdersComponent, setShowOrdersComponent] = useState(false);
  const [showServicesComponent, setShowServicesComponent] = useState(false);
  const [items, setItems] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await ViewBill(selectedProperty.XipperID, selectedProperty.checkInId);
      console.log("Bill fetched successfully:", response.data);
      const fetchedItems = response?.data?.bill
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFoodTotalClick = () => {
    setShowBillComponent((prev) => !prev);
  };

  const handleBeveragesTotalClick = () => {
    setShowBeveragesComponent((prev) => !prev);
  };

  const handleServicesTotalClick = () => {
    setShowServicesComponent((prev) => !prev);
  };

  const handleOrdersTotalClick = () => {
    setShowOrdersComponent((prev) => !prev);
  };

  const handleBackButtonClick = () => {
    nav.goBack();
  };

  return (
    <ScrollView className={Platform.OS === 'ios' ? "flex-1 bg-gray-100 p-3 mt-10" : "flex-1 bg-gray-100 p-3"} showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center mb-2">
        <Pressable onPress={handleBackButtonClick}>
          <BackArrowIcon />
        </Pressable>
        <Text className="font-header ml-24 text-header text-black items-center">Your Bill</Text>
      </View>

      <View className="bg-white p-4 rounded-lg">
        {items && Object.entries(items?.billBreakdown).map(([key, value]) => {
          return (
            <View className={`mb-4`} key={key}>
              <Text className={`text-${selectedProfile.type} text-lg font-semibold`}>{key}</Text>
              {key !== "Services" ? (
                <BillComponent title={key} request={value} />
              ) : (
                <BillComponent title={key} request={value} type="Services" />
              )}
            </View>
          );
        })}

        {/* <View className="w-full border border-gray-100 my-3 rounded-lg"></View> */}
        <View className="flex-row justify-between items-center p-2">
          <Text className={`font-medium text-lg text-black`}>
            {`Total Bill`}
          </Text>
          <Text className={`font-medium text-lg text-black`}>
            Rs. {items?.finalBill}
          </Text>
        </View>
        {/* <View className="w-full border border-gray-100 mt-3 rounded-lg"></View> */}
      </View>


      {/* <Pressable
        onPress={handleOrdersTotalClick}
        className="bg-white rounded-lg p-4 mb-4 flex-row justify-between"
      >
        <Text className="text-base font-semibold text-black">Service details</Text>
      </Pressable>

      {showOrdersComponent && (
        <View className="mb-4">
          <Orders data={orderData} />
        </View>
      )}

      <Pressable
        onPress={handleFoodTotalClick}
        className="bg-white rounded-lg p-4 mb-4 flex-row justify-between"
      >
        <Text className="text-base font-semibold text-black">Food Total</Text>
        <Text className="text-base font-semibold text-black">Rs. 2005</Text>
      </Pressable>

      {showBillComponent && (
        <View className="mb-4">
          <BillComponent title={"Food"} request={items} />
        </View>
      )}

      <Pressable
        onPress={handleBeveragesTotalClick}
        className="bg-white rounded-lg p-4 mb-4 flex-row justify-between"
      >
        <Text className="text-base font-semibold text-black">Beverages Total</Text>
        <Text className="text-base font-semibold text-black">Rs. 2005</Text>
      </Pressable>

      {showBeveragesComponent && (
        <View className="mb-4">
          <BillComponent title={"Beverage"} request={items}/>
        </View>
      )}

      <Pressable
        onPress={handleServicesTotalClick}
        className="bg-white rounded-lg p-4 mb-4 flex-row justify-between"
      >
        <Text className="text-base font-semibold text-black">Services Total</Text>
        <Text className="text-base font-semibold text-black">Rs. 2005</Text>
      </Pressable>

      {showServicesComponent && (
        <View className="mb-4">
          <BillComponent title={"Services"} request={items}/>
        </View>
      )} */}

      <View className="items-center p-10">
        <Pressable
          className={`rounded-md py-3 items-center w-20 ${selectedProfile.type === "user" ? "bg-user" : "bg-company"
            }`}
        >
          <Text className="text-white text-lg font-semibold">Pay</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

