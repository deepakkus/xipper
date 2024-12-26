import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    BackArrowIcon,
    LocationIcon,
    Setting,
} from "../../assets/images/Icons/ArrowIcon";
import SearchBar from "../../components/SearchBar";
import HotelCardFull from "../../components/HotelCardFull";
import { useNavigation } from "@react-navigation/native";
import { FetchSearchSuggestions } from "../../services/commonService";
import { useSelector } from "react-redux";

const TopCategoryData = [
    {
        id: 1,
        imageUri: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop",
        category: "Hotels",
    },
    {
        id: 2,
        imageUri: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop",
        category: "Flights",
    },
    {
        id: 3,
        imageUri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        category: "Car",
    },
    {
        id: 4,
        imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
        category: "Services",
    },
    {
        id: 5,
        imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
        category: "Travel",
    },
];

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const TopCategoryItem = ({ item }) => (
    <View style={{ marginTop: 10 }}>
        <View className="space-y-2 mt-4 justify-center">
            <Image
                source={{ uri: item.imageUri }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
            />
            <Text className="font-pregular text-md text-black mb-0.6 text-center">
                {item.category}
            </Text>
        </View>
    </View>
);

const SearchHotels = () => {
    const nav = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { selectedProfile } = useSelector((state) => state.account);

    const fetchSuggestions = useCallback(debounce(async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await FetchSearchSuggestions(query);
            setSuggestions(response.data.results || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setLoading(false);
        }
    }, 500), []);

    useEffect(() => {
        if (searchText.length > 0) {
            fetchSuggestions(searchText);
        } else {
            setSuggestions([]);
        }
    }, [searchText, fetchSuggestions]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <View className={`p-5 rounded-b-[20px] ${selectedProfile.type === 'user'? 'bg-user': 'bg-company'}`}>
                    <View className="flex-row items-center space-x-8 my-3">
                        <TouchableOpacity onPress={() => nav.goBack()}>
                            <BackArrowIcon color={"white"} />
                        </TouchableOpacity>
                        <Text className="font-pmedium text-lg text-white">
                            Search whatever you need
                        </Text>
                    </View>
                    <SearchBar
                        placeholder="Search Hotel"
                        searchText={searchText}
                        setSearchText={setSearchText}
                        onSearch={(text) => console.log("Searching for:", text)}
                        onFocus={() => nav.navigate("SearchHotels")}
                        autoFocus={true}
                        suggestions={suggestions}
                        loading={loading}
                        showResult={(val) => setHotels([val])}
                    />
                </View>
                <View className="bg-white p-5 border-b-2 border-b-gray-300">
                    <Text className="font-pmedium text-lg text-black mb-3">Recent Searches</Text>
                    <View className="flex-row justify-left space-x-7 mr-1">
                        <View className="flex-row border rounded-full items-center border-gray-200 py-2 px-1">
                            <Text className="px-2 text-black">Filter</Text>
                            <Setting />
                        </View>
                        <View className="flex-row border rounded-full items-center border-gray-200 py-2">
                            <LocationIcon color={"black"} />
                            <Text className="px-2 text-black">Location</Text>
                        </View>
                        <View className="flex-row border rounded-full items-center border-gray-200 py-2">
                            <LocationIcon color={"black"} />
                            <Text className="px-2 text-black">Location</Text>
                        </View>
                    </View>
                    <View className="mt-3">
                        <Text className="font-pmedium text-lg text-black mb-3">Recent Searches</Text>
                        <View className="flex-row justify-left space-x-7 mr-1">
                            <View className="flex-row border rounded-full items-center border-gray-200 py-2 px-1">
                                <Text className="px-2 text-black">Filter</Text>
                                <Setting />
                            </View>
                            <View className="flex-row border rounded-full items-center border-gray-200 py-2">
                                <LocationIcon color={"black"} />
                                <Text className="px-2 text-black">Location</Text>
                            </View>
                            <View className="flex-row border rounded-full items-center border-gray-200 py-2">
                                <LocationIcon color={"black"} />
                                <Text className="px-2"text-black>Location</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-3">
                    <View className="flex-row justify-between pt-2 px-4">
                        <Text className="font-pmedium text-lg text-black">Top Categories</Text>
                    </View>
                    <FlatList
                        data={TopCategoryData}
                        renderItem={TopCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            gap: 20,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>

                <View>
                    <Text className="font-pmedium text-lg mt-5 px-5 text-black">Search Results</Text>
                    <Text className="font-pregular text-xs px-5 text-gray-400">
                        We are currently showing hotels near you. You can change the location in the filters section.
                    </Text>
                </View>
                <View className="flex-row justify-center flex-wrap mb-10">
                    {hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <HotelCardFull key={index} data={hotel} />
                        ))
                    ) : (
                        <Text className="font-pregular text-gray-500">No hotels found.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchHotels;
