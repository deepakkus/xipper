// UI CODE

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
// import ServiceRequestCard from './ServiceRequestCard';
// import ServiceRequest from '../../modals/ServiceRequest'// Import the modal component
// import { AddDataIcon } from '../../assets/images/Icons/ArrowIcon';
// import { AddIcon } from '../../assets/images/Icons/ArrowIcon';

// const ServiceRequestsContainer = () => {
//   const initialRequests = [
//     { id: 1, name: 'Buffet Breakfast', price: '₹ 1500', status: 'Paid', room: 'Executive Room - 202', time: '10 mins' },
//     { id: 2, name: 'Buffet Breakfast', price: '₹ 1500', status: 'Paid', room: 'Executive Room - 202', time: '10 mins' },
//     { id: 3, name: 'Buffet Breakfast', price: '₹ 1500', status: 'Paid', room: 'Executive Room - 202', time: '10 mins' },
//     { id: 4, name: 'Buffet Breakfast', price: '₹ 1500', status: 'Paid', room: 'Executive Room - 202', time: '10 mins' },
//   ];

//   const [serviceRequests, setServiceRequests] = useState(initialRequests);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleMarkDone = (requestId) => {
//     setServiceRequests(prevRequests =>
//       prevRequests.map(request =>
//         request.id === requestId ? { ...request, status: 'Done' } : request
//       )
//     );

//     Alert.alert('Success', 'Service request marked as done!');
//   };

//   const openModal = () => {
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <View style={styles.requestsContainer}>
//       {/* Header Section */}
//       <View style={styles.container}>
//         <Text style={styles.requestsTitle}>Service Requests</Text>
//         <Pressable style={styles.iconContainer} onPress={openModal}>
//           <AddIcon/>
//         </Pressable>
//       </View>

//       {serviceRequests.map(request => (
//         <ServiceRequestCard
//           key={request.id}
//           request={request}
//           onMarkDone={() => handleMarkDone(request.id)}
//         />
//       ))}

//       <ServiceRequest visible={isModalVisible} onClose={closeModal} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   requestsContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 15,
//     margin: 10,
//     width: '382px',
//     height: '806px',
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   iconContainer: {
//     marginLeft: 12,
//     padding: 8,
//   },
//   requestsTitle: {
//     fontFamily: 'Poppins',
//     fontSize: 20,
//     fontWeight: 'bold',
//     lineHeight: 30,
//     letterSpacing: -0.04,
//     textAlign: 'left',
//     marginBottom: 10,
//     color: '#000000',
//   },
// });

// export default ServiceRequestsContainer;



import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import ServiceRequestCard from './ServiceRequestCard';
import ServiceRequest from '../../modals/ServiceRequest';
import { AddIcon } from '../../assets/images/Icons/ArrowIcon';

const ServiceRequestsContainer = ({ serviceRequests = [] }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMarkDone = (requestId) => {
    Alert.alert('Success', 'Service request marked as done!');
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.requestsContainer}>
      <View style={styles.container}>
        <Text style={styles.requestsTitle}>Service Requests</Text>
        <Pressable style={styles.iconContainer} onPress={openModal}>
          <AddIcon />
        </Pressable>
      </View>

      {serviceRequests.length > 0 && serviceRequests.map((request, ind) => (
        <ServiceRequestCard
          key={ind}
          request={request}
          onMarkDone={() => handleMarkDone(request.id)}
        />
      ))}

      <ServiceRequest visible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  requestsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    width: '382px',
    height: '806px',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginLeft: 12,
    padding: 8,
  },
  requestsTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 30,
    letterSpacing: -0.04,
    textAlign: 'left',
    marginBottom: 10,
    color: '#000000',
  },
});

export default ServiceRequestsContainer;
