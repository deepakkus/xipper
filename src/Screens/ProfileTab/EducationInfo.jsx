import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";

import ItemContainer from "../../components/ItemContainer";
import { EducationIcon } from "../../assets/images/Icons/Education";

const EducationInfo = () => {


  const data = [
    {
      title: "School",
      onPress: "School",
      IconComponent: EducationIcon,
    },
    {
      title: "College",
      onPress: "College",
      IconComponent: EducationIcon,
    },
  ];
  const data2 = [
    {
      title: "License and certification",
      onPress: "license",
      IconComponent: EducationIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Education Information
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
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">Merit</Text>
        <View className="bg-white rounded-md p-6  mb-8 ">
          {data2.map((item, index) => (
            <ItemContainer
              key={index}
              title={item.title}
              showBorder={index !== data2.length - 1}
              onPress={item.onPress}
              IconComponent={item.IconComponent}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationInfo;
