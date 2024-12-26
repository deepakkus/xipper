import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceRequestsContainer from './ServiceRequestContainer';
import ButtonGroup from './ButtonGroup';
import DashboardHeader from './DashboardHeader';
import Card from './Card';
import BookingCard from './Booking';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import HomeHeader from '../../components/HomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GetHotelCheckInList } from '../../services/hotelService';
import { GethotelServiceRequest, GuestCheckOut } from '../../services/servicesService';
import { setHotelCheckInList, sethotelServiceRequest, setCheckOutList } from '../../redux/businessRedux';
import CircularLoader from '../../components/CircularLoader';

const SellerDashboard = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Services');
    const { profiles, selectedProfile } = useSelector((state) => state.account);
    const { hotelCheckInList, hotelServiceRequestList, checkOutList } = useSelector((state) => state.business);
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        checkIn: [],
        checkOut: [],
        bookings: [],
        services: [],
    })
    const scrollY = useRef(new Animated.Value(0)).current;
    console.log(selectedProfile)
    const buttons = [
        { label: 'Services', onPress: () => setActiveTab('Services') },
        { label: 'Bookings', onPress: () => setActiveTab('Bookings') },
        { label: 'Check-In', onPress: () => setActiveTab('Check-In') },
        { label: 'Check-Out', onPress: () => setActiveTab('Check-Out') },
    ];

    const getCheckInList = async () => {
        try {
            setLoading(true);
            const res = await GetHotelCheckInList(selectedProfile.XipperID);
            console.log(res);
            dispatch(setHotelCheckInList(res.checkins));
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }


    const fetchHotelServiceRequest = async () => {
        try {
            setLoading(true);
            const res = await GethotelServiceRequest(selectedProfile.XipperID);
            dispatch(sethotelServiceRequest(res.data.serviceRequests));
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };

    const getCheckOutList = async () => {
        try {
            setLoading(true);
            const res = await GuestCheckOut(selectedProfile.XipperID);
            dispatch(setCheckOutList(res.data.data.checkout));
        } catch (e) {
                console.log(e)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        switch (activeTab) {
            case "Check-In":
                getCheckInList();
                break;
            case "Services":
                fetchHotelServiceRequest();
                break;
            case "Check-Out":
                getCheckOutList();
                break;
        }
    }, [activeTab]);

    const getContentForTab = () => {
        const renderDashboard = (cards) => (
            <>
                <View style={styles.dashboard}>
                    {cards.map((card, index) => (
                        <Card key={index} title={card.title} amount={card.amount} />
                    ))}
                </View>
                <ButtonGroup buttons={buttons} activeTab={activeTab} />
            </>
        );

        switch (activeTab) {
            case 'Services':
                return (
                    <>
                        {renderDashboard([
                            { title: "Total Sales", amount: "Rs. 20000" },
                            { title: "Total Check-Ins", amount: "Rs. 20000" },
                            { title: "Total Check-Outs", amount: "Rs. 20000" },
                        ])}
                        <ServiceRequestsContainer serviceRequests={hotelServiceRequestList} />
                    </>
                );
            case 'Bookings':
                return (
                    <>
                        {renderDashboard([
                            { title: "Sales", amount: "Rs. 20000" },
                            { title: "Occupancy", amount: "15" },
                            { title: "Check-Outs", amount: "5" },
                        ])}
                        <BookingCard />
                    </>
                );
            case 'Check-In':
                return (
                    <>
                        {renderDashboard([
                            { title: "Total Sales", amount: "Rs. 20000" },
                            { title: "Total Check-Ins", amount: "Rs. 20000" },
                            { title: "Total Check-Outs", amount: "Rs. 20000" },
                        ])}
                        <CheckIn bookings={hotelCheckInList} />
                    </>
                );
            case 'Check-Out':
                return (
                    <>
                        {renderDashboard([
                            { title: "Total Sales", amount: "Rs. 20000" },
                            { title: "Total Check-Ins", amount: "Rs. 20000" },
                            { title: "Total Check-Outs", amount: "Rs. 20000" },
                        ])}
                        <CheckOut  checkOut={checkOutList}/>
                    </>
                );
            default:
                return null;
        }
    };

    const data = [{ key: 'header' }, { key: 'content' }];

    const renderItem = ({ item }) => {
        if (item.key === 'header') {
            return <DashboardHeader onViewAllPress={() => console.log('View all pressed')} />;
        }
        return <View>{getContentForTab()}</View>;
    };
    const translateHeader = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, -80],
        extrapolate: "clamp",
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="#fe830c"
                barStyle="light-content"
            />
            <Animated.View
                style={{
                    transform: [{ translateY: translateHeader }],
                    zIndex: 1,
                    position: "absolute",
                    width: "100%",
                }}
            >
                <HomeHeader
                    //   toggleBusiness={()=>navigate.navigate("MainHome")}
                    isBusiness={true}
                />
            </Animated.View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {loading && <CircularLoader />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13 ,
        backgroundColor: '#f5f5f5',
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderRadius: 10,
        marginTop: 200,
    },
    headerTitle: {
        fontSize: 24,
        font: 'Popins',
        fontWeight: 'bold',
        color: '#000000',
    },
    viewAllButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: '29px',
        top: '284px',
        left: '322px',
        marginTop: 10,
    },
    viewAllButtonText: {
        color: '#626262',
        fontWeight: 'bold',
        fontSize: 12,
    },
    dashboard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    alert: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    alertText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    alertDesc: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
    },
    alertButton: {
        backgroundColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    alertButtonText: {
        fontWeight: 'bold',
    },
});

export default SellerDashboard;



