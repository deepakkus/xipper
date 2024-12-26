import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FiveStarIcon, LocationIcon } from "../../assets/images/Icons/HomeIcon";
import RadioButton from "../../components/RadioButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../helper";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import GuestBooking from "../../components/GuestBooking";
import Total from "../../components/Total";
import { useSelector } from "react-redux";

const Review = () => {
    const route = useRoute();
    const { data, mainData } = route.params;
    const nav = useNavigation();
    const { selectedProfile } = useSelector((state) => state.account);

    // const bookHotel = async () => {
    //     const token = "your_token_here";
    //     const bookedForSelf = selectedRadio === "Myself";
    //     let guestData = null;

    //     if (!bookedForSelf) {
    //         guestData = guests.map((guest) => {
    //             if (guest.type === "xipperId") {
    //                 return;
    //             } else {
    //                 const { title, firstName, lastName, email, isdCode, mobileNumber } = guest.data;
    //                 return {
    //                     fullName: `${title} ${firstName} ${lastName}`.trim(),
    //                     email,
    //                     phone: `${isdCode}${mobileNumber}`,
    //                 };
    //             }
    //         });
    //     }

    //     const body = {
    //         roomType: data?.name,
    //         numRooms: 2,
    //         bookedForSelf,
    //         numGuests: guests.length,
    //         checkinDate: "2024-08-01T14:00:00.000Z",
    //         checkoutDate: "2024-08-05T12:00:00.000Z",
    //         guestDetails: guestData,
    //     };

    //     try {
    //         const response = await axios.post(`${BASE_URL}/hotel/booking/create/?hotelXId=${mainData.XipperID}`, body, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         console.log("Booking successful:", response.data);
    //         nav.navigate("Payment");
    //     } catch (error) {
    //         console.error("Booking failed:", error.message);
    //     }
    // };

    // const [selectedRadio, setSelectedRadio] = useState("Myself");
    // const [guests, setGuests] = useState([{ type: "xipperId", data: "" }, { type: "xipperId", data: "" }]);

    // const radioOptions = [
    //     { label: "Myself", value: "Myself" },
    //     { label: "Someone Else", value: "Someone Else" },
    // ];

    // const handleRadioSelect = (value) => {
    //     setSelectedRadio(value);
    // };

    // const addGuest = () => {
    //     setGuests([...guests, { type: "xipperId", data: "" }]);
    // };

    // const updateGuestType = (index, type) => {
    //     const updatedGuests = [...guests];
    //     updatedGuests[index].type = type;
    //     updatedGuests[index].data = type === "xipperId" ? "" : {
    //         title: "",
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         isdCode: "",
    //         mobileNumber: "",
    //     };
    //     setGuests(updatedGuests);
    // };

    // const updateGuestData = (index, field, value) => {
    //     const updatedGuests = [...guests];
    //     if (updatedGuests[index].type === "xipperId") {
    //         updatedGuests[index].data = value;
    //     } else {
    //         updatedGuests[index].data[field] = value;
    //     }
    //     setGuests(updatedGuests);
    // };

    return (
        <SafeAreaView className="bg-greyFour flex-1">
            <ScrollView>
                <View className={`pt-14 pb-6 px-5 flex flex-row items-center gap-4 mb-4 ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                    }`}>
                    <TouchableOpacity onPress={() => nav.pop()}>
                        <BackArrowIcon color="#fff" />
                    </TouchableOpacity>
                    <Text className="font-psemibold text-white text-lg">Review Booking</Text>
                </View>

                <View className="mt-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
                    <View className="flex-row items-center">
                        <Text className="font-bold text-lg text-black mr-2">Raddison Blue</Text>
                        <FiveStarIcon />
                    </View>
                    <View className="flex-row items-center mt-2">
                        <LocationIcon color={"#ccc"} />
                        <Text className="font-pmedium text-md text-gray-400 ml-1">vuydfcjh</Text>
                    </View>
                    <View className="w-full border border-gray-100 my-3 rounded-lg" />
                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="font-pmedium text-md text-gray-400">Check In</Text>
                        <Text className="font-pmedium text-md text-gray-400">Check Out</Text>
                    </View>
                    <View className="flex-row justify-between mt-1">
                        <View className="flex-1">
                            <Text className="font-bold text-md text-black">25 Jun,<Text className="font-bold text-sm text-gray-400"> 2024, Tues</Text></Text>
                        </View>
                        <Text className="font-pregular text-sm text-gray-400 text-center">3 Nights</Text>
                        <View className="flex-1">
                            <Text className="font-pregular text-md text-black text-right">28 Jun,<Text className="font-pregular text-sm text-gray-400"> 2024, Fri</Text></Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="font-pmedium text-md text-gray-400">10 AM</Text>
                        <Text className="font-pmedium text-md text-gray-400">10 PM</Text>
                    </View>
                    <View className="w-full border border-gray-100 my-3 rounded-lg mt-5" />
                    <Text className="font-pregular text-sm text-gray-400 mt-6">Guest and rooms</Text>
                    <Text className="font-bold text-sm text-black">2 Adults. 1 Room</Text>
                </View>

                {/* Property rules and information section */}
                <View className="mt-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
                    <Text className="font-bold text-lg mr-2 text-black">Property rules & Information</Text>
                    <View className="flex-row mb-3">
                        <Text className="font-pmedium text-md mr-2 text-gray-400">Check In : {mainData?.checkinTime}</Text>
                        <Text className="font-pmedium text-md mr-2 text-gray-400">Check Out : {mainData?.checkoutTime}</Text>
                    </View>
                    <View className="p-3 border border-gray-300 rounded-lg mb-5">
                        <Text className="font-bold text-md mr-2 text-black">Couple, Bachelor Rules</Text>
                        <Text className="font-pmedium text-sm mr-2 text-gray-400">Unmarried couples/guests with Local IDs are allowed</Text>
                    </View>
                    <View className="mb-5">
                        <Text className="font-pmedium text-sm mr-2 text-gray-400">{`\u2022`} Check-in/Check-out times compliance required.</Text>
                        <Text className="font-pmedium text-sm mr-2 text-gray-400">{`\u2022`} No-smoking policy with designated areas.</Text>
                        <Text className="font-pmedium text-sm mr-2 text-gray-400">{`\u2022`} Maintain noise levels; observe quiet hours.</Text>
                        <Text className="font-pmedium text-sm mr-2 text-gray-400">{`\u2022`} Guests liable for property damage costs.</Text>
                    </View>
                    <Text className={`font-pmedium text-[14px] mr-2 ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
                        }`}>View All rules</Text>
                </View>
                <View className="mt-4 mx-4 p-5 bg-white rounded-md border border-gray-200">
                    <Text className="font-bold text-md text-black mb-3">Coupon Codes</Text>
                    <View className="flex-row justify-between px-3 py-2 border rounded-md border-gray-300 items-center">
                        <TextInput
                            placeholder="Have a Coupon Code?"
                            placeholderTextColor={"black"}
                            className="font-bold text-md text-black flex-1"
                        />
                        <Text className="font-pmedium text-md text-gray-400">Apply</Text>
                    </View>
                </View>

                <View className="mt-4">
                    <GuestBooking />
                </View>
                <View className="mt-4">
                    <Total isVisible={true} />
                </View>

                <TouchableOpacity className={`mt-4 bg-blue-500 rounded-md p-2 mx-4 ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                    }`}>
                    <Text className="text-white text-center">Proceed to Payment</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Review;
