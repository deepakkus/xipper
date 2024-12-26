import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import {HeartIcon, ThreeDotIcon} from '../assets/images/Icons/HomeIcon'; // Adjust the path as per your directory
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const {width} = Dimensions.get('window');

const scaleFontSize = size => {
  const guidelineBaseWidth = 411;
  return size * (width / guidelineBaseWidth);
};

const HotelCard = () => {
  const nav = useNavigation();
  const { selectedProfile } = useSelector(state => state.account);
  return (
    <View style={styles.cardContainer}>
      <Pressable >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.imageBackground}
        resizeMode="cover">
        <Text style={[
            styles.discountText, 
            { backgroundColor: selectedProfile.type === 'user' ? '#06A77D' : '#6d38c3' }
          ]}>30% Off</Text>
        <View style={styles.iconContainer}>
          <HeartIcon />
          <ThreeDotIcon />
        </View>
      </ImageBackground>
      <View style={styles.ratingContainer}>
        <Text style={[
          styles.ratingText,
          {backgroundColor: selectedProfile.type === 'user' ? '#06A77D' : '#6d38c3'}
        ]}>4.2</Text>
        <Text style={[
          styles.ratingDescription,
          {color: selectedProfile.type === 'user' ? '#06A77D' : '#6d38c3'}
        ]}>
          Good <Text style={{color: 'black'}}> (120 ratings)</Text>
        </Text>
      </View>
      <View style={styles.hotelInfoContainer}>
        <Text style={styles.hotelName}>Radisson Blue</Text>
        <Text style={styles.strikeThroughPrice}>$2200</Text>
      </View>
      <View style={styles.locationPriceContainer}>
        <Text style={styles.locationText}>Vijay Nagar, Indore</Text>
        <Text style={styles.priceText}>$2200</Text>
      </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    width: width,
    maxWidth: 180,
    alignSelf: 'center',
  },
  imageBackground: {
    width: 160,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  discountText: {
    position: 'absolute',
    paddingHorizontal: 10,
    height: 24,
    borderBottomRightRadius: 8,
    color: 'white',
    fontWeight: '500',
    fontSize: scaleFontSize(14),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    paddingHorizontal: 4,
    color: 'white',
    borderRadius: 4,
    marginRight: 4,
    fontSize: scaleFontSize(12),
  },
  ratingDescription: {
    fontWeight: '500',
    fontSize: scaleFontSize(12),

  },
  hotelInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  hotelName: {
    fontWeight: '500',
    fontSize: scaleFontSize(16),
    color: 'black',
  },
  strikeThroughPrice: {
    fontWeight: '500',
    fontSize: scaleFontSize(12),
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  locationPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationText: {
    fontWeight: '500',
    fontSize: scaleFontSize(12),
    color: '#808080',
  },
  priceText: {
    fontWeight: '600',
    fontSize: scaleFontSize(12),
    color: 'black',
  },
});

export default HotelCard;
