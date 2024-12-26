import { maskNumber } from '../../utils/utils';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GuestDetails = ({ guestData }) => {
  console.log(guestData)
  const addressComponents = [
    guestData?.user?.address?.[0]?.house,
    guestData?.user?.address?.[0]?.street,
    guestData?.user?.address?.[0]?.landmark,
    guestData?.user?.address?.[0]?.city,
    guestData?.user?.address?.[0]?.state,
    guestData?.user?.address?.[0]?.pin,
  ];

  const filteredAddress = typeof (guestData?.user?.address?.[0]) === "string"
    ? guestData?.user?.address?.[0]
    : addressComponents.filter(Boolean).join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }}
          style={styles.image}
        />
        <Text style={styles.guestName}>{guestData?.user?.fullName}</Text>
      </View>
      {guestData?.user?.contactNumbers.length > 0 && guestData.user.contactNumbers[0].number && (
        <View style={styles.row}>
          <Text style={styles.label}>Phone number:</Text>
          <Text style={styles.value}>{guestData.user.contactNumbers[0].number}</Text>
        </View>
      )}
      {filteredAddress.length > 0 &&
        (<>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {filteredAddress}
            </Text>
          </View>
        </>)
      }
      {guestData.user?.contactEmails.length > 0 && guestData.user.contactEmails[0].email && (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Email address:</Text>
            <Text style={styles.value}>{guestData.user.contactEmails?.[0]?.email}</Text>
          </View>
        </>
      )}
      {guestData.user?.dob && (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{guestData.user.dob}</Text>
          </View>
        </>
      )}
      {guestData.user?.gender && (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{guestData.user.gender === "M" ? "Male" : "Female"}</Text>
          </View>
        </>
      )}
      {guestData.user?.aadhaarNumber ? (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>{"Aadhaar Number:"}</Text>
            <Text style={styles.value}>{maskNumber(guestData.user.aadhaarNumber, "aadhaar")}</Text>
          </View>
        </>
      ) : <></>}
      {guestData.user?.PassportFileNumber ? (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>{"Passport:"}</Text>
            <Text style={styles.value}>{maskNumber(guestData.user.PassportFileNumber, "passport")}</Text>
          </View>
        </>
      ) : <></>}

      {guestData.user?.documents && guestData.user?.documents?.passportFileNumber ? (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>{"Passport:"}</Text>
            <Text style={styles.value}>{maskNumber(guestData.user.documents.passportFileNumber, "passport")}</Text>
          </View>
        </>
      ) : <></>}
      {guestData.user?.documents && guestData.user?.documents?.aadhaarNumber ? (
        <>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>{"Aadhaar Number:"}</Text>
            <Text style={styles.value}>{maskNumber(guestData.user.documents.aadhaarNumber, "aadhaar")}</Text>
          </View>
        </>
      ) : <></>}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#00000099',
    flex: 1,
    marginRight: 10,
  },
  value: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
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
  },
  separator: {
    height: 1,
    backgroundColor: '#000000',
    opacity: 0.1,
    marginVertical: 6,
  },
});

export default GuestDetails;
