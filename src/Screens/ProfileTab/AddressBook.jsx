// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ProfileHeader from "../../components/ProfileHeader";
// import AddButton from "../../components/AddButton";
// import { PhoneIcon } from "@/assets/images/Icons/PersonalInfo";
// import {
//   BackArrowIcon,
//   LocationIcon,
//   RemoveDataIcon,
//   ThreeDotIcon,
// } from "../../assets/images/Icons/ArrowIcon";
// import AddModal from "../../modals/AddModal";
// import DeleteModal from "../../modals/DeleteModal";
// import { HomeIcon } from "../../assets/images/Icons/TabBarIcon";
// import ButtonComponent from "../../components/ButtonComponent";
// import { GetAddresses } from "../../services/profileService";
// import { setPersonalInfo } from "../../redux/accountRedux";
// import { useDispatch, useSelector } from "react-redux";

// import { Button, Alert, TextInput } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';

// // Initialize Geocoder with your API Key
// // Geocoder.init('AIzaSyBzOzDZtVfDlIQ6f5avmkDc9ZItIy6gtNU');

// // const MapScreen = () => {
// //   const [latitude, setLatitude] = useState(37.78825);
// //   const [longitude, setLongitude] = useState(-122.4324);
// //   const [address, setAddress] = useState('');

// //   const handleSearch = () => {
// //     Geocoder.from(address)
// //       .then(json => {
// //         const location = json.results[0].geometry.location;
// //         setLatitude(location.lat);
// //         setLongitude(location.lng);
// //         Alert.alert('Location Found', `Lat: ${location.lat}, Lng: ${location.lng}`);
// //       })
// //       .catch(error => console.error("Error", error));
// //   };

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <TextInput
// //         style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
// //         placeholder="Enter address"
// //         value={address}
// //         onChangeText={setAddress}
// //       />
// //       <Button title="Search" onPress={handleSearch} />
// //       <MapView
// //         style={{ flex: 1 }}
// //         initialRegion={{
// //           latitude,
// //           longitude,
// //           latitudeDelta: 0.0922,
// //           longitudeDelta: 0.0421,
// //         }}
// //         showsUserLocation={true}
// //         loadingEnabled={true}
// //       >
// //         <Marker
// //           coordinate={{ latitude, longitude }}
// //           title="Current Location"
// //         />
// //       </MapView>
// //     </View>
// //   );
// // };

// import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';
// // import Geolocation from 'react-native-geolocation-service';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// // const Maps = () => {
// //   const [region, setRegion] = useState({
// //     latitude: 37.78825,
// //     longitude: -122.4324,
// //     latitudeDelta: 0.0922,
// //     longitudeDelta: 0.0421,
// //   });
// //   const [marker, setMarker] = useState(null);

// //   useEffect(() => {
// //     const requestLocationPermission = async () => {
// //       if (Platform.OS === 'android') {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //           {
// //             title: 'Location Permission',
// //             message: 'This app needs access to your location.',
// //             buttonNeutral: 'Ask Me Later',
// //             buttonNegative: 'Cancel',
// //             buttonPositive: 'OK',
// //           },
// //         );
// //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //           getCurrentLocation();
// //         } else {
// //           console.log('Location permission denied');
// //         }
// //       } else {
// //         getCurrentLocation();
// //       }
// //     };

// //     requestLocationPermission();
// //   }, []);

// //   const getCurrentLocation = () => {
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude } = position.coords;
// //         setRegion({ ...region, latitude, longitude });
// //         setMarker({ latitude, longitude });
// //       },
// //       (error) => {
// //         console.log(error.code, error.message);
// //       },
// //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
// //     );
// //   };

// //   const handlePlaceSelect = (data, details) => {
// //     const { geometry } = details;
// //     const { location } = geometry;
// //     setMarker(location);
// //     setRegion({
// //       ...region,
// //       latitude: location.lat,
// //       longitude: location.lng,
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <GooglePlacesAutocomplete
// //         placeholder='Search'
// //         onPress={handlePlaceSelect}
// //         query={{
// //           key: 'AIzaSyBzOzDZtVfDlIQ6f5avmkDc9ZItIy6gtNU',
// //           language: 'en',
// //         }}
// //         styles={{
// //           container: {
// //             position: 'absolute',
// //             top: 50,
// //             left: 10,
// //             right: 10,
// //             zIndex: 1,
// //           },
// //           textInputContainer: {
// //             backgroundColor: '#fff',
// //             borderRadius: 5,
// //             paddingHorizontal: 10,
// //           },
// //         }}
// //       />
// //       <MapView style={styles.map} region={region}>
// //         {marker && <Marker coordinate={marker} />}
// //       </MapView>
// //       <Button title="Locate Me" onPress={getCurrentLocation} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     flex: 1,
// //   },
// // });

// // import React, { useEffect, useState } from 'react';
// // import { View, StyleSheet, Button, PermissionsAndroid, Platform } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// // import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const Maps = () => {
//   const [region, setRegion] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   const [marker, setMarker] = useState(null);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         console.log("hoiii")
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } else {
//         getCurrentLocation();
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setRegion({ ...region, latitude, longitude });
//         setMarker({ latitude, longitude });
//       },
//       (error) => {
//         console.error(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   };

//   const handlePlaceSelect = (data, details) => {
//     const { geometry } = details;
//     const { location } = geometry;
//     setMarker(location);
//     setRegion({
//       latitude: location.lat,
//       longitude: location.lng,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         placeholder='Search'
//         onPress={handlePlaceSelect}
//         query={{
//           key: 'AIzaSyBzOzDZtVfDlIQ6f5avmkDc9ZItIy6gtNU', // Replace with your actual Google Places API key
//           language: 'en',
//         }}
//         styles={{
//           container: {
//             position: 'absolute',
//             top: 50,
//             left: 10,
//             right: 10,
//             zIndex: 1,
//           },
//           textInputContainer: {
//             backgroundColor: '#fff',
//             borderRadius: 5,
//             paddingHorizontal: 10,
//           },
//         }}
//       />
//       <MapView style={styles.map} region={region} showsUserLocation={true}>
//         {marker && <Marker coordinate={marker} />}
//       </MapView>
//       <Button title="Locate Me" onPress={getCurrentLocation} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// const AddressBook = () => {
//   const dispatch = useDispatch();
//   const { personalInfo } = useSelector((state) => state.account);
//   const [data, setData] = useState(personalInfo?.addresses || []);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const fetchAddresses = async () => {
//     try {
//       const res = await GetAddresses();
//       dispatch(setPersonalInfo({ key: "addresses", value: res }))
//       setData(res);
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   useEffect(() => {
//     if (!personalInfo["addresses"]) {
//       fetchAddresses();
//     }
//   }, [personalInfo]);

//   return (
//     <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
//       {isModalVisible ? (
//         <>
//           {/* <SearchLocation toggleModal={toggleModal} /> */}
//           {/* <MapScreen/> */}
//           <Maps/>
//         </>
//       ) : (
//         <>
//           <ProfileHeader />
//           <Text className="font-psemibold text-lg text-black ">
//             Address Book
//           </Text>
//           <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
//             {data.length > 0
//               ? data.map((item, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginTop: 10,
//                     backgroundColor: "#FFFFFF",
//                     padding: 10,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <View
//                     style={{ flexDirection: "row", alignItems: "center" }}
//                   >
//                     <View
//                       style={{
//                         paddingHorizontal: 5,
//                         marginTop: 0.5,
//                         marginRight: 10,
//                       }}
//                     >
//                       <HomeIcon fill={"#6D38C3"} />
//                     </View>
//                     <View className="flex flex-col">
//                       <Text className="font-semibold">{item.name}</Text>
//                       <Text>{`${item.house}, ${item.landmark}`}</Text>
//                       <Text>{`${item.city}, ${item.state} - ${item.pin}, ${item.country}`}</Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity>
//                     <ThreeDotIcon />
//                   </TouchableOpacity>
//                 </View>
//               ))
//               : null}
//           </ScrollView>
//           <AddButton
//             title={"Add New Address"}
//             Icon={<LocationIcon color={"gray"} />}
//             onPress={toggleModal}
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export default AddressBook;

// const SearchLocation = ({ toggleModal }) => {
//   return (
//     <>
//       <View className="flex-row item-center pt-8 ">
//         <TouchableOpacity onPress={toggleModal}>
//           <BackArrowIcon />
//         </TouchableOpacity>
//         <Text className="font-psemibold text-lg text-black ml-2">
//           Search Address Location
//         </Text>
//       </View>
//      <MapScreen />
//       {/* <View className="flex-1 bg-gray-300 justify-between">
//         <View className="bg-white py-5 px-3 m-8 flex-row rounded-md">
//           <LocationIcon />
//           <Text className="ml-4">Search for building street or area</Text>
//         </View>
//         <View className="flex-row mx-20 bg-white  justify-center my-5 py-3 rounded-md">
//           <LocationIcon />
//           <Text>Locate Me</Text>
//         </View>
//       </View> */}
//       <View className=" p-5 mb-5">
//         <View className="flex-row justify-between">
//           <LocationIcon />
//           <Text>G-307 679, Silicon City, T...</Text>
//           <View>
//             <Text>Change</Text>
//           </View>
//         </View>
//         <Text>G-307 679, Silicon City, T</Text>
//         <Text>G-307 679, </Text>

//         <TouchableOpacity
//           onPress={toggleModal}
//           className="flex-row mx-20 bg-primary  justify-center  py-3 rounded-md"
//         >
//           <LocationIcon />
//           <Text className="text-white">Locate Me</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import ProfileHeader from "../../components/ProfileHeader";
// import AddButton from "../../components/AddButton";
// import { PhoneIcon, LocationIcon } from "../../assets/images/Icons/PersonalInfo";
// import { ThreeDotIcon, BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
// import { GetAddresses } from "../../services/profileService";
// import { setPersonalInfo } from "../../redux/accountRedux";
// import Maps from "./Maps"; // Adjust the import path accordingly

// const AddressBook = () => {
//   const dispatch = useDispatch();
//   const { personalInfo } = useSelector((state) => state.account);
//   const [data, setData] = useState(personalInfo?.addresses || []);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const fetchAddresses = async () => {
//     try {
//       const res = await GetAddresses();
//       dispatch(setPersonalInfo({ key: "addresses", value: res }));
//       setData(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     if (!personalInfo["addresses"]) {
//       fetchAddresses();
//     }
//   }, [personalInfo]);

//   return (
//     <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#F8F9FA' }}>
//       {isModalVisible ? (
//         // <Maps />
//         <></>
//       ) : (
//         <>
//           <ProfileHeader />
//           <Text style={{ fontWeight: '600', fontSize: 18, color: 'black' }}>
//             Address Book
//           </Text>
//           <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginTop: 10,
//                     backgroundColor: "#FFFFFF",
//                     padding: 10,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <LocationIcon fill={"#6D38C3"} />
//                     <View style={{ marginLeft: 10 }}>
//                       <Text style={{ fontWeight: '600' }}>{item.name}</Text>
//                       <Text>{`${item.house}, ${item.landmark}`}</Text>
//                       <Text>{`${item.city}, ${item.state} - ${item.pin}, ${item.country}`}</Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity>
//                     <ThreeDotIcon />
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text>No addresses found.</Text>
//             )}
//           </ScrollView>
//           <AddButton
//             title={"Add New Address"}
//             Icon={<LocationIcon color={"gray"} />}
//             onPress={toggleModal}
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export default AddressBook;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import AddButton from '../../components/AddButton';
import {PhoneIcon, LocationIcon} from '../../assets/images/Icons/PersonalInfo';
import {ThreeDotIcon, BackArrowIcon} from '../../assets/images/Icons/ArrowIcon';
import {GetAddresses} from '../../services/profileService';
import {setPersonalInfo} from '../../redux/accountRedux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {useNavigation, useRoute} from '@react-navigation/native';

Geocoder.init('AIzaSyBzOzDZtVfDlIQ6f5avmkDc9ZItIy6gtNU');

const AddressBook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {personalInfo} = useSelector(state => state.account);
  const [data, setData] = useState(personalInfo?.addresses || []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapError, setMapError] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setMapError(null);
  };

  const fetchAddresses = async () => {
    try {
      const res = await GetAddresses();
      dispatch(setPersonalInfo({key: 'addresses', value: res}));
      setData(res);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to fetch addresses');
    }
  };

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      Alert.alert('Error', 'Please enter an address to search');
      return;
    }

    try {
      const response = await Geocoder.from(searchAddress);
      const location = response.results[0].geometry.location;
      setMapRegion({
        ...mapRegion,
        latitude: location.lat,
        longitude: location.lng,
      });
    } catch (error) {
      console.error('Geocoding error:', error);
      Alert.alert(
        'Error',
        'Could not find the location. Please check your internet connection and try again.',
      );
    }
  };

  useEffect(() => {
    if (!personalInfo['addresses']) {
      fetchAddresses();
    }
  }, [personalInfo]);

  const MapScreen = () => (
    <View style={styles.mapContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter address"
          value={searchAddress}
          onChangeText={setSearchAddress}
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        loadingEnabled={true}
        onError={error => {
          console.error('Map Error:', error);
          setMapError(error);
        }}>
        <Marker
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          title="Selected Location"
          description={searchAddress}
        />
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={toggleModal}>
        <BackArrowIcon />
      </TouchableOpacity>

      {mapError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error loading map. Please check your connection and try again.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isModalVisible ? (
        <MapScreen />
      ) : (
        <>
          <ProfileHeader />
          <View className="p-4">
            <Pressable
              onPress={() => navigation.navigate('PersonalInfo')}
              style={styles.backBtn}>
                <BackArrowIcon />
                <Text style={styles.headerText}>Back</Text>
            </Pressable>
          </View>
          <View className="p-6">
            <Text style={styles.title}>Address Book</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {data.length > 0 ? (
              data.map((item, index) => (
                <View key={index} style={styles.addressCard}>
                  <View style={styles.addressInfo}>
                    <LocationIcon fill={'#6D38C3'} />
                    <View style={styles.addressText}>
                      <Text style={styles.addressName}>{item.name}</Text>
                      <Text className="text-black">{`${item.house}, ${item.landmark}`}</Text>
                      <Text className="text-black">{`${item.city}, ${item.state} - ${item.pin}, ${item.country}`}</Text>
                    </View>
                  </View>
                  {!item.isPrimary && (
                    <TouchableOpacity>
                      <ThreeDotIcon />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noAddressText}>No addresses found.</Text>
            )}
          </ScrollView>
          <View className="p-4 bg-gray-100">
            <AddButton
              title={'Add New Address'}
              Icon={<LocationIcon color={'gray'} />}
              onPress={toggleModal}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    //marginVertical: 10,
  },
  scrollView: {
    padding: 20,
    marginBottom: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: 10,
  },
  addressName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#6D38C3',
    padding: 10,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noAddressText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  backBtn:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  }
});

export default AddressBook;
