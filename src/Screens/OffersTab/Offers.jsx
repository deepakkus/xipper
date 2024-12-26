import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    BackArrowIcon,
    GreaterArrowIcon,
    RightArrow,
  } from "../../assets/images/Icons/ArrowIcon";
  import { useNavigation } from "@react-navigation/native";
  import SearchBar from "../../components/SearchBar";
  import axios from "axios";
  import { BASE_URL } from "../../constants/Helper";
  
  const ExploreCard = ({ imageUri, title, subtitle1, subtitle2 }) => {
    return (
      <View className="mt-4 rounded-xl overflow-hidden px-5 relative">
        <ImageBackground
          source={{
            uri: imageUri,
          }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 8,
            overflow: "hidden",
          }}
          resizeMode="cover"
        >
          <View
            className="space-y-1 py-4"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-white font-bold"> {subtitle1}</Text>
            <Text className="text-white text-base font-bold"> {title}</Text>
            <Text className="text-white font-bold">{subtitle2}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default function Offers() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyMzVhNTIwOWUzZTRhMThkMzZhZWYiLCJpYXQiOjE3MjA4NTgwMjEsImV4cCI6MTcyMzQ1MDAyMX0.4c3hREivirPh70zuEoqSKngfudB-rMDVhI11RcdFVUI";
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/offers`, {
            headers: {
              Authorization: token,
            },
          });
          console.log(response.data.data);
          setData(response.data.data);
          setLoading(false);
        } catch (err) {
          console.log("response.data", err);
          setError(err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
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
      <SafeAreaView className="bg-gray-100 flex justify-center">
        <StatusBar hidden={true} />
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View className="w-full justify-center flex flex-row items-center mt-12">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="left-0 absolute px-5"
                >
                  <BackArrowIcon />
                </TouchableOpacity>
                <Text className="font-bold text-2xl mt-5">Offers</Text>
              </View>
  
              <View className="mt-5 px-5">
                <SearchBar placeholder={"Search"} />
              </View>
  
              <View className="mt-3">
                <View className=" flex-row justify-between pt-2 px-4">
                  <Text className="font-pmedium text-lg  text-black ">
                    Top Categories
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
  
              <View className="justify-between flex-row px-5 mt-5">
                <Text className="font-bold text-xl">Exclusive Offers</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-gray-400 text-sm mr-2">View All</Text>
                  <GreaterArrowIcon />
                </TouchableOpacity>
              </View>
  
              {/* Explore card  */}
  
              <ExploreCard
                imageUri="https://s3-alpha-sig.figma.com/img/7a25/1ccf/f400e44d8b8050b126a84ff4dbea98b2?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xg9fXjOqCKR1dA0TLvQpE6TyIAFCCK9T0kV6v9l96MPdM~KO7-4DANN0~wcfQU-I8iKtc-a5H5IZG7Z222tgB3yvBcEP36cUyJMUEVuVjNZziX3K8vhDZ24HSghYiFtUx9WFfS4mVxR-kwib~qxHqatmyT6Sj93lEMdMsO850XymqN3MQUlcRFc7KCGvroeycGNOkOboFiFqk5Cs2wDk8Yl696ufqfX9ScqGO6geLP1LlOwq~6EoaIELGWquPrYReM3Bi3b6218tjqnxQIDNg9GhCo6NsEDiOarpmtn4rpFfY3h44lG3xPkZtTWpkqXcLdFI7B1HaUVoh~ybkWQTXw__"
                subtitle1="Good News for International Travellers:"
                title={data[0]?.description}
                subtitle2="Preminum is On Us!"
              />
            </>
          }
        />
      </SafeAreaView>
    );
  }