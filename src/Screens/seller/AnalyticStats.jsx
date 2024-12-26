import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { DropDownArrow } from '../../assets/images/Icons/ArrowIcon'; 

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [80, 60, 50, 70, 90, 75, 85, 65, 70, 55, 60, 80],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(254, 131,12, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForLabels: {
    fill: 'black',
  },
  propsForBackgroundLines: {
    stroke: '#e3e3e3',
  },
};

export default function AnalyticsStats({ isVisible }) {
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [selectedTime, setSelectedTime] = useState('Monthly');
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const toggleChannelDropdown = () => setIsChannelDropdownOpen(!isChannelDropdownOpen);
  const toggleTimeDropdown = () => setIsTimeDropdownOpen(!isTimeDropdownOpen);

  const selectChannel = (channel) => {
    setSelectedChannel(channel);
    setIsChannelDropdownOpen(false);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setIsTimeDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {!isVisible ? (
        <Text style={styles.title}>Rooms Occupied</Text>
      ) : (
        <Text style={styles.title}>Sale Service</Text>
      )}
      <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur</Text>

      <View style={styles.filterRow}>
       
        <TouchableOpacity style={styles.dropdown} onPress={toggleChannelDropdown}>
          <Text style={styles.dropdownText}>{selectedChannel}</Text>
          <DropDownArrow />
        </TouchableOpacity>

        {isChannelDropdownOpen && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => selectChannel('All Channels')}>
              <Text style={styles.dropdownItem}>All Channels</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectChannel('Online')}>
              <Text style={styles.dropdownItem}>Online</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectChannel('Offline')}>
              <Text style={styles.dropdownItem}>Offline</Text>
            </TouchableOpacity>
          </View>
        )}

       
        <TouchableOpacity style={styles.dropdown} onPress={toggleTimeDropdown}>
          <Text style={styles.dropdownText}>{selectedTime}</Text>
          <DropDownArrow />
        </TouchableOpacity>

        
        {isTimeDropdownOpen && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => selectTime('Monthly')}>
              <Text style={styles.dropdownItem}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectTime('Weekly')}>
              <Text style={styles.dropdownItem}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectTime('Daily')}>
              <Text style={styles.dropdownItem}>Daily</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
        <Text style={styles.infoValue}>10k</Text>
          <Text style={styles.infoLabel}>Total revenue</Text>
          
        </View>
        
        {!isVisible && (
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>45</Text>
            <Text style={styles.infoLabel}>Avg. occupancy per month</Text>
            
          </View>
        )}
      </View>

      <View style={styles.filterRow}>
       
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Mode of Payment</Text>
          <DropDownArrow />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>All Rooms</Text>
          <DropDownArrow />
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={screenWidth * 0.9}
          height={280}
          yAxisLabel=""
          yAxisSuffix="%"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginVertical: 20, 
    overflow: 'hidden', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  dropdown: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '48%',
    borderColor: '#D1D1D1',
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
    padding: 10,
    position: 'absolute',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9933',
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
    alignItems: 'center', 
  },
});
