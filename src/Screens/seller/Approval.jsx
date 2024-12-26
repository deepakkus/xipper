import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';

const Approval = ({ bookingData, type = "", onGuestSelect, selectedGuests, guestData = [] }) => {
  const navigation = useNavigation();

  const handleNamePress = (name) => {
    navigation.navigate('ApprovingDetails', { name, type });
  };

  const handleGuestApproval = (guestName) => {
    onGuestSelect(guestName);
  };

  return (
    <View style={styles.container}>
      {guestData.length > 0 && guestData?.map((i, ind) => (
        <View key={ind}>
          <View style={styles.headerRow}>
            <Text style={styles.guestLabel}>Guest {ind + 1}</Text>
            {type !== "customers" && <Text style={i.hotelcheckInApproved ? styles.approvedText : styles.unapprovedText}>
              {i.hotelcheckInApproved ?
                i?.roomAllocation?.room?.roomNumber
                  ? `Allocated -- ${i?.roomAllocation?.room?.roomNumber}`
                  : "Approved" : "Unapproved"}
            </Text>}
          </View>
          <View style={styles.headerRow}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }}
              style={styles.image}
            />
            <Pressable onPress={() => handleNamePress({ bookingData, guestData })}>
              <Text style={styles.guestName}>{i?.user?.fullName || i?.nonXipperUserInfo?.name}</Text>
            </Pressable>
            {type === "roomAllocation" && (
              <View style={styles.checkboxContainer}>
                {i?.roomAllocation?.room?.roomNumber
                  ? <></>
                  : <CheckBox
                    isChecked={selectedGuests.includes(i?.user?.fullName)}
                    onPress={() => handleGuestApproval(i?.user?.fullName)}
                  />}
              </View>
            )}
          </View>
        </View>
      ))}

      {guestData.length !== bookingData.totalGuests &&
        Array.from({ length: bookingData.totalGuests - guestData.length }).map((_, index) => (
          <View key={index}>
            <View style={styles.headerRow}>
              <Text style={styles.guestLabel}>Guest {guestData.length + index + 1}</Text>
              <Text style={styles.unapprovedText}>Unapproved</Text>
            </View>
            <View style={styles.headerRow}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }}
                style={styles.image}
              />
              <Text style={styles.unapprovedguestName}>Unverified</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: '#0000001A',
    opacity: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  guestName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  unapprovedguestName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EE1E25',
    flex: 1,
  },
  guestLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  approvedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3FEA19',
  },
  unapprovedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EE1E25',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 25,
    marginLeft: 'auto',
    marginRight: 1,
  },
});

export default Approval;
