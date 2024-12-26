import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CrossIcon, BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';

const RoomNumber = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('Select');
  const [amount, setAmount] = useState(''); 

  const roomNumbers = ['upi', 'BankTransfer', 'Credit Card', 'Cash'];
  const navigation = useNavigation();

  const handleRoomSelect = (room) => {
    setSelectedRoomNumber(room);
    setIsDropdownVisible(false);
  };

  const handleSubmit = () => {
    navigation.replace('GuestCheckOut');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable style={styles.backIcon} onPress={() => navigation.navigate('GuestCheckOut')}>
          <BackArrowIcon />
        </Pressable>
        <Pressable style={styles.crossIcon}>
          <CrossIcon />
        </Pressable>
      </View>

      <Text style={styles.instructionText}>Collect Bill</Text>

      <Text style={styles.label}>Mode Of Payment</Text>

      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.selectedRoomText}>{selectedRoomNumber}</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={roomNumbers}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleRoomSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Input box for entering amount */}
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.amountInput}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Collect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    position: 'absolute', 
    top: 10, 
    zIndex: 1,
  },

  instructionText: {
    fontSize: 16,
    color: '#FE830C',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  dropdownContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedRoomText: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  dropdown: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FE830C',
    backgroundColor: '#fff',
    marginTop: 0, 
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  amountInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginTop: 10, 
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8, 
    color: '#000000',
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: '#FE830C',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 8,
    width: '136px',
    height: '36px', 
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RoomNumber;
