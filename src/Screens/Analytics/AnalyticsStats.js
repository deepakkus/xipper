import { View, Text, FlatList, Pressable, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BackArrowIcon, DropDownArrow } from "../../assets/images/Icons/ArrowIcon";
import {
  FlightBoldIcon,
  FoodBoldIcon,
  HealthBoldIcon,
  ShoppingBoldIcon,
} from "../../assets/images/Icons/EntertainmentIcon";
import { DownArrowIcon } from "../../assets/images/Icons/TabBarIcon";
import {
  CashIcon,
  CreditCardIcon,
  Food,
  OnlineBankingIcon,
  ShoppingIcon,
  UpiIcon,
} from "../../assets/images/Icons/ProfileIcons";
import { useSelector } from "react-redux";

const BarComponent = ({ height, label }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const selectedProfile = useSelector((state) => state.account.selectedProfile);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [height]);

  return (
    <View className="flex items-center mr-[7.5px]">
      <View className="w-[15px] h-[200px] relative rounded-full overflow-hidden">
        <Animated.View
          className={`absolute bottom-0 w-[15px] rounded-full 
    ${selectedProfile.type === "user" ? "bg-user" : "bg-company"}`}
          style={{
            height: animatedHeight,
          }}
        />

      </View>
      <Text className="text-gray-300">{label}</Text>
    </View>
  );
};
const dataMapping = {
  "This Month": [
    {
      id: "1",
      date: "26",
      day: "Wednesday",
      monthYear: "July 2024",
      category: "Shopping",
      items: "Myntra, Zara, Puma",
      amount: "Rs. 1,555.500",
      iconColor: "#6D38C3",
      IconComponent: ShoppingIcon,
    },
    {
      id: "2",
      date: "15",
      day: "Monday",
      monthYear: "July 2024",
      category: "Food",
      items: "Zomato, Swiggy",
      amount: "Rs. 800.00",
      iconColor: "#EDB675",
      IconComponent: Food,
    },
  ],
  "Last Month": [
    {
      id: "1",
      date: "5",
      day: "Friday",
      monthYear: "June 2024",
      category: "Shopping",
      items: "Amazon, H&M",
      amount: "Rs. 2,000.00",
      iconColor: "#6D38C3",
      IconComponent: ShoppingIcon,
    },
    // Add more entries here
  ],
  // Add more month entries as needed
};
const barData = [
  { height: 124, label: "Jan" },
  { height: 156, label: "" },
  { height: 90, label: "Mar" },
  { height: 133, label: "" },
  { height: 105, label: "May" },
  { height: 156, label: "" },
  { height: 128, label: "Jul" },
  { height: 97, label: "" },
  { height: 141, label: "Sept" },
  { height: 173, label: "" },
  { height: 160, label: "Nov" },
  { height: 119, label: "" },
];

export default function AnalyticsStats() {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("Food");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeMonth, setActiveMonth] = useState("This Month");
  const selectedProfile = useSelector((state) => state.account.selectedProfile);


  const months = ["Jul", "Aug", "Sept", "Last Month", "This Month"];
  const toggleDropdown = (button) => {
    if (activeButton === button) {
      setShowDropdown(!showDropdown);
    } else {
      setActiveButton(button);
      setShowDropdown(true);
    }
  };

  const handleOutsideClick = () => {
    setShowDropdown(false);
  };
  const renderData = () => {
    return dataMapping[activeMonth]?.map((item) => (
      <View
        key={item.id}
        className="bg-white rounded-xl pt-3 pl-4 pr-3 mt-5 pb-5"
      >
        <View className="flex-row space-x-2 items-center">
          <Text
            className="font-semibold text-base pt-2 text-black"
            style={{ fontSize: 27 }}
          >
            {item.date}
          </Text>
          <View>
            <Text className="text-gray-400" style={{ fontSize: 12 }}>
              {item.day}
            </Text>
            <Text className="text-gray-400" style={{ fontSize: 12 }}>
              {item.monthYear}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-4">
          <Pressable
            onPress={() => navigation.navigate("Transactiondetails")}
            className="flex-row items-center space-x-4"
          >
            <View
              className="p-2.5 rounded-full"
              style={{ backgroundColor: item.iconColor }}
            >
              <item.IconComponent color={"white"} height={18} width={20} />
            </View>
            <View>
              <Text className="font-semibold text-black" style={{ fontSize: 15 }}>
                {item.category}
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>{item.items}</Text>
            </View>
          </Pressable>
          <Text
            className="font-semibold text-gray-400"
            style={{ fontSize: 15 }}
          >
            {item.amount}
          </Text>
        </View>
        <Text className="bg-gray-200 h-[1.4px] mt-4"></Text>
      </View>
    ));
  };
  return (
    <SafeAreaView
      className="bg-gray-100 flex justify-center px-5"
      onTouchStart={handleOutsideClick}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full justify-center items-center p-2">
              <Pressable
                onPress={() => navigation.goBack()}
                className="left-0 absolute"
              >
                <BackArrowIcon />
              </Pressable>
              <Text className="font-bold text-black font-header text-header text-center">Analytics</Text>
            </View>
            <View className="rounded-bl-xl rounded-br-xl">
              <View className="mt-3 bg-white pt-5 px-3 shadow-xl rounded-tl-xl rounded-tr-xl flex-row items-end">
                {barData.map((bar, index) => (
                  <BarComponent
                    key={index}
                    height={bar.height}
                    label={bar.label}
                  />
                ))}
              </View>
              <View className="flex-row justify-center space-x-3 pt-5 bg-white pb-7 rounded-bl-xl rounded-br-xl">
                <Pressable
                  className={`flex-row border-2 w-40 rounded-lg justify-between px-3 py-1  ${selectedProfile.type === "user"
                    ? (activeButton === "Food" ? "bg-user border-user" : "bg-white border-user")
                    : (activeButton === "Food" ? "bg-company border-company" : "bg-white border-company")
                    }`}
                  onPress={() => toggleDropdown("Food")}
                >
                  <View className="flex-row items-center space-x-2">
                    <FoodBoldIcon
                      color={activeButton === "Food" ? "white" : "gray"}
                      opacity={"1"}
                    />
                    <Text
                      className={`text-base ${activeButton === "Food" ? "text-white" : "text-gray-400"
                        }`}
                    >
                      Food
                    </Text>
                  </View>
                  <DownArrowIcon
                    color={activeButton === "Food" ? "white" : "gray"}
                    height={24}
                    width={20}
                  />
                </Pressable>

                <Pressable
                  className={`flex-row border-2 w-40 rounded-lg justify-between py-1 
                  ${selectedProfile.type === "user"
                      ? (activeButton === "Mode of Payment" ? "bg-user border-user" : "bg-white border-user")
                      : (activeButton === "Mode of Payment" ? "bg-company border-company" : "bg-white border-company")}
                `}

                  onPress={() => toggleDropdown("Mode of Payment")}
                >
                  <View className="flex-row pl-2">
                    <Text
                      className={`${activeButton === "Mode of Payment"
                        ? "text-white"
                        : "text-gray-400"
                        }`}
                      style={{ fontSize: 15 }}
                    >
                      Mode of Payment
                    </Text>
                  </View>
                  <View className="absolute right-0.5 items-center top-1">
                    <DownArrowIcon
                      color={
                        activeButton === "Mode of Payment" ? "white" : "gray"
                      }
                      height={24}
                      width={20}
                    />
                  </View>
                </Pressable>
              </View>
            </View>

            {showDropdown && activeButton === "Food" && (
              <View className="absolute top-[200px] left-2.5 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <Pressable className="py-2 px-4 ">
                  <View className="flex-row space-x-4">
                    <ShoppingBoldIcon />
                    <Text className="font-bold">Shopping</Text>
                  </View>
                </Pressable>
                <Pressable className="py-1 px-3 ">
                  <View className="flex-row space-x-3.5">
                    <FlightBoldIcon />
                    <Text className="font-bold">Travel</Text>
                  </View>
                </Pressable>
                <Pressable className="py-2 px-4">
                  <View className="flex-row space-x-5">
                    <FoodBoldIcon />
                    <Text className="font-bold">Food</Text>
                  </View>
                </Pressable>
                <Pressable className="py-2 px-3.5">
                  <View className="flex-row space-x-5">
                    <HealthBoldIcon />
                    <Text className="font-bold">Health</Text>
                  </View>
                </Pressable>
              </View>
            )}

            {showDropdown && activeButton === "Mode of Payment" && (
              <View className="absolute top-[200px] right-2.5 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <Pressable className="py-2 px-4 ">
                  <View className="flex-row space-x-3">
                    <CreditCardIcon height={20} width={20} />
                    <Text className="font-bold">Cash</Text>
                  </View>
                </Pressable>
                <Pressable className="py-1 px-4 ">
                  <View className="flex-row space-x-3">
                    <CashIcon height={20} width={20} />
                    <Text className="font-bold">Credit Card</Text>
                  </View>
                </Pressable>
                <Pressable className="py-2 px-4">
                  <View className="flex-row space-x-3">
                    <OnlineBankingIcon height={20} width={20} />
                    <Text className="font-bold">Online Banking</Text>
                  </View>
                </Pressable>
                <Pressable className="py-2 px-4">
                  <View className="flex-row space-x-3.5">
                    <UpiIcon height={20} width={20} />
                    <Text className="font-bold">UPI ID</Text>
                  </View>
                </Pressable>
              </View>
            )}

            <View className="flex-row justify-between mt-4">
              {months.map((month, index) => (
                <Pressable
                  key={index}
                  onPress={() => setActiveMonth(month)}
                >
                  <Text
                    className={`text-gray-400 ${activeMonth === month ? "border-b-2 pb-2" : ""
                      }`}
                    style={
                      activeMonth === month
                        ? { borderColor: selectedProfile.type === "user" ? "#06A77D" : "#6D38C3", borderBottomWidth: 2 }
                        : {}
                    }
                  >
                    {month}
                  </Text>

                </Pressable>
              ))}
            </View>
            <Text className="bg-gray-200 h-[1.4px]"></Text>

            {renderData()}
          </>
        }
      />
    </SafeAreaView>
  );
}