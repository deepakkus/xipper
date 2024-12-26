import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateFormatLongWithoutYear } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../../redux/businessRedux';

const CheckIn = ({ bookings = [] }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBooking = (booking) => {
    dispatch(setBookingDetails(booking));
    navigation.navigate('CheckinRequest', { bookingData: booking });
  };

  return (
    <View style={styles.curvedContainer}>
      <ScrollView style={styles.container}>
        {bookings.length > 0 && bookings?.map((booking, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s" }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{booking?.userCheckInInfo?.[0]?.user?.fullName}</Text>
              <Text style={styles.dates}>{`${DateFormatLongWithoutYear(booking.checkInDate)} - ${DateFormatLongWithoutYear(booking.checkOutDate)}`}</Text>
              <Text style={styles.dates}>PNR : {booking.bookingId}</Text>
              <Text style={styles.roomDetails}>{`${booking.totalRooms} Room, ${booking.totalGuests} ${booking.totalGuests === 1 ? "Guest" : "Guests"}`}</Text>
              <Pressable style={styles.button} onPress={() => handleBooking(booking)}>
                <Text style={styles.buttonText}>{booking?.userCheckInInfo?.[0]?.hotelcheckInApproved ? "Allocate" : "Approve"}</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  curvedContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '382px',
    height: '786px',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    padding: 15,
    paddingLeft: 10,
    marginBottom: 10,
    width: '380px',
    height: '154px',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  dates: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  roomDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FE830C',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 80,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckIn;
