import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import SellingRoom from './SellingRoom'; 
import SellingMeal from './SellingMeal'; 
import AnalyticStats from './AnalyticStats'; 
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';

const SellerAnalytics = () => {
  const navigation = useNavigation();
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false} 
    >
   
      <View style={styles.header} onPress = {() => navigation.goBack()}>
        <Pressable >
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <View style={styles.componentWrapper}>
        <AnalyticStats />
      </View>
      <View style={styles.componentWrapper}>
        <SellingRoom />
      </View>
      <View style={styles.componentWrapper}>
        <AnalyticStats isVisible={true} />
      </View>
      <View style={styles.componentWrapper}>
        <SellingMeal />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 120, 
    color: '#333', 
  },

});

export default SellerAnalytics;
