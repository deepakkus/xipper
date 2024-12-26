import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import AddButton from "../../components/AddButton";
import { CardIcon } from "../../assets/images/Icons/FinacialIcons";
import CardComponent from "../../components/CardComponent";
import DeleteModal from "../../modals/DeleteModal";
import AddFiniancialModal from "../../modals/AddFinancialModal";

const DebitCard = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Abhijit Agarwal",
      cardname: "BANK OF BARODA ONE CARD",
      cardnumber: "1234567812341010",
      type: "visa",
    },
    {
      id: 2,
      name: "Abhijit Agarwal",
      cardname: "BANK OF BARODA ONE CARD",
      cardnumber: "1234567812343256",
      type: "axis",
    },
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
        cardname: newCardData.cardname,
        cardnumber: newCardData.cardnumber,
        type: newCardData.type,
      },
    ];
    setData(newData);
    toggleModal();
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2 ">
      <ProfileHeader />
      <Text className="font-psemibold text-lg text-black ">DebitCard</Text>
      {data.map((item) => (
        <CardComponent
          key={item.id}
          item={item}
          toggleDeleteModal={toggleDeleteModal}
        />
      ))}
      <AddButton
        title={"Add Debit Card"}
        Icon={<CardIcon color={"gray"} />}
        onPress={toggleModal}
      />
      <AddFiniancialModal
        title={"DebitCard"}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addData={addData}
      />
      {isDeleteModalVisible && (
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          toggleDeleteModal={toggleDeleteModal}
          deleteItem={deleteItem}
          heading="Are you sure you want to remove this Card?"
          selectedItem={selectedItem}
        />
      )}
    </SafeAreaView>
  );
};

export default DebitCard;