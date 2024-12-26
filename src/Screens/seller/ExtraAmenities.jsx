import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { CrossIcon, Iicon } from "@/assets/images/Icons/HomeIcon"; // Ensure these icons exist in the specified path
  import CheckBox from "@/components/CheckBox"; // Ensure this component exists
  import UploadButton from "@/components/Services/UploadButton"; // Ensure this component exists
  
  export const ExtraAmenities = ({ onContinue, updateData }) => {
    const [amenities, setAmenities] = useState([
      { id: 1, name: "Blanket" },
      { id: 2, name: "Cupboards with Locks" },
      { id: 3, name: "Child Safety Socket Covers" },
      { id: 4, name: "Mosquito Net" },
      { id: 5, name: "Newspaper" },
      { id: 6, name: "Jacuzzi" },
      { id: 7, name: "Terrace" },
      { id: 8, name: "Balcony" },
      { id: 9, name: "Private Pool" },
      { id: 10, name: "Fan" },
    ]);
  
    const handleRemoveAmenity = (id) => {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== id)
      );
    };
  
    const handleContinue = () => {
      const data = {
        extraAmenities: amenities,
      };
      updateData(data);
      onContinue();
    };
  
    return (
      <View className="my-5 mx-5 border border-gray-100 bg-white p-4 rounded-md">
        <View className="mb-3">
          <Text className="mb-2 font-pmedium text-lg">Extra Features</Text>
          <View className="mb-3 flex-row items-center space-x-2">
            <CheckBox />
            <Text className="font-pmedium text-sm">Same as Executive</Text>
          </View>
          <View className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl">
            <TextInput
              className="py-3 font-pmedium text-sm flex-1"
              placeholder="Search Amenities"
            />
            <Image source={require("../../assets/images/Action/search.png")} />
          </View>
        </View>
        <View className="flex-row flex-wrap justify-start mb-3">
          {amenities.map((amenity) => (
            <View
              key={amenity.id}
              className="flex-row bg-primary p-2 m-2 justify-evenly rounded-xl"
            >
              <Iicon />
              <Text className="font-pmedium text-sm mx-3 text-white">
                {amenity.name}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveAmenity(amenity.id)}>
                <CrossIcon />
              </TouchableOpacity>
            </View>
          ))}
        </View>
  
        <View className="mb-3">
          <Text className="font-pmedium text-lg">
            Upload registration document of property
          </Text>
          <Text className="mb-2 font-pregular text-sm">PNG, JPG</Text>
          <UploadButton />
        </View>
        <TouchableOpacity
          onPress={handleContinue}
          className="mt-5 items-end px-3"
        >
          <Text className="p-3 bg-primary rounded-md font-pmedium text-sm text-white">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  