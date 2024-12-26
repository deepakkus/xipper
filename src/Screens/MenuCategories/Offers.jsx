import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Navbar from './Navbar'; // Assuming you have a React Native-compatible Navbar component
import Icon from 'react-native-vector-icons/Ionicons';
import hotel from '../assets/homepage1.png'; // Ensure the image is in the correct path

const Offers = () => {
  const buttons = ['Shopping', 'Food', 'Travel', 'Health', 'Services'];
  const hotels = [
    {
      name: 'Hotel Radisson Blue',
      location: 'Vijaynagar, Indore | 1.1 Km from silicon city',
      image: hotel,
    },
    {
      name: 'Mariot',
      location: 'Vijaynagar, Indore | 1.1 Km from silicon city',
      image: hotel,
    },
    {
      name: 'The Plaza',
      location: 'Vijaynagar, Indore | 1.1 Km from silicon city',
      image: hotel,
    },
    // Add more hotels as needed
  ];

  return (
    <View style={styles.container}>
      <Navbar offers={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Offers!! <Text style={styles.highlight}>picked for you</Text>
          </Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button === 'Food'
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}>
                <Text
                  style={
                    button === 'Food'
                      ? styles.activeButtonText
                      : styles.inactiveButtonText
                  }>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.hotelContainer}>
          {hotels.map((hotel, index) => (
            <View key={index} style={styles.hotelCard}>
              <View>
                <Image
                  source={hotel.image}
                  style={styles.hotelImage}
                  resizeMode="cover"
                />
                <View style={styles.overlay}></View>
                <View style={styles.icons}>
                  <Icon name="heart-outline" style={styles.icon} />
                  <Icon name="ellipsis-vertical" style={styles.icon} />
                </View>
                <View style={styles.discountText}>
                  <Text style={styles.discountTitle}>Save 30% on</Text>
                  <Text style={styles.discountSubtitle}>family</Text>
                </View>
              </View>
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <Text style={styles.hotelLocation}>
                  <Icon name="location-outline" style={styles.locationIcon} />{' '}
                  {hotel.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F6FA'},
  scrollView: {flex: 1},
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontSize: 28, fontWeight: '600'},
  highlight: {color: '#6D38C3'},
  buttonContainer: {flexDirection: 'row'},
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6D38C3',
  },
  inactiveButton: {backgroundColor: '#6D38C3'},
  activeButtonText: {color: '#6D38C3'},
  inactiveButtonText: {color: 'white'},
  hotelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  hotelCard: {width: '45%', marginVertical: 10},
  hotelImage: {width: '100%', height: 150, borderRadius: 10},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
  },
  icons: {position: 'absolute', top: 10, right: 10, flexDirection: 'row'},
  icon: {fontSize: 24, color: 'white', marginHorizontal: 5},
  discountText: {position: 'absolute', left: 10, top: '40%'},
  discountTitle: {fontSize: 18, fontWeight: '600', color: 'white'},
  discountSubtitle: {fontSize: 18, fontWeight: '600', color: 'white'},
  hotelInfo: {paddingTop: 8},
  hotelName: {fontSize: 16, fontWeight: '600'},
  hotelLocation: {flexDirection: 'row', alignItems: 'center', color: '#777'},
  locationIcon: {fontSize: 16, color: '#777'},
});

export default Offers;
