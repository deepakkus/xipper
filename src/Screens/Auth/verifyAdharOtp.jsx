import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import OtpComponent from '../../components/OtpComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { BASE_URL } from '../helper.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyAadhaarOTP } from '../../services/governmentIdService.js';

const VerifyAdharOtp = ({ navigation }) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = otp => {
    setOtp(otp);
  };
  const handleBack = () => {
    navigation.navigate('verifyAdhar', {
      phoneNumber,
      selectedCode,
    });
  };

  const route = useRoute();
  const { phoneNumber, selectedCode, aadhaarNumber, ref_id } = route.params;

  const handleSubmit = async () => {
    console.log('OTP Submitted:', otp);
    try {

      const ph = await AsyncStorage.getItem("contactIdentifier");
      const payload = {
        ref_id,
        otp,
        contactIdentifier: ph,
        aadhaarNumber
      };
      const response = await verifyAadhaarOTP("", payload, "register")
      // const response = await axios.post(
      //   `${BASE_URL}/docs/aadhaarVerify/verifyOTP`,
      //   {
      //     ref_id,
      //     otp,
      //     contactIdentifier: ph,
      //     aadhaarNumber
      //   }
      // );
      console.log('===============', response);
      const access_token = response.accessToken;
      // const access_token = response.data.accessToken;

      if (access_token) {
        await AsyncStorage.setItem("accessToken", access_token);
      }
      navigation.navigate('MainHome');
    } catch (err) {
      console.log('===============', err, err.response);

      if (err.response && err.response.status === 400) {
        toast.error('OTP Invalid');
      } else {
        toast.error('Some error occurred on our side');
      }
    }

  };
  return (
    <View className="flex-1 bg-white p-5">
      {/* <Link href={"/verifyAdhar"} className="pb-4"> */}
      <TouchableOpacity onPress={handleBack}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/006/991/685/non_2x/arrow-back-icon-which-is-suitable-for-commercial-work-and-easily-modify-or-edit-it-vector.jpg',
          }}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      <Text className="my-2 text-2xl bold">Verify Aadhar OTP</Text>
      <Text className="my-  text-md text-[#7F8387] mb-3">
        Please enter OTP received at your Aadhar number {selectedCode}-
        {phoneNumber}
      </Text>
      <View className="px-3">
        <OtpComponent length={6} onChange={handleOtpChange} />
      </View>

      <View className="flex-row justify-between px-3">
        <Text className="my-  text-md text-[#7F8387] mb-3">Auto Fetching</Text>
        <Text className="my-  text-md text-[#7F8387] mb-3">{30}s</Text>
      </View>
      <Text className="text-center text-lg  mt-6">Didn't receive an OTP?</Text>
      <TouchableOpacity>
        <Text className="text-center text-lg text-[#6D38C3] mb-8 underline">
          Resend OTP
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <ButtonComponent text={'Submit'} />
      </TouchableOpacity>
    </View>
  );
};

export default VerifyAdharOtp;
