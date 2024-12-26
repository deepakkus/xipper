import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackArrowIcon,
  GreaterArrowIcon,
} from '../../assets/images/Icons/ArrowIcon';
import { Edit } from "@/assets/images/Icons/Hotel";
import CarCard from "../../components/CarCard"
import SearchHeader from "../../components/SearchHeader";
import { useNavigation } from "@react-navigation/native";

const SearchCar = () => {
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
          <CarCard onPress={() => nav.navigate("CarDetails")} />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchCar;
