import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FareBreakUp = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Baggage Information */}
      <View style={styles.baggageInfo}>
      <View style={styles.row}>
                <Text style={styles.label}>Base Fare</Text>
                <Text style={styles.value}>Rs 855</Text>
            </View>
            <View style={styles.lineSeparator} />
            <View style={styles.row}>
                <Text style={styles.label}>Surcharges</Text>
                <Text style={styles.value}>Rs 20</Text>
            </View>
            <View style={styles.lineSeparator} />
            <View style={styles.row}>
                <Text style={styles.label}>Gst</Text>
                <Text style={styles.value}>Rs 78</Text>
            </View>
            <View style={styles.lineSeparator} />
            <View style={styles.row}>
                <Text style={styles.amount}>Total Amount to be paid</Text>
                <Text style={styles.value}>Rs 925</Text>
            </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },
  baggageInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
   
  },

  lineSeparator: {
    height: 2,
    backgroundColor: '#E0E0E0', 
    marginVertical: 10, 
  },
  label: {
    fontSize: 16,
    color: '#000000',
    fontFamily:'Poppins',
    fontWeight: 400,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
  },
  disclaimerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',

  },
  disclaimerTextContainer: {
    marginTop: 10,
    widht: 250,
    height: 250,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 10,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default FareBreakUp;
