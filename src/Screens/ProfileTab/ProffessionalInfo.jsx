import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import {
  EducationIcon,
  ProffessionalIcon,
} from "../../assets/images/Icons/Education";
import ItemContainer from "../../components/ItemContainer";

const ProffessionalInfo = () => {


  const data = [
    {
      title: "Work 1",
      onPress: "",
      IconComponent: ProffessionalIcon,
    },
    {
      title: "Work 2",
      onPress: "",
      IconComponent: ProffessionalIcon,
    },
    {
      title: "Work 3",
      onPress: "",
      IconComponent: ProffessionalIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Proffessional Information
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProffessionalInfo;
