import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigation } from "@react-navigation/native"; // Use React Navigation
import ItemContainer from "../../components/ItemContainer";
import {
  BankAccount,
  CardIcon,
  UPI,
} from "../../assets/images/Icons/FinacialIcons";
import { useSelector } from "react-redux";

const FinancialInfo = () => {
  const navigation = useNavigation();
  const { selectedProfile } = useSelector((state) => state.account);

  const data = [
    {
      title: "Credit Card",
      navigateTo: 'CreditCard',
      IconComponent: CardIcon,
    },
    {
      title: "Debit Card",
      navigateTo: 'DebitCard',
      IconComponent: CardIcon,
    },
    {
      title: "UPI Id",
      navigateTo: 'UPI_Ids',
      IconComponent: UPI,
    },
    {
      title: "Bank Accounts",
      navigateTo: 'BankDetails',
      IconComponent: BankAccount,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Financial Information
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
        
        {selectedProfile.type !== 'user' && (
          <View className="bg-white rounded-md p-6 mb-8">
            <ItemContainer
              title="Check Credit Score"
              onPress={() => navigation.navigate('CheckCreditScore', { profile: selectedProfile })}
              IconComponent={BankAccount}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinancialInfo;
