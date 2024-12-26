import { Image, ScrollView, Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import AddButton from "../../components/AddButton";
import { CardIcon, UPI, UPIScan } from "../../assets/images/Icons/FinacialIcons";
import DeleteModal from "../../modals/DeleteModal";
import { RemoveDataIcon } from "../../assets/images/Icons/ArrowIcon";
import AddModal from "../../modals/AddModal";

const UPI_Ids = () => {
  const [data, setData] = useState([
    { id: 1, upinumber: "123456789", upi: "abc@okicici" },
    { id: 2, upinumber: "849856789", upi: "c@okicici" },
    { id: 3, upinumber: "986468464", upi: "aac@okicici" },
  ]);
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

  const addNumber = (newNumber) => {
    const newData = [...data, { id: data.length + 1, upi: newNumber }];
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
      <Text className="font-psemibold text-lg text-black ">Upi Id</Text>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        {data.length > 0
          ? data.map((item, index) => (
              <View
                key={item.id}
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
                    <UPIScan/>
                  </View>
                  <Text className="font-psemibold text-md mt-1 ml-3  items-center">
                    {item.upi}
                  </Text>
                </View>
                <Pressable onPress={() => toggleDeleteModal(item)}>
                  <RemoveDataIcon />
                </Pressable>
              </View>
            ))
          : null}
      </ScrollView>
      <AddModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addNumber={addNumber}
        type={"upi"}
      />
      {isDeleteModalVisible && (
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          toggleDeleteModal={toggleDeleteModal}
          deleteItem={deleteItem}
          heading="Are you sure you want to remove this number?"
          selectedItem={selectedItem}
        />
      )}
      <AddButton
        title={"Add UPI id"}
        Icon={<UPI color={"gray"} />}
        onPress={toggleModal}
      />
    </SafeAreaView>
  );
};

export default UPI_Ids;