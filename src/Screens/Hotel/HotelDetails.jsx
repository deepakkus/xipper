// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     Image,
//     ScrollView,
//     FlatList,
//     Pressable,
//     Modal
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
// import {
//     DynamicStars,
//     HeartIcon,
//     LocationIcon,
//     ThreeDotIcon,
// } from "../../assets/images/Icons/HomeIcon";
// import { Jacuzzi, Spa, Swimming } from "../../assets/images/Icons/Hotel";
// import HotelCard from "../../components/HotelCard";
// import HotelModal from "../../modals/HotelModal";
// import SortedByModal from "../../modals/SortedByModal";
// import { Calender, Door, Guest, GovernmentIdIcon } from "../../assets/images/Icons/TravalIons";
// import VerifyContent from "../../components/VerifyContent";
// import CheckInContent from "../../components/CheckIn";
// import { GetUserHotelDetails } from "../../services/hotelService"
// import ConfirmingCheckOut from "../seller/ConfirmingCheckOut";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import CircularLoader from "../../components/CircularLoader";
// import RoomComponent from "../../components/RoomComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedProperty } from "../../redux/accountRedux";

// const TopCategyData = [
//     {
//         id: 1,
//         imageUri: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop",
//         category: "Travel",
//     },
//     {
//         id: 2,
//         imageUri: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop",
//         category: "Food",
//     },
//     {
//         id: 3,
//         imageUri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
//         category: "Shopping",
//     },
//     {
//         id: 4,
//         imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
//         category: "Health",
//     },
//     {
//         id: 5,
//         imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
//         category: "Travel",
//     },
// ];

// const hotelTempData = {
//     name: "Raddisson",
//     address: "1234, MG Road",
//     featuresEnabled: {
//         booking: true,
//         checkin: true,
//     },
//     hotelDesc: "adfsdghjgfsdgffdsdf sdgfdsfds  dsfdsfdsf",
//     checkinTime: "09:00 AM",
//     checkoutTime: "01:00 PM",
//     isUnmarriedAllowed: true
// }

// const data1 = {
//     roomTypes: ['Standard Rooms', 'Executive Rooms', 'Stan'],
// }

// const HotelDetails = () => {
//     const dispatch = useDispatch();
//     const route = useRoute();
//     const nav = useNavigation();
//     const params = route.params;
//     const data = hotelTempData;
//     const { selectedProfile, selectedProperty } = useSelector(state => state.account);
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [isCheckInModalVisible, setCheckInModalVisible] = useState(false);
//     const [serviceModalVisible, setServiceModalVisible] = useState(Boolean(selectedProperty.checkInId));
//     const [isCheckIn, setIsCheckIn] = useState(Boolean(selectedProperty.checkInId));
//     const [selectedService, setSelectedService] = useState("Guest Concierge");
//     const [heading, setHeading] = useState("Verify Check-In");
//     const [loading, setLoading] = useState(false);
//     const [hotelDetails, setHotelDetails] = useState({});
//     const [selectedRoomType, setSelectedRoomType] = useState('Standard Rooms');
//     const [isAmenitiesModalVisible, setIsAmenitiesModalVisible] = useState(false);

//     const toggleModal = () => setModalVisible(!isModalVisible);
//     const toggleCheckInModal = () => setCheckInModalVisible(!isCheckInModalVisible);
//     const toggleServiceModal = () => setServiceModalVisible(!serviceModalVisible);

//     const fetchHotelDetails = async () => {
//         try {
//             setLoading(true);
//             const res = await GetUserHotelDetails(selectedProperty?.XipperID);
//             setHotelDetails(res.result);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchHotelDetails();
//     }, []);

//     const handleBack = () => {
//         if (serviceModalVisible) {
//             selectedService === "Guest Concierge"
//                 ? toggleServiceModal()
//                 : setSelectedService("Guest Concierge");
//         } else {
//             toggleCheckInModal();
//         }
//     };

//     const addressComponents = [
//         hotelDetails?.address?.house,
//         hotelDetails?.address?.street,
//         hotelDetails?.address?.locality,
//         hotelDetails?.address?.landmark,
//         hotelDetails?.address?.city,
//         hotelDetails?.address?.state,
//         hotelDetails?.address?.pincode,
//     ];

//     const filteredAddress = addressComponents.filter(Boolean).join(', ');

//     const profileClass = selectedProfile.type === 'user' ? 'bg-user' : 'bg-company';

//     return (
//         <SafeAreaProvider>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <HotelModal
//                     isModalVisible={isModalVisible}
//                     toggleModal={toggleModal}
//                     data={{ ...hotelDetails, address: filteredAddress }}
//                 />
//                 <SortedByModal
//                     isModalVisible={serviceModalVisible}
//                     toggleModal={toggleServiceModal}
//                     handleBack={handleBack}
//                     heading={"Guest Concierge"}
//                     content={
//                         <CheckInContent
//                             setSelectedService={setSelectedService} selectedService={selectedService}
//                             toggleModal={toggleServiceModal} hotelData={{ ...hotelDetails, ...selectedProperty }}
//                         />}
//                 />
//                 <SortedByModal
//                     isModalVisible={isCheckInModalVisible}
//                     toggleModal={toggleCheckInModal}
//                     handleBack={handleBack}
//                     heading={heading}
//                     content={
//                         <VerifyContent
//                             toggleModal={toggleCheckInModal} setIsCheckIn={setIsCheckIn}
//                             setHeading={setHeading} hotelData={{ ...hotelDetails, ...selectedProperty }}
//                         />
//                     }
//                 />
//                 <Image
//                     source={{ uri: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop" }}
//                     style={{ width: '100%', height: 450, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
//                     resizeMode="cover"
//                 />
//                 <View className="absolute w-full p-6">
//                     <View className="flex-row justify-between items-center">
//                         <Pressable onPress={() => nav.pop()}>
//                             <BackArrowIcon color="#fff" />
//                         </Pressable>
//                         <View className="flex-row items-center space-x-5">
//                             <HeartIcon />
//                             <ThreeDotIcon />
//                         </View>
//                     </View>
//                 </View>
//                 <View className="bg-white flex-1 z-10 rounded-3xl px-5 mt-[-60px] mt-[-1]">
//                     <View className="flex-row  rounded-full w-36 h-1 justify-center self-center my-5" />
//                     <View className="flex flex-row gap-2 items-center ">
//                         <Text className="font-bold text-[20px] text-black">{hotelDetails?.name}</Text>
//                         <View>
//                             <DynamicStars rating={hotelDetails.hotelStarRating} />
//                         </View>
//                     </View>
//                     <View className="flex flex-row gap-2 pr-10 items-center mr-2">
//                         <View className="flex-row space-x-2 items-center">
//                             <LocationIcon color="#999" />
//                         </View>
//                         <Text className="font-pmedium text-[14px] text-gray-400">
//                             {filteredAddress}
//                         </Text>
//                     </View>

//                     <View className="flex-row mt-2 items-center">
//                         <View
//                             className={`rounded-md px-2 py-1 w-[40px] h-[24px]
//           ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
//                         >
//                             <Text className="text-white font-pmedium text-[12px] ml-1">4.2</Text>
//                         </View>
//                         <Text
//                             className={`font-pmedium ml-2 text-[14px] ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
//                                 }`}
//                         >
//                             Very Good
//                         </Text>
//                         <Text className="font-pmedium ml-2 text-black text-[14px]">
//                             (100 Reviews)
//                         </Text>
//                         <Pressable className="ml-16 rounded-full bg-user px-4 py-1">
//                             <Text className={`text-[14px] font-pmedium text-white ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}>Directions</Text>
//                         </Pressable>

//                     </View>

//                     {/* <View className="mt-4">
//                         {hotelDetails?.mealPolicy && hotelDetails.mealPolicy.reduce((rows, item, index) => {
//                             if (index % 2 === 0) {
//                                 rows.push([item]);
//                             } else {
//                                 rows[rows.length - 1].push(item);
//                             }
//                             return rows;
//                         }, []).map((row, rowIndex) => (
//                             <View
//                                 key={rowIndex}
//                                 className="flex-row items-center justify-between ml-6 mr-6 mt-1"
//                             >
//                                 {row.map((item, index) => (
//                                     <Text
//                                         key={index}
//                                         className={`font-bold text-[14px] ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}
//                                     >
//                                         • {item.policy?.name}
//                                     </Text>
//                                 ))}
//                             </View>
//                         ))}
//                     </View> */}


//                     <View className="flex-row flex-wrap gap-2 justify-evenly w-full my-3">
//                         {["user", "company"].includes(selectedProfile.type) &&
//                             selectedProfile.userCheckInInfo.length > 0 &&
//                             selectedProfile.userCheckInInfo.filter(
//                                 (i) => selectedProperty?.XipperID === i.roomAllocation.room.hotelId
//                             ).length > 0 &&
//                             selectedProfile.userCheckInInfo.map(
//                                 (i, ind) =>
//                                     selectedProperty?.XipperID === i.roomAllocation.room.hotelId && (
//                                         <Pressable
//                                             key={`${i.roomAllocation.room.roomNumber}-${ind}`}
//                                             onPress={toggleServiceModal}
//                                             className="w-30"
//                                         >
//                                             <Text
//                                                 className={`text-center px-2 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
//                                             >
//                                                 {i.roomAllocation.room.roomNumber}
//                                             </Text>
//                                         </Pressable>
//                                     )
//                             )}
//                         {data?.featuresEnabled?.booking && (
//                             <Pressable onPress={toggleModal} className="w-30">
//                                 <Text
//                                     className={`text-center px-4 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
//                                 >
//                                     Book
//                                 </Text>
//                             </Pressable>
//                         )}
//                         {data?.featuresEnabled?.checkin && (
//                             <Pressable onPress={toggleCheckInModal} className="w-30">
//                                 <Text
//                                     className={`text-center px-4 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
//                                 >
//                                     Check-In
//                                 </Text>
//                             </Pressable>
//                         )}
//                     </View>

//                     <Text className="font-bold text-[18px] text-black mb-1 mt-2">About this Property</Text>
//                     <Text className="font-pmedium text-[14px] text-gray-400">{hotelDetails.hotelDesc}</Text>
//                     <View className="flex-row bg-gray-300 rounded-full w-full h-0.5 my-5" />
//                     <Text className="font-bold text-[18px] text-black mb-1 mt-2">Amenities</Text>
//                     <View className="flex-row items-center justify-evenly mt-2">
//                         <View className="flex-row items-center flex-wrap">
//                             {hotelDetails?.hotelAmenityCategories?.slice(0, 3).map((rule, index) => (
//                                 <Text key={index} className="font-pmedium text-[14px] text-gray-400 mr-2">
//                                     • {rule.amenity?.amenityName || 'Unnamed Amenity'}
//                                 </Text>
//                             ))}
//                             {hotelDetails?.hotelAmenityCategories?.length > 3 && (
//                                 <Pressable onPress={() => setIsAmenitiesModalVisible(true)}>
//                                     <Text className={`font-pmedium text-[14px] text-blue-500  ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
//                                         }`}>
//                                         +{hotelDetails.hotelAmenityCategories.length - 3} more Amenities
//                                     </Text>
//                                 </Pressable>
//                             )}
//                         </View>
//                         <Modal
//                             animationType="slide"
//                             transparent={true}
//                             visible={isAmenitiesModalVisible}
//                             onRequestClose={() => setIsAmenitiesModalVisible(false)}
//                         >
//                             <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
//                                 <View className="bg-white rounded-lg w-4/5 p-4">
//                                     <Text className="font-pmedium text-lg text-black mb-4">All Amenities</Text>
//                                     <ScrollView>
//                                         {hotelDetails?.hotelAmenityCategories?.map((rule, index) => (
//                                             <Text key={index} className="font-pmedium text-[14px] text-gray-800 mb-1">
//                                                 • {rule.amenity?.amenityName || 'Unnamed Amenity'}
//                                             </Text>
//                                         ))}
//                                     </ScrollView>
//                                     <Pressable
//                                         onPress={() => setIsAmenitiesModalVisible(false)}
//                                         className="mt-4 bg-blue rounded-md py-2 px-4"
//                                     >
//                                         <Text className="text-green text-center">Close</Text>
//                                     </Pressable>
//                                 </View>
//                             </View>
//                         </Modal>
//                     </View>
//                     <View className="flex-row bg-gray-300 rounded-full w-full h-0.5 my-3" />

//                     <View className="mt-2 mb-1">
//                         <Text className="font-bold text-[16px] text-black">View Nearby Activities</Text>
//                         <View className="flex-row  mt-2">
//                             <Image
//                                 source={{ uri: 'https://images.pexels.com/photos/28951017/pexels-photo-28951017/free-photo-of-dramatic-mountain-landscape-in-erbaa-turkiye.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' }}
//                                 className="w-20 h-20 rounded-full mx-1"
//                             />
//                             <Image
//                                 source={{ uri: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600' }}
//                                 className="w-20 h-20 rounded-full mx-1"
//                             />
//                         </View>
//                         <Text className={`font-bold text-[14px] mt-2 ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
//                             }`}>View More</Text>
//                     </View>

//                     <View className="flex-row bg-gray-300 rounded-full w-full h-0.5 my-3" />
//                     <Text className="font-bold text-lg text-black mt-6 mb-2">Property rules & Information</Text>
//                     <View className="flex-row mb-3 gap-2">
//                         <Text className="font-pmedium text-md text-gray-400">Check In: {hotelDetails?.checkInTime}</Text>
//                         <Text className="font-pmedium text-md text-gray-400">Check Out: {hotelDetails?.checkOutTime}</Text>
//                     </View>
//                     {/* {data?.isUnmarriedAllowed && (
//                         <View className="p-3 border border-gray-300 rounded-lg mb-3">
//                             <Text className="font-bold text-md text-black">Couple, Bachelor Rules</Text>
//                             <Text className="font-pmedium text-sm text-gray-400">Unmarried couples/guests with Local IDs are allowed</Text>
//                         </View>
//                     )} */}
//                     <View className="my-2">
//                         {hotelDetails?.guestRulesPolicy?.map((rule, index) => (
//                             <Text key={index} className="font-pmedium text-sm text-gray-400">• {rule.policy.name}.</Text>
//                         ))}
//                     </View>
//                     <Text className={`font-bold text-[14px] ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
//                         }`}>View All rules</Text>
//                     <View className="flex-row bg-gray-300 rounded-full w-full h-0.5 my-3" />

//                     <View className="pb-6 mb-4">
//                         <View className="flex-row justify-between">
//                             <Text className="font-bold text-black text-lg">Select Room</Text>
//                             <View className={`border px-6 py-1 rounded-lg ${selectedProfile.type === 'user' ? 'border-user' : 'border-company'
//                                 }`}>
//                                 <Text className={`font-psemibold text-sm ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
//                                     }`}>Modify</Text>
//                             </View>
//                         </View>
//                         <View className="mb-4 mx-auto">
//                             <View className="flex-row mt-2">
//                                 <Text className="font-bold text-lg">Check-In: 24 Jun</Text>
//                                 <Text className="font-bold text-lg mx-2 ml-3">Check-Out: 25 Jun</Text>
//                             </View>
//                             <View className="flex-row">
//                                 <Text className="font-bold text-lg ml-4">Room: 1</Text>
//                                 <Text className="font-bold text-lg mx-2 ml-24">Guest: 2</Text>
//                             </View>
//                         </View>

//                         <View className="flex-row justify-between gap-2">
//                             {["Standard Rooms", "Executive Rooms", "Suite"].map((roomType) => (
//                                 <Pressable
//                                     key={roomType}
//                                     onPress={() => setSelectedRoomType(roomType)}
//                                     className={`border-gray-400 rounded-xl border-2 py-1 px-4 h-12 justify-center items-center ${selectedProfile.type === 'user'
//                                         ? selectedRoomType === roomType
//                                             ? 'bg-user'
//                                             : 'bg-gray-200'
//                                         : selectedRoomType === roomType
//                                             ? 'bg-company'
//                                             : 'bg-gray-200'
//                                         }`}
//                                 >
//                                     <Text
//                                         className={`font-semibold text-[12px] text-center ${selectedRoomType === roomType ? 'text-white' : 'text-black'
//                                             }`}
//                                     >
//                                         {roomType}
//                                     </Text>
//                                 </Pressable>
//                             ))}
//                         </View>

//                         {selectedRoomType === "Standard Rooms" && <RoomComponent data={data1.roomTypes[0]} mainData={data} />}
//                         {selectedRoomType === "Executive Rooms" && <RoomComponent data={data1.roomTypes[1]} mainData={data} />}
//                         {selectedRoomType === "Stan" && <RoomComponent data={data1.roomTypes[2]} mainData={data} />}
//                     </View>
//                     <View className="flex-row bg-gray-300 rounded-full w-full h-0.5" />
//                     <Text className="font-pmedium text-[18px] text-black mb-1 mt-2">Similar Properties</Text>
//                     <FlatList
//                         data={TopCategyData}
//                         renderItem={({ item }) => <HotelCard />}
//                         horizontal
//                     />
//                 </View>
//             </ScrollView>
//             {loading && <CircularLoader />}
//         </SafeAreaProvider >
//     );
// };

// export default HotelDetails;


import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    Pressable,
    Modal,
    Platform
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import {
    DynamicStars,
    HeartIcon,
    LocationIcon,
    ThreeDotIcon,
} from "../../assets/images/Icons/HomeIcon";
import { Jacuzzi, Spa, Swimming } from "../../assets/images/Icons/Hotel";
import HotelCard from "../../components/HotelCard";
import HotelModal from "../../modals/HotelModal";
import SortedByModal from "../../modals/SortedByModal";
import { Calender, Door, Guest, GovernmentIdIcon } from "../../assets/images/Icons/TravalIons";
import VerifyContent from "../../components/VerifyContent";
import CheckInContent from "../../components/CheckIn";
import { GetUserHotelDetails } from "../../services/hotelService"
import ConfirmingCheckOut from "../seller/ConfirmingCheckOut";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CircularLoader from "../../components/CircularLoader";
import RoomComponent from "../../components/RoomComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProperty } from "../../redux/accountRedux";
import AmenitiesScreen from "../../components/AmenitiesScreen";
import  { getTextClassInstance } from '../../utils/TextClass';

const TopCategyData = [
    {
        id: 1,
        imageUri: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop",
        category: "Travel",
    },
    {
        id: 2,
        imageUri: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop",
        category: "Food",
    },
    {
        id: 3,
        imageUri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        category: "Shopping",
    },
    {
        id: 4,
        imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
        category: "Health",
    },
    {
        id: 5,
        imageUri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop",
        category: "Travel",
    },
];

const hotelTempData = {
    name: "Raddisson",
    address: "1234, MG Road",
    featuresEnabled: {
        booking: true,
        checkin: true,
    },
    hotelDesc: "adfsdghjgfsdgffdsdf sdgfdsfds  dsfdsfdsf",
    checkinTime: "09:00 AM",
    checkoutTime: "01:00 PM",
    isUnmarriedAllowed: true
}

const data1 = {
    roomTypes: ['Standard Rooms', 'Executive Rooms', 'Stan'],
}

const HotelDetails = () => {
    const textClass = getTextClassInstance();
    const dispatch = useDispatch();
    const route = useRoute();
    const nav = useNavigation();
    const params = route.params;
    const data = hotelTempData;
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCheckInModalVisible, setCheckInModalVisible] = useState(false);
    const [serviceModalVisible, setServiceModalVisible] = useState(Boolean(selectedProperty.checkInId));
    const [isCheckIn, setIsCheckIn] = useState(Boolean(selectedProperty.checkInId));
    const [selectedService, setSelectedService] = useState("Guest Concierge");
    const [heading, setHeading] = useState("Verify Check-In");
    const [loading, setLoading] = useState(false);
    const [hotelDetails, setHotelDetails] = useState({});
    const [selectedRoomType, setSelectedRoomType] = useState('Standard Rooms');
    const [isAmenitiesModalVisible, setIsAmenitiesModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);
    const toggleCheckInModal = () => setCheckInModalVisible(!isCheckInModalVisible);
    const toggleServiceModal = () => setServiceModalVisible(!serviceModalVisible);

    const fetchHotelDetails = async () => {
        try {
            setLoading(true);
            const res = await GetUserHotelDetails(selectedProperty?.XipperID);
            setHotelDetails(res.result);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotelDetails();
    }, []);

    const handleBack = () => {
        if (serviceModalVisible) {
            selectedService === "Guest Concierge"
                ? toggleServiceModal()
                : setSelectedService("Guest Concierge");
        } else {
            toggleCheckInModal();
        }
    };

    const addressComponents = [
        hotelDetails?.address?.house,
        hotelDetails?.address?.street,
        hotelDetails?.address?.locality,
        hotelDetails?.address?.landmark,
        hotelDetails?.address?.city,
        hotelDetails?.address?.state,
        hotelDetails?.address?.pincode,
    ];

    const filteredAddress = addressComponents.filter(Boolean).join(', ');

    const profileClass = selectedProfile.type === 'user' ? 'bg-user' : 'bg-company';

    return (
        <SafeAreaProvider>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HotelModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    data={{ ...hotelDetails, address: filteredAddress }}
                />
                <SortedByModal
                    isModalVisible={serviceModalVisible}
                    toggleModal={toggleServiceModal}
                    handleBack={handleBack}
                    heading={"Guest Concierge"}
                    content={
                        <CheckInContent
                            setSelectedService={setSelectedService} selectedService={selectedService}
                            toggleModal={toggleServiceModal} hotelData={{ ...hotelDetails, ...selectedProperty }}
                        />}
                />
                <SortedByModal
                    isModalVisible={isCheckInModalVisible}
                    toggleModal={toggleCheckInModal}
                    handleBack={handleBack}
                    heading={heading}
                    content={
                        <VerifyContent
                            toggleModal={toggleCheckInModal} setIsCheckIn={setIsCheckIn}
                            setHeading={setHeading} hotelData={{ ...hotelDetails, ...selectedProperty }}
                        />
                    }
                />
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop" }}
                    style={{ width: '100%', height: 450, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                    resizeMode="cover"
                />
                <View className= {Platform.OS === 'ios' ? "absolute w-full p-10" : "absolute w-full p-6"}>
                    <View className="flex-row justify-between items-center">
                        <Pressable onPress={() => nav.pop()}>
                            <BackArrowIcon color="#fff" />
                        </Pressable>
                        <View className="flex-row items-center space-x-5">
                            <HeartIcon />
                            <ThreeDotIcon />
                        </View>
                    </View>
                </View>
                <View className="bg-white flex-1 z-10 rounded-3xl px-5 mt-[-60px]">
                    <View className="flex-row bg-gray-300 rounded-full w-36 h-1 justify-center self-center my-5" />
                    <View className="flex flex-row gap-2 items-center ">
                        <Text className="font-bold text-[20px] text-black">{hotelDetails?.name}</Text>
                        <View>
                            <DynamicStars rating={hotelDetails.hotelStarRating} />
                        </View>
                    </View>
                    <View className="flex flex-row gap-2 pr-10 items-center mr-2">
                        <View className="flex-row space-x-2 items-center">
                            <LocationIcon color="#999" />
                        </View>
                        <Text className="font-pmedium text-[14px] text-gray-400">
                            {filteredAddress}
                        </Text>
                    </View>

                    <View className="flex-row mt-2 items-center">
                        <View
                            className={`rounded-md px-2 py-1 w-[40px] h-[24px]
          ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        >
                            <Text className="text-white font-pmedium text-[12px] ml-1">4.2</Text>
                        </View>
                        <Text
                            className={`font-pmedium ml-2 text-[14px] ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
                                }`}
                        >
                            Very Good
                        </Text>
                        <Text className="font-pmedium ml-2 text-black text-[14px]">
                            (100 Reviews)
                        </Text>
                        <Pressable className="ml-16 rounded-full bg-user px-4 py-1">
                            <Text className={`text-[14px] font-pmedium text-white ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}>{textClass.getTextString('TXT17')}</Text>
                        </Pressable>

                    </View>
                    <View className="flex-row flex-wrap gap-2 justify-evenly w-full my-3">
                        {data?.featuresEnabled?.booking && (
                            <Pressable onPress={toggleModal} className="flex-1 w-32">
                                <Text
                                    className={`text-center px-2 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
                                >
                                    {textClass.getTextString('TXT18')}
                                </Text>
                            </Pressable>
                        )}
                        {data?.featuresEnabled?.checkin && (
                            <Pressable onPress={toggleCheckInModal} className="flex-1 w-32">
                                <Text
                                    className={`text-center px-2 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
                                >
                                   {textClass.getTextString('TXT19')}
                                </Text>
                            </Pressable>
                        )}
                        {["user", "company"].includes(selectedProfile.type) &&
                            selectedProfile.userCheckInInfo.length > 0 &&
                            selectedProfile.userCheckInInfo.filter(
                                (i) => selectedProperty?.XipperID === i.roomAllocation.room.hotelId
                            ).length > 0 &&
                            selectedProfile.userCheckInInfo.map(
                                (i, ind) =>
                                    selectedProperty?.XipperID === i.roomAllocation.room.hotelId && (
                                        <Pressable
                                            key={`${i.roomAllocation.room.roomNumber}-${ind}`}
                                            onPress={toggleServiceModal}
                                            className="flex-1 w-32"
                                        >
                                            <Text
                                                className={`text-center px-2 py-2 rounded-lg font-pmedium text-[16px] text-white ${profileClass}`}
                                            >
                                                {i.roomAllocation.room.roomNumber}
                                            </Text>
                                        </Pressable>
                                    )
                            )}
                    </View>

                    <AmenitiesScreen hotel = {hotelDetails}/>
                    <View className="flex-row bg-gray-300 rounded-full w-full h-0.5" />
                    {["user", "company"].includes(selectedProfile.type) &&
                        selectedProfile.userCheckInInfo.length > 0 &&
                        selectedProfile.userCheckInInfo.filter(
                            (i) => selectedProperty?.XipperID === i.roomAllocation.room.hotelId
                        ).length > 0 ? (
                        <Text className="font-pmedium text-[18px] text-black mb-1 mt-2">
                           {textClass.getTextString('TXT25')}
                        </Text>
                    ) : (
                        <Text className="font-pmedium text-[18px] text-black mb-1 mt-2">
                           {textClass.getTextString('TXT26')}
                        </Text>
                    )}

                    <FlatList
                        data={TopCategyData}
                        renderItem={({ item }) => <HotelCard />}
                        horizontal
                    />
                </View>
            </ScrollView>
            {loading && <CircularLoader />}
        </SafeAreaProvider >
    );
};

export default HotelDetails;

