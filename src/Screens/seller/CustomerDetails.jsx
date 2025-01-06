import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal, ScrollView, SafeAreaView } from 'react-native';
import BookingDetails from './BookingDetails';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import Approval from './Approval';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CheckOutGuest } from '../../services/sellerService';
import { CrossIcon } from '../../assets/images/Icons/ArrowIcon';
import BillSeller from './BillSeller';
import Orders from './Order';



const CustomerDetails = () => {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [viewBill, setViewBill] = useState(false);

  const handleCheckOut = () => {
    setIsModalVisible(true);
  };

  const confirmCheckOut = async () => {
    try {
      const response = await CheckOutGuest();
      console.log(response);
      if (response && response.status === 200) {
        setIsAccepted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewBill = () => {
    setViewBill(true);
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => nav.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.heading}>Customer Details</Text>
        </View>
        <BookingDetails showDetails={true} handleViewBill={handleViewBill} />

        {viewBill ? (
          <View>
          <SafeAreaView>
            <ScrollView>
              <Orders />
              <BillSeller />
            </ScrollView>
          </SafeAreaView>
        </View>
        ) : (
        <Approval bookingData={params.data} guestData={params.data.guests} type={"customers"} />
        )}

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.approveButton}
            onPress={handleCheckOut}
          >
            <Text style={styles.buttonText}>Check Out</Text>
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: (Platform.OS === 'ios') ? 30 : 10,
    backgroundColor: '#F5F5F5', // Light background color for contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Space between header and content
  },
  backButton: {
    marginRight: 16, // Space between the back button and heading
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000', // Heading color
    marginLeft: 70
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
  disabledButton: {
    backgroundColor: '#ccc',
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

export default CustomerDetails;
