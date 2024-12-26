import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AssetIcon,
  EducatioBusinessIcon,
  EducationIcon,
  EntertainmentIcon,
  FinancialIcon,
  GovernmentIdIcon,
  HealthIcon,
  InvestmentIcon,
  PersnolIcon,
  ShoppingIcon,
  SocialMediaIcon,
  UtilityIcon,
} from "../../assets/images/Icons/ProfileIcons";
import { GreaterArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import { useSelector } from "react-redux";
import { getTextClassInstance } from "../../utils/TextClass";

const Profile = () => {
  const navigation = useNavigation();
  const { selectedProfile } = useSelector((state) => state.account);
  const textClass = getTextClassInstance();

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100">
      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
      <ProfileHeader/>

        {selectedProfile.type === 'user' ? (
          <>
            {/* Personal Info */}
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonalInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <PersnolIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT28')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>

            {/* Financial Info */}
            <TouchableOpacity
              onPress={() => navigation.navigate("FinancialInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <FinancialIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT29')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>

            {/* Government */}
            <TouchableOpacity
              onPress={() => navigation.navigate("GovernmentId")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <GovernmentIdIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT30')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>

            {/* Social */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("SocialMedia")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <SocialMediaIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Social Media</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Education */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("EducationInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <EducationIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Educational Information</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Professional Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ProffessionalInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <EducatioBusinessIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Professional Information</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Business Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("BusinessInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <EducatioBusinessIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Business Information</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Entertainment Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Entertainment")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <EntertainmentIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Entertainment</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Shopping Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Shopping")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <ShoppingIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Shopping</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Health Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("HealthInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <HealthIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Health Information</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Asset Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Assets")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <AssetIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Assets</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Investment Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Investment")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <InvestmentIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Investment</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}

            {/* Utility Info */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("UtilityInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-10 mx-3"
            >
              <View className="flex-row items-center">
                <UtilityIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Utility Information</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}
          </>
        ) : (
          <View>
            {selectedProfile.type === 'company' ? 
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonalInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <PersnolIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT31')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>
            :(
              <TouchableOpacity
              onPress={() => navigation.navigate("PersonalInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <PersnolIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT32')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>
            )}

            {/* Financial Info */}
            <TouchableOpacity
              onPress={() => navigation.navigate("FinancialInfo")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <FinancialIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT29')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>

            {/* Government */}
            <TouchableOpacity
              onPress={() => navigation.navigate("GovernmentId")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <GovernmentIdIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">{textClass.getTextString('TXT30')}</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity>

            {/* Social */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("SocialMedia")}
              className="flex-row items-center justify-between bg-white py-6 px-3 rounded-lg mb-3 mx-3"
            >
              <View className="flex-row items-center">
                <SocialMediaIcon />
                <Text className="font-poppins font-bold text-[16px] text-md text-black ml-3">Social Media</Text>
              </View>
              <GreaterArrowIcon />
            </TouchableOpacity> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
