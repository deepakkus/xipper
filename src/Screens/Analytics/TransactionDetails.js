import { View, Text, FlatList, Pressable, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon, DropDownArrow } from '../../assets/images/Icons/ArrowIcon';
import { FlightBoldIcon, FoodBoldIcon, HealthBoldIcon, ShoppingBoldIcon } from '../../assets/images/Icons/EntertainmentIcon';
import { DownArrowIcon } from '../../assets/images/Icons/TabBarIcon';
import { useSelector } from 'react-redux';

const DataItem = ({ imageUri, title, subtitle, amount, date }) => (
  <View className="mt-4 py-3 pl-5 pr-3 bg-white rounded-xl flex-row justify-between items-center">
    <View className="flex-row space-x-5 items-center">
      <View className="rounded-full w-14 h-14 overflow-hidden">
        <Image
          source={{ uri: imageUri }}
          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
        />
      </View>
      <View>
        <Text className="font-bold text-base">{title}</Text>
        <Text className="text-gray-400">{subtitle}</Text>
      </View>
    </View>
    <View>
      <Text className="font-bold text-base text-right">{amount}</Text>
      <Text className="text-gray-400">{date}</Text>
    </View>
  </View>
);

export default function Transactiondetails() {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('Categories');
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const { selectedProfile } = useSelector(state => state.account);

  const toggleDropdown = (buttonName) => {
    setDropdownVisible(prev => (prev === buttonName ? null : buttonName));
    setActiveButton(prev => (prev === buttonName ? null : buttonName));
  };

  const handleOutsideClick = () => {
    setDropdownVisible(null);
    setActiveButton(null);
  };


  // Data for the list
  const data = [
    {
      id: '1',
      imageUri: 'https://s3-alpha-sig.figma.com/img/075e/3a67/55c1d4df0a3bc96f2bd55eb5a73e2d20?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZf20CwTrKIyMGUU~Xu-L-TbugkEFhysW9W0ZqP0Bvy5x~kjNth-pSYgHcCBmaE-YTS8j0eiSE4LkzABTAr5QER5Hhij4BTfx3lToFI-m~svvKFln9ERnsP2aqIAdrD76Vy-zjpRiaiU6AO9xhK13j~IdxknoM77ansoKmVlOxd0f71cHIUiB4NHnTCXbU0uYo-fC~es5bvypMaHsINyYs1sH4lpWXHv9cfVv38OUFMe1pS3GL0-6rOtzZy4b5TPZQY-DCAslrDRVtXwB63~U6b-CZAHRPzZTn7mzUiU8Jo1mRfG9uP4lVL92gCRCsfhcpz~twEf2W4Z2qL2BbbAiw__',
      title: 'Puma Store',
      subtitle: 'Shoe',
      amount: '$42.6',
      date: 'Fri, June 23 2024'
    },
    {
      id: '2',
      imageUri: 'https://s3-alpha-sig.figma.com/img/0374/9542/1dedbfbea0dd11cea61e672c7eb5007e?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBmFiJdMQkaE72FDPM~-AAKo5U1lFQ9B-QMKD5kU5uo8FfKPcKX3j1tyEIQpIifdPylpkj2aL1u7LRjmZFXSpPSGe2kJXIzZXhb6qr3c9jC6SSFplz0S3ktFBPu9pDicx2y-Yq1rgyMHOYIt4~93Xzq9LVvx9urhins4MepVqJX8BTyIuZnAXEewlK~OMO4ZAqPysC1nPKCYpIQHauS9OEtKgxndUBYJnTQt~LF3qoChxgcM5KF2892hIF-f~tx5GYnAjjZBbvYpAdt4vsKD51hiVOfC7ADskuXlQkffFbO18u6L763WzBrTCnnY38uLr2p6tPecEX30W6V0Tt8Rgg__',
      title: 'Zara Store',
      subtitle: 'Trouser',
      amount: '$42.6',
      date: 'Fri, June 23 2024'
    },
    {
      id: '3',
      imageUri: 'https://s3-alpha-sig.figma.com/img/075e/3a67/55c1d4df0a3bc96f2bd55eb5a73e2d20?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cZf20CwTrKIyMGUU~Xu-L-TbugkEFhysW9W0ZqP0Bvy5x~kjNth-pSYgHcCBmaE-YTS8j0eiSE4LkzABTAr5QER5Hhij4BTfx3lToFI-m~svvKFln9ERnsP2aqIAdrD76Vy-zjpRiaiU6AO9xhK13j~IdxknoM77ansoKmVlOxd0f71cHIUiB4NHnTCXbU0uYo-fC~es5bvypMaHsINyYs1sH4lpWXHv9cfVv38OUFMe1pS3GL0-6rOtzZy4b5TPZQY-DCAslrDRVtXwB63~U6b-CZAHRPzZTn7mzUiU8Jo1mRfG9uP4lVL92gCRCsfhcpz~twEf2W4Z2qL2BbbAiw__',
      title: 'Puma Store',
      subtitle: 'Shoe',
      amount: '$42.6',
      date: 'Fri, June 23 2024'
    },
    // Add more data items as needed
  ];

  return (
    <SafeAreaView className="bg-gray-100 flex justify-center px-5" onTouchStart={handleOutsideClick}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full justify-between flex flex-row items-center mt-8">
              <Pressable onPress={() => navigation.goBack()} className="">
                <BackArrowIcon />
              </Pressable>
              <Text className="font-bold text-gray-400 text-xl">Transaction Details</Text>
              <Text className="font-bold text-gray-300 text-lg">View All</Text>
            </View>

            <View className="">
              <View className="flex-row justify-center space-x-3 pt-5 pb-4 rounded-bl-xl rounded-br-xl">
                <Pressable
                  className={`flex-row border-2 w-40 rounded-lg justify-between px-3 py-1 
    ${selectedProfile.type === 'user'
                      ? (activeButton === 'Categories' ? 'bg-user border-user' : 'bg-white border-user')
                      : (activeButton === 'Categories' ? 'bg-company border-company' : 'bg-white border-company')}`}
                  onPress={() => toggleDropdown('Categories')}
                >
                  <View className="flex-row items-center space-x-2">
                    <Text className={`text-base ${activeButton === 'Categories' ? 'text-white' : 'text-gray-400'}`}>Categories</Text>
                  </View>
                  <DownArrowIcon color={activeButton === 'Categories' ? 'white' : 'gray'} height={24} width={20} />

                  {/* Dropdown for Categories */}
                  {dropdownVisible === 'Categories' && (
                    <TouchableWithoutFeedback>
                      <View className="absolute top-full left-0 mt-2 w-40 bg-white border  rounded-lg shadow-lgborder-gray-200 ">
                        <Pressable className="py-2 px-4 ">
                          <View className="flex-row space-x-4">
                            <ShoppingBoldIcon />
                            <Text className="font-bold">Shopping</Text>
                          </View>
                        </Pressable>
                        <Pressable className="py-1 px-3 ">
                          <View className="flex-row space-x-3.5">
                            <FlightBoldIcon />
                            <Text className="font-bold">Travel</Text>
                          </View>
                        </Pressable>
                        <Pressable className="py-2 px-4">
                          <View className="flex-row space-x-5">
                            <FoodBoldIcon />
                            <Text className="font-bold">Food</Text>
                          </View>
                        </Pressable>
                        <Pressable className="py-2 px-3.5">
                          <View className="flex-row space-x-5">
                            <HealthBoldIcon />
                            <Text className="font-bold">Health</Text>
                          </View>
                        </Pressable>
                      </View>
                    </TouchableWithoutFeedback>
                  )}

                </Pressable>

                <Pressable
                  className={`flex-row border-2 w-40 rounded-lg justify-between px-3 py-1 
    ${selectedProfile.type === 'user'
                      ? (activeButton === 'Monthly' ? 'bg-user border-user' : 'bg-white border-user')
                      : (activeButton === 'Monthly' ? 'bg-company border-company' : 'bg-white border-company')}`}
                  onPress={() => toggleDropdown('Monthly')}
                >
                  <View className="flex-row ">
                    <Text className={`${activeButton === 'Monthly' ? 'text-white' : 'text-gray-400'}`} style={{ fontSize: 15 }}>Monthly</Text>
                  </View>
                  <View className="absolute right-3 items-center top-1">
                    <DownArrowIcon color={activeButton === 'Monthly' ? 'white' : 'gray'} height={24} width={20} />
                    {/* Dropdown for Monthly */}
                    {dropdownVisible === 'Monthly' && (
                      <TouchableWithoutFeedback>
                        <View className="absolute top-full right-[-10px] mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <Pressable className="p-3 border-b border-gray-200" onPress={() => console.log('Option A')}>
                            <Text className="font-bold">Daily</Text>
                          </Pressable>
                          <Pressable className="p-3 border-b border-gray-200" onPress={() => console.log('Option B')}>
                            <Text className="font-bold">Weekly</Text>
                          </Pressable>
                          <Pressable className="p-3" onPress={() => console.log('Option C')}>
                            <Text className="font-bold">Monthly</Text>
                          </Pressable>
                          <Pressable className="p-3" onPress={() => console.log('Option C')}>
                            <Text className="font-bold">Yearly</Text>
                          </Pressable>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                </Pressable>
              </View>

              <View className="">
                {data.map(item => (
                  <DataItem
                    key={item.id} // Ensure each item has a unique key
                    imageUri={item.imageUri}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    date={item.date}
                  />
                ))}
              </View>
            </View>
          </>
        }

      />
    </SafeAreaView>
  )
}