import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
    Modal,
    StyleSheet,
    useWindowDimensions,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import SearchBar from "../../components/SearchBar";
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    BlankCircle,
    DeliveryIcon,
    DownArrowIcon,
    RuppeeIcon,
    StatsIcon,
    TickCircleIcon,
    TickIcon,
  } from "../../assets/images/Icons/TabBarIcon";
  import { useFocusEffect } from "@react-navigation/native";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { BASE_URL } from "../../constants/Helper"
  import { ordersData } from "./OrderData";
  
  const Orders = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
  
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Weekly");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyMzVhNTIwOWUzZTRhMThkMzZhZWYiLCJpYXQiOjE3MjA4NTgwMjEsImV4cCI6MTcyMzQ1MDAyMX0.4c3hREivirPh70zuEoqSKngfudB-rMDVhI11RcdFVUI";
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/payment/order/XO20240713907510`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setData(response.data.data);
          setLoading(false);
        } catch (err) {
          console.log("response.data", err);
          setError(err);
          setLoading(false);
        }
      };
  
      // fetchData();
    }, []);
  
    useFocusEffect(
      React.useCallback(() => {
        setSelectedOption("Weekly");
        return () => setIsDropdownVisible(false);
      }, [])
    );
  
    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownVisible(false);
    };
  
    const openModal = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Action */}
          <View className="w-full mt-5">
            {ordersData.map((order, index) => {
              return (
                <View
                  key={index}
                  className="bg-white flex flex-col items-start justify-between rounded-lg border border-gray-200 mb-8 p-4"
                >
                  {order.line_items.map((item, itemIndex) => {
                    let buttonText = "";
                    let buttonColor = "";
  
                    if (item.tracking_company === "Delhivery") {
                      buttonText = "Cancelled";
                      buttonColor = "#D20000";
                    } else if (order.financial_status === "delivered") {
                      buttonText = "Delivered";
                      buttonColor = "#11D800";
                    } else {
                      buttonText = "Track";
                      buttonColor = "#6D38C3";
                    }
  
                    return (
                      <View
                        key={itemIndex}
                        className="w-full flex flex-row items-center justify-between rounded-full border border-gray-200 mb-4"
                      >
                        <View className="flex flex-row items-center">
                          <View className="rounded-full w-20 h-20 overflow-hidden">
                            <Image
                              source={{ uri: item.image_url }}
                              style={{
                                height: "100%",
                                width: "100%",
                                resizeMode: "cover",
                              }}
                            />
                          </View>
                          <Pressable
                            onPress={() =>
                              navigation.navigate("OrderSummary", { order })
                            }
                          >
                            <Text className="font-pmedium text-base  ml-3">
                              {item.title}
                            </Text>
                          </Pressable>
                        </View>
                        <Pressable
                          onPress={openModal}
                          className="rounded-full w-20 h-20 items-center justify-center"
                          style={{ backgroundColor: buttonColor }}
                        >
                          <Text className="text-sm text-white font-pmedium">
                            {buttonText}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
  
        {/* Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.blackOverlay} />
            
            <Pressable style={{ flex: 1 }} onPress={closeModal}>
              <View className="flex-1 justify-center items-center px-5">
                <View className="bg-white w-full p-5 rounded-2xl shadow-xl border border-gray-200">
                  <Text className="font-pmedium text-base  mb-3">
                    Order status summary
                  </Text>
                  <Text className="bg-gray-200 h-[1px] w-[100%]"></Text>
  
                  <View className="flex flex-row items-center mt-4 ">
                    <TickCircleIcon />
                    <View className="absolute left-[5px]">
                      <TickIcon />
                    </View>
                  </View>
  
                  <View
                    className="w-[3.2px] h-10 absolute top-28 left-[31px]"
                    style={{ backgroundColor: "#6D38C3" }}
                  ></View>
                  <View className="w-[3.2px] h-32 bg-gray-300 absolute top-40 left-[31px]"></View>
  
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
        </>
    );
  };
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
    },
    blackOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
    },
    header: {
      marginBottom: 20, // Add space below heading if needed
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'left', // Align text to the left
      alignSelf: 'flex-start', // Ensure the text container aligns to the left
    },
  });
  export default Orders;