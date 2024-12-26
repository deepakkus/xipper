import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FarePolicy = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Baggage Information */}
      <View style={styles.baggageInfo}>
        <Text style={styles.heading}>Cancellation charges per Passenger</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Check In Baggage</Text>
          <Text style={styles.value}>15 Kg (1 piece Only)</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Cabin Baggage</Text>
          <Text style={styles.value}>7 Kg (1 piece)</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Sports Equipment</Text>
          <Text style={styles.value}>Up to 15 Kg</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Musical Instruments</Text>
          <Text style={styles.value}>Up to 10 Kg </Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Baby Stroller</Text>
          <Text style={styles.value}>Free of charge</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Hand Baggage</Text>
          <Text style={styles.value}>7 Kg Each Adult</Text>
        </View>
      </View>

      <View style={styles.baggageInfo}>
      <Text style={styles.heading}>Rescheduled charges per Passenger</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Check In Baggage</Text>
          <Text style={styles.value}>15 Kg (1 piece Only)</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Cabin Baggage</Text>
          <Text style={styles.value}>7 Kg (1 piece)</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Sports Equipment</Text>
          <Text style={styles.value}>Up to 15 Kg</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Musical Instruments</Text>
          <Text style={styles.value}>Up to 10 Kg </Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Baby Stroller</Text>
          <Text style={styles.value}>Free of charge</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>Hand Baggage</Text>
          <Text style={styles.value}>7 Kg Each Adult</Text>
        </View>
      </View>

      {/* Baggage Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerTitle}>Baggage Disclaimer</Text>

        <View style={styles.disclaimerTextContainer}>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.boldText}>Hand Baggage</Text>: Airlines permits only one (1pc) bag weighing not more than 7 KGS. In addition to the one piece of Hand Baggage permitted, few airlines may permit Customer to carry one additional personal article such as a ladies purse or a small bag containing a laptop not weighing more than 3 KGS.
          </Text>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.boldText}>Infant Baggage</Text>: Passenger traveling with infant are allowed to carry 1 Pc of additional Hand Baggage not exceeding 7 KGS.
          </Text>
          <Text style={styles.bulletPoint}>
            • The baggage information is just for reference. Please check with airline for more specific information.
          </Text>
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
  heading: {
 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
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
    fontSize: 14,
    color: '#000000',
   
  },
  value: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
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

export default FarePolicy;
