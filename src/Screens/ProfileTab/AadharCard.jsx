import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import AddButton from "../../components/AddButton";
import {
  GovernmentIdIcon,
  PhoneIcon,
} from "../../assets/images/Icons/PersonalInfo";
import { RemoveDataIcon } from "../../assets/images/Icons/ArrowIcon";
import AddModal from "../../modals/AddModal";
import DeleteModal from "../../modals/DeleteModal";
import { useSelector } from "react-redux";

const AadharCard = () => {
  const { governmentIdInfo } = useSelector((state) => state.account);
  const [data, setData] = useState(governmentIdInfo["aadhaarNumber"] ? [{ number: governmentIdInfo?.aadhaarNumber }] : []);
  const [isModalVisible, setModalVisible] = useState(governmentIdInfo["aadhaarNumber"] ? false : true);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const addNumber = (newNumber) => {
    const newData = [...data, { number: newNumber }];
    setData(newData);
    toggleModal();
  };

  const deleteItem = () => {
    const newData = data.filter((item) => item.id !== selectedItem.id);
    setData(newData);
    toggleDeleteModal(null);
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2 ">
      <ProfileHeader />
      <Text className="font-psemibold text-lg text-black ">Aadhar Numbers</Text>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        {data.length > 0
          ? data.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingHorizontal: 5, marginTop: 2.5 }}>
                    <GovernmentIdIcon color={"#666666"} />
                  </View>
                  <Text className="font-pmedium text-[#666666] text-md mt-1 ml-3  items-center">
                    {item.number}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
      <AddModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addNumber={addNumber}
        // isNumber={true}

        type="aadhar"
      />
      {/* 
      <AddButton
        title={"Add Aadhar"}
        Icon={<GovernmentIdIcon color={"gray"} />}
        onPress={toggleModal}
      /> */}
    </SafeAreaView>
  );
};

export default AadharCard;