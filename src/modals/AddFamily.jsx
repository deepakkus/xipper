import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  CrossIcon,
  DropDownArrow,
  BackArrowIcon,
} from '../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';

const AddFamily = ({ isModalVisible, toggleModal, addMember }) => {
  const [relation, setRelation] = useState('');
  const [xipperId, setXipperId] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const relations = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Spouse',
    'Child',
    'Friend',
    'Other',
  ];

  const onBack = () => {
    toggleModal();
  };

  const selectRelation = (selectedRelation) => {
    setRelation(selectedRelation);
    setDropdownVisible(false);
  };

  return (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <BackArrowIcon />
          </Pressable>

          <Pressable onPress={toggleModal} style={styles.closeButton}>
            <CrossIcon />
          </Pressable>

          <Text style={styles.title}>Add Family Member</Text>

          <Text style={styles.label}>Your Relation</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.placeholderText}>
              {relation || 'Choose your relation with them'}
            </Text>
            <DropDownArrow style={styles.dropdownIcon} />
          </Pressable>

          <Text style={styles.label}>Their Relation</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.placeholderText}>
              {relation || 'Choose their relation with them'}
            </Text>
            <DropDownArrow style={styles.dropdownIcon} />
          </Pressable>

          {isDropdownVisible && (
            <View style={styles.dropdownListContainer}>
              <FlatList
                data={relations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => selectRelation(item)}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          )}

          <Text style={styles.label}>Xipper ID</Text>
          <TextInput
            placeholder="Enter their Xipper ID"
            style={styles.input}
            onChangeText={setXipperId}
            value={xipperId}
            placeholderTextColor={'#888'}
          />

          <Pressable
            onPress={() => addMember({ relation, xipperId })}
            style={styles.verifyButton}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06A77D', // Green color
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 5,
    color:"black"
  },
  dropdown: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#888',
    flex: 1,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  dropdownListContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#06A77D', // Green color
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddFamily;
