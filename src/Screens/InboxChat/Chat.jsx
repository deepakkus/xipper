import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    FlatList,
    ScrollView,
  } from "react-native";
  import React, { useContext } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    BackArrowIcon,
    RightArrow,
    ThreeDotIcon,
  } from "../../assets/images/Icons/ArrowIcon";
  import { NetflixLogo } from "../../assets/images/Icons/SocialMediaIcons";
  import { VerticalThreeDotIcon } from "../../assets/images/Icons/ThreeDotIcon";
  import {
    ArchieveChatIcon,
    AttachIcon,
    BlockChatIcon,
    BlueCircleIcon,
    CameraIcon,
    DeleteChatIcon,
    EmojiIcon,
    MuteNotificationIcon,
    PinchatIcon,
    ReportChatIcon,
    SearchChatIcon,
    WhiteMicIcon,
  } from "../../assets/images/Icons/chatIcons";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useState, useRef, useEffect } from "react";
  import { Modal } from "react-native";
  import { useUser } from "../../constants/Context";
  
  import socket from "../../constants/Helper";
  
  export default function Chat() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [iconLayout, setIconLayout] = useState(null);
    const route = useRoute();
    const openModal = () => {
      if (iconLayout) {
        setModalPosition({
          top: iconLayout.y + iconLayout.height,
          left: iconLayout.x,
        });
        setModalVisible(true);
      }
    };
  
    const closeModal = () => setModalVisible(false);
  
    const handleIconLayout = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setIconLayout({ x, y, width, height });
    };
    const { name } = route.params || "";
    const { user, messages, saveMessage } = useUser();
  
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      socket.emit("join_room", user?.data?.user?._id, name);
  
      socket.on("receive_message", (data) => {
        saveMessage(name, data);
      });
  
      return () => {
        socket.off("receive_message");
      };
    }, [name, user]);
  
    const sendMessage = () => {
      setInputHeight(40);
      if (message.trim() !== "" && user) {
        const messageData = {
          senderId: user.data.user._id,
          message: message.trim(),
          room: name,
        };
  
        socket.emit("send_message", messageData);
        saveMessage(name, messageData);
        setMessage("");
      }
    };
    const [inputHeight, setInputHeight] = useState(30);
    const handleContentSizeChange = (e) => {
      setInputHeight(e.nativeEvent.contentSize.height);
    };
    const renderMessage = ({ item, index }) => {
      console.log("//////////////////");
      console.log(item, index);
      const isCurrentUser = item.senderId === user.data.user._id;
      const previousMessage =
        index < messages[name].length - 1 ? messages[name][index - 1] : null;
      const isFirstMessageFromSender =
        !previousMessage || previousMessage.senderId !== item.senderId;
  
      const avatarUrl = isCurrentUser
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYLCZyGFOpPKEpvJ5ux8_jmjGhGdPwNKFwPA&s"
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZhYUrmk6vDmi1-Pj7oI-HzTpQDCi9-IFTA&s";
  
      // Example time format, replace with actual time data
      const messageTime = "12:34 PM";
  
      return (
        <View className="flex-grow">
          <View
            className={`flex flex-row items-end ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!isCurrentUser && isFirstMessageFromSender ? (
              <Image
                className="mb-5  "
                source={{ uri: avatarUrl }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 8,
                  marginTop: 10,
                }}
              />
            ) : (
              !isCurrentUser && (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 8,
                    backgroundColor: "transparent",
                  }}
                />
              )
            )}
  
            <View
              className={`border-2 border-primary px-5 mt-1 py-1 rounded-xl m-2 h-auto max-w-[75%]  ${
                isCurrentUser ? "self-end bg-primary" : "self-start"
              }`}
            >
              <Text
                className={`text-base pt-1 font-pregular  ${
                  isCurrentUser ? "text-white" : "text-[#373737]"
                }`}
                style={{
                  backgroundColor: isCurrentUser ? "#6D38C3" : "transparent",
                }}
              >
                {item.message}
              </Text>
            </View>
  
            {isCurrentUser && isFirstMessageFromSender ? (
              <Image
                className="my-5"
                source={{ uri: avatarUrl }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginLeft: 8,
                }}
              />
            ) : (
              isCurrentUser && (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 8,
                    backgroundColor: "transparent",
                  }}
                />
              )
            )}
          </View>
          <View
            className={`flex flex-row items-end ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <Text className="text-xs mx-12  text-[#373737] mb-3">
              {messageTime}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <SafeAreaView className="bg-[#f3f2f7] flex-1 justify-center">
        <View
          className="fixed w-full flex flex-row items-center mb-1 space-x-4px-5 pt-10 pb-5"
          style={{ backgroundColor: "#6D38C3" }}
        >
          <View className="flex flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mx-3 ml"
            >
              <BackArrowIcon color={"white"} />
            </TouchableOpacity>
            <View className="flex flex-row items-center space-x-3">
              <NetflixLogo height={44} width={44} />
              <Text className="text-white text-base ">Netflix</Text>
            </View>
          </View>
  
          <View className=" flex flex-row w-[60%] justify-end">
            <Image
              source={require("../../assets/images/Phone.png")}
              height={20}
              width={20}
              style={{ marginRight: 20 }}
            />
            <Image
              source={require("../../assets/images/Video Call.png")}
              height={20}
              width={20}
              style={{ marginRight: 20 }}
            />
            <TouchableOpacity onPress={openModal} onLayout={handleIconLayout}>
              <VerticalThreeDotIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1  ">
          <FlatList
            data={messages[name] && messages[name].slice().reverse()}
            renderItem={({ item, index }) => {
              const reversedIndex = (messages[name]?.length || 0) - 1 - index;
              return renderMessage({ item, index: reversedIndex });
            }}
            keyExtractor={(item, index) => index.toString()}
            style={styles.messageList}
            contentContainerStyle={{
              paddingTop: 90,
              paddingBottom: 10,
              justifyContent: "flex-end",
            }}
            inverted
          />
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    styles.modalContainer,
                    {
                      top: modalPosition.top + 80,
                      left: modalPosition.left - 60,
                    },
                  ]}
                >
                  <View className="flex flex-row items-center mb-1 space-x-4 mt-3 px-4">
                    <MuteNotificationIcon />
                    <Text className=" text-base font-pmedium ">
                      Mute Notifications
                    </Text>
                  </View>
                  <View className="flex flex-row items-center mb-1 space-x-3   mt-1 px-4">
                    <SearchChatIcon />
                    <Text className=" text-base font-pmedium ">Search</Text>
                  </View>
                  <View className="flex flex-row items-center mb-1 space-x-3 mt-3 px-4">
                    <PinchatIcon />
                    <Text className=" text-base font-pmedium ">Pin Chat</Text>
                  </View>
                  <View className="flex flex-row items-center mb-1 space-x-4 mt-3 px-4">
                    <ArchieveChatIcon />
                    <Text className=" text-base font-pmedium ">Archive Chat</Text>
                  </View>
                  <View className="flex flex-row items-center mb-1 space-x-4 mt-3 px-4">
                    <DeleteChatIcon />
                    <Text className=" text-base font-pmedium ">Delete Chat</Text>
                  </View>
                  <View className="flex flex-row items-center mb-1 space-x-4 mt-3 px-4">
                    <BlockChatIcon />
                    <Text className=" text-base font-pmedium ">Block</Text>
                  </View>
                  <View className="flex flex-row item-center  space-x-4  mt-3 px-4">
                    <ReportChatIcon />
                    <Text className=" text-base font-pmedium ">Report</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View className="absolute bottom-0 px-5 pb-5 flex-row  bg-greyFour pt-1 items-end">
          <View className="bg-[#e5e5f5]  rounded-xl ">
            <View className="items-center  py-1 flex-row ">
              <EmojiIcon />
              <TextInput
                placeholder="Message"
                value={message}
                onChangeText={(text) => setMessage(text)}
                className="text-black p-3 w-[73%] ml-8 rounded-lg"
                multiline
                onContentSizeChange={handleContentSizeChange}
                style={[styles.textInput, { height: Math.min(100, inputHeight) }]}
              />
              <AttachIcon />
              <CameraIcon />
            </View>
          </View>
          <TouchableOpacity onPress={sendMessage}>
            <BlueCircleIcon />
  
            <WhiteMicIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    messageList: {
      flex: 1,
      padding: 10,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    modalContainer: {
      position: "absolute",
      backgroundColor: "white",
      borderRadius: 10,
  
      width: "auto",
      padding: 10,
    },
  });