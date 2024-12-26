import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";


import ItemContainer from "../../components/ItemContainer";
import {
  BikeIcon,
  CarIcon,
  HomeIcon,
} from "../../assets/images/Icons/AssetsIcon";
const Assets = () => {


  const data = [
    {
      title: "4 Wheeler",
      onPress: "",
      IconComponent: CarIcon,
    },
    {
      title: "2 Wheeler",
      onPress: "",
      IconComponent: BikeIcon,
    },
    {
      title: "House",
      onPress: "",
      IconComponent: HomeIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-psemibold text-lg text-black mb-4">Assets</Text>
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
export default Assets;
