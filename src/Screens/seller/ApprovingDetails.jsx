import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import BookingDetails from './BookingDetails';
import GuestDetails from './GuestDetails';
import ActionButtons from './ActionButtons';
import { BackArrowIcon, GreaterArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ApproveCheckInRequest } from '../../services/hotelService';
import CircularLoader from '../../components/CircularLoader';

const ApprovingDetails = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestIndex, setGuestIndex] = useState(0);

  const handleGuestChange = (direction) => {
    if (direction === 'next' && params.name.guestData.length - 1 > guestIndex) {
      setGuestIndex((prevIndex) => (prevIndex + 1));
    } else {
      setGuestIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      console.log(params.name.guestData[guestIndex]);
      const guestData = params.name.guestData[guestIndex]
      const res = await ApproveCheckInRequest(
        params.name.bookingData.bookingId,
        isChecked ? "" : guestData.user.fullName,
        isChecked, "Reject"
      );

      if (res.status === 200) {
        nav.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async () => {
    try {
      setLoading(true);
      console.log(params.name.guestData[guestIndex]);
      const guestData = params.name.guestData[guestIndex]
      const res = await ApproveCheckInRequest(
        params.name.bookingData.bookingId,
        isChecked ? "" : guestData.user.fullName,
        isChecked, "Approve"
      );

      if (res.status === 200) {
        nav.replace("RoomAllocation")
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Pressable onPress={() => nav.goBack()} style={styles.backButton}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.heading}>{params.type === "customers" ? "Guest Details" : "Check - In Requests"}</Text>
      </View>
      <BookingDetails showDetails={params.type === "customers"} />
      <View style={styles.guestInfo}>
        <Text style={styles.guestText}>{`Guest ${guestIndex + 1}`}</Text>
        {params.name.guestData.length > 1 && (<Pressable style={styles.rotated} onPress={() => handleGuestChange('prev')}>
          <GreaterArrowIcon />
        </Pressable>)}
        {params.name.guestData.length > 1 && (
          <Pressable style={styles.arrowButton} onPress={() => handleGuestChange('next')}>
            <GreaterArrowIcon />
          </Pressable>
        )}

        {params.type !== "customers" &&
          <View style={styles.approvalSection}>
            <Text style={styles.approvalText}>Approval All</Text>
            <Pressable style={[styles.checkbox, isChecked && styles.checked]} onPress={() => setIsChecked(!isChecked)}>
              {isChecked && <Text style={styles.checkmark}>✔</Text>}
            </Pressable>
          </View>
        }
      </View>

      <GuestDetails guestData={params.name.guestData[guestIndex]} />
      {params.type !== "customers" &&
        <ActionButtons handleApprove={handleApprove} handleReject={handleReject}
          showApproved={Boolean(params.name.guestData[guestIndex]?.roomAllocation?.room?.roomNumber || params.name.guestData[guestIndex].hotelcheckInApproved)}
          approvedButtonText={
            params.name.guestData[guestIndex]?.roomAllocation?.room?.roomNumber
              ? `Allocated -- ${params.name.guestData[guestIndex]?.roomAllocation?.room?.roomNumber}`
              : params.name.guestData[guestIndex].hotelcheckInApproved && "Approved"
          }
        />}
      {loading && <CircularLoader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginLeft: 80,
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
    width: 67,
    height: 30,
    fontFamily: 'Poppins',
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
  approvalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 120,
  },
  approvalText: {
    fontSize: 20,
    marginRight: 5,
    color: 'black',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#FE830C',
  },
  checkmark: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ApprovingDetails;
