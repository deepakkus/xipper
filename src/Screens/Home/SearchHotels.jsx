import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    BackArrowIcon,
    LocationIcon,
    Setting,
  } from "../../assets/images/Icons/ArrowIcon";
  import SearchBar from "../../components/SearchBar";
  import HotelCardFull from "../../components/HotelCardFull";
  import { useNavigation } from "@react-navigation/native";
  import { BASE_URL } from "../../constants/Helper"
  
  const SearchHotels = () => {
    const nav = useNavigation();
    const TopCategyData = [
      {
        id: 1,
        imageUri:
          "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Traval",
      },
      {
        id: 2,
        imageUri:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Food",
      },
      {
        id: 3,
        imageUri:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Shopping",
      },
      {
        id: 4,
        imageUri:
          "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Helth",
      },
      {
        id: 5,
        imageUri:
          "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Traval",
      },
    ];
    const renderHotelItem = ({ item }) => {
      // Flatten the hotelImages array if it's nested
      const flattenedImages = item.hotelImages.flat();
      // console.log(flattenedImages);
      return (
        <View key={item._id} className="m-2">
          {flattenedImages.length > 0 ? (
            flattenedImages.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={{ width: 150, height: 100, marginBottom: 5 }}
              />
            ))
          ) : (
            <Text>No images available</Text>
          )}
        </View>
      );
    };
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const topCategories = ({ item }) => (
      <View asChild="" style={{ marginTop: 10 }}>
        <View className=" space-y-2 mt-4  justify-center  ">
          <Image
            source={{ uri: item.imageUri }}
            width={120}
            height={120}
            className="rounded-full "
          />
  
          <Text className="font-pregular text-md text-black mb-0.6 text-center">
            {item.category}
          </Text>
        </View>
      </View>
    );

    return (
      <SafeAreaView className="bg-white flex-1">
        <ScrollView>
          <View className="bg-primary p-5">
            <View className="flex-row items-center space-x-5  my-8">
              <TouchableOpacity onPress={() => nav.pop()}>
                <BackArrowIcon color={"white"} />
              </TouchableOpacity>
              <Text className="font-pmedium text-lg  text-white  ">
                Search Whatever you need
              </Text>
            </View>
            <SearchBar placeholder={"Search Hotel"} />
          </View>
          <View className="bg-white p-5  flex-row justify-left space-x-3 border-b-2 border-b-gray-300 ">
            <View className="flex-row px-5 border  rounded-full  items-center   border-gray-200 py-2  ">
              <Text className="px-2">Filter</Text>
              <Setting />
            </View>
            <View className="flex-row px-5 border  rounded-full  item-center border-gray-200 py-2  ">
              <LocationIcon color={"black"} />
              <Text className="px-2">Location</Text>
            </View>
          </View>
          <View className="mt-3">
            <View className=" flex-row justify-between pt-2 px-4">
              <Text className="font-pmedium text-lg  text-black ">
                Top Searches
              </Text>
            </View>
            <FlatList
              data={TopCategyData}
              renderItem={topCategories}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 20,
                paddingHorizontal: 20,
              }}
            />
          </View>
  
          <View>
            <Text className="font-pmedium text-lg mt-5 px-5 text-black ">
              Search Results
            </Text>
            <Text className="font-pregular text-xs px-5 text-gray-400 ">
              We are currently showing hotels near you , you can change the
              loaction in the filters section
            </Text>
          </View>
          <View className="  flex-row justify-center flex-wrap  ">
            {hotels.map((hotel, index) => (
              <HotelCardFull key={index} data={hotel} />
            ))}
            {/* {console.log(
              "hotelImages",
              hotels.map((hotel) => hotel.hotelImages)
            )} */}
            {/* <FlatList
              data={hotels}
              renderItem={renderHotelItem}
              keyExtractor={(item) => item._id.toString()}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SearchHotels;
  