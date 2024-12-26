import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CopyIcon, GreaterArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import SortedByModal from "../../modals/SortedByModal";
import { Buildings } from "../../assets/images/Icons/Hotel";
import {
  Contact,
  Gift,
  Languages,
  Refrence,
  Reward,
  PrivacyIcon,
  Terms,
  Wishlist,
  FAQ,
  FeedbackIcon,
  Rate,
  SwitchAcc,
  Logout,
  Delete,
  RegisterCompany,
  RegisterSeller,
} from "../../assets/images/Icons/Account";
import { GetUserData } from "../../services/profileService";
import { getInitials } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authRedux";
import { setUserData } from "../../redux/accountRedux";

const Account = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.account)
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { profiles, selectedProfile } = useSelector((state) => state.account);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await GetUserData();
      dispatch(setUserData(res));
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!userData["fullName"] && !userData["XipperID"])
      fetchUserDetails();
  }, []);

  const handleSettingPress = async (type) => {
    try {
      if (type === "Logout") {
        dispatch(logout());
        await AsyncStorage.clear();
        navigation.replace("Login");
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView className="bg-greyFour flex-1 px-5 mt-2 mb-[100px]">
      <ScrollView showsVerticalScrollIndicator={false} >
        {/* Header */}
        <View className="flex-row justify-between items-center mt-8">
          <View />

          <Text className="text-[32px] font-bold text-black">Account</Text>
          <Image source={require("../../assets/images/Action/search.png")} />
        </View>

        {/* Profile */}
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          className="flex-1 bg-white rounded-md p-4 mt-3 mb-3 justify-center"
        >
          <View className="flex-row items-center">
            <View className="px-4 py-3 bg-primary rounded-full mr-3 items-center justify-center">
              <Text className="text-[32px] text-white font-pregular">{getInitials(userData.user.fullName) || "  "}</Text>
            </View>
            <View>
              <Text className="font-pregular text-base">{userData.user.fullName}</Text>
              <Pressable className="flex-row items-center gap-1">
                <Text className="font-pregular text-sm mr-2 text-black text-center">{userData?.user.XipperID}</Text>
                <CopyIcon />
              </Pressable>
            </View>
          </View>
        </Pressable>

        {/* Rewards */}
        <View className="bg-white rounded-md p-6 mt-3 mb-3">
          <Text className="font-bold text-lg mb-6 text-black">Rewards</Text>
          {/* Reward Options */}
          {[
            { icon: <Gift />, label: "Gift cards" },
            { icon: <Reward />, label: "Rewards" },
            { icon: <Refrence />, label: "Refer and earn" },
          ].map((item, index) => (
            <Pressable
              key={index}
              className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-cente text-black"
            >
              <View className="flex-row space-x-3 items-center">
                {item.icon}
                <Text className="font-bold text-base text-black">{item.label}</Text>
              </View>
              <GreaterArrowIcon />
            </Pressable>
          ))}
        </View>

        {/* Settings */}
        <View className="bg-white rounded-md p-6 mt-3 mb-3">
          <Text className="font-bold text-lg mb-6 text-black">Settings</Text>
          {[
            { icon: <Languages />, label: "Language", title: "lang" },
            {
              icon: <Image source={{ uri: "https://cdn.pixabay.com/photo/2022/07/14/17/15/flag-7321641_640.png" }} style={{ width: 20, height: 20, borderRadius: 10 }} />,
              label: "Currency",
              title: "Currency",
            },
            { icon: <PrivacyIcon />, label: "Privacy and Policy", route: "Account/Privacy" },
            { icon: <Terms />, label: "Terms of use", route: "Account/Terms" },
            { icon: <Contact />, label: "Contact Us" },
            { icon: <Wishlist />, label: "Wishlist", route: "Account/Wishlist" },
          ].map((item, index) => (
            <Pressable
              key={index}
              className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center "
              onPress={() => {
                if (item.title) {
                  setIsModal(!isModal);
                  setTitle(item.title);
                } else if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
            >
              <View className="flex-row space-x-3 items-center">
                {item.icon}
                <Text className="font-bold text-base text-black">{item.label}</Text>
              </View>
              {/* <GreaterArrowIcon /> */}
            </Pressable>
          ))}
        </View>

        {/* Feedback */}
        <View className="bg-white rounded-md p-6 mt-3 mb-3">
          <Text className="text-lg mb-6 font-bold text-black">Feedback</Text>

          {selectedProfile.type === 'user' ? (
            <>
              <Pressable
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => {
                  setIsModal(!isModal);
                  setTitle("Feedback");
                }}
              >
                <View className="flex-row space-x-3 items-center">
                  <FeedbackIcon />
                  <Text className="font-bold text-base text-black">Feedback</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>

              <Pressable
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => {
                  setIsModal(!isModal);
                  setTitle("Rate Us");
                }}
              >
                <View className="flex-row space-x-3 items-center">
                  <Rate />
                  <Text className="font-bold text-base text-black">Rate us</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
            </>
          ) : (
            <>

              <Pressable
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => {
                  setIsModal(!isModal);
                  setTitle("FAQ");
                }}
              >
                <View className="flex-row space-x-3 items-center">
                  <FAQ />
                  <Text className="font-bold text-base text-black">FAQ</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
              <Pressable
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => {
                  setIsModal(!isModal);
                  setTitle("Feedback");
                }}
              >
                <View className="flex-row space-x-3 items-center">
                  <FeedbackIcon />
                  <Text className="font-bold text-base text-black">Feedback</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>

              <Pressable
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => {
                  setIsModal(!isModal);
                  setTitle("Rate Us");
                }}
              >
                <View className="flex-row space-x-3 items-center">
                  <Rate />
                  <Text className="font-bold text-base text-black">Rate us</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
            </>
          )}
        </View>


        {/* Subscription */}
        <View className="bg-white rounded-md p-6 mt-3 mb-3">
          <Pressable className="flex-row justify-between items-center">
            <View className="flex-row space-x-3 items-center">
              <Text className="font-bold text-base text-black">Subscription</Text>
            </View>
            <GreaterArrowIcon />
          </Pressable>
        </View>

        {/* Account settings */}
        <View className="bg-white rounded-md p-6 mt-3 mb-3">
          <Text className="font-bold text-lg mb-6 text-black">Account Settings</Text>

          {(selectedProfile.type === 'company' || selectedProfile.type === 'hotel') ? (
            [
              { icon: <SwitchAcc />, label: "Switch Account" },
              { icon: <Logout />, label: "Logout" },
              { icon: <Delete />, label: "Delete Account" },
            ].map((item, index) => (
              <Pressable
                key={index}
                onPress={() => handleSettingPress(item.label)}
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
              >
                <View className="flex-row space-x-3 items-center">
                  {item.icon}
                  <Text className="font-bold text-base text-black">{item.label}</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
            ))
          ) : (
            [
              { icon: <Delete />, label: "Delete Account" },
            ].map((item, index) => (
              <Pressable
                key={index}
                onPress={() => handleSettingPress(item.label)}
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
              >
                <View className="flex-row space-x-3 items-center">
                  {item.icon}
                  <Text className="font-bold text-base text-black">{item.label}</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
            ))
          )}
        </View>


        {/* Registration */}
        {(selectedProfile.type === 'company' || selectedProfile.type === 'hotel') && (
          <View className="bg-white rounded-md p-6 mt-3 mb-5">
            <Text className="font-bold text-black text-lg mb-6">Registration</Text>
            {[
              // { icon: <RegisterCompany />, label: "Register as Company", route: "Account/CompanyOnboading" },
              { icon: <RegisterSeller />, label: "Register as Seller", route: "Account/SellerOnboarding" },
            ].map((item, index) => (
              <Pressable
                key={index}
                className="flex-row justify-between border-b-2 border-greyFour pb-2 mb-4 items-center"
                onPress={() => navigation.navigate(item.route)}
              >
                <View className="flex-row items-center space-x-3">
                  {item.icon}
                  <Text className="font-bold text-black text-base">{item.label}</Text>
                </View>
                <GreaterArrowIcon />
              </Pressable>
            ))}
          </View>
        )}

        {/* Modal */}
        <SortedByModal
          isModalVisible={isModal}
          heading={title === "lang" ? "Language" : title}
          toggleModal={() => setIsModal(!isModal)}
          content={title !== "Feedback" ? <Language title={title} /> : <Feedback />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const Language = ({ title }) => {
  const [selected, setSelected] = useState("Select");
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    { label: title === "lang" ? "English" : "USD" },
    { label: title === "lang" ? "Hindi" : "Rupees" },
    { label: title === "lang" ? "Spanish" : "Japanese Yen" },
    { label: title === "lang" ? "French" : "Canadian Dollar" },
    { label: title === "lang" ? "Marathi" : "Australian Dollar" },
  ];

  return (
    <>
      <Text className="font-pmedium text-base">
        {title === "lang" ? "Choose your language" : "Choose your currency"}
      </Text>
      <Pressable onPress={() => setShowOptions(!showOptions)}>
        <Text className="font-pmedium text-gray-400 text-sm p-2 border rounded-md border-gray-300 px-4 mt-1">
          {selected}
        </Text>
      </Pressable>
      {showOptions && (
        <View className="bg-white border p-3 border-gray-200 z-10 rounded-md absolute right-2 top-10">
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelected(option.label);
                setShowOptions(false);
              }}
              className="mb-2 justify-evenly"
            >
              <Text className="font-pregular text-base">{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <Pressable className="bg-primary px-3 py-2 rounded-md mb-2 my-5 mx-auto">
        <Text className="text-white text-center mx-16">Save</Text>
      </Pressable>
    </>
  );
};

const Feedback = () => {
  return (
    <>
      <Text className="font-pmedium text-base">Provide your valuable feedback</Text>
      <View className="flex-row items-center px-3 py-2 border rounded-md border-gray-200">
        <Buildings />
        <TextInput className="ml-3" placeholder="Message here" />
      </View>
      <Pressable className="bg-primary px-3 py-2 rounded-md mb-2 my-5 mx-auto">
        <Text className="text-white text-center mx-16">Send</Text>
      </Pressable>
    </>
  );
};
