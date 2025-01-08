import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from '../assets/images/Icons/ArrowIcon';

const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedProfile } = useSelector(state => state.account);
  const nav = useNavigation();

  return (

      <View className={Platform.OS === 'ios' ? "flex-1 items-center justify-start bg-gray-100 p-10" : "flex-1 items-center justify-start bg-gray-100 p-4"}>  
      <View className="flex-row items-center w-full">
        <Pressable
          onPress={() => nav.goBack()}
        >
          <BackArrowIcon />
        </Pressable>
        <Text className="text-[24px] font-bold text-gray-800 ml-20">
          Delete Account
        </Text>
      </View>
      <Text className="text-base text-gray-600 mb-4 text-center">
        We are so sorry to know that you want to leave us and go. Is there anything we can do to correct things? Please share your feedback so we can make your experience with us better.
      </Text>
      <Pressable className={`py-2 px-4 rounded-md bg-${selectedProfile.type}`}>
        <Text className="text-white text-lg font-semibold">Share Feedback</Text>
      </Pressable>
      <Text className="text-base text-gray-600 mb-4 text-center mt-6">
        No, I would like to proceed and delete my account. Please note this will delete your account details, and you won't be able to access any information until you sign up again.
      </Text>
      <Pressable
        className={`py-2 px-4 rounded-md bg-${selectedProfile.type}`}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-lg font-semibold">Delete</Text>
      </Pressable>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-10">
          <View className="bg-white p-6 rounded-md w-4/5">
            <Text className="text-lg font-bold text-gray-800 mb-4">Confirm Account Deletion</Text>
            <Text className="text-base text-black mb-6">
              Are you sure you want to delete your account?
            </Text>
            <View className="flex-row justify-between">
              <Pressable
                className={`py-2 px-4 rounded-md bg-${selectedProfile.type}`}
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className={` py-2 px-4 rounded-md bg-${selectedProfile.type}`}
                onPress={() => {
                  setModalVisible(false);
                  console.log('Account deleted');
                  nav.navigate('Login');
                }}
              >
                <Text className="text-white font-semibold">Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteAccount;
