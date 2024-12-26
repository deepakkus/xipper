import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, TextInput } from "react-native";
import RoomComponent from "./RoomComponent";
import { Picker } from "@react-native-picker/picker";
import { Calender, Door, Guest } from "../assets/images/Icons/TravalIons";
import DateTimePicker from "../modals/DateTimePickerModal";
import { useNavigation } from "@react-navigation/native";
import { getTextClassInstance } from '../utils/TextClass';


const AmenitiesScreen = ({ hotel }) => {
    const textClass = getTextClassInstance();
    const [selectedTab, setSelectedTab] = useState("Amenities");
    const [selectedButtons, setSelectedButtons] = useState(new Set());
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState("");
    const nav = useNavigation();
    const [isClicked, setIsClicked] = useState(false);

    const handlePress = () => {
        setIsClicked(true);
    };
    const data1 = {
        roomTypes: ["Standard Rooms", "Executive Rooms", "Suite"],
    };
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        totalGuests: 1,
        rooms: 1,
        pnr: "",
        xipperId: "",
        requestId: "",
        aadhaarOtpRefId: "",
        hotelXipperId: ""
    });
    const handleChange = (text, field) => {
        const tempData = { ...formData, [field]: text };
        setFormData(tempData);
    };
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleDateChange = (event, selectedDate, type) => {
        if (event.type === 'set') {
            const formattedDate = formatDate(selectedDate);
            handleChange(formattedDate, type);
        }
        setShowDatePicker("");
    };
    const tabs = [
        // "Check Availability",
        textClass.getTextString('TXT20'),
        textClass.getTextString('TXT21'),
        textClass.getTextString('TXT22'),
        textClass.getTextString('TXT23'),
        textClass.getTextString('TXT24'),
    ];
    const buttons = Array(24).fill("Selected");
    const randomText = {
        "Check Availability": null,
        Highlights: "Explore the highlights of the property.",
        Amenities: null,
        "Property Rules": "Please adhere to the property rules.",
        "Cancellation Policy": "View the cancellation policy here.",
        Reviews: "See what others are saying!",
    };
    const toggleSelection = (index) => {
        setSelectedButtons((prev) => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

    return (
        <ScrollView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row my-1"
            >
                <View className="flex-row flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <Pressable
                            key={tab}
                            onPress={() => setSelectedTab(tab)}
                            className={`px-2 py-2 rounded-lg border ${selectedTab === tab ? "bg-user" : "bg-white"} ${selectedTab === tab ? "border-transparent" : "border-gray-300"}`}
                        >
                            <Text className={selectedTab === tab ? "text-white" : "text-gray-700"}>
                                {tab}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            {selectedTab === "Check Availability" ? (
                <>
                    {/* {isClicked ? (
                        <View className="p-4 bg-[#06A77D1A] rounded-3xl">
                            <View className="flex-row justify-between gap-2 mb-4">
                                {data1.roomTypes.map((roomType) => (
                                    <Pressable
                                        key={roomType}
                                        onPress={() => setSelectedRoomType(roomType)}
                                        className={`border-gray-400 rounded-xl border-2 py-1 px-4 h-12 justify-center items-center ${selectedRoomType === roomType ? "bg-user" : "bg-gray-200"
                                            }`}
                                    >
                                        <Text
                                            className={`font-semibold text-[12px] text-center ${selectedRoomType === roomType ? "text-white" : "text-black"
                                                }`}
                                        >
                                            {roomType}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                            {selectedRoomType === "Standard Rooms" && (
                                <RoomComponent data={data1.roomTypes[0]} mainData={data} />
                            )}
                            {selectedRoomType === "Executive Rooms" && (
                                <RoomComponent data={data1.roomTypes[1]} mainData={data} />
                            )}
                            {selectedRoomType === "Suite" && (
                                <RoomComponent data={data1.roomTypes[2]} mainData={data} />
                            )}
                        </View>
                    ) : (
                        <View className="bg-[#06A77D1A] rounded-3xl mb-2 p-2 w-100">
                            <View className="w-full flex gap-2 flex-row justify-between mt-4">
                                <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                                    <Calender color={"#000000"} />
                                    <TextInput
                                        value={formData.checkIn ? formatDate(new Date(formData.checkIn)) : ''}
                                        placeholder="Check-in date"
                                        onFocus={() => setShowDatePicker("checkIn")}
                                        showSoftInputOnFocus={false}
                                        placeholderTextColor="#000000"
                                    />
                                    {showDatePicker === "checkIn" && (
                                        <DateTimePicker
                                            value={formData.checkIn ? new Date(formData.checkIn) : new Date()}
                                            mode="date"
                                            minimumDate={new Date()}
                                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                            onChange={(e, date) => handleDateChange(e, date, "checkIn")}
                                        />
                                    )}
                                </View>
                                <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                                    <Calender color={"#000000"} />
                                    <TextInput
                                        value={formData.checkOut ? formatDate(new Date(formData.checkOut)) : ''}
                                        placeholder="Check-out date"
                                        onFocus={() => setShowDatePicker("checkOut")}
                                        showSoftInputOnFocus={false}
                                        placeholderTextColor="#000000"
                                    />
                                    {showDatePicker === "checkOut" && (
                                        <DateTimePicker
                                            value={formData.checkOut ? new Date(formData.checkOut) : new Date()}
                                            mode="date"
                                            minimumDate={new Date(formData.checkIn || new Date())}
                                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                            onChange={(e, date) => handleDateChange(e, date, "checkOut")}
                                        />
                                    )}
                                </View>
                            </View>

                            <View className="w-full flex gap-2 flex-row justify-between mt-2">
                                <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                                    <Guest color={"#000000"} />
                                    <Picker
                                        selectedValue={formData.totalGuests}
                                        onValueChange={(value) => handleChange(value, "totalGuests")}
                                        style={styles.picker}
                                    >
                                        {Array.from({ length: 10 }, (_, i) => i + 1).map((guest) => (
                                            <Picker.Item key={guest} label={`${guest}`} value={guest} />
                                        ))}
                                    </Picker>
                                </View>
                                <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                                    <Door color={"#000000"} />
                                    <Picker
                                        selectedValue={formData.rooms}
                                        onValueChange={(value) => handleChange(value, "rooms")}
                                        style={styles.picker}
                                    >
                                        {Array.from({ length: formData.totalGuests || 10 }, (_, i) => i + 1).map((room) => (
                                            <Picker.Item key={room} label={`${room}`} value={room} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>

                            <Pressable onPress={handlePress} className="bg-user py-2 px-6 rounded-md mx-auto my-2">
                                <Text className="text-center text-white font-semibold">Search</Text>
                            </Pressable>
                        </View>
                    )} */}
                </>
            ) : selectedTab === "Amenities" ? (
                <View
                    className="p-4 bg-[#ffffff] mt-2"
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        padding: 8,
                        marginBottom: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        borderColor: '#D1D1D1',
                        borderWidth: 1,
                    }}
                >
                    <View className="flex-wrap flex-row gap-2">
                        {hotel?.hotelAmenityCategories?.map((rule, index) => (
                            <Pressable key={index}>
                                <Text className="text-black text-[14px] mt-1 item-start">
                                    {`✓ ${rule || textClass.getTextString('TXT16')}`}

                                </Text>
                            </Pressable>
                        ))}
                    </View>


                </View>

            ) : selectedTab === 'Highlights' ? (
                <>
                    <View className="bg-[#ffffff] p-4 rounded-3xl shadow-lg mt-2" style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D1D1D1',
                        borderWidth: 1,
                        borderRadius: 12,
                        padding: 8,
                        marginBottom: 12,
                    }}>
                        <Text className="font-bold text-[18px] text-black mb-1 text-center">{textClass.getTextString('TXT15')}</Text>
                        <Text className="font-pmedium text-[14px] text-gray-400">
                            {hotel.hotelDesc}
                        </Text>
                    </View>


                </>
            ) : selectedTab === 'Property Rules' ? (
                <>
                <View className="p-2 bg-[#ffffff] rounded-lg shadow-md mt-2">
                <Text className=" text-[18px] text-black font-header">Property Restrictions</Text>
                    {hotel?.propertyRestrictions?.map((item, index) => (
                        <View key={index} className="flex-row items-start my-1">
                            <Text className="text-black text-md mr-2">•</Text>
                            <Text className="text-black text-md flex-1">{item}</Text>
                        </View>
                    ))}
                </View>

                 <View className="p-2 bg-[#ffffff] rounded-lg shadow-md">
                    <Text className="text-[18px] text-black font-header">Bed Policy</Text>
                    {hotel?.bedPolicy?.map((item, index) => (
                        <View key={index} className="flex-row items-start my-1">
                            <Text className="text-black text-md mr-2">•</Text>
                            <Text className="text-black text-md flex-1">{item}</Text>
                        </View>
                    ))}
                </View>

                <View className="p-2 bg-[#ffffff] rounded-lg shadow-md">
                <Text className="text-[18px] text-black font-header">Meal Policy</Text>
                    {hotel?.mealPolicy?.map((item, index) => (
                        <View key={index} className="flex-row items-start my-1">
                            <Text className="text-black text-md mr-2">•</Text>
                            <Text className="text-black text-md flex-1">{item}</Text>
                        </View>
                    ))}
                </View>

                <View className="p-2 bg-[#ffffff] rounded-lg shadow-md">
                <Text className="text-[18px] text-black font-header">Accessibility</Text>
                    {hotel?.accessibility?.map((item, index) => (
                        <View key={index} className="flex-row items-start my-1">
                            <Text className="text-black text-md mr-2">•</Text>
                            <Text className="text-black text-md flex-1">{item}</Text>
                        </View>
                    ))}
                </View>
                </>
            ) : selectedTab === 'Cancellation Policy' ? (
                <View className="p-2 bg-[#ffffff] rounded-lg shadow-lg">
                    {hotel.cancellationPolicy?.map((item, index) => (
                        <View key={index} className="flex-row items-start my-1">
                            <Text className="text-black text-md mr-2">•</Text>
                            {/* <Text className="text-black text-md flex-1">{item?.policy?.name}</Text> */}
                            <Text className="text-black text-md flex-1">{item}</Text>
                        </View>
                    ))}
                </View>

            ) : selectedTab === 'Reviews' ? (
                <View className="p-4">
                    <Text className="text-center text-gray-700 text-lg">
                        {randomText[selectedTab]}
                    </Text>
                </View>
            )
                : (
                    <View className="p-4">
                        <Text className="text-center text-gray-700 text-lg">
                            {randomText[selectedTab]}
                        </Text>
                    </View>
                )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: "100%"
    },
    picker: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    pickerItem: {
        padding: 0
    }
});

export default AmenitiesScreen;
