import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DashboardHeader = ({ onViewAllPress }) => (
  <View style={styles.header}>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    font: 'Popins',
    fontWeight: 'bold',
    color: '#000000',
    marginRight: '30px',
  },
  viewAllButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 29,
    marginTop: 10,
  },
  viewAllButtonText: {
    color: '#626262',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default DashboardHeader;
