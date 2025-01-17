import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calender } from '../../assets/images/Icons/TravalIons';
import { useSelector } from 'react-redux';
import { DateFormatLong } from '../../utils/utils';

const BookingDetails = ({ showDetails, handleViewBill }) => {
  const { bookingDetails } = useSelector((state) => state.business);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <View style={styles.dateBox}>
            <View style={styles.row}>
              <Calender style={styles.icon} color="rgba(0, 0, 0, 0.4)" />
              <Text style={styles.label}>Check-In Date</Text>
            </View>
            <Text style={styles.date}>{DateFormatLong(bookingDetails.checkInDate)}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.dateBox}>
            <View style={styles.row}>
              <Calender style={styles.icon} color="rgba(0, 0, 0, 0.4)" />
              <Text style={styles.label}>Check-Out Date</Text>
            </View>
            <Text style={styles.date}>{DateFormatLong(bookingDetails.checkOutDate)}</Text>
          </View>
        </View>
      </View>

      {!showDetails && (
        <View style={styles.subtextContainer}>
          <View style={styles.subtextBox}>
            <Text style={styles.subtext}>{bookingDetails.totalGuests} Adults | {bookingDetails.totalRooms} Room</Text>
          </View>
          <View style={styles.subtextBox}>
            <Text style={styles.subtextout}>PNR - {bookingDetails.bookingId}</Text>
          </View>
        </View>
      )}

      {showDetails && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Room No - {bookingDetails.roomNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewBill}>
            <Text style={styles.buttonText}>View Bill</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    width : Platform.OS === 'ios' ? '50%': '',
    alignItems: 'center',
  },
  dateBox: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: 150,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: 'bold',
    // marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 2
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },

  subtextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subtextBox: {
    alignItems: 'center',
    width: 140,
  },
  subtext: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  subtextout: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FE830C',
  },
  buttonText: {
    color: '#FE830C',
    fontWeight: 'bold',
  },
});

export default BookingDetails;
