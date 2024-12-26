import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Navbar from './Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BsCart} from 'react-native-vector-icons/FontAwesome';
import {BsLightning} from 'react-native-vector-icons/Feather';
import {MdFlight} from 'react-native-vector-icons/MaterialIcons';
import {ImSpoonKnife} from 'react-native-vector-icons/FontAwesome5';
import {LiaHeartbeatSolid} from 'react-native-vector-icons/FontAwesome5';
import {TbCategory2} from 'react-native-vector-icons/Feather';

const Analytics = () => {
  return (
    <View style={styles.container}>
      <Navbar analytics={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Analytics</Text>

        {/* Card Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Total Spend</Text>
            <Text style={styles.cardHeaderText}>Rs 15000</Text>
          </View>

          <View style={styles.categoryContainer}>
            <CategoryItem
              icon={<BsCart size={18} color="rgba(0,0,0,0.5)" />}
              label="Shopping"
              amount="Rs 1555.500"
            />
            <CategoryItem
              icon={<MdFlight size={18} color="rgba(0,0,0,0.5)" />}
              label="Travel"
              amount="Rs 1555.500"
            />
            <CategoryItem
              icon={<ImSpoonKnife size={18} color="rgba(0,0,0,0.5)" />}
              label="Food"
              amount="Rs 1555.500"
            />
            <CategoryItem
              icon={<LiaHeartbeatSolid size={18} color="rgba(0,0,0,0.5)" />}
              label="Health"
              amount="Rs 1555.500"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <BsLightning size={12} color="white" />
              <Text style={styles.buttonText}>Mode of Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.categoryButton]}>
              <TbCategory2 size={12} color="#6D38C3" />
              <Text style={styles.categoryButtonText}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="calendar" size={12} color="white" />
              <Text style={styles.buttonText}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Reusable CategoryItem component
const CategoryItem = ({icon, label, amount}) => (
  <View style={styles.categoryItem}>
    <View style={styles.categoryIconContainer}>
      {icon}
      <Text style={styles.categoryLabel}>{label}</Text>
    </View>
    <Text style={styles.categoryAmount}>{amount}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#6D38C3',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryButton: {
    backgroundColor: 'white',
  },
  categoryButtonText: {
    color: '#6D38C3',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default Analytics;
