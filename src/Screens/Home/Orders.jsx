import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BlankCircle,
  DeliveryIcon,
  DownArrowIcon,
  RuppeeIcon,
  StatsIcon,
  TickCircleIcon,
  TickIcon,
} from '../../assets/images/Icons/TabBarIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../constants/Helper';
import {ordersData} from '../../constants/Orders';
import {useSelector} from 'react-redux';
import {getTextClassInstance} from '../../utils/TextClass';
import CircularLoader from '../../components/CircularLoader';
import {GetOrderDetails} from '../../services/servicesService';
import ErrorModal from '../../modals/ErrorModal';

const Orders = () => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const {selectedProfile} = useSelector(state => state.account);
  const textClass = getTextClassInstance();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Weekly');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isOrders, setIsOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [errorMsg, SetErrorMsg] = useState('');
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const toggleErrorModal = () => setErrorModalVisible(!isErrorModalVisible);

  const handleClose = () => {
    toggleErrorModal();
  };

  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkyMzVhNTIwOWUzZTRhMThkMzZhZWYiLCJpYXQiOjE3MjA4NTgwMjEsImV4cCI6MTcyMzQ1MDAyMX0.4c3hREivirPh70zuEoqSKngfudB-rMDVhI11RcdFVUI';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/payment/order/XO20240713907510`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log('response.data', err);
        setError(err);
        setLoading(false);
      }
    };

    // fetchData();
  }, []);

  useEffect(() => {
    if (selectedProfile.type === 'user') {
      fetchOrders();
    }
  }, [selectedProfile]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await GetOrderDetails();
      console.log(JSON.stringify(res?.data?.orders));
      if (res.status === 'Success') {
        console.log('Order fetched successfully:', res?.data);
        const fetchedItems = res?.data?.orders;

        const mappedOrders = fetchedItems.map(order => ({
          title: order.hotelCheckIn.hotelName,
          orderId: order.hotelCheckIn.bookingId,
          orderDate: new Date(order.hotelCheckIn.checkInDate),
          orderItem: `${order.roomAllocation[0]?.roomType || 'Room'} - ${
            order.roomAllocation[0]?.roomNumber || 'Unassigned'
          }`,
          address: `${order.hotelCheckIn.address.locality}, ${order.hotelCheckIn.address.city}`,
          amount:
            order.hotelCheckIn.totalAmount === 'nil'
              ? 'Price not set'
              : `₹${order.hotelCheckIn.totalAmount}`,
          status:
            order.roomAllocation.length > 0 ? 'Room Allocated' : 'Pending',
          statusColor:
            order.roomAllocation.length > 0 ? 'bg-green-500' : 'bg-purple-500',
        }));

        setIsOrders(mappedOrders);
        setLoading(false)
      } else if (res.status === 'Fail') {
        setLoading(false)
        setErrorModalVisible(true);
        SetErrorMsg(res.message);
      }
    } catch (e) {
      setLoading(false)
      console.error(e);
      Alert.alert('Error', 'Failed to fetch Orders');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedOption('Weekly');
      return () => setIsDropdownVisible(false);
    }, []),
  );

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = option => {
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
    <SafeAreaView className="flex-1 px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <View className="w-full justify-center items-center p-2">
          <Text className="font-bold text-black font-header text-header">
            {textClass.getTextString('TXT33')}
          </Text>
        </View>

        <View>
          <SearchBar placeholder={'Search for your order...'} />
        </View>

        <Pressable
          className="bg-white rounded-lg p-5 mt-3"
          onPress={() => navigation.navigate('Analytics')}>
          <View className="flex-row justify-between items-center ">
            <View className="flex-1">
              <View className="rounded-xl py-1 px-3 border border-gray-300 mb-2 flex-row justify-between">
                <Text className="font-medium text-base text-[#6D38C3]">
                  {textClass.getTextString('TXT34')}
                </Text>
                <Text className="font-medium ml-2 text-base text-[#6D38C3]">
                  32%
                </Text>
              </View>
              <View className="rounded-xl py-1 px-3 border border-gray-300 mb-2 flex-row justify-between">
                <Text className="font-medium text-base text-[#777CFF]">
                  {textClass.getTextString('TXT35')}
                </Text>
                <Text className="font-medium text-base text-[#777CFF]">
                  32%
                </Text>
              </View>
              <View className="rounded-xl py-1 px-3 border border-gray-300 mb-2 flex-row justify-between">
                <Text className="font-medium text-base text-green-500">
                  {textClass.getTextString('TXT36')}
                </Text>
                <Text className="font-medium text-base text-green-500">
                  32%
                </Text>
              </View>
              <View className="rounded-xl py-1 px-3 border border-gray-300 mb-2 flex-row justify-between">
                <Text className="font-medium text-base text-[#FE830C]">
                  {textClass.getTextString('TXT37')}
                </Text>
                <Text className="font-medium text-base text-[#FE830C]">
                  23%
                </Text>
              </View>
              <View className="rounded-xl py-1 px-3 border border-gray-300 mb-2 flex-row justify-between">
                <Text className="font-medium text-base text-[#F9F244]">
                  {textClass.getTextString('TXT38')}
                </Text>
                <Text className="font-medium text-base text-[#F9F244]">3%</Text>
              </View>
            </View>
            <View className="flex-1 items-center justify-center ml-2  ">
              <View className="items-center m-1 ">
                <View className="items-center absolute right-1/3  top-1/4  mt-8   ">
                  <Text className="font-medium text-base text-center text-black">
                    {textClass.getTextString('TXT39')}
                  </Text>
                  <View className="flex-row items-center ">
                    <RuppeeIcon />
                    <Text className="font-pmedium text-base ml-2 text-black">
                      15,000
                    </Text>
                  </View>
                </View>
                <StatsIcon width={width * 0.3} height={width * 0.3} />
              </View>
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <Text
              className={`text-base font-pmedium flex-1 mr-2 ${
                selectedProfile.type === 'user' ? 'text-user' : 'text-company'
              }`}>
              You saved 10% more than last month
            </Text>
            <Pressable
              onPress={toggleDropdown}
              className="flex-row px-3 py-2 rounded-xl border border-gray-300 items-center justify-center">
              <Text className="font-bold text-black mr-2">
                {selectedOption}
              </Text>
              <DownArrowIcon />
            </Pressable>
          </View>
          {isDropdownVisible && (
            <View className="absolute top-full right-0 w-32 rounded-xl border border-gray-300 bg-white shadow-lg z-10">
              {[
                textClass.getTextString('TXT40'),
                textClass.getTextString('TXT41'),
                textClass.getTextString('TXT42'),
              ].map(option => (
                <Pressable
                  key={option}
                  onPress={() => handleOptionSelect(option)}
                  className="px-4 py-2">
                  <Text className="font-bold text-black text-sm">{option}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>

        {/* Middle Line partition */}
        <View className="mt-4 flex flex-row items-center">
          <Text className=" font-bold text-base text-black text-lg">
            June 2024
          </Text>
        </View>

        {/* Action */}
        <View className="w-full mt-5">
          {loading && <CircularLoader />}
          {isOrders.length > 0 &&
            isOrders.map((order, index) => (
              <View
                key={index}
                className="bg-white flex flex-col items-start justify-between rounded-lg border border-gray-200 mb-8 p-4">
                <View
                  key={index}
                  className="w-full flex flex-row items-center justify-between rounded-full border border-gray-200 mb-4">
                  <View className="flex flex-row items-center">
                    <View className="rounded-full w-20 h-20 overflow-hidden">
                      <Image
                        source={{
                          uri: 'https://cdn.shopify.com/s/files/1/0772/5269/0104/files/pexels-dom-j-7304-45057.jpg?v=1722321095',
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('OrderSummary', {order})
                      }>
                      <Text className="font-bold text-base  ml-3 text-black">
                        {order.title}
                      </Text>
                      {/* <Text className="text-[10px] ml-2 text-gray-500">{order.orderId}</Text> */}
                      <Text className="text-sm ml-3 text-gray-500">
                        {order.amount}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      onPress={openModal}
                      className={`rounded-full w-20 h-20 items-center justify-center ${order.statusColor}`}>
                      <Text className="text-sm text-white items-center font-pmedium">
                        {order.status}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
        </View>
        {/* <View className="w-full mt-5">
          {ordersData.map((order, index) => {
            return (
              <View
                key={index}
                className="bg-white flex flex-col items-start justify-between rounded-lg border border-gray-200 mb-8 p-4">
                {order.line_items.map((item, itemIndex) => {
                  let buttonText = '';
                  let buttonColor = '';

                  if (item.tracking_company === 'Delhivery') {
                    buttonText = 'Cancelled';
                    buttonColor = '#D20000';
                  } else if (order.financial_status === 'delivered') {
                    buttonText = 'Delivered';
                    buttonColor = '#11D800';
                  } else {
                    buttonText = 'Track';
                    buttonColor =
                      selectedProfile.type === 'user' ? '#06A77D' : '#6D38C3';
                  }

                  return (
                    <View
                      key={itemIndex}
                      className="w-full flex flex-row items-center justify-between rounded-full border border-gray-200 mb-4">
                      <View className="flex flex-row items-center">
                        <View className="rounded-full w-20 h-20 overflow-hidden">
                          <Image
                            source={{uri: item.image_url}}
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'cover',
                            }}
                          />
                        </View>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('OrderSummary', {order})
                          }>
                          <Text className="font-pmedium text-base  ml-3 text-black">
                            {item.title}
                          </Text>
                        </Pressable>
                      </View>
                      <Pressable
                        onPress={openModal}
                        className="rounded-full w-20 h-20 items-center justify-center"
                        style={{backgroundColor: buttonColor}}>
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
        </View> */}
        {errorMsg ? (
          <ErrorModal
            isModalVisible={isErrorModalVisible}
            toggleErrorModal={toggleErrorModal}
            handleBack={handleClose}
            heading={'Error!'}
            content={errorMsg}
          />
        ) : (
          ''
        )}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.blackOverlay} />
          <Pressable style={{flex: 1}} onPress={closeModal}>
            <View className="flex-1 justify-center items-center px-5">
              <View className="bg-white w-full p-5 rounded-2xl shadow-xl border border-gray-200">
                <Text className="font-pmedium text-base  mb-3">
                  {textClass.getTextString('TXT43')}
                </Text>
                <Text className="bg-gray-200 h-[1px] w-[100%]"></Text>

                <View className="flex flex-row items-center mt-4 ">
                  {selectedProfile.type === 'user' ? (
                    <TickCircleIcon fill="#06A77D" />
                  ) : (
                    <TickCircleIcon fill="#6D38C3" />
                  )}
                  <View className="absolute left-[5px]">
                    <TickIcon />
                  </View>

                  <View className="ml-5">
                    <Text
                      className={`font-pmedium text-base ${
                        selectedProfile.type === 'user'
                          ? 'text-user'
                          : 'text-company'
                      }`}>
                      {textClass.getTextString('TXT47')}
                    </Text>
                    <Text className="text-gray-600">
                      Order placed : 17th June, 2024
                    </Text>
                  </View>
                </View>

                <View
                  className={`w-[3.2px] h-10 absolute top-28 left-[31px] ${
                    selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                  }`}></View>
                <View className="w-[3.2px] h-32 bg-gray-300 absolute top-40 left-[31px]"></View>

                <View className="flex flex-row items-center space-x-5 mt-5">
                  <BlankCircle />
                  <Text className="font-pmedium text-base text-gray-400">
                    {textClass.getTextString('TXT44')}
                  </Text>
                </View>

                <View className="flex flex-row items-center space-x-5 mt-5">
                  <BlankCircle />
                  <Text className="font-pmedium text-base text-gray-400">
                    {textClass.getTextString('TXT45')}
                  </Text>
                </View>

                <View className="flex flex-row items-center space-x-5 mt-5">
                  <BlankCircle />
                  <Text className="font-pmedium text-base text-gray-400">
                    {textClass.getTextString('TXT46')}
                  </Text>
                </View>

                <View className="flex flex-row items-center space-x-5 mt-5">
                  <BlankCircle />
                  <Text className="font-pmedium text-base text-gray-400">
                    Delivered
                  </Text>
                </View>

                <View className="flex flex-row items-center space-x-3.5 mt-5">
                  {selectedProfile.type === 'user' ? (
                    <DeliveryIcon fill="#06A77D" />
                  ) : (
                    <DeliveryIcon fill="#6D38C3" />
                  )}
                  <Text
                    className={`text-normal font-pmedium ${
                      selectedProfile.type === 'user'
                        ? 'text-user'
                        : 'text-company'
                    }`}>
                    Delivery expected on 20th June, 2024
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
});
export default Orders;
