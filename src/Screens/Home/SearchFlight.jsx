import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackArrowIcon,
  GreaterArrowIcon,
} from "../../assets/images/Icons/ArrowIcon";
import { Edit } from "@/assets/images/Icons/Hotel";
import FlightCard from "../../components/FlightCard";
import SortedByModal from "../../modals/SortedByModal";
import SearchHeader from "../../components/SearchHeader";
import { useNavigation } from "@react-navigation/native";

const SearchFlight = () => {
  const [filterModel, setFilterModel] = useState(false);
  const [sortedModel, setSortModel] = useState(false);

  const toggleModal = () => {
    setFilterModel(false);
    setSortModel(false);
  };
  const nav = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-secondary px-3">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchHeader />
        <View className=" p-5  flex-row justify-left space-x-3  ">
          <TouchableOpacity
            className="flex-row px-5 border  rounded-md  items-center bg-white   border-gray-200 py-2  "
            onPress={() => setSortModel(true)}
          >
            <Text className="px-2">Filter</Text>
            <GreaterArrowIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModel(true)}
            className="flex-row px-5 border  rounded-md  bg-white item-center border-gray-200 py-2  "
          >
            <Text className="px-2">Location</Text>
            <GreaterArrowIcon />
          </TouchableOpacity>
        </View>
        <View className="px-2 ">
          <FlightCard />
          <FlightCard />
          <FlightCard />
          <FlightCard />
          <FlightCard />
        </View>
      </ScrollView>
      <SortedByModal
        isModalVisible={sortedModel}
        toggleModal={toggleModal}
        heading="Sort By"
        content=<SortedContent toggleModal={toggleModal} />
      />
      <SortedByModal
        isModalVisible={filterModel}
        toggleModal={toggleModal}
        heading="Filters"
        content=<FilterContent toggleModal={toggleModal} />
      />
    </SafeAreaView>
  );
};
const FilterContent = ({ toggleModal }) => {
  const [items, setItems] = useState([
    { id: 1, label: "Cheapest", checked: false },
    { id: 2, label: "Shortest Duration", checked: false },
    { id: 3, label: "Early Departure", checked: false },
    { id: 4, label: "Late Departure", checked: false },
    { id: 5, label: "Early Arrival", checked: false },
    { id: 6, label: "Late Arrival", checked: false },
  ]);

  const toggleCheckbox = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  return (
    <>
      <Text className=" mt-2 font-pmedium items-center  text-md  text-black  pt-1">
        Stops From Bhubaneswar
      </Text>
      <View className="flex-row space-x-1 mt-3">
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          Non Stops
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          1 Stops
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          2+ Stops
        </Text>
      </View>
      <Text className=" mt-2 font-pmedium items-center  text-md  text-black  pt-1">
        Departure From Bhubaneswar
      </Text>
      <View className="flex-row space-x-5 mt-3">
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
      </View>
      <View className="flex-row space-x-5 mt-3">
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
      </View>
      <Text className=" mt-2  font-pmedium items-center  text-md  text-black  pt-1">
        Arrival at Varanasi
      </Text>
      <View className="flex-row space-x-5 mt-3">
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
      </View>
      <View className="flex-row space-x-5 mt-3">
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
        <Text className="px-4 border font-pmedium items-center  text-gray-400 border-gray-300 rounded-full pt-1">
          12 AM - 6AM{" "}
        </Text>
      </View>

      <Text className=" mt-2  font-pmedium items-center  text-md  text-black  pt-1">
        Airline
      </Text>
      <View className="mt-2 flex-row justify-between">
        <View className="flex-row items-center space-x-3">
          <Image source={require("../../assets/images/flight.png")} />
          <Text className="font-pregular text-md text-gray-400 ml-2">
            Indigo
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <Text className="font-pregular text-md text-gray-400 ml-2">
            {items[0].label}
          </Text>
          <TouchableOpacity
            className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
              items[0].checked ? "bg-primary" : "bg-white"
            }`}
            onPress={() => toggleCheckbox(items[0].id)}
          />
        </View>
      </View>
      <View className="mt-2 flex-row justify-between">
        <View className="flex-row items-center space-x-3">
          <Image source={require("../../assets/images/flight.png")} />
          <Text className="font-pregular text-md text-gray-400 ml-2">
            Indigo
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <Text className="font-pregular text-md text-gray-400 ml-2">
            {items[0].label}
          </Text>
          <TouchableOpacity
            className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
              items[0].checked ? "bg-primary" : "bg-white"
            }`}
            onPress={() => toggleCheckbox(items[0].id)}
          />
        </View>
      </View>
      <View className="mt-2 flex-row justify-between">
        <View className="flex-row items-center space-x-3">
          <Image source={require("../../assets/images/flight.png")} />
          <Text className="font-pregular text-md text-gray-400 ml-2">
            Indigo
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <Text className="font-pregular text-md text-gray-400 ml-2">
            {items[0].label}
          </Text>
          <TouchableOpacity
            className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
              items[0].checked ? "bg-primary" : "bg-white"
            }`}
            onPress={() => toggleCheckbox(items[0].id)}
          />
        </View>
      </View>
      <View className="mt-2 flex-row justify-between">
        <View className="flex-row items-center space-x-3">
          <Image source={require("../../assets/images/flight.png")} />
          <Text className="font-pregular text-md text-gray-400 ml-2">
            Indigo
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <Text className="font-pregular text-md text-gray-400 ml-2">
            {items[0].label}
          </Text>
          <TouchableOpacity
            className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
              items[0].checked ? "bg-primary" : "bg-white"
            }`}
            onPress={() => toggleCheckbox(items[0].id)}
          />
        </View>
      </View>

      <Text className=" mt-2  font-pmedium items-center  text-md  text-black  pt-1">
        Other Filters
      </Text>
      <View className="flex-row justify-between">
        <Text className="font-pregular text-md text-gray-400 ">
          {items[3].label}
        </Text>
        <TouchableOpacity
          className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
            items[0].checked ? "bg-primary" : "bg-white"
          }`}
          onPress={() => toggleCheckbox(items[3].id)}
        />
      </View>

      <TouchableOpacity
        onPress={toggleModal}
        className="bg-primary items-center p-3 mx-5 mt-3 rounded-lg"
      >
        <Text className="font-psemibold text-md text-white ml-2">Apply</Text>
      </TouchableOpacity>
    </>
  );
};

const SortedContent = ({ toggleModal }) => {
  const [items, setItems] = useState([
    { id: 1, label: "Cheapest", checked: false },
    { id: 2, label: "Shortest Duration", checked: false },
    { id: 3, label: "Early Departure", checked: false },
    { id: 4, label: "Late Departure", checked: false },
    { id: 5, label: "Early Arrival", checked: false },
    { id: 6, label: "Late Arrival", checked: false },
  ]);

  const toggleCheckbox = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <>
      <View className=" self-center  mt-2 mb-3">
        {items.map((item) => (
          <View key={item.id} className="flex-row  mt-3">
            <TouchableOpacity
              className={`w-6 h-6 border border-gray-400 rounded-md p-2  ${
                item.checked ? "bg-primary" : "bg-white"
              }`}
              onPress={() => toggleCheckbox(item.id)}
            />
            <Text className="font-pregular text-md text-gray-400 ml-2">
              {item.label}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={toggleModal}
        className="bg-primary items-center p-3 mx-5 mt-3 rounded-lg"
      >
        <Text className="font-psemibold text-md text-white ml-2">Apply</Text>
      </TouchableOpacity>
    </>
  );
};

export default SearchFlight;
