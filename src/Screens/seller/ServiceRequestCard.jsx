import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CrossIcon } from '../../assets/images/Icons/ArrowIcon';
import { getTimeDifference } from '../../utils/utils';
import { acceptServiceRequest, Requestdone } from '../../services/sellerService';
import { useSelector } from 'react-redux';

const ServiceRequestCard = ({ request, onPendingPress }) => {
  const navigation = useNavigation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { selectedProfile } = useSelector(state => state.account);

  const handleApprove = async (val) => {
    try {
      const response = await acceptServiceRequest(val, request.serviceId, selectedProfile.XipperID);
      console.log(response);
      if (response && response.status === 200) {
        setIsAccepted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = () => {
    console.log("Assigned");
  };

  const handleDone = async () => {
    try {
      const response = await Requestdone(request.serviceId, selectedProfile.XipperID);
      console.log(response);
      if (response && response.status === 200) {
        setIsAccepted(false);
        console.log("Done")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('ServicePreview', { request });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log(isAccepted);
  }, [isAccepted]);

  return (
    <>
      <Pressable onPress={handleSubmit}>
        <View style={styles.requestCard}>
          <View style={styles.requestDetails}>
            <View style={styles.requestHeader}>
              <Text style={styles.requestName}>{request?.itemCategory}</Text>
              <Pressable onPress={toggleModal}>
                <CrossIcon />
              </Pressable>
            </View>
            <Text style={styles.requestRoom}>
              {request?.room?.room?.roomType?.name} - {request?.room?.roomNumber}
            </Text>

            <Text style={styles.requestPrice}>
              ₹ {request?.order?.totalAmount} <Text style={styles.requestStatus}>{request?.order?.amountStatus}</Text>
            </Text>
            <View style={styles.requestFooter}>
              <Pressable style={styles.markPendingTime} onPress={onPendingPress}>
                <Text style={styles.pendingTime}>Pending: {getTimeDifference(request?.serviceReqTime)}</Text>
              </Pressable>
              {isAccepted && (
                <Pressable style={styles.assignButton} onPress={handleDone}>
                  <Text style={styles.buttonText}>Mark As Done</Text>
                </Pressable>
              )}
            </View>
            {!isAccepted && (
              <View style={styles.actionButtonsContainer}>
                <Pressable style={styles.approveButton} onPress={() => handleApprove("Accepted")}>
                  <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
                <Pressable style={styles.assignButton} onPress={handleAssign}>
                  <Text style={styles.buttonText}>Assign</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Pressable>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this service?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => handleApprove("Rejected")}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  requestCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    padding: 10,
    marginBottom: 10,
    width: '334px',
    height: '174px',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  requestDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  crossIcon: {
    marginLeft: 10,
  },
  requestPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    paddingBottom: 2,
  },
  requestStatus: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'rgba(254, 131, 12, 0.6)',
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  requestRoom: {
    fontSize: 12,
    color: '#FE830C',
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 3,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markPendingTime: {
    borderRadius: 8,
    padding: 5,
    marginTop: 5,
    height: 34,
    borderWidth: 1,
    borderColor: '#FE830C',
  },
  pendingTime: {
    fontSize: 12,
    color: '#FE830C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 130, // Increased width
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 130,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default ServiceRequestCard;
