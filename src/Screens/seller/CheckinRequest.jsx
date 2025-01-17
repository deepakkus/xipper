import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import BookingDetails from './BookingDetails';
import Approval from './Approval';
import { BackArrowIcon, GreaterArrowIcon, RightArrow } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CircularLoader from '../../components/CircularLoader';
import { GetCheckInGuestData } from '../../services/hotelService';
import { setBookingDetails } from '../../redux/businessRedux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CheckinRequest = ({ onBackPress }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const params = route.params;
  const [guestData, setGuestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hotelCheckInList } = useSelector((state) => state.business);

  const fetchGuestsData = async () => {
    try {
      setLoading(true);
      const res = await GetCheckInGuestData(params.bookingData.bookingId);
      const guestInfo = res.data.bookingDetails.userCheckInInfo;
      const arr = guestInfo
        .filter(i => i.user !== null || (i.user === null && Object.keys(i.nonXipperUserInfo).length > 0))
        .map(i => {
          if (i.user !== null) {
            return i;
          }
          return {
            ...i,
            user: {
              address: [i.nonXipperUserInfo.address],
              contactEmails: [{ email: i.nonXipperUserInfo.email }],
              contactNumbers: [{ number: i.nonXipperUserInfo.contactNumber }],
              fullName: i.nonXipperUserInfo.name,
              gender: i.nonXipperUserInfo.gender,
              dob: i.nonXipperUserInfo.dob,
              aadhaarNumber: i.nonXipperUserInfo.aadhaarNumber,
              PassportFileNumber: i.nonXipperUserInfo.PassportFileNumber,
              idType: i.nonXipperUserInfo.PassportFileNumber === null ? "Aadhaar Number:" : "Passport:"
            },
          };
        });

      dispatch(setBookingDetails(res.data.bookingDetails));
      setGuestData(arr);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestsData();
  }, []);

  useEffect(() => {
    if (guestData.length > 0 && guestData?.[0]?.hotelcheckInApproved) {
      nav.replace("RoomAllocation");
    }
  }, [guestData]);

  return (
    <SafeAreaProvider className={Platform.OS === 'ios' ? "pt-12 h-full" : "h-full"}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Pressable onPress={() => nav.goBack()} style={styles.backButton}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.heading}>Check - In Requests</Text>
        </View>
        <BookingDetails />
        <View style={styles.guestInfo}>
        </View>
        {guestData.length > 0 && (
          <Approval bookingData={params.bookingData} guestData={guestData} />
        )}
      </ScrollView>
      {loading && <CircularLoader />}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  guestText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
    marginHorizontal: 10,
    width: '67px',
    height: '30px',
    fontFamily: 'Poppins',
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  }
});

export default CheckinRequest;
