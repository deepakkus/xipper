import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigation } from "@react-navigation/native";
import ItemContainer from "../../components/ItemContainer";
import { GovernmentIdIcon } from "../../assets/images/Icons/PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { setGovernmentIdInfo } from "../../redux/accountRedux";
import { GetGovernmentIDs } from "../../services/governmentIdService";
import CircularLoader from "../../components/CircularLoader";

const GovernmentId = () => {
  const dispatch = useDispatch();
  const { governmentIdInfo, selectedProfile } = useSelector((state) => state.account);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const fetchGovernmentIds = async () => {
    try {
      setLoading(true);
      const res = await GetGovernmentIDs();
      dispatch(setGovernmentIdInfo(res));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGovernmentIds();
  }, []);

  // useEffect(() => {
  //   if (Object.keys(governmentIdInfo).length === 0) {
  //     fetchGovernmentIds();
  //   }
  // }, [governmentIdInfo]);

  // Data for user profiles
  const userData = [
    {
      title: "PAN Number",
      navigateTo: "PanCard",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "Passport Number",
      navigateTo: "Passport",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "Aadhar Number",
      navigateTo: "AadharCard",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "Driving License",
      navigateTo: "DrivingLicence",
      IconComponent: GovernmentIdIcon,
    },
  ];

  // Data for other profiles (e.g., businesses)
  const otherData = [
    {
      title: "CIN",
      navigateTo: "CIN",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "PAN",
      navigateTo: "PanCard",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "GST",
      navigateTo: "GST",
      IconComponent: GovernmentIdIcon,
    },
    {
      title: "Udhyog Aadhar",
      navigateTo: "AadharCard",
      IconComponent: GovernmentIdIcon,
    },
  ];

  const data = selectedProfile.type === 'user' ? userData : otherData;

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Government ID’s
        </Text>
        <View className="bg-white rounded-md p-6 mb-4">
          {data.map((item, index) => (
            <ItemContainer
              key={index}
              title={item.title}
              showBorder={index !== data.length - 1}
              onPress={() => navigation.navigate(item.navigateTo)}
              IconComponent={item.IconComponent}
            />
          ))}
        </View>
      </ScrollView>
      {loading && <CircularLoader />}
    </SafeAreaView>
  );
};

export default GovernmentId;
