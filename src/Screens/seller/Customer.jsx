import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import CustomerCard from '../../components/CustomerCard';
import { MicIcon } from "../../assets/images/Icons/HomeIcon";
import { Calender } from '../../assets/images/Icons/TravalIons';
import { useNavigation } from '@react-navigation/native';
import CircularLoader from '../../components/CircularLoader';
import { GetHotelCustomerDetails } from '../../services/hotelService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../../redux/businessRedux';

const Customer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector((state) => state.account);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    const arr = data.guests.map(i => {
      return {
        ...i,
        user: {
          address: [...i.address],
          contactEmails: [{ email: i.email }],
          contactNumbers: [{ number: i.phone }],
          fullName: i.guestName,
          gender: i.gender,
          dob: i.dob,
          aadhaarNumber: i.aadhaarNumber,
          PassportFileNumber: i.PassportFileNumber,
          idType: !i.PassportFileNumber ? "Aadhaar Number" : "Passport"
        },
      };
    });
    dispatch(setBookingDetails(data));
    navigation.navigate("CustomerDetails", { data: { ...data, guests: arr } });
  };


  const getCustomerDetails = async () => {
    try {
      setLoading(true);
      const res = await GetHotelCustomerDetails(selectedProfile.XipperID);
      setCustomers(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <View className="flex flex-row items-center  ml-5">
        <Pressable onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </Pressable>
        <Text className="text-center flex-1 p-2 font-header text-header mr-6 text-black">Customer</Text>
      </View>

      <View className="flex-row items-center justify-between px-4 my-2 space-x-2 mt-2">

        <View className="flex-row items-center bg-white rounded-2xl p-0.5 h-11  shadow-sm flex-1">
          <Image source={require("../../assets/images/Action/search.png")} />
          <TextInput
            placeholder="Search for your customers"
            className="flex-1 text-gray-600 ml-1"
          />
          <MicIcon />
        </View>

        <Pressable className="flex-row items-center bg-white rounded-2xl p-2 px-4 h-11 shadow-sm ml-2">
          <Calender color={'#FE830C'} />
          <Text className="ml-2 text-gray-600">Choose date</Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10, paddingBottom: 250 }}>
        {customers.length > 0 && customers.map((customer, index) => (
          <Pressable key={index} className="mb-2 w-full" onPress={() => handleSubmit(customer)}>
            <CustomerCard customer={customer} />
          </Pressable>
        ))}
      </ScrollView>
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

export default Customer;
