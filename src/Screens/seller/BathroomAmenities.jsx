import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { CrossIcon, Iicon } from "@/assets/images/Icons/HomeIcon"; // Ensure correct paths
  import CheckBox from "@/components/CheckBox"; // Ensure this component is available
  import UploadButton from "@/components/Services/UploadButton"; // Ensure this component is available
  
  export const BathroomAmenities = ({
    onContinue,
    onBack,
    updateData,
    previousData,
  }) => {
    const [amenities, setAmenities] = useState([
      { id: 1, name: "Bathroom Phone" },
      { id: 2, name: "Bathtub" },
      { id: 3, name: "BubbleBath" },
      { id: 4, name: "Dental Kit" },
      { id: 5, name: "Geyser/Water Heater" },
      { id: 6, name: "Slippers" },
      { id: 7, name: "Frame 1430106040" },
      { id: 8, name: "Shower Cap" },
      { id: 9, name: "Hammam" },
      { id: 10, name: "Bathrobes" },
      { id: 11, name: "Shower Cubicle" },
      { id: 12, name: "Weighing Scale" },
      { id: 13, name: "Shaving Mirror" },
      { id: 14, name: "Sewing Kit" },
      { id: 15, name: "Bidet" },
      { id: 16, name: "Toilet with Grab Rails" },
      { id: 17, name: "Jetspray" },
      { id: 18, name: "Ensuite Bathroom/Corner Bay" },
    ]);
  
    const [searchQuery, setSearchQuery] = useState("");
  
    // Filter amenities based on search query
    const filteredAmenities = searchQuery
      ? amenities.filter((amenity) =>
          amenity.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : amenities; // Show all amenities if searchQuery is empty
  
    const handleRemoveAmenity = (id) => {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== id)
      );
    };
  
    const handleContinue = () => {
      // Merge previous data with the updated amenities
      const updatedData = {
        ...previousData, // Retain existing data
        bathroomAmenities: amenities, // Update with new amenities
      };
  
      updateData(updatedData);
      onContinue();
    };
  
    return (
      <View className="flex-1 bg-gray-50">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="my-5 mx-5 border border-gray-100 bg-white p-4 rounded-md">
            <View className="mb-3">
              <Text className="mb-2 font-pmedium text-lg">
                Bathroom Amenities
              </Text>
              <View className="mb-3 flex-row items-center space-x-2">
                <CheckBox />
                <Text className="font-pmedium text-sm">Same as Executive</Text>
              </View>
              <View className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl">
                <TextInput
                  className="py-3 font-pmedium text-sm flex-1"
                  placeholder="Search Amenities"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <Image
                  source={require("../../assets/images/Action/search.png")}
                />
              </View>
            </View>
            <View className="flex-row flex-wrap justify-start mb-3">
              {filteredAmenities.map((amenity) => (
                <View
                  key={amenity.id}
                  className="flex-row bg-primary p-2 m-2 justify-evenly rounded-xl"
                >
                  <Iicon />
                  <Text className="font-pmedium text-sm mx-3 text-white">
                    {amenity.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveAmenity(amenity.id)}
                  >
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
        </ScrollView>
      </View>
    );
  };
  