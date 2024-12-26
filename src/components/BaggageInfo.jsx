import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getTextClassInstance } from '../utils/TextClass';

const BaggageInfo = () => {
  const textClass = getTextClassInstance();
  return (
    <ScrollView style={styles.container}>
      {/* Baggage Information */}
      <View style={styles.baggageInfo}>
        <View style={styles.row}>
          <Text style={styles.label}>{textClass.getTextString('TXT12')}</Text>
          <Text style={styles.value}>{textClass.getTextString('TXT13')}</Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.row}>
          <Text style={styles.label}>{textClass.getTextString('TXT7')}</Text>
          <Text style={styles.value}>{textClass.getTextString('TXT14')}</Text>
        </View>
      </View>

      {/* Baggage Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerTitle}>{textClass.getTextString('TXT11')}</Text>

        <View style={styles.disclaimerTextContainer}>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.boldText}>{textClass.getTextString('TXT7')}</Text>{textClass.getTextString('TXT9')}
          </Text>
          <Text style={styles.bulletPoint}>
            <Text style={styles.boldText}>{textClass.getTextString('TXT8')}</Text>{textClass.getTextString('TXT10')}
          </Text>
          <Text style={styles.bulletPoint}>
            {textClass.getTextString('TXT6')}
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
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#68689E',
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

export default BaggageInfo;
