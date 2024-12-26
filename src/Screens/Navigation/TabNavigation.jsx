import React, { useState, useRef, useEffect } from "react";
import { View, Text, Modal, Pressable, Animated, Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, InboxIcon, MenuIcon, OrdersIcon, ProfileIcon, AnalyticsIcon, OffersIcon } from "../../assets/images/Icons/TabBarIcon";
import { useNavigation } from "@react-navigation/native";
import Home from "../Home/Home";
import Orders from "../Home/Orders";
import Account from "../Home/Account";
import Menu from "../Home/Menu";
import Profile from "../ProfileTab/Profile";
import PersonalInfo from "../ProfileTab/PersonalInfo";
import FinancialInfo from "../ProfileTab/FinancialInfo";
import GovernmentId from "../ProfileTab/GovernmentId";
import { Delete, Logout, RegisterCompany, Reward, SwitchAcc, Languages, PrivacyIcon, Terms, Wishlist, } from "../../assets/images/Icons/Account";
import PhoneNumber from "../ProfileTab/PhoneNumber";
import Family from "../ProfileTab/Family";
import AddressBook from "../ProfileTab/AddressBook";
import EmailInfo from "../ProfileTab/EmailInfo";
import BankDetails from "../ProfileTab/BankDetails";
import CreditCard from "../ProfileTab/CreditCard";
import DebitCard from "../ProfileTab/DebitCard";
import UPI_Ids from "../ProfileTab/UPI_Ids";
import PanCard from "../ProfileTab/PanCard";
import Passport from "../ProfileTab/Passport";
import AadharCard from "../ProfileTab/AadharCard";
import DrivingLicence from "../ProfileTab/DrivingLicence";
import Inbox from "../InboxChat/Inbox";
import Chat from "../InboxChat/Chat";
import Offers from "../OffersTab/Offers";
import Analytics from "../Analytics/Analytics";
import AnalyticStats from "../Analytics/AnalyticsStats";
import Transactiondetails from "../Analytics/TransactionDetails";
import { useDispatch, useSelector } from "react-redux";
import { BackArrowIcon, DropDownArrow } from "../../assets/images/Icons/ArrowIcon";
import { setSelectedProfile } from "../../redux/accountRedux";
import SellerDashboard from "../seller/SellerDashboard";
import { logout } from "../../redux/authRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Customer from "../seller/Customer";
import CustIcon from '../../assets/images/companyseller/Customer.png';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, name, focused }) => {
  let iconComponent = null;

  const { selectedProfile } = useSelector((state) => state.account);
  switch (icon) {
    case "home":
      iconComponent = <HomeIcon fill={focused ? color : undefined} />;
      break;
    case "order":
      iconComponent = <OrdersIcon fill={focused ? color : undefined} />;
      break;
    case "menu":
      iconComponent = <MenuIcon fill={focused ? color : undefined} />;
      break;
    case "account":
      iconComponent = <ProfileIcon fill={focused ? color : undefined} />;
      break;
    case "inbox":
      iconComponent = <InboxIcon fill={focused ? color : undefined} />;
      break;
    case "analytics":
      iconComponent = <AnalyticsIcon fill={focused ? color : undefined} />;
      break;
    case "offers":
      iconComponent = <OffersIcon fill={focused ? color : undefined} />;
      break;
    case "custIcon":
      iconComponent = (
        <Image
          source={CustIcon}
          style={{
            tintColor:focused ? color : "gray",
            width: 29,
            height: 33
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <View className="items-center justify-center w-auto">
      <View>{iconComponent}</View>
      <Text
        className={`text-xs w-full h-5 items-center`}
        style={{
          color: focused
            ? color
            : selectedProfile.type === "user"
            ? "black"
            : "black",
        }}
      >
        {name}
      </Text>
    </View>
  );
};


const MenuModal = ({ visible, onClose, onSelectOption }) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const { profiles, selectedProfile } = useSelector((state) => state.account);
  const [showProfiles, setShowProfiles] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showSystemSettings, setShowSystemSettings] = useState(false);

  const handleSelect = (route, enableMenu, data) => {
    if (route === "profiles") {
      setShowProfiles(!showProfiles);
      setShowSystemSettings(false);
    } else if (route === "system-settings") {
      setShowSystemSettings(!showSystemSettings);
      setShowProfiles(false);
    } else if (route === "switch-profile") {
      dispatch(setSelectedProfile(data));
      setShowProfiles(!showProfiles);
      if (data.type === "hotel") {
        onSelectOption("SellerDashboard", false);
      } else {
        onSelectOption("MainHome", false);
      }
      onClose();
    } else {
      onSelectOption(route, enableMenu);
      onClose();
    }
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);


  const systemSettingsOptions = [
    { icon: <Languages />, name: "Language", route: "Language" },
    { icon: <InboxIcon />, name: "Currency", route: "Currency" },
    { icon: <PrivacyIcon />, name: "Privacy and Policy", route: "Privacy" },
    { icon: <Terms />, name: "Terms of use", route: "Terms" },
    { icon: <Terms />, name: "Contact Us", route: "Contact" },
    { icon: <Delete />, name: "Delete account", route: "Support" }
  ];

  const Menus = [
    {
      label: "Switch Profiles",
      key: "profiles",
      icon: <SwitchAcc fill="#ffffff" />,
      route: "profiles",
      options: profiles || []
    },
    ...(selectedProfile.type === "user" ? [
      { icon: <InboxIcon fill="#ffffff" />, label: "Inbox", route: "Inbox", enableMenu: true },
      { icon: <AnalyticsIcon fill="#ffffff" />, label: "Analytics", route: "Analytics", enableMenu: true },
      {
        icon: <Image
        source={require("../../assets/images/companyseller/SystemSettings.png")}
      />,
        label: "System Settings",
        route: "system-settings",
        options: systemSettingsOptions
      },
      { icon: <RegisterCompany fill="#ffffff" />, label: "Register as Company", route: "CompanyList" },
      { icon: <Logout fill="#ffffff" />, label: "Logout", route: "Logout" }
    ] : []),
    ...(selectedProfile.type === "company" ? [
      { icon: <InboxIcon fill="#ffffff" />, label: "Inbox", route: "Inbox", enableMenu: true },
      { icon: <AnalyticsIcon fill="#ffffff" />, label: "Analytics", route: "Analytics", enableMenu: true },
      { icon: <Image
        source={require("../../assets/images/companyseller/Management.png")}
      />, label: "Management", route: "CompanyManagement" },
      {
        icon: <Image
          source={require("../../assets/images/companyseller/SystemSettings.png")}
        />,
        label: "System Settings",
        route: "system-settings",
        options: systemSettingsOptions
      },
      { icon: <Logout fill="#ffffff" />, label: "Logout", route: "Logout" },
    ] : []),
    ...(selectedProfile.type === "hotel" ? [
      { icon: <InboxIcon fill="#ffffff" />, label: "Inbox", route: "Inbox", enableMenu: true },
      { icon: <AnalyticsIcon fill="#ffffff" />, label: "Analytics", route: "SellerAnalytics", enableMenu: true },
      { icon: 
        (
          <Image
            source={require("../../assets/images/companyseller/Review.png")}
            style={{ tintColor: "#ffffff" }}
          />
        ),label: "Review", route: "review", options: systemSettingsOptions },
      { icon: <Image
        source={require("../../assets/images/companyseller/Management.png")}
      />, label: "Management", route: "CompanyManagement", options: systemSettingsOptions },
      {
        icon: <Image
        source={require("../../assets/images/companyseller/SystemSettings.png")}
      />,
        label: "System Settings",
        route: "system-settings",
        options: systemSettingsOptions
      },
      { icon: <Logout fill="#ffffff" />, label: "Logout", route: "Logout" },
    ] : [])
  ];


  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose} shouldRasterizeIOS >
      <Pressable
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}
        onPress={onClose}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              { translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }
            ],
          }}
        >
          <View className={`${selectedProfile.type === 'user' ? " bg-user" : selectedProfile.type === 'company' ? "bg-company" : "bg-seller"
            }`} style={{
              width: 250,
              paddingVertical: 20,
              paddingHorizontal: 20,
              height: "100%",
              display: "flex",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 1
            }}>


            {!showSystemSettings ? (
              // Main Menu
              <>
                <View>
                  <Image source={require('../../assets/images/logoWhite.png')} className="mb-5 flex items-center" />
                </View>
                {Menus.map((item, index) => (
                  <View key={index}>
                    <Pressable
                      className="flex-row justify-between pb-2 mb-4 items-center"
                      onPress={() => handleSelect(item.route, item?.enableMenu)}
                    >
                      <View className="flex-row items-center space-x-3">
                        {item.icon}
                        <Text className="text-base text-white font-bold">{item.label}</Text>
                      </View>
                      {(index === 0 || item.route === "system-settings")}
                    </Pressable>

                    {/* Profile Options */}
                    {index === 0 && showProfiles && (
                      <View className="ml-5">
                        {item.options.map((i, ind) => (
                          <Pressable
                            key={`profiles-${ind}`}
                            className="flex-row justify-between p-2 rounded-lg mb-4 items-center"
                            style={{ backgroundColor: selectedProfile.XipperID === i.XipperID ? "#fff" : "transparent" }}
                            onPress={() => handleSelect("switch-profile", false, i)}
                          >
                            <View className="flex-row items-center space-x-3">
                              <Image source={require("../../assets/images/Flag.png")} />
                              <Text
                                className="font-pmedium text-base text-white font-bold"
                                style={{ color: selectedProfile.XipperID === i.XipperID ? "#000" : "#fff" }}
                              >
                                {i.name}
                              </Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </>
            ) : (
              // System Settings Submenu
              <>
                <View className="flex flex-row items-center mb-10">
                  <Pressable onPress={() => setShowSystemSettings(!showSystemSettings)}>
                    <BackArrowIcon color="white" />
                  </Pressable>

                  <Image
                    source={require('../../assets/images/logoWhite.png')}
                  />
                </View>
                <Pressable
                  className="flex-row items-center mb-6"
                >
                  <Text className="font-pmedium text-lg text-white font-bold">System Settings</Text>
                </Pressable>
                {systemSettingsOptions.map((option, idx) => (
                  <Pressable
                    key={`setting-${idx}`}
                    className="flex-row justify-between p-2 mb-4 items-center"
                    onPress={() => handleSelect(option.route, true)}
                  >
                    <Text className="font-bold text-base text-white">
                      {option.name}
                    </Text>
                  </Pressable>
                ))}
              </>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const TabsLayouts = () => {
  const dispatch = useDispatch();
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const { profiles, selectedProfile } = useSelector((state) => state.account);
  const [menuIcon, setMenuIcon] = useState("menu");
  const [menuName, setMenuName] = useState("Menu");
  const [selectedTab, setSelectedTab] = useState("Home");
  const navigation = useNavigation();

  const toggleMenuModal = () => {
    setMenuModalVisible(!menuModalVisible);
  };

  const handleSelectOption = async (route, enableMenu) => {
    if (route === "Logout") {
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.replace("Login");
    } else {

      // setMenuIcon(icon);
      // setMenuName(name);
      toggleMenuModal();
      enableMenu && handleTabPress("Menu")
      navigation.navigate(route);

      // if (name === "Inbox") navigation.navigate("Inbox");
      // else if (name === "Offers") navigation.navigate("Offers");
      // else if (name === "Analytics") navigation.navigate("Analytics");
      resetMenuOption();
    }
  };

  const resetMenuOption = () => {
    setMenuIcon("menu");
    setMenuName("Menu");
  };

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  const tabScreens = [
    ...(selectedProfile.type !== "hotel" ?
      [{ name: "Home", component: Home, title: "Home", icon: "home", focusTab: "Home" }] :
      [{ name: "SellerDashboard", component: SellerDashboard, title: "Home", icon: "home", focusTab: "Home" }]),
    ...(
      selectedProfile.type === "hotel"
        ? [{ name: "Customer", component: Customer, title: "Customer", icon: "custIcon", focusTab: "Customer" }]
        : [{ name: "Orders", component: Orders, title: "Orders", icon: "order", focusTab: "Orders" }]
    ),
    { name: "Account", component: Profile, title: "Account", icon: "account", focusTab: "Account" },
    { name: "Menu", component: Menu, title: "Menu", icon: "menu", isMenu: true, focusTab: "Menu" },
    { name: "Profile", component: Profile, tabBarButton: false, focusTab: "Account" },
    { name: "PersonalInfo", component: PersonalInfo, tabBarButton: false, focusTab: "Account" },
    { name: "FinancialInfo", component: FinancialInfo, tabBarButton: false, focusTab: "Account" },
    { name: "GovernmentId", component: GovernmentId, tabBarButton: false, focusTab: "Account" },
    { name: "PhoneNumber", component: PhoneNumber, tabBarButton: false, focusTab: "Account" },
    { name: "Family", component: Family, tabBarButton: false, focusTab: "Account" },
    { name: "AddressBook", component: AddressBook, tabBarButton: false, focusTab: "Account" },
    { name: "EmailInfo", component: EmailInfo, tabBarButton: false, focusTab: "Account" },
    { name: "BankDetails", component: BankDetails, tabBarButton: false, focusTab: "Account" },
    { name: "CreditCard", component: CreditCard, tabBarButton: false, focusTab: "Account" },
    { name: "DebitCard", component: DebitCard, tabBarButton: false, focusTab: "Account" },
    { name: "UPI_Ids", component: UPI_Ids, tabBarButton: false, focusTab: "Account" },
    { name: "PanCard", component: PanCard, tabBarButton: false, focusTab: "Account" },
    { name: "Passport", component: Passport, tabBarButton: false, focusTab: "Account" },
    { name: "AadharCard", component: AadharCard, tabBarButton: false, focusTab: "Account" },
    { name: "DrivingLicence", component: DrivingLicence, tabBarButton: false, focusTab: "Account" },
    { name: "Inbox", component: Inbox, tabBarButton: false, focusTab: "Menu" },
    { name: "Chat", component: Chat, tabBarButton: false, focusTab: "Menu" },
    { name: "Offers", component: Offers, tabBarButton: false, focusTab: "Menu" },
    { name: "Analytics", component: Analytics, tabBarButton: false, focusTab: "Menu" },
    { name: "AnalyticStats", component: AnalyticStats, tabBarButton: false, focusTab: "Menu" },
    { name: "TransactionDetails", component: Transactiondetails, tabBarButton: false, focusTab: "Menu" }
  ];

  return (
    <>
      <MenuModal visible={menuModalVisible} onClose={toggleMenuModal} onSelectOption={handleSelectOption} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // borderTopLeftRadius: 30,
            // borderTopRightRadius: 30,
            // height: 73,
            // zIndex: 999999,
            // position: 'absolute',
            // bottom: 0,
            // elevation: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 73,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: 10000,
            elevation: 10,
          },
        }}
      >
        {tabScreens.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
              tabBarButton: (props) =>
                screen.tabBarButton === false ? null : (
                  <Pressable
                    {...props}
                    onPress={() => {

                      if (screen.isMenu) { toggleMenuModal(); }
                      else {
                        handleTabPress(screen.name);
                        props.onPress();
                        resetMenuOption();
                      }
                    }}
                    className="mx-5 mb-2 "
                  // className={screen.isMenu ? "mb-2 mr-5" : "ml-5 mb-2"}
                  >
                    <TabIcon
                      icon={screen.icon}
                      // color={"#965DF2"}
                      color={
                        selectedProfile.type === "user"
                          ? "#06A77D"
                          : selectedProfile.type === "company"
                            ? "#6D38C3"
                            : "#fe830c"
                      }

                      name={screen.title}
                      // focused={screen.focusTab === "Menu" ? menuModalVisible : selectedTab === screen.focusTab}
                      focused={selectedTab === screen.focusTab}
                    // focused={props.accessibilityState.selected}
                    />
                  </Pressable>
                ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TabsLayouts;
