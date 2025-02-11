import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import CheckOutPopup from './CheckOutPopup';
import BillComponent from './BillComponent';
import Total from './Total';
import ConfirmingCheckOut from './ConfirmingCheckOut';
import RoomNumber from './RoomNumber';
import {GetBill, GetCustomersList} from '../../services/sellerService';
import {useDispatch, useSelector} from 'react-redux';

const BillSeller = () => {
  const navigation = useNavigation();
  const {selectedProfile} = useSelector(state => state.account);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isCodeModalVisible, setCodeModalVisible] = useState(false);
  const [isConfirmingCheckOutVisible, setConfirmingCheckOutVisible] = useState(false);
  const [isCollectDisabled, setCollectDisabled] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('Room Number');
  const [collectButtonText, setCollectButtonText] = useState('Collect');
  const [customerDetails, setCustomerDetails] = useState({});
  const [billDetailsFood, setBillDetailsFood] = useState({});
  const [billDetailsBeverage, setBillDetailsBeverage] = useState({});
  const [billDetailsServices, setBillDetailsServices] = useState({});

  const [billTotalFood, setBillTotalFood] = useState('0');
  const [billTotalBeverage, setBillTotalBeverage] = useState('0');
  const [billTotalServices, setBillTotalServices] = useState('0');

  const [billSubTotalFood, setBillSubTotalFood] = useState('0.00');
  const [billSubTotalBeverages, setBillSubTotalBeverages] = useState('0.00');
  const [billSubTotalServices, setBillSubTotalServices] = useState('0.00');

  const [finalBillData, setFinalBillData] = useState(0);

  useEffect(() => {
    getCustomerListData();
  }, [selectedProfile]);

  const groupBy = (arr, criteria) =>
    arr.reduce((obj, item) => {
      let key =
        typeof criteria === 'function' ? criteria(item) : item[criteria];
      if (!obj.hasOwnProperty(key)) obj[key] = [];
      obj[key].push(item);
      return obj;
    }, {});

  const fetchbill = async () => {
    try {
      const response = await GetBill(
        selectedProfile?.XipperID,
        customerDetails[0]?.bookingId,
        customerDetails[0]?.roomNumber,
      );

      const groupedFood = groupBy(
        response?.data?.bill?.food?.items,
        'orderDate',
      );
      const groupedBeverage = groupBy(
        response?.data?.bill?.beverages?.items,
        'orderDate',
      );
      const groupedServices = groupBy(
        response?.data?.bill?.services?.items,
        'orderDate',
      );

      const groupedFoodTotal = response?.data?.bill?.food?.totalPriceAfterTax;
      const groupedBeverageTotal = response?.data?.bill?.beverages?.totalPriceAfterTax;
      const groupedServicesTotal = response?.data?.bill?.services?.totalPriceAfterTax;
      const finalBillAmount = response?.data?.bill?.total;

      setBillDetailsFood(groupedFood);
      setBillDetailsBeverage(groupedBeverage);
      setBillDetailsServices(groupedServices);

      setBillTotalFood(groupedFoodTotal);
      setBillTotalBeverage(groupedBeverageTotal);
      setBillTotalServices(groupedServicesTotal);

      setBillSubTotalFood(response?.data?.bill?.food);
      setBillSubTotalBeverages(response?.data?.bill?.beverages);
      setBillSubTotalServices(response?.data?.bill?.services);

      setFinalBillData(finalBillAmount);
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomerListData = async () => {
    try {
      const response = await GetCustomersList(selectedProfile?.XipperID);
      if (response && response.status === 200) {
        setCustomerDetails(response.data.data.bookingDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchbill();
  }, [customerDetails, selectedProfile]);

  const handleCheckOut = () => {
    if (isCollectDisabled) {
      setConfirmingCheckOutVisible(true);
      setCollectButtonText('Paid');
    } else {
      setModalVisible(true);
    }
  };
  const handleCollect = () => {
    setCollectDisabled(true);
    setCollectButtonText('Paid');
    setCodeModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseCodeModal = () => {
    setCodeModalVisible(false);
  };

  const handleCloseConfirmingCheckOut = () => {
    setConfirmingCheckOutVisible(false);
  };

  return (
    <>
      <StatusBar hidden={false} />
      {billDetailsFood ? (
        <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
          {/* {Object.entries(billDetails).map(([key,val])=>
                        (
                            <BillComponent title={"Food"} billDetails={val} key={key}/>
                        )
                    )}             */}

          <BillComponent
            title={'Food'}
            billDetails={billDetailsFood}
            billSubTotals={billSubTotalFood}
          />
        </View>
      ) : (
        ''
      )}
      {billDetailsBeverage.length > 0 ? (
        <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
          <BillComponent
            title={'Beverages'}
            billDetails={billDetailsBeverage}
            billSubTotals={billSubTotalBeverages}
          />
        </View>
      ) : (
        ''
      )}
      {billDetailsServices ? (
        <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
          <BillComponent
            title={'Services'}
            billDetails={billDetailsServices}
            billSubTotals={billSubTotalServices}
          />
        </View>
      ) : (
        ''
      )}
      <View className="mt-4 mx-4 p-5 bg-white rounded-lg border border-gray-300">
        {/* <Total foodTotal={billTotalFood} beverageTotal={billTotalBeverage} servicesTotal={billTotalServices} finalBillAmountData={finalBillData}/> */}
        <Total
          foodTotal={billTotalFood}
          beverageTotal={billTotalBeverage}
          servicesTotal={billTotalServices}
          finalBillAmountData={finalBillData}
        />
      </View>
      <View className="flex-row justify-between mx-5 my-5">
        <Pressable
          className="flex-1 mx-2 py-3 bg-orange-500 rounded-lg"
          onPress={handleCheckOut}>
          <Text className="text-center text-white font-semibold text-lg">
            Check-Out
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 mx-2 py-3 ${
            isCollectDisabled ? 'bg-[#FE830C82]' : 'bg-[#FE830C]'
          } rounded-lg`}
          disabled={isCollectDisabled}
          onPress={handleCollect}>
          <Text className="text-center text-white font-semibold text-lg">
            {collectButtonText}
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}>
        <View className="flex-1 justify-center items-center  bg-opacity-80">
          <View className="w-11/12 p-8 rounded-lg bg-white justify-center items-center">
            <CheckOutPopup onClose={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCodeModalVisible}
        onRequestClose={handleCloseCodeModal}>
        <View className="flex-1 justify-center items-center  bg-opacity-80">
          <View className="w-11/12 p-8 rounded-lg bg-white justify-center items-center">
            <RoomNumber
              selectedRoomNumber={selectedRoomNumber}
              setSelectedRoomNumber={setSelectedRoomNumber}
              onClose={handleCloseCodeModal}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmingCheckOutVisible}
        onRequestClose={handleCloseConfirmingCheckOut}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-lg items-center justify-center w-11/12">
            <ConfirmingCheckOut onClose={handleCloseConfirmingCheckOut} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BillSeller;
