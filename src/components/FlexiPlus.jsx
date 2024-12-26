import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const FlexiPlus = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Package Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.packageTitle}>SUPER 6E</Text>
        <View style={styles.priceRow}>
          <Text style={styles.strikedPrice}>₹2200</Text>
          <Text style={styles.finalPrice}>₹2000</Text>
        </View>
        {/* Line Separator */}
        <View style={styles.lineSeparator} />
      </View>

      {/* Package Info Section */}
      <View style={styles.packageInfoContainer}>
        {/* Baggage Section */}
        <View style={styles.section}>
          <View style={styles.iconRow}>
            {/* <Text style={styles.icon}>🧳</Text> */}
            <Text style={styles.sectionTitle}>Baggage</Text>
          </View>
          <Text style={styles.bulletPoint}>• 7 kg Cabin-Baggage</Text>
          <Text style={styles.bulletPointBold}>• 15 kgs Check-in Baggage</Text>
        </View>

        {/* Changeability Section */}
        <View style={styles.section}>
          <View style={styles.iconRow}>
            
            <Text style={styles.sectionTitle}>Changeability</Text>
          </View>
          <Text style={styles.bulletPoint}>
            • Cancellation fees start at <Text style={styles.boldText}>Rs. 2999 onwards</Text>
          </Text>
          <Text style={styles.bulletPoint}>
            • Date change fees start at <Text style={styles.boldText}>Rs. 2250 onwards</Text>
          </Text>
        </View>

        {/* Refundable Button */}
        <Pressable style={styles.refundableButton}>
          <Text style={styles.refundableText}>Refundable</Text>
        </Pressable>

        {/* Select Button */}
        <Pressable style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  headerContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 15,
    backgroundColor: 'white', 
  },
  packageTitle: {
    color: '#6D38C3',
    fontWeight: 'bold',
    fontSize: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikedPrice: {
    textDecorationLine: 'line-through',
    color: '#B0B0B0',
    fontSize: 16,
    marginRight: 10,
  },
  finalPrice: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lineSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0', 
    marginVertical: 10, 
  },
  packageInfoContainer: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#4A4A4A',
    marginLeft: 30,
    marginBottom: 5,
  },
  bulletPointBold: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 30,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  refundableButton: {
    borderWidth: 1,
    borderColor: '#6D38C3',
    padding:5, 
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20, 
    width: 100, 
},

  refundableText: {
    color: '#6D38C3',
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#E0E0E0',
    padding: 10, 
    borderRadius: 32,
    alignItems: 'center',
    marginLeft: 50,
    width: 200, 
},

  selectButtonText: {
    color: '#7A7A7A',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FlexiPlus;
