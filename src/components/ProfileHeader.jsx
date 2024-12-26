import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Use React Navigation
import { BackArrowIcon, CopyIcon } from "../assets/images/Icons/ArrowIcon";
import { getInitials } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { getTextClassInstance } from "../utils/TextClass";

const ProfileHeader = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({})
  const { userData } = useSelector((state) => state.account)
  const { selectedProfile } = useSelector((state) => state.account);
  const textClass = getTextClassInstance();

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center">
        <Pressable onPress={() => navigation.goBack()} className="h-auto">
          <BackArrowIcon />
        </Pressable>
        <Text className="font-poppins font-header text-header text-black text-center">{textClass.getTextString('TXT27')}</Text>
        <Image source={require("../assets/images/Action/search.png")} />
      </View>

      <View className="flex justify-center items-center">
        {selectedProfile.type === 'user'?
        <View className="items-center bg-user justify-center mt-4 w-24 h-24 rounded-full flex">
          <Text className="text-[32px]  text-white font-pregular">
            {getInitials(userData?.user?.fullName)}
          </Text>
        </View>
        :selectedProfile.type==='company'?(
          <View className="items-center bg-company justify-center mt-4 w-24 h-24 rounded-full flex">
          <Text className="text-[32px]  text-white font-pregular">
            {getInitials(userData?.user?.fullName)}
          </Text>
        </View>
        ):
        <View className="items-center bg-seller justify-center mt-4 w-24 h-24 rounded-full flex">
        <Text className="text-[32px]  text-white font-pregular">
          {getInitials(userData?.user?.fullName)}
        </Text>
      </View>
        }
      </View>


      <View className="mt-5">
        <Text className="font-pmedium text-lg text-center">{userData?.user?.fullName}</Text>
        <Pressable className="flex-row justify-center items-center gap-1">
          <Text className="font-pregular text-xsm mr-2 text-black text-center">{userData?.user?.XipperID}</Text>
          <CopyIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileHeader;
