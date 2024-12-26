import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";

import ItemContainer from "../../components/ItemContainer";
import {
  AllergenIcon,
  BloodGroupIcon,
  CheckupIcon,
  IllnssIcon,
  InsuranceIcon,
} from "../../assets/images/Icons/HealthInfoIcon";

const HealthInfo = () => {
 

  const data = [
    {
      title: "Blood Group",
      onPress: "",
      IconComponent: BloodGroupIcon,
    },
    {
      title: "Health Checkup",
      onPress: "",
      IconComponent: CheckupIcon,
    },
    {
      title: "Pre-existing Illness",
      onPress: "",
      IconComponent: IllnssIcon,
    },
    {
      title: "Insurance Policy",
      onPress: "",
      IconComponent: InsuranceIcon,
    },
    {
      title: "Allergence Details",
      onPress: "",
      IconComponent: AllergenIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Health Information
        </Text>
        <View className="bg-white rounded-md p-6  mb-8 ">
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

export default HealthInfo;
