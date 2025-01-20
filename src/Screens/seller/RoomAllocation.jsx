// RoomAllocation.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import BookingDetails from './BookingDetails';
import Approved from './Approved';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import Code from './Code';
import Approval from './Approval';
import { useDispatch, useSelector } from 'react-redux';
import CircularLoader from '../../components/CircularLoader';
import { setBookingDetails } from '../../redux/businessRedux';
import { GetCheckInGuestData } from '../../services/hotelService';

const RoomAllocation = ({ onBackPress }) => {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const params = route.params;
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { bookingDetails } = useSelector((state) => state.business);
    const { selectedProfile } = useSelector((state) => state.account);
    const [selectedGuests, setSelectedGuests] = useState([]);

    const handleAllocateRoom = async () => {
        console.log("Selected guests:", selectedGuests);
        if (selectedGuests.length > 0) {
            try {
                setLoading(true);
                // const res = await AllocateRoomToGuests("XH78205780", bookingDetails.bookingId, guests, roomNumber)
                setCodeModalVisible(true);
                console.log("Room allocated to guests:", selectedGuests);
            } catch (e) {
                console.log("Error during room allocation:", e);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("No guests selected for room allocation.");
        }
    };
    const handleGuestSelection = (guestName) => {
        setSelectedGuests((prev) => {
            const isSelected = prev.includes(guestName);
            if (isSelected) {
                return prev.filter((name) => name !== guestName);
            } else {
                return [...prev, guestName];
            }
        });
    };

    const handleCloseModal = () => {
        setCodeModalVisible(false);
    };

    const fetchGuestsData = async () => {
        try {
            setLoading(true);
            const res = await GetCheckInGuestData(bookingDetails.bookingId);
            const guestInfo = res.data.data.bookingDetails.userCheckInInfo;
            const arr = guestInfo
                .filter(i => i.user !== null || (i.user === null && Object.keys(i.nonXipperUserInfo).length > 0))
                .map(i => {
                    if (i.user !== null) {
                        return i;
                    }
                    return {
                        ...i,
                        user: {
                            address: [i.nonXipperUserInfo.address],
                            contactEmails: [{ email: i.nonXipperUserInfo.email }],
                            contactNumbers: [{ number: i.nonXipperUserInfo.contactNumber }],
                            fullName: i.nonXipperUserInfo.name,
                            gender: i.nonXipperUserInfo.gender,
                            dob: i.nonXipperUserInfo.dob,
                            aadhaarNumber: i.nonXipperUserInfo.aadhaarNumber,
                            PassportFileNumber: i.nonXipperUserInfo.PassportFileNumber,
                            idType: i.nonXipperUserInfo.PassportFileNumber === null ? "Aadhaar Number:" : "Passport:"
                        },
                    };
                });
            const temp = res.data.bookingDetails
            dispatch(setBookingDetails({ ...temp, userCheckInInfo: arr }));

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuestsData();
    }, []);

    useEffect(()=>{
        if(bookingDetails.userCheckInInfo.filter((i) => !i?.roomAllocation?.room?.roomNumber).length === 0){
            nav.navigate("SellerDashboard");
        }
    },[bookingDetails.userCheckInInfo])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.header}>
                    <Pressable onPress={() => nav.goBack()} style={styles.backButton}>
                        <BackArrowIcon />
                    </Pressable>
                    <Text style={styles.heading}>Room Allocation</Text>
                </View>
                <BookingDetails />
                <Approval
                    bookingData={bookingDetails}
                    type="roomAllocation"
                    onGuestSelect={handleGuestSelection}
                    selectedGuests={selectedGuests}
                    guestData={bookingDetails.userCheckInInfo}
                />
                {bookingDetails.userCheckInInfo.filter((i) => !i?.roomAllocation?.room?.roomNumber).length > 0 &&
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[
                                styles.approveButton,
                                selectedGuests.length === 0 && styles.disabledButton
                            ]}
                            onPress={handleAllocateRoom}
                            disabled={selectedGuests.length === 0}
                        >
                            <Text style={styles.buttonText}>Allocate Room</Text>
                        </Pressable>
                    </View>}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={codeModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Code
                            handleCloseModal={handleCloseModal}
                            bookingId={bookingDetails.bookingId}
                            hotelId={selectedProfile.XipperID}
                            selectedGuests={selectedGuests}
                            handleRefreshData={() => fetchGuestsData()}
                        />
                    </View>
                </View>
            </Modal>
            {loading && <CircularLoader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: Platform.OS === 'ios' ? 15 : 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? 15 : 0,
    },

    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginLeft: 80,
    },
    guestInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    guestText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.6)',
        marginHorizontal: 10,
        width: '67px',
        height: '30px',
        fontFamily: 'Poppins',
    },
    rotated: {
        transform: [{ rotate: '180deg' }],
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: '#FE830C',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 175,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Poppins',
    },
});

export default RoomAllocation;
