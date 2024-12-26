
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FE830C', 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', 

  },
});

export default Header;
