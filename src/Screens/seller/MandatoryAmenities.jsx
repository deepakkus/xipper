import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CrossIcon, Iicon } from "@/assets/images/Icons/HomeIcon"; // Ensure correct paths
import CheckBox from "@/components/CheckBox"; // Ensure this component is available
import UploadButton from "@/components/Services/UploadButton"; // Ensure this component is available

export const MandatoryAmenities = ({ onContinue, onBack, updateData }) => {
  const allAmenities = [
    "Hairdryer",
    "TV",
    "Hot & Cold Water",
    "Toiletries",
    "Air Conditioning",
    "Kettle",
    "Mini Bar",
    "Closet",
    "Iron/Ironing Board",
    "Mineral Water",
    "Telephone",
    "Work Desk",
    "Bathroom",
    "Safe",
    "Chair",
  ];

  const [amenities, setAmenities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddAmenity = () => {
    if (searchQuery && !amenities.includes(searchQuery)) {
      setAmenities([...amenities, searchQuery]);
      setSearchQuery("");
    }
  };

  const handleRemoveAmenity = (name) => {
    setAmenities((prevAmenities) =>
      prevAmenities.filter((amenity) => amenity !== name)
    );
  };

  const filteredAmenities = allAmenities.filter((amenity) =>
    amenity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    const data = {
      amenities: {
        mandatory: amenities,
      },
    };
    updateData(data);
    onContinue();
  };

  return (
    <>
      <View className="mx-5 border border-gray-100 bg-white p-4 rounded-md">
        <View className="mb-3">
          <Text className="mb-2 font-pmedium text-lg">
            Amenities of your Executive Room
          </Text>
          <Text className="font-pmedium text-base text-gray-400">
            Entering these details are mandatory for setting up your account
          </Text>
        </View>
      </View>
      <View className="my-5 mx-5 border border-gray-100 bg-white p-4 rounded-md">
        <View className="mb-3">
          <Text className="mb-2 font-pmedium text-lg">Mandatory Amenities</Text>
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
            {filteredAmenities.length === 0 && searchQuery.length > 0 ? (
              <TouchableOpacity onPress={handleAddAmenity}>
                <Text className="font-pmedium text-sm text-primary">Add</Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={require("../../assets/images/Action/search.png")}
              />
            )}
          </View>
        </View>

        {searchQuery.length > 0 && (
          <View className="flex-row flex-wrap justify-start mb-3">
            {filteredAmenities.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                onPress={() => {
                  if (!amenities.includes(amenity)) {
                    setAmenities([...amenities, amenity]);
                    setSearchQuery("");
                  }
                }}
                className="flex-row bg-gray-300 p-2 m-2 justify-evenly rounded-xl"
              >
                <Iicon />
                <Text className="font-pmedium text-sm mx-3 text-white">
                  {amenity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex-row flex-wrap justify-start mb-3">
          {amenities.map((amenity) => (
            <View
              key={amenity}
              className="flex-row bg-primary p-2 m-2 justify-evenly rounded-xl"
            >
              <Iicon />
              <Text className="font-pmedium text-sm mx-3 text-white">
                {amenity}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveAmenity(amenity)}>
                <CrossIcon />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="mb-3 mt-5">
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
    </>
  );
};
