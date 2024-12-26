import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../helper';
import { Link, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import PassportInput from './Passport';
import {
  BackArrowIcon,
  DropDownArrow,
} from '../../assets/images/Icons/ArrowIcon';
import AadharInput from '../../components/AdharInput';
import { formatDate } from '../../utils/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addPassport, sendAadhaarOTP } from '../../services/governmentIdService';
import CircularLoader from '../../components/CircularLoader';

const VerifyAadhar = ({ navigation }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const nav = navigation;
  const [checked, setChecked] = useState('first');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [passportData, setPassportData] = useState({
    file_number: '',
    dob: null,
  });
  const route = useRoute();
  const { phoneNumber, selectedCode } = route.params;

  const handleAadharChange = newAadhar => {
    setAadhaarNumber(newAadhar);
  };

  const handleSubmit = async () => {
    try {
      if (checked === 'first') {
        console.log('Checked-----', checked);

        if (aadhaarNumber.trim().length !== 12) {
          Alert.alert('Please enter a valid Aadhaar number');
          return;
        }

        setLoading(true);

        const res = await sendAadhaarOTP(aadhaarNumber.trim(), "register")

        // const res = await axios.post(`${BASE_URL}/docs/aadhaarVerify/sendOTP`, {
        //   aadhaarNumber: aadhaarNumber.trim(),
        // });

        console.log('----OTPForaadhaar---', res);
        if (res.data.status === 'SUCCESS') {
          setIsOtpSent(true);
          nav.navigate('VerifyAdharOtp', {
            phoneNumber,
            selectedCode,
            aadhaarNumber,
            isOtpSent,
            ref_id: res.data.data.ref_id,
          });
        }
      } else {
        if (passportData.file_number.trim().length === 0) {
          Alert.alert('Please enter a valid Passport Number');
          return;
        }
        if (passportData.dob.trim().length === null) {
          Alert.alert('Please enter a valid Passport Expiry');
          return;
        }

        setLoading(true);
        // const res = await axios.post(
        //   `${BASE_URL}/docs/addpassport`,
        //   {
        //     file_number: `${passportData.file_number}`,
        //     dob: `${formatDate(passportData.dob)}`,
        //     contactIdentifier: phoneNumber
        //   },
        // );
        const res = await addPassport(passportData, phoneNumber);
      }
    } catch (err) {
      if (err.response) {
        console.error('Error Response Data:', err.response.data);
        console.error('Error Response Status:', err.response.status);
        if (err.response.status === 422) {
          Alert.alert('Aadhaar Number Invalid');
        } else {
          if (err.response.status === 409) {
            Alert.alert(
              `Error: ${err.response.data.message || 'An error occurred on our side'
              }`, "Please login again with your registered Mobile Number as this Aadhar already exists",
            );
            nav.replace('Login');
          }
        }
      } else if (err.request) {
        console.error('No response received:', err.request);
        Alert.alert('No response received from the server');
      } else {
        console.error('Error setting up request:', err.message);
        Alert.alert('Error setting up request');
      }
    } finally {
      setLoading(false);
    }


  };

  const handleOptionSelect = value => {
    setChecked(value);
    setDropdownVisible(false); // Close the dropdown
  };

  const getSelectedLabel = () => {
    return checked === 'first' ? 'Aadhar' : 'Passport';
  };

  const handlePassportChange = newPassportData => {
    setPassportData(newPassportData);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVisible(false);
        Keyboard.dismiss();
      }}>
      {loading ? (
        <CircularLoader />
      ) : (
        <View className="flex-1 bg-white p-5">
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View className="relative flex-row items-center w-80">
            <Text className="my-2 text-lg font-psemibold mr-2">
              Verify {getSelectedLabel()}
            </Text>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}>
              <DropDownArrow />
            </TouchableOpacity>

            {dropdownVisible && (
              <View className="absolute right-0 top-12 p-3 bg-white border border-gray-200 rounded-lg z-50">
                <View>
                  <View className="flex flex-row items-center">
                    <RadioButton
                      value="first"
                      status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => handleOptionSelect('first')}
                      color="#6D38C3" // Replace with your color
                      uncheckedColor="#CCCCCC" // Replace with your color
                    />
                    <Text className="font-psemibold text-base">Aadhar</Text>
                  </View>
                  <View className="flex flex-row items-center mt-1">
                    <RadioButton
                      value="second" // Changed value to 'second'
                      status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => handleOptionSelect('second')}
                      color="#6D38C3" // Replace with your color
                      uncheckedColor="#CCCCCC" // Replace with your color
                    />
                    <Text className="font-psemibold text-base">Passport</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <Text className="my-2 text-sm font-pregular text-gray-400">
            Enter your {getSelectedLabel()} number
          </Text>
          <View className="px-3 mb-5">
            {checked === 'first' ? (
              <AadharInput
                value={aadhaarNumber}
                onChangeText={handleAadharChange}
              />
            ) : (
              <PassportInput
                value={passportData}
                onChangeText={handlePassportChange}
              />
            )}
          </View>
          <View className="flex-row justify-between items-center space-x-9 py-4 w-full">
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 px-1 py-3 bg-[#06A77D] rounded-md text-center">
              <Text className="text-sm font-psemibold text-center text-white">
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};
export default VerifyAadhar;
