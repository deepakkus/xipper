import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetHotelCustomerDetails } from '../../services/servicesService';

const RoomCard = ({ guest, index, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Text style={styles.guestLabel}>{`Guest ${index + 1}`}</Text>
      <Image source={{ uri: guest.image || 'https://via.placeholder.com/60' }} style={styles.image} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.title}>{guest.guestName}</Text>
      {/* <Text style={styles.number}>{guest.roomNumber}</Text>
      <Text style={styles.email}>{guest.email}</Text> */}
    </View>
  </TouchableOpacity>
);

const GuestCard = () => {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([]);

  const getCustomerDetails = async () => {
    try {
      const res = await GetHotelCustomerDetails();
      const formattedCustomers = res.map(booking => 
        booking.guests.map(guest => ({
          guestName: guest.guestName,
          email: guest.email,
          phone: guest.phone || 'N/A',
          roomNumber: booking.roomNumber,
          roomType: booking.roomType,
        }))
      ).flat(); 
      
      setCustomers(formattedCustomers);
    } catch (e) {
      console.error('Failed to fetch customer details:', e);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const handlePress = () => {
    navigation.navigate('ApprovingDetails', { hideOptions: true });
  };

  return (
    <View style={styles.container}>
      {customers.length > 0 ? (
        <FlatList
          data={customers}
          renderItem={({ item, index }) => (
            <RoomCard guest={item} index={index} onPress={handlePress} />
          )}
          keyExtractor={(item, index) => index.toString()} 
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noDataText}>No customer data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 6,
    marginTop: 16,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 18,
    marginLeft: 12,
  },
  guestLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
    textAlign: 'center', 
    alignSelf: 'center', 
  },
  
  number: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
    marginLeft: 12,
  },
  email: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 20,
  },
});

export default GuestCard;
