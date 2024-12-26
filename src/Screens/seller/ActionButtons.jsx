import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const ActionButtons = ({ handleApprove = () => { }, handleReject = () => { }, showApproved = false, approvedButtonText = "" }) => {

  return (
    <View style={styles.container}>
      <Pressable style={[styles.approveButton, showApproved && styles.disableApproved]}
        disabled={showApproved}
        onPress={() => !showApproved && handleApprove()}>
        <Text style={[styles.buttonTextCorrect, { color: showApproved && "#FE830C" }]}>{showApproved ? approvedButtonText : "Approve"}</Text>
      </Pressable>
      {!showApproved && <Pressable style={styles.rejectButton} onPress={handleReject}>
        <Text style={styles.buttonText}>Reject</Text>
      </Pressable>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  disableApproved: {
    backgroundColor: '#fff',
    borderColor: "#FE830C",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: '#FE830C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  buttonTextCorrect: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default ActionButtons;
