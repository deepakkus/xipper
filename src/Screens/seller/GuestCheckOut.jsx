import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import BookingDetails from './BookingDetails';
import GuestDetails from './GuestDetails';
import Orders from './Order';
import Bill from './BillSeller';
import { BackArrowIcon, GreaterArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const GuestCheckOut = () => {
  const [checkedOut, setCheckedOut] = useState(false);
  const [viewBill, setViewBill] = useState(false);

  const handleCheckOut = () => {
    setCheckedOut(true);
  };

  const handleViewBill = () => {
    setViewBill(true);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.heading}>Guest Details</Text>
      </View>
      <BookingDetails isCheckoutPage={true} handleViewBill={handleViewBill} />


      {viewBill ? (
        <View>
          <Orders />
          <Bill />
        </View>
      ) : (
        <>
          <View style={styles.guestInfo}>
            <Text style={styles.guestText}>Guest 1</Text>
            <View style={styles.rotated}>
          <GreaterArrowIcon />
        </View>

            <GreaterArrowIcon />
          </View>
          <GuestDetails />
          <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.approveButton, checkedOut && styles.checkedOutButton]}
          onPress={handleCheckOut}
        >
          <Text style={styles.buttonText}>{checkedOut ? 'Checked-Out' : 'Check-Out'}</Text>
        </Pressable>
      </View>
        </>
      )}
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
    marginBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginLeft:70
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 34,
  },
  checkedOutButton: {
    backgroundColor: '#FE830C80',
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
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

export default GuestCheckOut;
