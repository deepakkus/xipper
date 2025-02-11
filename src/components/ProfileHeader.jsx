import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'; // Use React Navigation
import {BackArrowIcon, CopyIcon} from '../assets/images/Icons/ArrowIcon';
import {getInitials} from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTextClassInstance} from '../utils/TextClass';
import {GetCompanyProfile} from '../services/companyService';
import CircularLoader from './CircularLoader';
import { setUserData} from '../redux/accountRedux';
import {GetUserData} from '../services/profileService';
import { GetSellerProfile } from "../services/hotelService";
import ErrorModal from "../modals/ErrorModal";

const ProfileHeader = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [profileAPIData, setProfileAPIData] = useState([]);
  const [errorMsg, SetErrorMsg] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleErrorModal = () => setModalVisible(!isModalVisible);
  
    const handleClose = () => {
          toggleErrorModal();
    };
  

  const {userData} = useSelector(state => state.account);
  const {selectedProfile} = useSelector(state => state.account);

  const textClass = getTextClassInstance();

  useEffect(() => {
    setLoading(true);
    if (selectedProfile.type === 'user') {
      fetchPersonalProfileDetails();
    } else if (selectedProfile.type === 'company') {
      fetchCompanyProfileDetails();
    } else if (selectedProfile.type === 'hotel') {
      fetchSellerProfileDetails();
    }
  }, [selectedProfile]);

  const fetchPersonalProfileDetails = async () => {
    try {
      setLoading(true);
      const res = await GetUserData();
      dispatch(setUserData(res.data));
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCompanyProfileDetails = async () => {
    try {
      setLoading(true);
      const res = await GetCompanyProfile(selectedProfile?.XipperID);
      if (res.data.status === 'Success') {
        dispatch(setUserData(res.data.data));
        //dispatch(setProfileData(res.data.data));
        // setProfileAPIData([
        //   {
        //     title: 'Legal Entity Name',
        //     desc: res.data.data.legalEntityName || null,
        //   },
        //   {title: 'Brand Name', desc: res.data.data.brandName || null},
        //   {title: 'CIN', desc: res.data.data.cIn || null},
        //   {title: 'GST', desc: res.data.data.gst || null},
        //   {title: 'Phone Number', desc: res.data.data.phoneNumber || null},
        //   {title: 'Email', desc: res.data.data.email || null},
        //   {title: 'Xipper ID', desc: res.data.data.XipperID || null},
        // ]);
      }
      else if(res.data.status === "Fail"){
        setModalVisible(true);
        SetErrorMsg(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchSellerProfileDetails = async () => {
    try {
      setLoading(true);
      const res = await GetSellerProfile(selectedProfile?.XipperID);
      if (res.data.status === 'Success') {
        dispatch(setUserData(res.data.data));
        //dispatch(setProfileData(res.data.data));
        // setProfileAPIData([
        //   { title: "Legal Entity Name", desc: res.data.data.legalEntityName || null  },
        //   { title: "Brand Name", desc: res.data.data.brandName || null },
        //   { title: "CIN", desc: res.data.data.cinNumber || null  },
        //   { title: "GST", desc: res.data.data.gstNumber || null  },
        //   { title: "Phone Number", desc: res.data.data.phoneNumber || null  },
        //   { title: "Email", desc: res.data.data.email || null  },
        //   { title: "Xipper ID", desc: res.data.data.XipperID || null  },
        // ]);
      }
      else if(res.data.status === "Fail"){
        setModalVisible(true);
        SetErrorMsg(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };

  const goBackToScreen = () => {
    if (props.navBack) {
      navigation.navigate(props.navBack);
    } else {
      navigation.goBack();
    }
  };
  return (
    <View className="mb-6">
      <View
        className={
          Platform.OS === 'ios'
            ? 'flex-row justify-between items-center p-2'
            : 'flex-row justify-between items-center'
        }>
        <Pressable onPress={() => goBackToScreen()} className="h-auto">
          <BackArrowIcon />
        </Pressable>
        <Text className="font-poppins font-header text-header text-black text-center">
          {textClass.getTextString('TXT27')}
        </Text>
        <Image source={require('../assets/images/Action/search.png')} />
      </View>
      {loading && <CircularLoader />}
      <View className="flex justify-center items-center">
        {selectedProfile.type === 'user' ? (
          <View className="items-center bg-user justify-center mt-4 w-24 h-24 rounded-full flex">
            <Text className="text-[32px]  text-white font-pregular">
              {getInitials(userData?.user?.fullName)}
            </Text>
          </View>
        ) : selectedProfile.type === 'company' ? (
          <View className="items-center bg-company justify-center mt-4 w-24 h-24 rounded-full flex">
            <Text className="text-[32px]  text-white font-pregular">
              {getInitials(userData?.legalEntityName)}
            </Text>
          </View>
        ) : (
          <View className="items-center bg-seller justify-center mt-4 w-24 h-24 rounded-full flex">
            <Text className="text-[32px]  text-white font-pregular">
              {getInitials(userData?.legalEntityName)}
            </Text>
          </View>
        )}
      </View>

      {selectedProfile.type === 'user' ? (
        <View className="mt-5">
          <Text className="font-pmedium text-lg text-center">
            {userData?.user?.fullName}
          </Text>
          <Pressable className="flex-row justify-center items-center gap-1">
            <Text className="font-pregular text-xsm mr-2 text-black text-center">
              {userData?.user?.XipperID}
            </Text>
            <CopyIcon />
          </Pressable>
        </View>
      ) : selectedProfile.type === 'company' ? (
        <View className="mt-5">
          <Text className="font-pmedium text-lg text-center">
            {userData?.legalEntityName}
          </Text>
          <Pressable className="flex-row justify-center items-center gap-1">
            <Text className="font-pregular text-xsm mr-2 text-black text-center">
              {userData?.XipperID}
            </Text>
            <CopyIcon />
          </Pressable>
        </View>
      ) : (
        <View className="mt-5">
          <Text className="font-pmedium text-lg text-center">
            {userData?.legalEntityName}
          </Text>
          <Pressable className="flex-row justify-center items-center gap-1">
            <Text className="font-pregular text-xsm mr-2 text-black text-center">
              {userData?.XipperID}
            </Text>
            <CopyIcon />
          </Pressable>
        </View>
      )}
       {
        errorMsg ? (
          <ErrorModal
          isModalVisible={isModalVisible}
          toggleErrorModal={toggleErrorModal}
          handleBack={handleClose}
          heading={"Error!"}
          content={errorMsg}
       />
        ) : ''
      }
    </View>
  );
};

export default ProfileHeader;
