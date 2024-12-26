import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import {
  NonBusinessBellIcon,
} from "../assets/images/Icons/HomeIcon";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomeHeader = ({ handleRoomClick = () => { }, isBusiness, toggleBusiness, isButtonShow }) => {
  const nav = useNavigation();
  const { selectedProfile } = useSelector((state) => state.account);
  const { userData } = useSelector((state) => state.account);

  const truncateText = (text, maxLength = 30) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.substring(0, maxLength) + "...";
  };

  const handleSubmit = () => {
    nav.navigate("Notifications");
  };

  const getCurrentDate = () => {
    const date = new Date();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    return `${dayName}, ${dayNumber} ${monthName}`;
  };

  const handleClick = (data) => {
    const transformedData = {
      XipperID: data.roomAllocation.room.hotelId,
      roomNumber: data.roomAllocation.room.roomNumber,
      name: data.UserCheckIn.hotel.name,
      checkInId: data.UserCheckIn.hotelCheckInId,
      totalGuests: data.UserCheckIn.totalGuests,
      totalRooms: data.UserCheckIn.totalRooms,
      cXipperId: data.cXipperId,
      bookingId: data.bookingId,
    };
    handleRoomClick(transformedData);
  };

  return (
    <>
      <View
        className={`bg-${selectedProfile.type} gap-4 p-5 shadow-xl`}
        style={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          className={`flex-row justify-between ${["user", "company"].includes(selectedProfile.type) ? "items-center" : "items-start px-3"}`}
        >
          {(selectedProfile.type === 'user' || selectedProfile.type === 'company') ? (
            <SearchBar
              placeholder="Search Hotel"
              onSearch={(text) => console.log("Searching for:", text)}
              onFocus={() => nav.navigate("SearchHotels")}
              style={{ flex: 1 }}
            />
          ) : (
            <View>
              <Text className="text-white text-xl font-bold">{truncateText(userData?.user?.fullName)}</Text>
              <Text className="text-white text-lg">{getCurrentDate()}</Text>
            </View>
          )}

          <Pressable onPress={handleSubmit}>
            <View className="flex-row items-center ml-2 mt-1">
              <NonBusinessBellIcon size={100} />
            </View>
            <View
              className={`${!isBusiness ? "bg-tertiary" : "bg-primary"
                } w-2 h-2 rounded-lg absolute right-1 top-0`}
            ></View>
          </Pressable>
        </View>

        {/* Buttons */}
        {selectedProfile.type === 'user' && selectedProfile.userCheckInInfo.length > 0 && (
          <ScrollView className="max-h-[60px] gap-2" showsVerticalScrollIndicator={false}>
            {selectedProfile.userCheckInInfo.map((i, ind) => (
              <View className="flex flex-row justify-between items-center" key={ind}>
                <Pressable
                  className="bg-emerald-400 px-4 py-2 rounded-md shadow-md flex-1 mr-2"
                  onPress={() => handleClick(i)}
                >
                  <Text className="text-white text-sm">{i.UserCheckIn.hotel.name} - {i.roomAllocation.room.roomNumber}</Text>
                </Pressable>

                <Pressable
                  className="bg-emerald-400 px-4 py-2 rounded-md shadow-md flex-1 ml-2"
                  onPress={() => console.log('Button 2 pressed')}
                >
                  <Text className="text-white text-sm">Nearby Services</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default HomeHeader;
