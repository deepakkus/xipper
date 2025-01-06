import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryCode from '../../components/CountryCode';
import { OtplessHeadlessModule } from 'otpless-react-native';
import { G, Path, Svg } from 'react-native-svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import OtpComponent from '../../components/OtpComponent';
import ButtonComponent from '../../components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL, GOOGLE_WEB_CLIENT_ID, OTPLESS_APP_ID } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginRegisterData } from '../../redux/authRedux';
import CircularLoader from '../../components/CircularLoader';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loginRegisterData } = useSelector((state) => state.authenticationRedux)
  const [timeLeft, setTimeLeft] = useState(30);
  const headlessModule = new OtplessHeadlessModule();
  const [isIosHeadlessInit, setIosHeadlessInit] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false)
  const appId = OTPLESS_APP_ID;
  const [form, setForm] = useState({
    result: 'result view',
    phoneNumber: '',
    countryCode: '+91',
    otp: '',
    channelType: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      iosClientId  : GOOGLE_WEB_CLIENT_ID,//'834003854667-vv34ltslgkjjclm22ij6j9qe1menoaf6.apps.googleusercontent.com',
      webClientId: '',//GOOGLE_WEB_CLIENT_ID,
      scopes: ["profile", "email"],
    });
  }, []);

  useEffect(() => {
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      phoneNumber: '',
      countryCode: '+91',
      otp: '',
      channelType: '',
    }));
    setIsOtpSent(false)
  }, [])

  useEffect(() => {
    if (Platform.OS === 'android') {
      headlessModule.initHeadless(appId);
      headlessModule.setHeadlessCallback(onHeadlessResult);
      console.log("Otpless: android headless init done");
    }
    headlessModule.setWebViewInspectable(true);
    return () => {
      headlessModule.clearListener();
    };
  }, []);

  let loaderVisibility = true;

  const handleResult = (data) => {
    handleChange('result', JSON.stringify(data));
  };

  const loginPage = () => {

  };

  const isWhatsappInstalled = () => {
    module.isWhatsappInstalled((hasWhatsapp) => {
      const message = `Whatsapp installation status: ${hasWhatsapp}`;
      console.log(message);
      handleChange('result', message);
    });
  };

  const toggleLoaderVisibility = () => {
    loaderVisibility = !loaderVisibility;
    module.setLoaderVisibility(loaderVisibility);
  };

  const startHeadless = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios' && !isIosHeadlessInit) {
        headlessModule.initHeadless(appId);
        headlessModule.setHeadlessCallback(onHeadlessResult);
        setIosHeadlessInit(true);
        console.log("Otpless: ios headless init done and returning");
        return;
      }
      let headlessRequest = {};
      const { phoneNumber, countryCode, otp, channelType } = form;
      if (phoneNumber.length < 10) {
        Alert.alert("Invalid Entry", "Please enter a valid Mobile Number or Email ID!.");
        throw new Error("Invalid Mobile or Email")
        return;
      }
      if (phoneNumber) {
        if (isNaN(Number(phoneNumber))) {
          headlessRequest = { email: phoneNumber, otp: otp || undefined };
        } else {
          headlessRequest = { phone: phoneNumber, countryCode, otp: otp || undefined };
        }
        dispatch(setLoginRegisterData({
          loginIdentifier: phoneNumber,
          countryCode: countryCode
        }))
        await AsyncStorage.setItem("contactIdentifier", phoneNumber);
        await AsyncStorage.setItem("countryCode", countryCode);
      } else {
        headlessRequest = { channelType };
      }
      setIsOtpSent(true);
      setTimeLeft(30);
      headlessModule.startHeadless(headlessRequest);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);

    }
  };

  const onHeadlessResult = async (data) => {
    try {
      setLoading(true);
      console.log("=====onHeadlessResult======");
      console.log(JSON.stringify(data));
      handleChange('result', JSON.stringify(data));

      if (data.statusCode === 200) {
        if (data.responseType === "VERIFY") {
          console.log("Verified");
        } else if (data.responseType === "ONETAP") {
          const { phoneNumber, countryCode } = form;
          // console.log(loginRegisterData, "huahiudhiashdiahsidhiashdiashiidaish")
          // const ph = loginRegisterData.loginIdentifier;
          // const code = loginRegisterData.countryCode;
          const ph = await AsyncStorage.getItem("contactIdentifier");
          const code = await AsyncStorage.getItem("countryCode");
          console.log("Logging in with:", ph, {
            loginIdentifier: ph,
            countryCode: code,
            otplessToken: data.response.token,
          }, `${BASE_URL}/user/login`);

          const loginRes = await axios.post(`${BASE_URL}/user/login`, {
            loginIdentifier: ph,
            countryCode: code,
            otplessToken: data.response.token,
          });

          console.log('Login response:', loginRes);

          const { requireRegistration, access_token } = loginRes.data.data;

          if (access_token) {
            await AsyncStorage.setItem("accessToken", access_token);

            if (!requireRegistration) {
              navigation.replace('MainHome');
            } else {
              navigation.navigate('VerifyAadhaar', { phoneNumber, countryCode });
            }
          } else {
            navigation.navigate('VerifyAadhaar', { phoneNumber, countryCode });
          }
        }
      } else {
        console.log(data.response, "hihi");
        Alert.alert("Error", data.response.errorMessage);
      }
    } catch (error) {
      console.log("Error in onHeadlessResult:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (fieldName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const googleSignInButton = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      console.log('Google Sign-In result:', signInResult);

      const idToken = signInResult?.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
      console.log(firebaseUserCredential)
      console.log('User successfully signed in with Firebase.');
      const firebaseIdToken = await firebaseUserCredential.user.getIdToken();
      console.log('Firebase ID Token:', firebaseIdToken);

      const payload = { result: { _tokenResponse: { idToken: firebaseIdToken } } }
      const loginRes = await axios.post(`${BASE_URL}/user/ssoLogin`, payload);
      console.log('Login response:', loginRes);

      const { requireRegistration, access_token } = loginRes.data.data;

      if (access_token) {
        await AsyncStorage.setItem("accessToken", access_token);
        if (!requireRegistration) {
          navigation.replace('MainHome');
        } else {
          navigation.navigate('VerifyAadhaar', { phoneNumber: signInResult.data.user.email, countryCode: "+91" });
        }
      } else {
        navigation.navigate('VerifyAadhaar', { phoneNumber: signInResult.data.user.email, countryCode: "+91" });
      }
    } catch (error) {
      console.error('Google Sign-In or API error:', error, error.response);
      handleGoogleSignInError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInError = (error) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the Google Sign-In flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign-In operation is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services not available or outdated');
    } else {
      console.log('An unexpected error occurred:', error);
    }
  };



  const handleBack = () => {
    setForm((prevForm) => ({
      ...prevForm,
      otp: "",
    }));
    setIsOtpSent(false);
    setLoading(false);
  }

  const resendOTP = () => {
    if (timeLeft !== 0) return;
    setForm((prevForm) => ({
      ...prevForm,
      otp: "",
    }));
    setIsOtpSent(false);
    setTimeLeft(60);
    setLoading(false);
  };

  return (
    <SafeAreaView className="bg-user flex-1">
      {isOtpSent ? (
        <View className="flex-1 bg-white p-5">
          <Pressable onPress={handleBack} className="pb-4 mt-7">
            <BackArrowIcon />
          </Pressable>
          <Text className="my-2 text-lg font-psemibold ">Verify OTP</Text>
          <Text className="my-2 text-sm font-pregular  text-gray-400 ">
            Please enter OTP received at your mobile number {form.countryCode} - {form.phoneNumber}
          </Text>
          <View className="px-3">
            <OtpComponent length={6} onChange={(text) => handleChange('otp', text)} />
          </View>

          <View className="flex-row justify-between px-3">
            <Text className="my-2 text-sm font-pregular  text-gray-400 ">
              Auto Fetching
            </Text>
            <Text className="my-2 text-sm font-pregular  text-gray-400 ">
              {timeLeft}s
            </Text>
          </View>
          <Text className="my-2 text-sm font-pregular text-center mt-6">
            Didn't receive an OTP?
          </Text>
          <Pressable onPress={resendOTP} disabled={timeLeft !== 0}>
            <Text className="my-2 text-sm font-pregular text-center text-user mb-8 underline">
              Resend OTP
            </Text>
          </Pressable>

          {/* <Link> */}
          <Pressable onPress={startHeadless} disabled={loading}>
            <ButtonComponent text={"Submit"} />
          </Pressable>
        </View>
      ) : <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          display: 'flex',
        }}>
        <View className="flex-1 items-center mt-32 mb-8">
          <Text className=" text-2xl text-center mb-2  text-white font-psemibold ">
            Welcome to
          </Text>
          <Image source={require('../../assets/images/logoWhite.png')} />
        </View>
        <View className="  items-center  my-3">
          <Text className="text-white text-xl text-center mb-5 font-psemibold ">
            Sign Up or Login
          </Text>

          <View className="flex-row justify-between px-6 space-x-3 ">
            <View className="flex-row items-center space-x-1 px-3 bg-white rounded-lg flex-2">
              {/* <CountryCode
                selectedCode={form.countryCode}
                // setSelectedCode={setSelectedCode}
                setSelectedCode={(text) => handleChange('countryCode', text)}
              /> */}
              <Text className="text-black">+91</Text>
            </View>
            <View className="flex-row items-center space-x-1 px-1   bg-white  rounded-lg flex-1">
              <TextInput
                placeholder="Enter your mobile or email address"
                // onChangeText={setPhoneNo}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                value={form.phoneNumber}
                className= {Platform.OS === 'ios' ? "text-left text-gray-300 font-pregular text-sm flex-1 m-3  text-black " : "text-left text-gray-300 font-pregular text-sm flex-1 mt-1  text-black "}
              />
            </View>
          </View>
          <Pressable
            className="flex-row  mx-6 my-4 items-center space-x-1    bg-white py-2 rounded-lg "
            onPress={() => {
              startHeadless();
            }}
            disabled={loading}
          >
            <Text className="w-full text-center text-base font-psemibold text-user">
              Verify
            </Text>
          </Pressable>

          {/* Google authentication */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={googleSignInButton}
              style={styles.googleButton}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="-0.5 0 48 48">
                <G fill="none">
                  <Path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    fill="#FBBC05"
                  />
                  <Path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    fill="#EB4335"
                  />
                  <Path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    fill="#34A853"
                  />
                  <Path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    fill="#4285F4"
                  />
                </G>
              </Svg>
              <Text className="text-user pb-1 font-semibold mt-1 ml-2">
                Continue with Google
              </Text>
            </Pressable>
          </View>
          <Pressable>
            <Text className=" text-center font-psemibold text-sm text-white">
              Have a <Text className=" underline">Referral code?</Text>
            </Text>
          </Pressable>
        </View>
        <View className="flex-1 mt-32 items-center px-5">
          <Text className="text-center font-psemibold text-sm text-white">
            By continuing you agree to Apps{' '}
            <Text
              style={{
                verticalAlign: 'baseline',
                lineHeight: 20
              }}
            >
              <Pressable onPress={() => navigation.navigate("Terms")}>
                <Text className="text-sm font-psemibold text-white">
                  Terms and Conditions
                </Text>
              </Pressable>
            </Text>
            {' '}and{' '}
            <Text
              style={{
                verticalAlign: 'baseline',
                lineHeight: 20
              }}
            >
              <Pressable onPress={() => navigation.navigate("Privacy")}>
                <Text className="text-sm font-psemibold text-white">
                  Privacy Policy
                </Text>
              </Pressable>
            </Text>
            .
          </Text>
        </View>

      </ScrollView>}
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  countryCodeText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  flagImage: {
    width: 25,
    height: 25,
    borderRadius: 30,
  },
  centeredView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: 300,
    alignItems: 'center',
  },
  orText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    transform: [{ translateY: 10 }],
    backdropFilter: 'blur(800px)',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    // width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    // backgroundColor:"gray"
  },
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingTop: 10,
    paddingBottom: 10,
    width: 350,
    marginTop: 10,
    marginBottom: 20,
  },
});





