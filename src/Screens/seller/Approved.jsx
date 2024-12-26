import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Approved = () => {
  const navigation = useNavigation();
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);

  const handleNamePress = (name) => {
    navigation.navigate('ApprovingDetails', { name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.guestLabel}>Guest 1</Text>
        <Text style={styles.approvedText}>Approved</Text>
      </View>
      <View style={styles.guestRow}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }} 
          style={styles.image} 
        />
        <Text style={styles.guestName}>Abhijeet Agarwal</Text>
        <Pressable 
          onPress={() => setIsChecked1(!isChecked1)} 
          style={styles.checkboxContainer}
        >
          {isChecked1 ? <Text style={styles.checkedBox}>✓</Text> : <View style={styles.uncheckedBox} />}
        </Pressable>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.guestLabel}>Guest 2</Text>
        <Text style={styles.approvedText}>Approved</Text>
      </View>
      <View style={styles.guestRow}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }} 
          style={styles.image} 
        />
        <Text style={styles.guestName}>Abhijeet Agarwal</Text>
        <Pressable 
          onPress={() => setIsChecked2(!isChecked2)} 
          style={styles.checkboxContainer}
        >
          {isChecked2 ? <Text style={styles.checkedBox}>✓</Text> : <View style={styles.uncheckedBox} />}
        </Pressable>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.guestLabel}>Guest 3</Text>
        <Text style={styles.unapprovedText}>unapproved</Text>
      </View>
      <View style={styles.headerRow}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sMgEzD2F1ypCgUHxEQSZjjDoV2Qi4LeAoQ&s' }} 
          style={styles.image} 
        />
          <Text style={styles.unapprovedguestName}>Unverified</Text>
      </View>
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
    marginBottom: 8,
  },
  guestRow: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3FEA19', 
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 25,
    marginLeft: 70,
  },
  checkedBox: {
    fontSize: 18,
    color: '#000000', // Black color for checkmark
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 4,
  },

  unapprovedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EE1E25',
},
});

export default Approved;
