import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CrossIcon, DropDownArrow } from '../../assets/images/Icons/ArrowIcon';
import { GetRoomNumberList, AllocateRoomToGuests, VerifyOtp } from '../../services/hotelService';
import OtpComponent from '../../components/OtpComponent';
import CircularLoader from '../../components/CircularLoader';

const Code = ({ handleCloseModal, hotelId, bookingId, selectedGuests = [], handleRefreshData = () => { } }) => {
    const navigation = useNavigation();
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('Room Number');
    const [isRoomNumberVisible, setIsRoomNumberVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        otp: ['', '', '', '', '', ''],
    });

    useEffect(() => {
        if (isDropdownVisible) {
            fetchRoomNumbers();
        }
    }, [isDropdownVisible]);

    const fetchRoomNumbers = async () => {
        try {
            setLoading(true);
            const response = await GetRoomNumberList(hotelId);
            console.log(response.data.roomList);
            setRoomNumbers(response.data.roomList || []);
        } catch (error) {
            console.error('Error fetching room numbers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { otp } = form;
            const response = await VerifyOtp(bookingId, otp);
            if (response && response.status === 200) {
                console.log('OTP Verified Successfully:', response);
                setIsRoomNumberVisible(true);
            } else {
                Alert.alert('Invalid OTP');
            }
        } catch (error) {
            Alert.alert("Invalid OTP!", error.response.data.message)
            console.error('Error verifying OTP:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRoomSelect = (room) => {
        setSelectedRoomNumber(room);
        setIsDropdownVisible(false);
    };

    const handleRoomSubmit = async () => {
        try {
            setLoading(true);
            const roomNumber = selectedRoomNumber;
            const response = await AllocateRoomToGuests(hotelId, bookingId, selectedGuests, roomNumber);
            if (response && response.status === 200) {
                console.log('Room allocated successfully:', response.data);
                Alert.alert('Room allocated successfully!');
                handleCloseModal();
                handleRefreshData();
            } else {
                Alert.alert('Failed to allocate room. Please try again.', "Invalid Inputs");
            }
        } catch (error) {
            Alert.alert('Error allocating room:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        handleCloseModal();
    };

    const handleChange = (fieldName, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [fieldName]: value,
        }));
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.crossIcon} onPress={handleCancel}>
                <CrossIcon />
            </Pressable>
            {loading && <CircularLoader />}
            {!isRoomNumberVisible ? (
                <>
                    <Text className="font-semibold text-center text-lg text-gray-400 mb-3">
                        Please enter the code given by the customer
                    </Text>
                    <OtpComponent length={6} onChange={(text) => handleChange('otp', text)} />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.instructionText}>Please allocate the Room No.</Text>

                    <TouchableOpacity
                        style={styles.dropdownContainer}
                        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
                    >
                        <Text style={styles.selectedRoomText}>{selectedRoomNumber}</Text>
                        <View style={styles.arrowIcon}>
                            <DropDownArrow rotation={isDropdownVisible ? 180 : 0} />
                        </View>
                    </TouchableOpacity>

                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <FlatList
                                data={roomNumbers}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => handleRoomSelect(item)}
                                    >
                                        <Text style={styles.dropdownItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}

                    <TouchableOpacity style={styles.submitButton} onPress={() => handleRoomSubmit(hotelId, bookingId)}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 30,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crossIcon: {
        position: 'absolute',
        top: 1,
        right: 5,
        zIndex: 1,
    },
    instructionText: {
        fontSize: 16,
        color: '#A1A1A1',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: '#FF8700',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdownContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedRoomText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: 'bold',
    },
    arrowIcon: {
        marginLeft: 10,
    },
    dropdown: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FE830C',
        backgroundColor: '#fff',
        position: 'absolute',
        top: 70,
        zIndex: 1,
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',
    },
});

export default Code;
