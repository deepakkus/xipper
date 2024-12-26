import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import ItemContainer from "../../components/ItemContainer";

import {
  FDIcon,
  MutualFundIcon,
  SIPIcon,
  StocksIcon,
} from "../../assets/images/Icons/AssetsIcon";

const Investment = () => {


  const data = [
    {
      title: "Stocks",
      onPress: "",
      IconComponent: StocksIcon,
    },
    {
      title: "SIP's",
      onPress: "",
      IconComponent: SIPIcon,
    },
    {
      title: "Mutual Funds",
      onPress: "",
      IconComponent: MutualFundIcon,
    },
    {
      title: "FD's",
      onPress: "",
      IconComponent: FDIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
          Investments
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

export default Investment;
