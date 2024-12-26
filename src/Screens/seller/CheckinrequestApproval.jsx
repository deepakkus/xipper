import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookingDetails from './BookingDetails';
import GuestDetails from './GuestDetails';
import Code from './Code';
import { BackArrowIcon, GreaterArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const CheckinrequestApproval = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleAllocateRoom = () => {
    setCodeModalVisible(true);
  };

  const handleCloseModal = () => {
    setCodeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.heading}>Check-In Requests</Text>
        </View>

        <BookingDetails />
        <View style={styles.guestInfo}>
          <Text style={styles.guestText}>Guest 1</Text>
          <View style={styles.rotated}>
          <GreaterArrowIcon />
        </View>

          <GreaterArrowIcon />
        </View>
        <GuestDetails />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.approveButton} onPress={handleAllocateRoom}>
            <Text style={styles.buttonText}>Allocate Room</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={codeModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Code />

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  guestText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
    marginHorizontal: 10,
    width: '67px',
    height: '30px',
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 34,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF8700',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  }
});

export default CheckinrequestApproval;
