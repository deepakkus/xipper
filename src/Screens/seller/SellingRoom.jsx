import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const roomsData = [
  {
    id: '1',
    title: 'Executive Room',
    price: '₹ 1000',
    description: '20 people booked this week\n1000 Sq.ft',
    additional: '+ ₹ 343 inclusive of taxes and services',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600', 
  },
  {
    id: '2',
    title: 'Executive Room',
    price: '₹ 1000',
    description: '20 people booked this week\n1000 Sq.ft',
    additional: '+ ₹ 343 inclusive of taxes and services',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'Executive Room',
    price: '₹ 1000',
    description: '20 people booked this week\n1000 Sq.ft',
    additional: '+ ₹ 343 inclusive of taxes and services',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const RoomCard = ({ room }) => (
  <View style={styles.card}>
    <Image source={{ uri: room.image }} style={styles.image} />
    <View style={styles.cardContent}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{room.title}</Text>
        <Text style={styles.description}>{room.description}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.price}>{room.price}</Text>
        <Text style={styles.additional}>{room.additional}</Text>
      </View>
    </View>
  </View>
);

const MostSellingRooms = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Most Selling Rooms</Text>
      <Text style={styles.subheader}>Lorem ipsum dolor sit amet, consectetur</Text>
      <FlatList
        data={roomsData}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>View more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 4, 
        elevation: 5,
    },
    
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 16,
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
    borderColor: '#D1D1D1', 
    borderWidth: 1, 
},

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 10,
    color: '#333333',
    marginTop: 4,
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',

    marginRight: 30,
  },
  additional: {
    fontSize: 9,
    color: '#A0A0A0',
    marginTop: 4,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    paddingTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: 'bold',
  },
});

export default MostSellingRooms;
