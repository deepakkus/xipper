import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Pressable,
    FlatList,
  } from "react-native";
  import React, { memo, useState } from "react";
  import {
    BackArrowIcon,
    GreaterArrowIcon,
    RightArrow,
  } from "../../assets/images/Icons/ArrowIcon";
  import { useNavigation } from "@react-navigation/native";
  import {
    Food,
    ShoppingIcon,
    CashIcon,
    CreditCardIcon,
    UpiIcon,
    OnlineBankingIcon,
  } from "../../assets/images/Icons/ProfileIcons";
  import {
    FlightBoldIcon,
    FoodBoldIcon,
    HealthBoldIcon,
    ShoppingBoldIcon,
  } from "../../assets/images/Icons/EntertainmentIcon";
  import { useSelector } from "react-redux";
  import { getTextClassInstance } from "../../utils/TextClass";
  
  const Item = memo(({ message }) => {
    const navigation = useNavigation();
    const { selectedProfile } = useSelector((state) => state.account);
  
    return (
      <View className="bg-white rounded-xl p-4 mt-5 mb-4">
        <Text className="font-pmedium text-base text-black" style={{ fontSize: 17 }}>
          {message}
        </Text>
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center space-x-4">
            <View
             className={`p-2.5 rounded-full ${
              selectedProfile.type === "user" 
                ? "bg-user" 
                : selectedProfile.type === "company" 
                  ? "bg-company" 
                  : "bg-seller" 
            }`}
            
              
            >
              <ShoppingIcon color={"white"} height={18} width={20} />
            </View>
            <View>
              <Text className="font-pmedium text-black" style={{ fontSize: 14 }}>
                Shopping
              </Text>
              
              <Text style={{ fontSize: 12, color: "gray" }}>
                Myntra, Zara, Puma
              </Text>
            </View>
          </View>
          <Text className="font-pmedium text-gray-400" style={{ fontSize: 14 }}>
            Rs . 1,555.500
          </Text>
        </View>
        <View className="bg-gray-200 h-[1.4px] mt-4" />
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center space-x-4">
            <View
              className="p-2.5 rounded-full"
              style={{ backgroundColor: "#EDB675" }}
            >
              <Food color={"white"} height={18} width={20} />
            </View>
            <View>
              <Text className="font-pmedium text-black" style={{ fontSize: 14 }}>
                Food
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }}>Zomato, Swiggy</Text>
            </View>
          </View>
          <Text className="font-pmedium text-gray-400" style={{ fontSize: 14 }}>
            Rs . 1,555.500
          </Text>
        </View>
        <View className="bg-gray-200 h-[1.4px] mt-4" />
      </View>
    );
  });
  
  export default function Analytics() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("Weekly");
    const [buttonText, setButtonText] = useState("Mode of Payment");
    const { profiles, selectedProfile } = useSelector((state) => state.account);
    const textClass = getTextClassInstance();
  
    // Data for each tab
    const Weekly = ["June", "July"];
    const Monthly = ["June", "July", "August", "September"];
    const yearly = ["January", "March", "April"];
  
    // Determine which messages to show based on the selected tab
    const getMessagesForTab = () => {
      switch (selectedTab) {
        case "yearly":
          return yearly;
        case "Monthly":
          return Monthly;
        default:
          return Weekly;
      }
    };
  
    // Function to toggle button text
    const toggleButtonText = () => {
      setButtonText((prevText) =>
        prevText === "Mode of Payment" ? "Categories" : "Mode of Payment"
      );
    };
  
    // Render the item text based on the button text
    const renderItem = ({ item, index }) => {
      let displayText;
      let IconComponent;
  
      if (buttonText === "Categories") {
        switch (item) {
          case "Shopping":
            displayText = "Card";
            IconComponent = CashIcon;
            break;
          case "Travel":
            displayText = "Credit Card";
            IconComponent = CreditCardIcon;
            break;
          case "Food":
            displayText = "Online Banking";
            IconComponent = OnlineBankingIcon;
            break;
          case "Health":
            displayText = "UPI ID";
            IconComponent = UpiIcon;
            break;
          default:
            displayText = item; // Fallback to original item text
            IconComponent = null; // No icon if item text doesn't match
        }
      } else {
        displayText = item; // Default display text
        switch (item) {
          case "Shopping":
            IconComponent = ShoppingBoldIcon;
            break;
          case "Travel":
            IconComponent = FlightBoldIcon;
            break;
          case "Food":
            IconComponent = FoodBoldIcon;
            break;
          case "Health":
            IconComponent = HealthBoldIcon;
            break;
          default:
            IconComponent = null; // No icon if item text doesn't match
        }
      }
  
      return (
        <View
          key={`${item}-${index}`}
          className="pl-5 pr-3 py-3.5 rounded-lg flex-row items-center bg-white mt-3"
          style={{ height: 60 }}
        >
          <View className="flex-row items-center flex-1">
            {/* Render icon based on item */}
            {IconComponent && <IconComponent />}
            <Text className="font-pmedium ml-4 text-black" style={{ fontSize: 14 }}>
              {displayText}
            </Text>
          </View>
          <Text className="font-pmedium text-gray-400" style={{ fontSize: 14 }}>
            Rs . 1,555.500
          </Text>
        </View>
      );
    };
  
    return (
      <SafeAreaView className="bg-gray-100 flex-1 px-4">
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View className="w-full justify-center items-center p-2">
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="absolute left-0 z-10"
                >
                  <BackArrowIcon />
                </Pressable>
                <Text className="font-bold text-black font-header text-header text-center">
                  {textClass.getTextString("TXT50")}
                </Text>
              </View>
  
              <View className="rounded-2xl mt-4">
                <View
                 className={`px-4 pt-3 pb-5 rounded-tl-xl rounded-tr-xl ${
                  selectedProfile.type === "user" 
                    ? "bg-user"  
                    : selectedProfile.type === "company" 
                      ? "bg-company"  
                      : "bg-seller"  
                }`}
                
                  
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-white">{textClass.getTextString('TXT39')}</Text>
                      <Text className="font-psemibold text-lg text-white">
                        Rs . 15,000.00
                      </Text>
                    </View>
                    <Pressable
                      onPress={toggleButtonText}
                      className={`border-2 rounded-xl mx-2 py-3 bg-white 
                        ${selectedProfile.type === "user" ? "border-user" : "border-company"}
                        text-center`}
                        style={{
                          color: "#6D38C3",  
                          width: 150,        
                          alignItems: "center", 
                        }}
                    >
                      {selectedProfile.type === "user" ? 
                      <Text style={{ color: "#06A77D", fontSize: 12 }}>
                        {buttonText}
                      </Text>
                      :(
                        <Text style={{ color: "#6D38C3" , fontSize: 12 }}>
                        {buttonText}
                      </Text>
                      )}
                    </Pressable>
                  </View>
  
                  <View className="bg-gray-200 px-2 py-2 rounded-xl mt-3">
                    {["Shopping", "Travel", "Food", "Health"].map((item) =>
                      renderItem({ item })
                    )}
                  </View>
                </View>
                {selectedProfile.type === "company" ?
                <View className="items-center flex-row py-5 bg-company rounded-bl-xl rounded-br-xl">
                  <Pressable
                    onPress={() => navigation.navigate("AnalyticsStats")}
                    className="flex-row items-center"
                  >
                    <Text className="text-white font-psemibold text-lg mr-2 ml-3">
                      See Details
                    </Text>
                    <GreaterArrowIcon color={"white"} />
                  </Pressable>
                </View>
                :(<View className="items-center flex-row py-5 bg-user rounded-bl-xl rounded-br-xl">
                  <Pressable
                    onPress={() => navigation.navigate("AnalyticsStats")}
                    className="flex-row items-center"
                  >
                    <Text className="text-white font-psemibold text-lg mr-2 ml-3">
                      {textClass.getTextString("TXT48")}
                    </Text>
                    <GreaterArrowIcon color={"white"} />
                  </Pressable>
                </View>)}
              </View>
  
              <Text className="font-bold text-lg mt-4 text-black ml-2">{textClass.getTextString('TXT49')}</Text>
              <View className="flex-row justify-evenly mt-4">
                {[textClass.getTextString('TXT40'), textClass.getTextString('TXT41'), textClass.getTextString('TXT42')].map((tab) => (
                  <Pressable
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    className={`border-2 rounded-xl py-2 flex-1 mx-1 ${
                      selectedTab === tab ? "text-white" : ""} 
                      ${
                        selectedProfile.type === "user"
                          ? selectedTab === tab
                            ? "bg-user border-user"
                            : "bg-transparent border-user" 
                          : selectedProfile.type === "company"
                          ? selectedTab === tab
                            ? "bg-company border-company"
                            : "bg-transparent border-company" 
                          : "bg-transparent border-transparent"
                    }`}
                    
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: selectedTab === tab ? "white" : "black",
                      }}
                    >
                      {tab}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          }
          data={getMessagesForTab()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <React.Fragment>
              <Item message={item} />
            </React.Fragment>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    );
  }