import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { BackArrowIcon, CrossIcon, DropDownArrow } from '../assets/images/Icons/ArrowIcon';
import { GetAddServiceRequestDetails } from '../services/servicesService';

const ServiceRequest = ({ visible, onClose }) => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedRoomService, setSelectedRoomService] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    services: [],
    roomServices: [],
  });
  const services = ["Buffet Breakfast", "Water Bottle", "Conference Hall"];
  const roomServices = ["Housekeeping", "Laundry", "Room Dining"];

  const fetchServiceDetails = async () => {
    setLoading(true); 
    try {
      const res = await GetAddServiceRequestDetails();
      console.log(res.data.results);
      setData({...data, services: res.data.results.map((i)=>i.name)})
    } catch (e) {
      console.error('Error fetching service details:', e);
    } finally {
      setLoading(false);  // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowServiceDropdown(false);
  };

  const handleRoomServiceSelect = (service) => {
    setSelectedRoomService(service);
    setShowRoomDropdown(false);
  };

  const handleOutsidePress = () => {
    setShowServiceDropdown(false);
    setShowRoomDropdown(false);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Pressable onPress={onClose}>
                  <BackArrowIcon />
                </Pressable>
                <Text style={styles.modalTitle}>Add Service Request</Text>
                <Pressable onPress={onClose}>
                  <CrossIcon />
                </Pressable>
              </View>

              <Text style={styles.label}>Select the Service Type</Text>
              <Pressable onPress={() => setShowRoomDropdown(!showRoomDropdown)} style={styles.input}>
                <Text style={styles.inputText}>{selectedRoomService || "Select the Service Type"}</Text>
                <DropDownArrow />
              </Pressable>

              {showRoomDropdown && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={roomServices}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleRoomServiceSelect(item)} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              )}

              <Text style={styles.label}>Select Service</Text>
              <Pressable onPress={() => setShowServiceDropdown(!showServiceDropdown)} style={styles.input}>
                <Text style={styles.inputText}>{selectedService || "Select Service"}</Text>
                <DropDownArrow />
              </Pressable>

              {showServiceDropdown && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={services}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleServiceSelect(item)} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              )}

              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the Quantity"
                value={roomNumber}
                onChangeText={setRoomNumber}
                placeholderTextColor={'#000'}
                color={'#000'}
              />

              <Text style={styles.label}>Enter Room No.</Text>
              <TextInput
                style={styles.input}
                placeholder="Room No."
                value={roomNumber}
                onChangeText={setRoomNumber}
                placeholderTextColor={'#000'}
                color={'#000'}
              />

              <Pressable style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE830C',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 15,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  inputText: {
    fontSize: 14,
    color: 'black',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 14,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServiceRequest;
