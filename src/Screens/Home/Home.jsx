import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import HomeHeader from "../../components/HomeHeader";
import HotelCard from "../../components/HotelCard";
import SellerDashboard from "../seller/SellerDashboard";
import { GetUserData } from "../../services/profileService";
import { setAvailableProfiles, setSelectedProfile, setSelectedProperty, setUserData } from "../../redux/accountRedux";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../components/CircularLoader";
import SearchBar from "../../components/SearchBar";
import { FetchSearchSuggestions } from "../../services/commonService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/authRedux";

const TopCategoryData = [
  {
    id: 1,
    imageUri:
      "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel",
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
    category: "Health",
  },
  {
    id: 5,
    imageUri:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel",
  },
];

const extractInfo = (data) => {
  const results = [];

  if (data.user) {
    results.push({
      XipperID: data.user.XipperID,
      name: data.user.fullName,
      userCheckInInfo: data.user.userCheckInInfo,
      type: 'user'
    });
  }
  const departments = [];
  data?.employee?.department?.forEach((i) => {
    departments.push(i.department.name)
  });

  data.employee.forEach((company) => {
    results.push({
      XipperID: company.companyId,
      name: company.company.name,
      role: company.role.name,
      departments: departments,
      employeeAccess: company.employeeAccess,
      type: 'company'
    });

    if (company.businessUnit && company.businessUnit.length > 0) {
      company.businessUnit.forEach((unit) => {
        results.push({
          XipperID: unit.companyBusinessUnit.hotel.XipperID,
          name: unit.companyBusinessUnit.hotel.name,
          role: unit.role.name,
          employeeDepartments: unit.companyBusinessUnit.hotel.employeeDepartments,
          employeePositions: unit.companyBusinessUnit.hotel.employeePositions,
          type: 'hotel'
        });
      });
    }
  });

  return results;
};

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

const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.account);
  const { notifications } = useSelector((state) => state.authenticationRedux);
  const [loading, setLoading] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { selectedProfile } = useSelector((state) => state.account);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSearch = (query) => {
    fetchSuggestions(query);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSuggestions(searchText);
    } else {
      setSuggestions([]);
    }
  }, [searchText, fetchSuggestions]);

  const showResult = (item) => {
    console.log("Selected:", item);
    dispatch(setSelectedProperty(item));
    navigation.push("HotelDetails", { hotelData: item })
  };

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const toggleBusiness = () => {
    setIsBusiness(!isBusiness);
  };

  const topCategories = ({ item }) => (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => {
        if (item.category === "Travel") {
          navigation.navigate("Travel"); // Navigate to Travel screen
        }
      }}
    >
      <View style={{ alignItems: "center", marginTop: 10, padding: 10 }}>
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 100, height: 100, borderRadius: 60 }}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginTop: 6,
            fontWeight: 400,
            color: "black",
          }}
        >
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await GetUserData();
      console.log(res);
      dispatch(setUserData(res));
      const data = extractInfo(res);
      console.log(data);
      dispatch(setAvailableProfiles(data));
      dispatch(setSelectedProfile(data?.[0]))
    } catch (err) {
      console.error('Error fetching user details:', err);
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.replace("Login");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!userData["fullName"] && !userData["XipperID"])
      fetchUserDetails();
  }, []);

  useEffect(() => {
      fetchUserDetails();
}, [notifications])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={`${selectedProfile.type === "user" ? "#06A77D" : selectedProfile.type === "company" ? "#6D38C3" : "#FE830C"}`}
        barStyle="light-content"
      />
      <Animated.View
        style={{
          transform: [{ translateY: translateHeader }],
          zIndex: 1,
          position: "absolute",
          width: "100%",
        }}
      >
        <View style={{ width: '100%', height: 900, position: 'relative' }}>
          <Image
            source={require('../../assets/images/companyseller/homeImage.jpg')}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            resizeMode="cover"
          />


          {/* SearchBar component */}
          <View style={{
            position: 'absolute',
            top: 400,
            left: 10,
            right: 10,
            zIndex: 1,
            marginLeft: 40,
            borderRadius: 8,
          }}>
            <SearchBar
              placeholder="Search hotels..."
              onSearch={handleSearch}
              searchText={searchText}
              setSearchText={setSearchText}
              onFocus={() => console.log("Input focused")}
              autoFocus={false}
              suggestions={suggestions}
              loading={loading}
              showResult={showResult}
            />
          </View>

          {/* HomeHeader component */}
          <HomeHeader handleRoomClick={showResult} />
        </View>


      </Animated.View>

      {isBusiness ? (
        <SellerDashboard />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 220 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Top categories */}
          {/* <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 500, color: "black" }}>
                Top Categories
              </Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: selectedProfile.type==='user'? "#6D38C3":"#FE830C",
                  borderRadius: 8,
                  width: 83,
                  height: 33,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 10,
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={TopCategoryData}
              renderItem={topCategories}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
            />
          </View> */}

          {/* Recommended */}
          {/* <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                paddingHorizontal: 10,
                color: "black",
              }}
            >
              Recommended For You
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#7F8387",
                paddingHorizontal: 10,
                fontWeight: 400,
                fontFamily: "Poppins",
              }}
            >
              We recommend these based on your past orders and searches
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                marginVertical: 10,
              }}
            >
              <HotelCard />
              <HotelCard />
              <HotelCard />
              <HotelCard />
            </View>
          </View> */}
        </ScrollView>
      )}
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

export default Home;
