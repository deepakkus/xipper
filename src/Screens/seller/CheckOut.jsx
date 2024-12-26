import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Modal } from 'react-native';
import { CheckOutGuest } from '../../services/sellerService';
import { CrossIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';

const BookingCard = ({ booking }) => {
  const guest = booking.userCheckInInfo?.[0];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const nav = useNavigation();
  const handleCheckOut = () => {
    setIsModalVisible(true);
  };

  const confirmCheckOut = async () => {
    try {
      const response = await CheckOutGuest();
      console.log(response.data);
      if (response && response.status === 200) {
        setIsAccepted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = () => {
    nav.navigate('BillSeller');
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s',
          }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {guest?.user?.fullName || 'Unknown Guest'}
          </Text>
          <Text style={styles.detailsText}>
            {`${new Date(booking.checkInDate).toLocaleDateString()} - ${new Date(booking.checkOutDate).toLocaleDateString()}`}
          </Text>
          <Text style={styles.detailsText}>
            {`${booking.totalRooms} Room(s), ${booking.totalGuests} Guest(s)`}
          </Text>
          <Text style={styles.detailsText}>
            {guest?.roomAllocation?.room?.room?.roomType?.name || 'Room Type Not Available'}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.approveButton} onPress={handleView}>
          <Text style={styles.buttonText}>View Bill</Text>
        </Pressable>
        <Pressable style={styles.rejectButton} onPress={handleCheckOut}>
          <Text style={[styles.buttonText, styles.rejectText]}>Check Out</Text>
        </Pressable>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {!isAccepted ? (
              <>
                <Text style={styles.modalTitle}>Check Out</Text>
                <Text style={styles.modalMessage}>
                  Are you sure you want to check out this guest?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={styles.confirmButton}
                    onPress={confirmCheckOut}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </Pressable>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-black">Check Out Successful</Text>
                  <Pressable onPress={() => setIsModalVisible(false)} className="ml-6">
                    <CrossIcon />
                  </Pressable>
                </View>
                <Text className="text-base text-gray-600">
                  The guest has been successfully checked out.
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CheckOut = ({ checkOut = [] }) => {
  console.log(checkOut);
  return (
    <View style={styles.curvedContainer}>
      {checkOut.map((booking) => (
        <BookingCard key={booking.bookingId} booking={booking} />
      ))}
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
    width: '382px',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FE830C',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FE830C',
    padding: 10,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

});

export default CheckOut;
