import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import { EmailIcon } from "../../assets/images/Icons/PersonalInfo";
import AddButton from "../../components/AddButton";
import AddModal from "../../modals/AddModal";
import { ThreeDotIcon, BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import { useDispatch, useSelector } from "react-redux";
import { AddEmail, DeleteEmail, GetEmails } from "../../services/profileService";
import { setPersonalInfo } from "../../redux/accountRedux";
import CircularLoader from "../../components/CircularLoader";
import DeleteModal from "../../modals/DeleteModal";
import {useNavigation, useRoute} from '@react-navigation/native';
import {GetHotelEmails} from '../../services/hotelService';
import {GetCompanyEmails} from '../../services/companyService';
import ErrorModal from '../../modals/ErrorModal';


const EmailInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { personalInfo } = useSelector((state) => state.account);
  const {selectedProfile} = useSelector(state => state.account);
  const [data, setData] = useState(personalInfo?.emails || []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, SetErrorMsg] = useState('');
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const toggleErrorModal = () => setErrorModalVisible(!isErrorModalVisible);

  const handleClose = () => {
    toggleErrorModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchEmails = async () => {
   
    try {
      setLoading(true);
        if (selectedProfile.type === 'user') {
          const res = await GetEmails();
          console.log(JSON.stringify(res))
          dispatch(setPersonalInfo({ key: "emails", value: res.data }));
          setData(res.data);
            } else if (selectedProfile.type === 'hotel') {
              const res = await GetHotelEmails(selectedProfile?.XipperID);
              console.log(JSON.stringify(res.data?.data))
              if (res.data.status === 'Success') {
                dispatch(
                  setPersonalInfo({
                    key: 'emails',
                    value: res.data?.data,
                  }),
                );
                setData(res.data?.data);
              } else if (res.data.status === 'Fail') {
                setErrorModalVisible(true);
                SetErrorMsg(res.data.message);
              }
            } else if (selectedProfile.type === 'company') {
              const res = await GetCompanyEmails(selectedProfile?.XipperID);
              console.log(JSON.stringify(res.data?.data))
              if (res.data.status === 'Success') {
                dispatch(
                  setPersonalInfo({
                    key: 'emails',
                    value: res.data?.data,
                  }),
                );
                setData(res.data?.data);
              } else if (res.data.status === 'Fail') {
                setErrorModalVisible(true);
                SetErrorMsg(res.data.message);
              }
            }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!personalInfo["emails"]) {
  //     fetchEmails();
  //   }
  // }, [personalInfo]);
  useEffect(() => {
      fetchEmails();
  }, [selectedProfile]);

  const toggleDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleOptionsMenu = (item) => {
    setSelectedItem(item);
    setOptionsMenuVisible(optionsMenuVisible === item?.id ? null : item?.id);
  };

  const addEmail = async (newEmail, token) => {
    try {
      setLoading(true);
      const res = await AddEmail(newEmail, token);
      if (res.status === 200) {
        const newData = [...data, { id: data.length + 1, email: newEmail }];
        setData(newData);
        dispatch(setPersonalInfo({ key: "emails", value: newData }));
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
      const res = await DeleteEmail(selectedItem.email);
      if (res.status === 200) {
        const newData = data.filter((item) => item.email !== selectedItem.email);
        setData(newData);
        dispatch(setPersonalInfo({ key: "emails", value: newData }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const makePrimary = (item) => {
    const updatedData = data.map((email) =>
      email.email === item.email
        ? { ...email, isPrimary: true }
        : { ...email, isPrimary: false }
    );
    setData(updatedData);
    dispatch(setPersonalInfo({ key: "emails", value: updatedData })); // Update Redux
    setOptionsMenuVisible(null);
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader navBack={'PersonalInfo'} />
       
        <Text className="font-psemibold text-lg text-black ">Email</Text>
        {console.log('jjjj==='+JSON.stringify(data))}
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
                  position: "relative",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingHorizontal: 5 }}>
                    <EmailIcon color={'#06A77D'}/>
                  </View>
                  <Text className="font-semibold text-md ml-2 text-user">
                    {item.email}
                  </Text>
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
        addNumber={addEmail}
        type="email"
      />
      {isDeleteModalVisible && (
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          toggleDeleteModal={toggleDeleteModal}
          deleteItem={deleteItem}
          heading="Are you sure you want to remove this mail Id?"
          selectedItem={selectedItem}
        />
      )}
      <AddButton
        title={"Add new email"}
        Icon={<EmailIcon color={"gray"} />}
        onPress={toggleModal}
      />
      {loading && <CircularLoader />}
      {
        errorMsg ? (
          <ErrorModal
          isModalVisible={isErrorModalVisible}
          toggleErrorModal={toggleErrorModal}
          handleBack={handleClose}
          heading={"Error!"}
          content={errorMsg}
          />
        ) : ''
      }
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default EmailInfo;
