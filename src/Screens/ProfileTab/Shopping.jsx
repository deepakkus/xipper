import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";

import { AmazonIcon } from "../../assets/images/Icons/EntertainmentIcon";
import {
  AjioIcon,
  FlipkartIcon,
  MyntraIcon,
  NykkaIcon,
} from "../../assets/images/Icons/Shopping";
import ItemContainer from "../../components/ItemContainer";

const Shopping = () => {
 

  const data = [
    {
      title: "Amazon",
      onPress: "(Shop)/Amazon",
      IconComponent: AmazonIcon,
    },
    {
      title: "Nykka",
      onPress: "(Shop)/Nykka",
      IconComponent: NykkaIcon,
    },
    {
      title: "Flipkart",
      onPress: "(Shop)/Flipkart",
      IconComponent: FlipkartIcon,
    },
    {
      title: "Myntra",
      onPress: "(Shop)/Myntra",
      IconComponent: MyntraIcon,
    },
    {
      title: "Ajio",
      onPress: "(Shop)/Ajio",
      IconComponent: AjioIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">Shopping</Text>
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

export default Shopping;
