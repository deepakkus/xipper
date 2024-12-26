import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import AddButton from "../../components/AddButton";
import { PhoneIcon } from "../../assets/images/Icons/PersonalInfo";
import { ThreeDotIcon } from "../../assets/images/Icons/ArrowIcon";
import AddModal from "../../modals/AddModal";
import DeleteModal from "../../modals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { AddPhoneNumber, DeletePhoneNumber, GetPhoneNumbers } from "../../services/profileService";
import { setPersonalInfo } from "../../redux/accountRedux";
import CircularLoader from "../../components/CircularLoader";
import { getTextClassInstance } from "../../utils/TextClass";

const PhoneNumber = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state) => state.account);
  const [data, setData] = useState(personalInfo?.phoneNumbers || []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const textClass = getTextClassInstance();

  const fetchPhoneNumbers = async () => {
    try {
      setLoading(true);
      const res = await GetPhoneNumbers();
      console.log(res);
      dispatch(setPersonalInfo({ key: "phoneNumbers", value: res }));
      setData(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!personalInfo["phoneNumbers"]) {
      fetchPhoneNumbers();
    }
  }, [personalInfo]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleOptionsMenu = (item) => {
    setSelectedItem(item);
    setOptionsMenuVisible(optionsMenuVisible === item?.id ? null : item?.id);
  };

  const addNumber = async (newNumber, token) => {
    try {
      setLoading(true);
      const res = await AddPhoneNumber(newNumber, "+91", token);
      if (res.status === 200) {
        const newData = [...data, { id: data.length + 1, number: newNumber }];
        setData(newData);
        dispatch(setPersonalInfo({ key: "phoneNumbers", value: newData }));
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async () => {
    try {
      setLoading(true);
      toggleDeleteModal(null);
      const res = await DeletePhoneNumber(selectedItem.number);
      if (res.status === 200) {
        const newData = data.filter((item) => item.number !== selectedItem.number);
        setData(newData);
        dispatch(setPersonalInfo({ key: "phoneNumbers", value: newData })); // Update Redux
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const makePrimary = (item) => {
    const updatedData = data.map((phone) =>
      phone.number === item.number
        ? { ...phone, isPrimary: true }
        : { ...phone, isPrimary: false }
    );
    setData(updatedData);
    dispatch(setPersonalInfo({ key: "phoneNumbers", value: updatedData })); // Update Redux
    setOptionsMenuVisible(null);
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2">
      <ProfileHeader />
      <Text className="font-psemibold text-lg text-black">{textClass.getTextString('TXT1')}</Text>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        {data.length > 0
          ? data.map((item, i) => (
              <View
                key={i}
                className="flex-row items-center justify-between mt-2 bg-white p-2 rounded-lg relative"
              >
                <View className="flex-row items-center">
                  <View className="px-2">
                    <PhoneIcon />
                  </View>
                  <Text className="font-pregular text-md text-black">{item.number}</Text>
                </View>
                {!item.isPrimary && (
                  <Pressable onPress={() => toggleOptionsMenu(item)}>
                    <ThreeDotIcon />
                  </Pressable>
                )}
                {optionsMenuVisible === item.id && (
                  <View
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 40,
                      backgroundColor: "white",
                      padding: 8,
                      borderRadius: 8,
                      shadowColor: "#000",
                      shadowOpacity: 0.2,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                      zIndex: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => makePrimary(item)}
                      style={{ paddingVertical: 8 }}
                    >
                      <Text className="font-pregular text-md text-black">Make Primary</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => toggleDeleteModal(item)}
                      style={{ paddingVertical: 8 }}
                    >
                      <Text className="font-pregular text-md text-red-500">Delete</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))
          : null}
      </ScrollView>
      <AddModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addNumber={addNumber}
        type={textClass.getTextString('TXT4')}
      />
      {isDeleteModalVisible && (
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          toggleDeleteModal={toggleDeleteModal}
          deleteItem={deleteItem}
          heading={textClass.getTextString('TXT2')}
          selectedItem={selectedItem}
        />
      )}
      <AddButton
        title={textClass.getTextString('TXT3')}
        Icon={<PhoneIcon color={"gray"} />}
        onPress={toggleModal}
      />
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

export default PhoneNumber;
