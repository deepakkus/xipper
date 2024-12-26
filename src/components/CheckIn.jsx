import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,

} from "react-native";
import React, { useState, useEffect } from "react";
import { DynamicStars, LocationIcon } from "../assets/images/Icons/HomeIcon";
import { Calender, Door, Guest } from "../assets/images/Icons/TravalIons";

import SortedByModal from "../modals/SortedByModal";
import OpenMenu from "./OpenMenu";
import WaterBottle from "./WaterBottle";
import Buffet from "./Buffet";
import Towel from "../Screens/Hotel/Towel";
import RoomCleaning from "../Screens/Hotel/RoomCleaning";
import Laundry from "../Screens/Hotel/Laundry";
import Slipper from "../Screens/Hotel/Slipper";
import ExtraBed from "../Screens/Hotel/ExtraBed";
import BabyCoat from "../Screens/Hotel/BabyCoat";
import Issue from "../Screens/Hotel/Issue";
import RoomChange from "../Screens/Hotel/RoomChange";
import WakeUpCall from "../Screens/Hotel/WakeUpCall";
import Report from "../Screens/Hotel/Report";
import Info from "../Screens/Hotel/Info";
import { useNavigation } from "@react-navigation/native";
import { GetAllServices, GetHouseKeepingItems, GetServiceDetails, GetMaintenanceItems, GetReceptionItems, GetTravelDeskServices, GetExtraServices, GetFandBItems } from "../services/servicesService";
import CircularLoader from "./CircularLoader";
import { useDispatch, useSelector } from "react-redux";
import { setUserServicesData } from "../redux/businessRedux";
import RequestService from "../Screens/Hotel/RequestService";
import { checkOut } from "../services/userdataservice";
import CheckOutUser from "../modals/CheckOutUser";
import { setFAndBCartId, setLaundryCartId } from "../redux/servicesRedux";


const CheckInContent = ({
    toggleModal,
    hotelData,
    selectedService,
    setSelectedService
}) => {
    const dispatch = useDispatch();
    const [modalContent, setModalContent] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [heading, setHeading] = useState("");
    const [loading, setLoading] = useState(false);
    const [servicesData, setServicesData] = useState({})
    const navigation = useNavigation();
    const { messageModal } = useSelector((state) => state.common);
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleNewModal = () => {
        setIsModal(!isModal);
    };
    const handleOrder = () => {
        setModalVisible(true);
    };

    useEffect(() => {
        if (isModal && !messageModal.show) {
            setIsModal(!isModal);
        }
    }, [messageModal]);

    const check = async () => {
        try {
            setLoading(true);
            const res = await checkOut(hotelData.XipperID, hotelData.checkInId);
            console.log(res, "res")
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchServiceData = async () => {
        try {
            setLoading(true);
            const res = await GetAllServices(selectedProperty.checkInId);
            setServicesData(res.data);
            const fAndB = res.data.services.filter((i) => i.name === "Food And Beverage")?.[0]?.cartId
            const laundry = res.data.services.filter((i) => i.name === "Housekeeping")?.[0]?.cartId
            if (fAndB) {
                dispatch(setFAndBCartId(fAndB));
            }
            if(laundry) {
                dispatch(setLaundryCartId(laundry));
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServiceData();
        setSelectedService("Guest Concierge");
    }, []);

    const handleSelectService = async (type) => {
        setSelectedService(type);
        try {
            setLoading(true);
            let res;
            switch (type) {
                case "Housekeeping":
                    res = await GetHouseKeepingItems(hotelData.XipperID, type);
                    break;
                case "Maintenance":
                    res = await GetMaintenanceItems(hotelData.XipperID, type);
                    break;
                case "Reception":
                    res = await GetReceptionItems(hotelData.XipperID, type);
                    break;
                case "Book Service":
                    res = await GetServiceDetails(hotelData.XipperID, "Services");
                    break;
                default:
                    res = await GetServiceDetails(hotelData.XipperID, type);
                    break;
            }
            console.log(type, res, ":******")
            if (res) {
                const temp = {
                    ...servicesData,
                    [type]: [
                        ...(type === "Housekeeping" && res.Laundry?.length > 0 ? [{ name: "Laundry" }, ...res.subCategories ?? []] : []),
                        ...(type === "Maintenance" ? res.data : []),
                        ...(type === "Reception" ? res.data : []),
                        ...(["Book Service", "Travel Desk", "Food And Beverage"].includes(type) ? [...(res.subCategories ?? [])] : []),
                    ],
                    ...(type === "Housekeeping" && res.Laundry?.length > 0 && { "Laundry": res?.Laundry ?? [] }),
                };

                dispatch(setUserServicesData(temp));
                setServicesData(temp);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const serviceData = {
        "Guest Concierge": [
            {
                name: "Food And Beverage",
                icon: require("../assets/images/Checkin/F&B.png"),
                action: () => handleSelectService("Food And Beverage"),
            },
            {
                name: "Housekeeping",
                icon: require("../assets/images/Checkin/Housekeeping.png"),
                action: () => handleSelectService("Housekeeping"),
            },
            {
                name: "Maintenance",
                icon: require("../assets/images/Checkin/Maintenance.png"),
                action: () => handleSelectService("Maintenance"),
            },
            {
                name: "Reception",
                icon: require("../assets/images/Checkin/Reception.png"),
                action: () => handleSelectService("Reception"),
            },
            {
                name: "Travel Desk",
                icon: require("../assets/images/Checkin/TravelDesk.png"),
                action: () => handleSelectService("Travel Desk"),
            },
            {
                name: "Services",
                icon: require("../assets/images/Checkin/BookService.png"),
                action: () => handleSelectService("Book Service"),
            },
            {
                name: "Information",
                icon: require("../assets/images/Checkin/Information.png"),
                action: () => handleSelectService("Information"),
            },
            {
                name: "Report",
                icon: require("../assets/images/Checkin/Report.png"),
                action: () => handleSelectService("Report"),
            },
        ],
        "Food And Beverage": [
            {
                name: "Restaurant Menu",
                icon: require("../assets/images/Checkin/F&B.png"),
                action: () => {
                    navigation.navigate("FoodCard");
                },
            },
            {
                name: "Water Bottle",
                icon: require("../assets/images/Checkin/WaterBottle.png"),
                action: () => {
                    setHeading("Water Bottle");
                    setModalContent(<Buffet type={"Water Bottle"} />);
                    toggleNewModal();
                },
            },
            {
                name: "Minibar",
                icon: require("../assets/images/Checkin/MiniBar.png"),
                action: () => {
                    toggleModal();
                    navigation.push("MiniBar");
                },
            },
            {
                name: "Room Service",
                icon: require("../assets/images/Checkin/RoomService.png"),
                action: () => console.log("Navigate to Room Service"),
            },
            {
                name: "Buffet",
                icon: require("../assets/images/Checkin/Buffet.png"),
                action: () => {
                    setHeading("Buffet");
                    setModalContent(<Buffet type={"Buffet"} />);
                    toggleNewModal();
                },
            },
        ],
        Maintenance: [
            {
                name: "AC",
                icon: require("../assets/images/Maintenance/AC.png"),
                action: () => {
                    setHeading("AC Maintenance");
                    setModalContent(
                        <Issue title="AC" serviceData={servicesData["Maintenance"]}
                            data={selectedProperty} type={selectedService}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "TV",
                icon: require("../assets/images/Maintenance/TV.png"),
                action: () => {
                    setHeading("TV Maintenance");
                    setModalContent(
                        <Issue title="TV" serviceData={servicesData["Maintenance"]}
                            data={selectedProperty} type={selectedService}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Bathroom",
                icon: require("../assets/images/Maintenance/Bathroom.png"),
                action: () => {
                    setHeading("Bathroom Maintenance");
                    setModalContent(
                        <Issue title="Bathroom"
                            serviceData={servicesData["Maintenance"]}
                            data={selectedProperty} type={selectedService}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Other Issues",
                icon: require("../assets/images/Maintenance/Other.png"),
                action: () => {
                    setHeading("Other Issues");
                    setModalContent(
                        <Issue title="Other Issues"
                            serviceData={servicesData["Maintenance"]}
                            data={selectedProperty} type={selectedService}
                        />);
                    toggleNewModal();
                },
            },
        ],
        Housekeeping: [
            {
                name: "Towels",
                icon: require("../assets/images/HouseKeeping/Towels.png"),
                action: () => {
                    setHeading("Towel");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Towels"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Room Cleaning",
                icon: require("../assets/images/HouseKeeping/RoomCleaning.png"),
                action: () => {
                    setHeading("Room Cleaning");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Room Cleaning"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Laundry",
                icon: require("../assets/images/HouseKeeping/Laundry.png"),
                action: () => {
                    navigation.navigate("LaundrayChart")
                },
            },
            {
                name: "Iron",
                icon: require("../assets/images/HouseKeeping/Iron.png"),
                action: () => {
                    setHeading("Iron");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Iron"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Hair Dryer",
                icon: require("../assets/images/HouseKeeping/HairDryer.png"),
                action: () => {
                    setHeading("Hair Dryer");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Hair Dryer"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Dental Kit",
                icon: require("../assets/images/HouseKeeping/DentalKit.png"),
                action: () => {
                    setHeading("Dental Kit");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Dental Kit"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Toiletries",
                icon: require("../assets/images/HouseKeeping/Toiletries.png"),
                action: () => {
                    setHeading("Toiletries");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Toiletries"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Comb",
                icon: require("../assets/images/HouseKeeping/Comb.png"),
                action: () => {
                    setHeading("Comb");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Comb"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Slippers",
                icon: require("../assets/images/HouseKeeping/Slippers.png"),
                action: () => {
                    setHeading("Slippers");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Slippers"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Laundry Bag",
                icon: require("../assets/images/HouseKeeping/Vector.png"),
                action: () => {
                    setHeading("Laundry Bags");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Laundry Bag"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Linens",
                icon: require("../assets/images/HouseKeeping/Linens.png"),
                action: () => {
                    setHeading("Linens");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Linens"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Pillow",
                icon: require("../assets/images/HouseKeeping/Pillows.png"),
                action: () => {
                    setHeading("Pillow");
                    setModalContent(<Slipper
                        data={selectedProperty}
                        type={selectedService}
                        service={"Pillow"}
                        serviceData={servicesData["Housekeeping"]}
                    />);
                    toggleNewModal();
                },
            },
            {
                name: "Blanket",
                icon: require("../assets/images/HouseKeeping/Blanket.png"),
                action: () => {
                    setHeading("Blanket");
                    setModalContent(
                        <Slipper
                            data={selectedProperty}
                            type={selectedService}
                            service={"Blanket"}
                            serviceData={servicesData["Housekeeping"]}
                        />);
                    toggleNewModal();
                },
            },
        ],
        Information: [
            {
                name: "Wifi Password",
                icon: require("../assets/images/Checkin/F&B.png"),
                action: () => {
                    setHeading("Wifi Password");
                    setModalContent(<Info title="wifi" />);
                    toggleNewModal();
                },
            },
            {
                name: "Swimming pool",
                icon: require("../assets/images/Checkin/WaterBottle.png"),
                action: () => {
                    setHeading("Swimming pool");
                    setModalContent(<Info title="pool" />);
                    toggleNewModal();
                },
            },
            {
                name: "Restaurant",
                icon: require("../assets/images/Checkin/F&B.png"),
                action: () => {
                    setHeading("Restaurant");
                    setModalContent(<Info title="res" />);
                    toggleNewModal();
                },
            },
        ],
        Reception: [
            {
                name: "Bellboy",
                icon: require("../assets/images/Checkin/Bell.png"),
                action: () => {
                    setHeading("Bellboy");
                    setModalContent(
                        <RequestService
                            data={selectedProperty}
                            type={selectedService}
                            service={"Bellboy"}
                            serviceData={servicesData["Reception"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Extra Bed",
                icon: require("../assets/images/Checkin/Door.png"),
                action: () => {
                    setHeading("Room Change");
                    setModalContent(<RoomChange />);
                    toggleNewModal();
                },
            },
            {
                name: "Room Change",
                icon: require("../assets/images/Checkin/Door.png"),
                action: () => {
                    setHeading("Room Change");
                    setModalContent(
                        <RequestService
                            data={selectedProperty}
                            type={selectedService}
                            service={"Room Change"}
                            serviceData={servicesData["Reception"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Room Upgrade",
                icon: require("../assets/images/Checkin/Door.png"),
                action: () => {
                    setHeading("Room Upgrade");
                    setModalContent(<RoomChange />);
                    toggleNewModal();
                },
            },
            {
                name: "Wake up call",
                icon: require("../assets/images/Checkin/Call.png"),
                action: () => {
                    setHeading("Wake up call");
                    setModalContent(
                        <RequestService
                            data={selectedProperty}
                            type={selectedService}
                            service={"Wake up call"}
                            serviceData={servicesData["Reception"]}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Baby Cot",
                icon: require("../assets/images/Checkin/BabyCot.png"),
                action: () => {
                    setHeading("Baby Cot");
                    setModalContent(
                        <RequestService
                            data={selectedProperty}
                            type={selectedService}
                            service={"Baby Cot"}
                            serviceData={servicesData["Reception"]}
                        />);
                    toggleNewModal();
                },
            },
        ],
        "Travel Desk": [
            {
                name: "Transfers",
                icon: require("../assets/images/Checkin/Airports.png"),
                action: () => {
                    setHeading("Transfers");
                    setModalContent(
                        <WaterBottle
                            service={"Transfers"}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Vehicle Rent",
                icon: require("../assets/images/Checkin/VehicleRent.png"),
                action: () => {
                    setHeading("Vehicle Rent");
                    setModalContent(
                        <WaterBottle
                            service={"Vehicle Rent"}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Local Tours",
                icon: require("../assets/images/Checkin/Tour.png"),
                action: () => {
                    setHeading("Local Tours");
                    setModalContent(
                        <WaterBottle
                            service={"Local Tours"}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Tickets",
                icon: require("../assets/images/Checkin/tickets.png"),
                action: () => {
                    setHeading("Tickets");
                    setModalContent(
                        <WaterBottle
                            service={"Tickets"}
                        />);
                    toggleNewModal();
                },
            },
            {
                name: "Visas",
                icon: require("../assets/images/Checkin/Visa.png"),
                action: () => {
                    setHeading("Visas");
                    setModalContent(
                        <WaterBottle
                            service={"Visas"}
                        />);
                    toggleNewModal();
                },
            },
        ],
        "Report": [
            {
                name: "Report an Issue",
                icon: require("../assets/images/Checkin/Report.png"),
                action: () => {
                    setHeading("Report an Issue");
                    setModalContent(<Report />);
                    toggleNewModal();
                },
            },
        ],
        "Book Service": [
            {
                name: "Spa",
                icon: require("../assets/images/Checkin/Spa.png"),
                action: () => {
                    setHeading("Report an Issue");
                    setModalContent(<Report />);
                    toggleNewModal();
                },
            },
            {
                name: "Banquet Room",
                icon: require("../assets/images/Checkin/Door.png"),
                action: () => {
                    setHeading("Report an Issue");
                    setModalContent(<Report />);
                    toggleNewModal();
                },
            },
            {
                name: "Conference Room",
                icon: require("../assets/images/Checkin/Door.png"),
                action: () => {
                    setHeading("Report an Issue");
                    setModalContent(<Report />);
                    toggleNewModal();
                },
            },
        ],
    };

    const renderServiceComponent = () => {
        const services = selectedService === "Guest Concierge"
            ? servicesData?.services?.length > 0
                ? serviceData?.["Guest Concierge"].filter(service =>
                    servicesData.services.some(s => s.name.toLowerCase() === service.name.toLowerCase())
                )
                : []
            : servicesData?.[selectedService]?.length > 0
                ? serviceData[selectedService].filter(service =>
                    servicesData[selectedService].some(s => s?.name?.toLowerCase() === service?.name?.toLowerCase())
                )
                : [];

        return <ServiceList services={services} heading={selectedService} />;
    };

    return (
        <>
            <View className="flex-row items-center">
                <Text className="font-psemibold text-md text-black mr-2">
                    {hotelData?.name}
                </Text>
                <DynamicStars rating={hotelData.hotelStarRating} />
            </View>

            <View className="flex-row items-center mt-2">
                <LocationIcon color={"#ccc"} />
                <Text className="font-pmedium text-md text-gray-400 ml-1">
                    Location | 1.1 Km from silicon city
                </Text>
            </View>

            <View className="flex-row justify-evenly space-x-2 mt-4">
                <Pressable
                    onPress={() => {
                        navigation.navigate("Bill");
                        toggleModal();
                    }}
                    className={`p-2 w-full flex-1 rounded-md px-3  ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                        }`}
                >
                    <Text className="text-center text-white font-psemibold">View Bill</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        handleOrder();
                    }}
                    className={`p-2 w-full flex-1 rounded-md px-3 ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                        }`}
                >
                    <Text className="text-center text-white font-psemibold">Checkout</Text>
                </Pressable>
                {modalVisible && (
                    <CheckOutUser
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                )}

            </View>


            {renderServiceComponent()}
            {loading && <CircularLoader />}
            <SortedByModal
                isModalVisible={isModal}
                toggleModal={toggleNewModal}
                heading={heading}
                content={modalContent}
            />
        </>
    );
};

const ServiceList = ({ services, heading }) => {
    return (
        <ScrollView className="my-3">
            <Text className="font-psemibold text-base mt-4 text-black">{heading}</Text>
            <View className="flex flex-wrap flex-row">
                {services.map((service, index) => (
                    <View key={index} className="w-1/3">
                        <Pressable
                            onPress={service.action}
                            className="flex-col items-center justify-center p-2"
                        >
                            <Image source={service.icon} style={{ width: 40, height: 40 }} />
                            <Text className="font-pmedium text-[10px] text-gray-500 mt-2">
                                {service.name}
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default CheckInContent;
