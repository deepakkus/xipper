import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const countryCodes = [
  {
    name: 'France',
    code: '+33',
    flag: {
      uri: 'https://static.vecteezy.com/system/resources/previews/004/313/578/original/france-country-flag-free-vector.jpg',
    },
  },
  {
    name: 'India',
    code: '+91',
    flag: {
      uri: 'https://cdn.pixabay.com/photo/2022/07/14/17/15/flag-7321641_640.png',
    },
  },
  {
    name: 'USA',
    code: '+1',
    flag: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShY7qGfnv30IJEJP_pSEynrrWbSAjrouL7Cw&s',
    },
  },
];

const CountryCode = ({selectedCode, setSelectedCode}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = code => {
    setSelectedCode(code);
    setModalVisible(false);
  };

  const getFlagImage = code => {
    const country = countryCodes.find(country => country.code === code);
    return country ? country.flag : null;
  };

  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.countryCodeContainer}>
        <Image source={getFlagImage(selectedCode)} style={styles.flagImage} />
        <Text style={styles.countryCodeText}>{selectedCode}</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryCodes}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => handleSelect(item.code)}>
                  <Image source={item.flag} style={styles.flagImage} />
                  <Text style={styles.modalItemText}>
                    {item.name} {item.code}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 5,
  },
  countryCodeText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  flagImage: {
    width: 25,
    height: 25,
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});

export default CountryCode;
