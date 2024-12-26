import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Maps = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({ ...region, latitude, longitude });
        setMarker({ latitude, longitude });
      },
      (error) => {
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handlePlaceSelect = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    setMarker(location);
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={handlePlaceSelect}
        query={{
          key: 'AIzaSyBzOzDZtVfDlIQ6f5avmkDc9ZItIy6gtNU', // Replace with your actual API key
          language: 'en',
        }}
        styles={{
          container: {
            position: 'absolute',
            top: 50,
            left: 10,
            right: 10,
            zIndex: 1,
          },
          textInputContainer: {
            backgroundColor: '#fff',
            borderRadius: 5,
            paddingHorizontal: 10,
          },
        }}
      />
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <Button title="Locate Me" onPress={getCurrentLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Maps;
