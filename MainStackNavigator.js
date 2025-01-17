
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/Screens/Auth/Signin';
import { VerifyOtp } from './src/services/hotelService';
import VerifyAadhar from './src/Screens/Auth/VerifyAadhar';
import VerifyAdharOtp from './src/Screens/Auth/verifyAdharOtp';
import SearchHotels from './src/Screens/Hotel/SearchHotels';
import HotelDetails from './src/Screens/Hotel/HotelDetails';
import RoomComponent from './src/components/RoomComponent';
import Review from './src/Screens/Hotel/BookingReview';
import TabNavigation from "./src/Screens/Navigation/TabNavigation"
import CompanyOnboarding from './src/Screens/company/CompanyOnboarding';
import CompanyList from './src/Screens/company/CompanyList';
import CompanyManagement from './src/Screens/company/CompanyManagement';
import MemberDetails from './src/Screens/company/MemberDetails';
import CheckinRequest from './src/Screens/seller/CheckinRequest';
import GuestCheckOut from './src/Screens/seller/GuestCheckOut';
import Bill from './src/Screens/Home/Bill';
import RoomAllocation from './src/Screens/seller/RoomAllocation';
import ApprovingDetails from './src/Screens/seller/ApprovingDetails';
import ServicePreview from './src/Screens/seller/ServicePreview';
import SellerAnalytics from './src/Screens/seller/SellerAnalytics';
import CustomerDetails from './src/Screens/seller/CustomerDetails';
import Terms from './src/Screens/Home/Terms';
import Privacy from './src/Screens/Home/Privacy';
import Currency from './src/Screens/Home/Currency';
import Language from './src/Screens/Home/Language';
import Contact from './src/Screens/Home/Contact';
import Wishlist from './src/Screens/Home/WishList';
import FoodCard from './src/components/FoodCard';
import AnalyticsStats from './src/Screens/Analytics/AnalyticsStats';
import SearchFlight from './src/Screens/Home/SearchFlight';
import SearchCar from './src/Screens/Home/SearchCar';
import CarDetails from './src/components/CarDetails';
import ViewCart from "./src/components/ViewCart";
import SearchServices from "./src/Screens/Home/SearchServices";
import Notifications from './src/components/Notifications';
import GroupPermission from './src/Screens/company/GroupPermission';
import LaundrayChart from './src/components/LaundrayChart';
import LaundaryCart from './src/components/LaundaryCart';
import SpaChart from './src/components/SpaChart';
import MiniBar from './src/components/MiniBar';
import Transactiondetails from './src/Screens/Analytics/TransactionDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularLoader from './src/components/CircularLoader';
import BillSeller from './src/Screens/seller/BillSeller';
import SellerDashboard from './src/Screens/seller/SellerDashboard';
import Orders from './src/Screens/seller/Order';
import SpaCart from './src/components/SpaCart';
import DeleteAccount from './src/components/DeleteAccount';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem("accessToken");
      if (res) {
        console.log("Token found:", res);
        setToken(true);
      } else {
        setToken(false);
      }
    } catch (error) {
      console.log("Error getting token:", error);
      setToken(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (token === null) {
    return <CircularLoader />
  }


  return (
    <Stack.Navigator initialRouteName={`${token ? "MainHome" : "Login"}`} screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="VerifyAadhaar" component={VerifyAadhar} />
      <Stack.Screen name="VerifyAdharOtp" component={VerifyAdharOtp} />
      <Stack.Screen name="MainHome" component={TabNavigation} />
      <Stack.Screen name="SearchHotels" component={SearchHotels} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="ViewRoom" component={RoomComponent} />
      <Stack.Screen name="Review" component={Review} />

      <Stack.Screen name="CompanyRegistration" component={CompanyOnboarding} />
      <Stack.Screen name="CompanyList" component={CompanyList} />
      <Stack.Screen name="CompanyManagement" component={CompanyManagement} />
      <Stack.Screen name="MemberDetails" component={MemberDetails} />
      <Stack.Screen name="CheckinRequest" component={CheckinRequest} />
      <Stack.Screen name="GuestCheckOut" component={GuestCheckOut} />
      <Stack.Screen name="Bill" component={Bill} />
      <Stack.Screen name="RoomAllocation" component={RoomAllocation} />
      <Stack.Screen name="ApprovingDetails" component={ApprovingDetails} />
      <Stack.Screen name="ServicePreview" component={ServicePreview} />
      <Stack.Screen name="SellerAnalytics" component={SellerAnalytics} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Currency" component={Currency} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="FoodCard" component={FoodCard} />
      <Stack.Screen name="ViewCart" component={ViewCart} />
      <Stack.Screen name="AnalyticsStats" component={AnalyticsStats} />
      <Stack.Screen name="SearchFlight" component={SearchFlight} />
      <Stack.Screen name="SearchCar" component={SearchCar} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="SearchServices" component={SearchServices} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="GroupPermission" component={GroupPermission} />
      <Stack.Screen name="LaundrayChart" component={LaundrayChart} />
      <Stack.Screen name="LaundaryCart" component={LaundaryCart} />
      <Stack.Screen name="SpaChart" component={SpaChart} />
      <Stack.Screen name="SpaCart" component={SpaCart} />
      <Stack.Screen name="MiniBar" component={MiniBar} />
      <Stack.Screen name="Transactiondetails" component={Transactiondetails} />
      <Stack.Screen name="BillSeller" component={BillSeller} />
      {/* <Stack.Screen name="SellerDashboard" component={SellerDashboard} /> */}
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
