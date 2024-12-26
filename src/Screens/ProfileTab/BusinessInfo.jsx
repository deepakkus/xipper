import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import ItemContainer from "../../components/ItemContainer";

import { BusinessInfoIcon } from "../../assets/images/Icons/Education";

const BusinessInfo = () => {


  const data = [
    {
      title: "Pan number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "Tan number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "IEC code",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "CIN number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "Udyog Aadhar number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "GST number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "DIN number",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
  ];
  const Bank = [
    {
      title: "Bank Account",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "UPI",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "Credit Card",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
    {
      title: "Debit Card",
      onPress: "",
      IconComponent: BusinessInfoIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Education Information
        </Text>
        <View className="bg-white rounded-md p-6 mb-8  ">
          {data.map((item, index) => (
            <ItemContainer
              key={index}
              title={item.title}
              showBorder={index !== data.length - 1}
              onPress={item.onPress}
              IconComponent={item.IconComponent}
            />
          ))}
        </View>
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Business Information
        </Text>
        <View className="bg-white rounded-md p-6  mb-8  ">
          {data.map((item, index) => (
            <ItemContainer
              key={index}
              title={item.title}
              showBorder={index !== data.length - 1}
              onPress={item.onPress}
              IconComponent={item.IconComponent}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default BusinessInfo;
