import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const BookingCard = ({ name, dateRange, roomDetails }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }} 
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.detailsText}>{dateRange}</Text>
          <Text style={styles.detailsText}>{roomDetails}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.buttonText}>Approve Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={[styles.buttonText, styles.rejectText]}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Booking = () => {
  const bookings = [
    { id: 1, name: 'Abhijeet Agarwal', dateRange: '27th August - 30th August', roomDetails: '1 Executive Room, 2 guests' },
    { id: 2, name: 'Abhijeet Agarwal', dateRange: '27th August - 30th August', roomDetails: '1 Executive Room, 2 guests' },
    { id: 3, name: 'Abhijeet Agarwal', dateRange: '27th August - 30th August', roomDetails: '1 Executive Room, 2 guests' },
    { id: 4, name: 'Abhijeet Agarwal', dateRange: '27th August - 30th August', roomDetails: '1 Executive Room, 2 guests' },
  ];

  return (
    <View style={styles.curvedContainer}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookingCard 
            name={item.name} 
            dateRange={item.dateRange} 
            roomDetails={item.roomDetails} 
          />
        )}
      />
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
    width:'382px',
    height: '786px',
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#FE830C',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  rejectButton: {
    borderColor: '#FE830C',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  rejectText: {
    color: '#FE830C',
  },
});

export default Booking;
