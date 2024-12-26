import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/SearchHeader";
import { AC, Bags, CorrectIcon, Seats } from "../assets/images/Icons/Hotel";
import { LocationIcon, RightArrow } from "../assets/images/Icons/ArrowIcon";
import RadioButton from "../components/RadioButton";

const CarDetails = () => {
  const [selectedRadio, setSelectedRadio] = useState("For Myself");
  const [showRadioOptions, setShowRadioOptions] = useState(false);

  const radioOptions = [
    { label: "For Myself", value: "For Myself" },
    { label: "For Someone", value: "For Someone" },
  ];

  const handleRadioSelect = (value) => {
    setSelectedRadio(value);
    setShowRadioOptions(false);
  };
  const [selectedRadio2, setSelectedRadio2] = useState("");
  const [showRadioOptions2, setShowRadioOptions2] = useState(false);

  const radioOptions2 = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const handleRadioSelect2 = (value) => {
    setSelectedRadio(value);
    setShowRadioOptions(false);
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchHeader />
        <View className="flex-row   px-3 bg-white py-5 mx-3 rounded-md my-5">
          <View className="flex-1 space-y-2 ">
            <Text className="font-pregular text-lg text-black mb-2 font-bold">
              Etios or Equivalent
            </Text>

            <View className="flex-row items-center space-x-2   ">
              <View className="p-1 border rounded-full items-center border-gray-400">
                <Seats />
              </View>
              <Text className="font-pregular text-md text-gray-400 ">
                4 Seater
              </Text>
            </View>
            <View className="flex-row items-center space-x-2   ">
              <View className="p-1 border rounded-full items-center border-gray-400">
                <Bags />
              </View>
              <Text className="font-pregular text-md text-gray-400 ">
                2 Bags
              </Text>
            </View>
            <View className="flex-row items-center space-x-2   ">
              <View className="p-1 border rounded-full items-center border-gray-400">
                <AC />
              </View>
              <Text className="font-pregular text-md text-gray-400 ">AC</Text>
            </View>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            width={"100%"}
            height={150}
            resizeMode="fill"
            className="flex-1 rounded-md"
          />
        </View>

        <View className="bg-white px-3 py-5 mx-3 rounded-md mt-5 ">
          <Text className="font-pregular text-lg text-black mb-5 font-bold">
            Inclusions/Exclusions
          </Text>
          <View className="flex-row items-center space-x-5 px-2 mb-2">
            <CorrectIcon />
            <Text className="font-pregular text-md text-black ">
              Parking Charges, State tax, Toll Charges & Driver Allowance
              included
            </Text>
          </View>
          <View className="flex-row items-center space-x-5 px-2 mb-2">
            <CorrectIcon />
            <Text className="font-pregular text-md text-black ">
              Only One Pickup and Drop
            </Text>
          </View>
          <View className="flex-row items-center space-x-5 px-2 mb-2">
            <CorrectIcon />
            <Text className="font-pregular text-md text-black ">
              27 Kms included. Rs 16.5/ km will be changed beyond that
            </Text>
          </View>
          <View className="flex-row items-center space-x-5 px-2 mb-2">
            <CorrectIcon />
            <Text className="font-pregular text-md text-black ">
              Free Cancellation till 1 hr before ride
            </Text>
          </View>

          <View className="flex-row justify-between mt-6 items-center px-2 mb-2">
            <Text className="font-pregular text-xl text-primary ">
              Policies
            </Text>
            <RightArrow />
          </View>
        </View>

        <View className="flex-row justify-between mt-6 items-center bg-white px-3 py-4  mx-3 rounded-md ">
          <Text className="font-pmedium text-md text-black font-bold">
            Cancellation Policy
          </Text>
          <RightArrow />
        </View>
        <View className="  mt-6  bg-white px-3 py-4  mx-3 rounded-md ">
          <Text className="font-pmedium text-md text-black mb-3 font-bold">
            Coupon Codes
          </Text>

          <View className="flex-row justify-between px-3 py-2 border rounded-md border-gray-300 items-center">
            <TextInput
              placeholder="Have a Coupon Code?"
              placeholderTextColor={"gray"}
              className="  font-pmedium text-md text-black flex-1
        "
            />
            <Text className="font-pmedium text-md text-gray-400 ">Apply</Text>
          </View>
        </View>
        <View className="  mt-6  bg-white px-3 py-4  mx-3 rounded-md ">
          <Text className="font-pmedium text-md text-black mb-3 font-bold">
            Traveller Details
          </Text>

          <View className="flex-row justify-between px-3 py-2 border rounded-md border-gray-300 items-center">
            <TextInput
              placeholder="Enter Pick up address"
              placeholderTextColor={"gray"}
              className="  font-pmedium text-md text-black flex-1
        "
            />
            <LocationIcon />
          </View>
          <View className="flex-row mt-7 justify-evenly space-x-2">
            {radioOptions.map((radioOption2) => (
              <RadioButton
                key={radioOption2.value}
                label={radioOption2.label}
                value={radioOption2.value}
                selected={selectedRadio === radioOption2.value}
                onPress={handleRadioSelect}
              />
            ))}
          </View>

          {selectedRadio === "For Someone" ? (
            <>
              <View className="mt-5 flex-row space-x-3 px-3">
                <View className="flex-1">
                  <Text className="font-pmedium text-md text-black mb-3">
                    Full Name
                  </Text>
                  <TextInput
                    placeholder="Travallers name"
                    placeholderTextColor={"gray"}
                    className="  font-pmedium text-md text-black border px-3 py-2 w-full border-gray-300 rounded-md flex-1
        "
                  />
                </View>
                <View>
                  <Text className="font-pmedium text-md text-black mb-3">
                    Phone Number
                  </Text>
                  <TextInput
                    placeholder="+91-"
                    placeholderTextColor={"gray"}
                    className="  font-pmedium text-md text-black border px-3 py-2 w-full border-gray-300 rounded-md flex-1
        "
                  />
                </View>
              </View>
              <View className="flex-1 mt-5 px-3">
                <Text className="font-pmedium text-md text-black mb-3">
                  Email Id
                </Text>
                <TextInput
                  placeholder="Travallers Email id"
                  placeholderTextColor={"gray"}
                  className="  font-pmedium text-md text-black border px-3 py-2 w-full border-gray-300 rounded-md flex-1
        "
                />
              </View>
              <Text className="font-pmedium text-md text-black  mt-5">
                Gender
              </Text>
              <View className="flex-row justify-evenly">
                {radioOptions2.map((radioOption2) => (
                  <RadioButton
                    key={radioOption2.value}
                    label={radioOption2.label}
                    value={radioOption2.value}
                    selected={selectedRadio2 === radioOption2.value}
                    onPress={handleRadioSelect2}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <View className="mt-5 px-3 py-2 border border-gray-300 rounded-full w-auto  ">
                <Text className="font-pmedium text-md text-gray-400 w-auto  ">
                  Use My Xipper ID
                </Text>
              </View>
            </>
          )}
        </View>

        <View className="  mt-6  bg-white px-3 py-4  mx-3 rounded-md ">
          <View className="flex-row  items-center justify-between mb-5 ">
            <Text className="font-pmedium text-mg text-black font-bold">
              Price Breakup
            </Text>
            <Text className="font-pregular text-md text-black "></Text>
          </View>
          <View className="flex-row  items-center justify-between mb-1 ">
            <Text className="font-pregular text-sm text-black font-bold">
              Actual Fare
            </Text>
            <Text className="font-pregular text-sm text-black font-bold">Rs. 350</Text>
          </View>
          <View className="flex-row  items-center justify-between mb-1 ">
            <Text className="font-pregular text-sm text-black font-bold">
              Delivery Fee
            </Text>
            <Text className="font-pregular text-sm text-black font-bold">Rs. 25</Text>
          </View>
          <View className="flex-row  items-center justify-between mb-1">
            <Text className="font-pregular text-sm text-black font-bold">Taxes</Text>
            <Text className="font-pregular text-sm text-black font-bold">Rs. 45.28</Text>
          </View>
          <View className="flex-row  items-center justify-between mb-1">
            <Text className="font-pregular text-sm text-black font-bold">
              Restaurant Charges
            </Text>
            <Text className="font-pregular text-sm text-black font-bold"> Rs. 25</Text>
          </View>
          <View className="flex-row  items-center justify-between mb-1 mt-6">
            <Text className="font-pmedium text-sm text-primary font-bold">
              Amount To Pay
            </Text>
            <Text className="font-pmedium text-sm text-primary font-bold">
              {" "}
              Rs. 950.65
            </Text>
          </View>
        </View>

        <View className="px-3 py-3 bg-primary my-5 mx-16  items-center rounded-md">
          <Text className="font-pmedium  text-center text-lg text-white  ">
            Book
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarDetails;
