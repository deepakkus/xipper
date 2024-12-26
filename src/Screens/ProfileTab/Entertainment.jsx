import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";

import ItemContainer from "../../components/ItemContainer";
import {
  AmazonIcon,
  NetfilxIcon,
  SonyLIVIcon,
  ZeeIcon,
} from "../../assets/images/Icons/EntertainmentIcon";

const Entertainment = () => {


  const data = [
    {
      title: "Netfilx",
      onPress: "(Entertainment)/Netfilx",
      IconComponent: NetfilxIcon,
    },
    {
      title: "Sony LIV",
      onPress: "(Entertainment)/SonyLiv",
      IconComponent: SonyLIVIcon,
    },
    {
      title: "Zee 5",
      onPress: "(Entertainment)/Zee5",
      IconComponent: ZeeIcon,
    },
    {
      title: "Amazon Prime",
      onPress: "(Entertainment)/Amazon",
      IconComponent: AmazonIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Entertainment
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

export default Entertainment;
