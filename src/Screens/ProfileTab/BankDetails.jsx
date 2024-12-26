import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import AddButton from "../../components/AddButton";
import { PhoneIcon } from "../../assets/images/Icons/PersonalInfo";
import { RemoveDataIcon } from "../../assets/images/Icons/ArrowIcon";
import AddModal from "../../modals/AddModal";
import DeleteModal from "../../modals/DeleteModal";
import AddFiniancialModal from "../../modals/AddFinancialModal";
import { BankAccount } from "../../assets/images/Icons/FinacialIcons";
import { useSelector } from "react-redux";

const BankDetails = () => {
  const [data, setData] = useState([
    {
      id: 1,
      accountnumber: "123456789",
      name: "Abhijit Agarwal",
      IFSCCode: "UTIB0001100",
      bankName: "Axis Bank",
    },
  ]);
  const {selectedProfile} = useSelector((state) => state.account);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const deleteItem = () => {
    const newData = data.filter((item) => item.id !== selectedItem.id);
    setData(newData);
    toggleDeleteModal(null);
  };
  const addData = (newCardData) => {
    const newData = [
      ...data,
      {
        id: data.length + 1,
        name: newCardData.name,
        IFSCCode: newCardData.IFSCCode,
        accountnumber: newCardData.accountnumber,
        bankName: newCardData.bankName,
      },
    ];
    setData(newData);
    toggleModal();
  };
  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2 ">
      <ProfileHeader />
      {/* <Text className="font-psemibold text-lg text-black "></Text> */}
      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        {data.length > 0
          ? data.map((item, index) => (
              <View
                key={item.id}
                style={{
                  marginTop: 10,
                  backgroundColor: "#FFFFFF",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <View className="flex-row  items-center justify-between mb-5 ">
                  <Text className={`font-psemibold text-lg ${selectedProfile.type === 'user'?'text-user': selectedProfile.type === 'company'?'text-company':'text-seller'}`}>
                    Bank Details
                  </Text>

                  <Pressable onPress={() => toggleDeleteModal(item)}>
                    <RemoveDataIcon />
                  </Pressable>
                </View>
                <View className="flex-row  items-center justify-between mb-1 ">
                  <Text className="font-pregular text-sm text-gray-400 ">
                    Name of Bank
                  </Text>
                  <Text className="font-pregular text-sm text-gray-400 ">
                    {" "}
                    {item.bankName}{" "}
                  </Text>
                </View>
                <View className="flex-row  items-center justify-between mb-1 ">
                  <Text className="font-pregular text-sm text-gray-400 ">
                    Account Number
                  </Text>
                  <Text className="font-pregular text-sm text-gray-400 ">
                    {" "}
                    {item.accountnumber}{" "}
                  </Text>
                </View>
                <View className="flex-row  items-center justify-between mb-1">
                  <Text className="font-pregular text-sm text-gray-400 ">
                    IFSC Code
                  </Text>
                  <Text className="font-pregular text-sm text-gray-400 ">
                    {" "}
                    {item.IFSCCode}{" "}
                  </Text>
                </View>
                <View className="flex-row  items-center justify-between mb-1">
                  <Text className="font-pregular text-sm text-gray-400 ">
                    Beneficiary name
                  </Text>
                  <Text className="font-pregular text-sm text-gray-400 ">
                    {" "}
                    {item.name}{" "}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
      <AddButton
        title={"Add Bank Account"}
        Icon={<BankAccount color={"gray"} />}
        onPress={toggleModal}
      />
      <AddFiniancialModal
        title={"Bank Account"}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addData={addData}
      />
      {isDeleteModalVisible && (
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          toggleDeleteModal={toggleDeleteModal}
          deleteItem={deleteItem}
          heading="Are you sure you want to remove this Account?"
          selectedItem={selectedItem}
        />
      )}
    </SafeAreaView>
  );
};

export default BankDetails;