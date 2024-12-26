// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useRoute } from '@react-navigation/native';
// import OtpComponent from '../../components/OtpComponent';
// import ButtonComponent from '../../components/ButtonComponent';
// import { OtplessHeadlessModule } from 'otpless-react-native';
// import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';

// const VerifyOtp = ({ navigation }) => {
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const route = useRoute();
//   const { phoneNumber, selectedCode } = route.params || {};
//   const [resend, setResend] = useState(false);

//   const handleOtpChange = (otp) => {
//     setOtp(otp);
//   };
//   const headlessModule = new OtplessHeadlessModule();

//   useEffect(() => {
//     headlessModule.initHeadless('5I1NVUQHA9S9GC28QEJD');
//     headlessModule.setHeadlessCallback(onHeadlessResult);
//     return () => {
//       headlessModule.clearListener();
//     };
//   }, []);

//   const onHeadlessResult = (data) => {
//     let dataStr = JSON.stringify(data);
//     console.log('=====onHeadlessResult======');
//     if (data && data.responseType == "VERIFY") {
//       if (data && data.statusCode === 200) {
//         Alert.alert('Success', 'OTP verified successfully!');
//         navigation.navigate('verifyAdhar', { phoneNumber, selectedCode });
//       } else {
//         Alert.alert('Error', 'Invalid OTP. Please try again.');
//       }
//     } else if(data && resend && data.responseType == "INITIATE") {
//       if (data && data.statusCode === 200) {
//         Alert.alert('Success', 'OTP re-sent successfully!');
//         setResend(false);
//       } else {
//         Alert.alert('Error', 'Could not re-send OTP. Please try again.');
//       }
//     }else{
//       console.log(data)
//     }
//   };


//   const handlePress = async () => {
//     try {
//       setLoading(true);
//       console.log(otp, otp.length, phoneNumber)
//       if (otp.length != 6) {
//         console.log("hiiiiii", otp.length)
//         Alert.alert('Invalid OTP!', 'Please enter a valid OTP.');
//         return;
//       }
//       console.log(phoneNumber)
//       const headlessVerifyRequest = {
//         phone: phoneNumber,
//         otp: otp,
//         countryCode: selectedCode,
//         channel: 'PHONE',
//       };
//       console.log(headlessVerifyRequest)
//       await headlessModule.startHeadless(headlessVerifyRequest);

//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', 'An error occurred while verifying the OTP.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       const headlessRequest = {
//         phone: phoneNumber,
//         countryCode: selectedCode,
//         channel: 'PHONE',
//       };
//       setResend(true);
//       await headlessModule.startHeadless(headlessRequest);

//     } catch (e) {
//       console.error('Error Resending OTP:', e);

//     }

//   }

//   return (
//     <View className="flex-1 bg-white p-5">
//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <BackArrowIcon />
//       </TouchableOpacity>
//       <Text className="my-2 text-lg font-psemibold">Verify OTP</Text>
//       <Text className="my-2 text-sm font-pregular text-gray-400">
//         Please enter the OTP received at your mobile number {selectedCode} - {phoneNumber}
//       </Text>
//       <View className="px-3">
//         <OtpComponent length={6} onChange={handleOtpChange} />
//       </View>

//       <View className="flex-row justify-between px-3">
//         <Text className="my-2 text-sm font-pregular text-gray-400">Auto Fetching</Text>
//         <Text className="my-2 text-sm font-pregular text-gray-400">{30}s</Text>
//       </View>
//       <Text className="my-2 text-sm font-pregular text-center mt-6">Didn't receive an OTP?</Text>
//       <TouchableOpacity onPress={handleResendOTP}>
//         <Text className="my-2 text-sm font-pregular text-center text-[#6D38C3] mb-8 underline">
//           Resend OTP
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handlePress} disabled={loading}>
//         <ButtonComponent text={'Submit'} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VerifyOtp;



import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import OtpComponent from '../../components/OtpComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { OtplessHeadlessModule } from 'otpless-react-native';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const VerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const route = useRoute();
  const { phoneNumber, selectedCode } = route.params || {};
  const [resend, setResend] = useState(false);
  const headlessModule = new OtplessHeadlessModule();

  useEffect(() => {
    headlessModule.initHeadless('5I1NVUQHA9S9GC28QEJD');
    headlessModule.setHeadlessCallback(onHeadlessResult);
    return () => {
      headlessModule.clearListener();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0 && resend) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
      setResend(false);
      setCountdown(30); // Reset countdown
    }
    return () => clearInterval(timer);
  }, [countdown, resend]);

  const onHeadlessResult = (data) => {
    let dataStr = JSON.stringify(data);
    console.log('=====onHeadlessResult======');
    if (data && data.responseType === "VERIFY") {
      if (data.statusCode === 200) {
        Alert.alert('Success', 'OTP verified successfully!');
        navigation.navigate('verifyAdhar', { phoneNumber, selectedCode });
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } else if (data && resend && data.responseType === "INITIATE") {
      if (data.statusCode === 200) {
        Alert.alert('Success', 'OTP re-sent successfully!');
        setResend(false);
      } else {
        Alert.alert('Error', 'Could not re-send OTP. Please try again.');
      }
    } else {
      console.log(data);
    }
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handlePress = async () => {
    try {
      setLoading(true);
      if (otp.length !== 6) {
        Alert.alert('Invalid OTP!', 'Please enter a valid OTP.');
        return;
      }

      const headlessVerifyRequest = {
        phone: phoneNumber,
        otp: otp,
        countryCode: selectedCode,
        channel: 'PHONE',
      };
      await headlessModule.startHeadless(headlessVerifyRequest);

    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const headlessRequest = {
        phone: phoneNumber,
        countryCode: selectedCode,
        channel: 'PHONE',
      };
      setResend(true);
      setResendLoading(true);
      await headlessModule.startHeadless(headlessRequest);

    } catch (e) {
      console.error('Error Resending OTP:', e);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <BackArrowIcon />
      </TouchableOpacity>
      <Text className="my-2 text-lg font-psemibold">Verify OTP</Text>
      <Text className="my-2 text-sm font-pregular text-gray-400">
        Please enter the OTP received at your mobile number {selectedCode} - {phoneNumber}
      </Text>
      <View className="px-3">
        <OtpComponent length={6} onChange={handleOtpChange} />
      </View>

      <View className="flex-row justify-between px-3">
        <Text className="my-2 text-sm font-pregular text-gray-400">Auto Fetching</Text>
        <Text className="my-2 text-sm font-pregular text-gray-400">{countdown}s</Text>
      </View>
      <Text className="my-2 text-sm font-pregular text-center mt-6">Didn't receive an OTP?</Text>
      <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading || countdown > 0}>
        <Text className="my-2 text-sm font-pregular text-center text-user mb-8 underline">
          Resend OTP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePress} disabled={loading || otp.length !== 6}>
        <ButtonComponent text={'Submit'} />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6D38C3" />}
      {resendLoading && <ActivityIndicator size="small" color="#6D38C3" />}
    </View>
  );
};

export default VerifyOtp;
