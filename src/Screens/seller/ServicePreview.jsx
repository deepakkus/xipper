import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { BackArrowIcon, CrossIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTimeDifference } from '../../utils/utils';
import { ServiceRequestPreview } from '../../services/hotelService';
import { useSelector } from 'react-redux';
import CircularLoader from '../../components/CircularLoader';
import { Requestdone } from '../../services/sellerService';

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ServiceItem = ({ name, description }) => (
  <View style={styles.serviceItem}>
    <View style={styles.serviceItemHeader}>
      <Text style={styles.serviceTitle}>{name}</Text>
      <Pressable>
        <CrossIcon />
      </Pressable>
    </View>
    <Text style={styles.serviceDescription}>{description || 'No description available'}</Text>
  </View>
);

export default function ServicePreview() {
  const nav = useNavigation();
  const route = useRoute();
  const params = route.params;
  const [service, setService] = useState([]);
  const { selectedProfile } = useSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  const fetchitems = async () => {
    try {
      setLoading(true);
      const response = await ServiceRequestPreview(params.request.serviceId, params.request.order.checkInId, selectedProfile.XipperID);
      const details = response?.serviceDetails?.serviceDetails?.[0] || [];
      setService(details);
      console.log(details);
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  const handleDone = async () => {
    try {
      const response = await Requestdone(params.request.serviceId, selectedProfile.XipperID);
      console.log(response);
      if (response && response.status === 200) {
        console.log("Done")
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchitems();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => nav.goBack()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.headerText}>Service Preview</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <DetailItem
          label="Room Number"
          value={`${params.request.room.room.roomType.name} - ${params.request.room.roomNumber}`}
        />
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
        <DetailItem label="Customer Name" value={`${params.request.user.fullName}`} />
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
        <DetailItem label="Amount" value={`₹ ${params.request.order.totalAmount}`} />
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
      </View>
      <ScrollView contentContainerStyle={styles.itemsContainer}>
      {loading && <CircularLoader />}    
        {service.map((item, index) => (
          <ServiceItem key={index} name={item.name} description={item.description} />
        ))}

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Descriptions</Text>
          <Text style={styles.descriptionText}>{service.description}</Text>
          <Text style={styles.descriptionText}>{service.description}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable style={[styles.button, styles.pendingButton]}>
            <Text style={styles.buttonText}>
              Pending 
            </Text>
          </Pressable>
          <Pressable style={[styles.button, styles.doneButton]} onPress={handleDone}>
            <Text style={styles.buttonText}>Mark as done</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 80,
    color: 'black',
  },
  detailsContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
  },
  itemsContainer: {
    paddingBottom: 16,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '90%',
    marginLeft: 20,
  },
  serviceItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  serviceDescription: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
  descriptionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '90%',
    marginLeft: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
  },
  pendingButton: {
    backgroundColor: '#FFA726',
  },
  doneButton: {
    backgroundColor: '#FE830C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
