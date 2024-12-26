import { View, Text, FlatList, Pressable, Image } from "react-native";
import React, { useState, memo, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AmazonLogo,
  NetflixLogo,
} from "../../assets/images/Icons/SocialMediaIcons";
import SearchBar from "../../components/SearchBar";
import { NotificationIcon, PinIcon } from "../../assets/images/Icons/PinIcon";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../constants/Context";
import socket from "../../constants/Helper";
import { useSelector } from "react-redux";
import { getTextClassInstance } from "../../utils/TextClass";
// import Flipkart from "../(profile)/(Shop)/Flipkart";
// import { FlipkartIcon } from "../../assets/images/Icons/Shopping";

// Memoized Item Component
const Item = memo(({ message, index }) => {
  const navigation = useNavigation();
  const navigateToChat = (index) => {
    navigation.navigate("Chat", { name: index });
  };
  const { selectedProfile } = useSelector((state) => state.account);
  return (
    <Pressable
      onPress={() => navigateToChat(index)}
      activeOpacity={0.7}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "red" : "transparent" },
      ]}
    >
      <View className="flex flex-row items-center mt-4 p-2">
        <View>
          <NetflixLogo height={56} width={56} />
        </View>
        <View className="flex-row w-[86%] items-center justify-between">
          <View className="flex-row justify-between items-center ml-2 space-x-2">
            <Text className="font-pmedium text-base text-black">Netflix</Text>
          </View>
          <View className="items-center">
            <View className="items-end w-full pr-4">
              <Text className="text-gray-400">{message}</Text>
            </View>
            <View className="flex flex-row items-center space-x-3 rounded-full mr-3 mt-2">
              <Pressable>
                <PinIcon />
              </Pressable>
              <Pressable>
                <NotificationIcon />
              </Pressable>
              <View
              className={`${selectedProfile.type === 'user' ? " bg-user"  : selectedProfile.type ==='company'? "bg-company" : "bg-seller"
              } w-6 h-6 rounded-full items-center justify-center`}
              >
                <Text className="text-white" style={{ fontSize: 11 }}>
                  2
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

export default function Inbox() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [chats, setChats] = useState([]);
  const { user } = useUser();
  console.log(chats);
  const { selectedProfile } = useSelector((state) => state.account);
  const textClass = getTextClassInstance();

  // Data for each tab
  const allMessages = [
    "Yesterday",
    "10:11",
    "27/06/24",
    "Last month",
    "Last year",
  ];
  const unreadMessages = ["Yesterday", "27/06/24", "27/06/24"];
  const archivedMessages = ["Today", "27/06/24"];
  const blockedMessages = ["Yesterday", "27/06/24", "27/06/24", "27/06/24"];

  const getMessagesForTab = () => {
    switch (selectedTab) {
      case "Unread":
        return unreadMessages;
      case "Archived":
        return archivedMessages;
      case "Blocked":
        return blockedMessages;
      default:
        return allMessages;
    }
  };

  useEffect(() => {
    if (user) {
      socket.emit("get_chats", user._id);
    }

    socket.on("chats_received", (receivedChats) => {
      setChats(receivedChats);
    });

    socket.on("new_message", (data) => {
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        const chatIndex = updatedChats.findIndex(
          (chat) => chat.name === data.room
        );
        if (chatIndex !== -1) {
          updatedChats[chatIndex].lastMessage = data.message;
          updatedChats[chatIndex].timestamp = new Date().toISOString();
        } else {
          updatedChats.push({
            name: data.room,
            lastMessage: data.message,
            timestamp: new Date().toISOString(),
          });
        }
        return updatedChats;
      });
    });

    return () => {
      socket.off("chats_received");
      socket.off("new_message");
    };
  }, [user]);

  return (
    <SafeAreaView className="flex-1 px-5">
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full justify-center items-center">
              <Text className="font-bold text-black font-header text-header text-center">{textClass.getTextString('TXT52')}</Text>
            </View>
            <View className="flex flex-row justify-between mt-5">
              <View className="items-center">
                <NetflixLogo />
                <Text className="font-pmedium text-base mt-2 text-black">{textClass.getTextString('TXT53')}</Text>
              </View>
              <View className="items-center">
                <Image
                  source={{
                    uri: "https://cdn.icon-icons.com/icons2/729/PNG/512/flipkart_icon-icons.com_62718.png",
                  }}
                  borderRadius={100}
                  height={80}
                  width={80}
                />

                <Text className="font-pmedium text-base mt-2 text-black">{textClass.getTextString('TXT54')}</Text>
              </View>
              <View className="items-center">
                <View className="rounded-full bg-white w-20 items-center justify-center h-20">
                  <AmazonLogo />
                </View>
                <Text className="font-pmedium text-base mt-2 text-black">{textClass.getTextString('TXT55')}</Text>
              </View>
            </View>
            <View className="mt-3">
              <SearchBar placeholder={"Search for your brand..."}/>
            </View>
            <View className="flex flex-row justify-between w-full mt-3">
              {["All", "Unread", "Archived", "Blocked"].map((tab) => (
                <Pressable
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  className={`flex-1 border-2 rounded-xl py-2 mx-1 ${
                    selectedTab === tab 
                      ? selectedProfile.type === 'user' 
                        ? "bg-user" 
                        : selectedProfile.type === 'company' 
                          ? "bg-company" 
                          : "bg-seller" 
                      : "bg-transparent"
                  } ${selectedProfile.type === 'user' ? "border-user" : selectedProfile.type === 'company' ? "border-company" : "border-seller"}`}
                  
                >
                  <Text
                    className={`text-center ${
                      selectedTab === tab ? "text-white" : "text-black"
                    }`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text className="font-pmedium text-lg mt-4 text-black">{textClass.getTextString('TXT51')}</Text>
          </>
        }
        data={getMessagesForTab()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <React.Fragment>
            <Item message={item} index={index} />
            <Text className="bg-gray-200 h-[1.4px] mt-4"></Text>
          </React.Fragment>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}