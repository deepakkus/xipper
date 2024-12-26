// import { View, Text, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ProfileHeader from "../../components/ProfileHeader";
// import ItemContainer from "../../components/ItemContainer";

// import {
//   FacebookIcon,
//   InstagramIcon,
//   LinkedInIcon,
//   SnapIcon,
//   YoutubeIcon,
// } from "../../assets/images/Icons/SocialMediaIcons";

// const social = () => {
//   const data = [
//     {
//       title: "LinkedIn",
//       onPress: "/(Social)/LinkedIn",
//       IconComponent: LinkedInIcon,
//     },
//     {
//       title: "Youtube",
//       onPress: "/(Social)/Youtube",
//       IconComponent: YoutubeIcon,
//     },
//     {
//       title: "Instagram",
//       onPress: "/(Social)/Instagram",
//       IconComponent: InstagramIcon,
//     },
//     {
//       title: "Facebook",
//       onPress: "/(Social)/Facebook",
//       IconComponent: FacebookIcon,
//     },
//     {
//       title: "Snapchat",
//       onPress: "/(Social)/Snapchat",
//       IconComponent: SnapIcon,
//     },
//   ];

//   return (
//     <SafeAreaView className="flex-1 px-5 bg-secondary mt-2 ">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <ProfileHeader />
//         <Text className="font-psemibold text-lg text-black mb-4">
//           Social Media
//         </Text>
//         <View className="bg-white rounded-md p-6 mb-8  ">
//           {data.map((item, index) => (
//             <ItemContainer
//               key={index}
//               title={item.title}
//               showBorder={index !== data.length - 1}
//               onPress={item.onPress}
//               IconComponent={item.IconComponent}
//             />
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default social;
