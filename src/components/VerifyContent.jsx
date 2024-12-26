import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { BackArrowIcon, DropDownArrow, LocationIcon } from "../assets/images/Icons/ArrowIcon";
import { Calender, Door, Guest } from "../assets/images/Icons/TravalIons";
import { GovernmentIdIcon } from "../assets/images/Icons/ProfileIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from "./RadioButton";
import { DynamicStars } from "../assets/images/Icons/HomeIcon";
import AadharInput from "./AdharInput";
import OtpComponent from "./OtpComponent";
import { Picker } from "@react-native-picker/picker";
import PassportInput from "../Screens/Auth/Passport";
import CircularLoader from './CircularLoader';
import { ApprovalStatusCheck, CheckExistingCheckInRequest, GenerateCheckInOTP, GetPreviewData, GuestSubmitHotelChekInRequest, HotelCheckInStep1, SendGuestAadhaarOTP, VerifyGuestAadhaarOTP, VerifyGuestPassport, VerifyGuestXipperID } from "../services/hotelService";
import { useSelector } from "react-redux";


const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const VerifyContent = ({ setHeading, toggleModal, setIsCheckIn, hotelData }) => {
    const [step, setStep] = useState(1);
    const { selectedProfile } = useSelector((state) => state.account);
    const { notifications } = useSelector((state) => state.authenticationRedux);
    const [showRadioOptions, setShowRadioOptions] = useState(false);
    const [guest, setGuest] = useState([]);
    const [selectedVerification, setSelectedVerification] = useState("Aadhaar");
    const [verificationNumber, setVerificationNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [currentGuest, setCurrentGuest] = useState(2);
    const [isConfirm, setIsConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState("");
    const [appCode, setAppCode] = useState("");
    const [passportData, setPassportData] = useState({
        file_number: '',
        dob: null,
    });
    const [previewData, setPreviewData] = useState({})
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        totalGuests: 1,
        rooms: 1,
        pnr: "",
        xipperId: "",
        requestId: "",
        aadhaarOtpRefId: "",
        hotelXipperId: ""
    });
    const [checkInData, setCheckInData] = useState({
        existingPendingRequests: [],
        submittedRequests: []
    })

    const getCheckInStatus = async () => {
        try {
            setLoading(true);
            const res = await CheckExistingCheckInRequest(hotelData.XipperID);
            setCheckInData(res);
            if (res.existingPendingRequests.length > 0 || res.submittedRequests.length > 0) {
                setStep(6);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCheckInStatus();
        setHeading("Verify Check-In")
    }, []);

    const handleRadioSelect = (option) => {
        setSelectedVerification(option);
        setShowRadioOptions(false);
    };

    const handlePassportChange = newPassportData => {
        setPassportData(newPassportData);
    };

    const getPreviewData = async (id, reqId) => {
        try {
            setLoading(true);
            const res = await GetPreviewData(id || formData.pnr, reqId || formData.requestId);
            setPreviewData(res.preview);
            console.log(res.preview.tempUserCheckInInfo);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (step === 4) {
            getPreviewData();
        }
    }, [notifications])

    const handleNext = async () => {
        try {
            setLoading(true);
            let data = {};

            switch (step) {
                case 1:
                    if (!formData.checkIn || !formData.checkOut || !formData.pnr) {
                        throw new Error("Please fill in all fields");
                    }
                    const resp = await HotelCheckInStep1(hotelData?.XipperID, selectedProfile.type === "company" ? selectedProfile.XipperID : "", formData);
                    if (resp.status === 200) {
                        if (formData.totalGuests === 1) {
                            data = { XipperId: selectedProfile.XipperID, name: selectedProfile.name, verificationType: "Xipper ID", verificationNumber: selectedProfile.XipperID };
                            setGuest((prevGuests) => [...prevGuests, data]);
                            setHeading("Preview");
                            getPreviewData(formData.pnr, resp.data.requestId);
                            setStep(4);
                        } else {
                            data = { XipperId: selectedProfile.XipperID, name: selectedProfile.name, verificationType: "Xipper ID", verificationNumber: selectedProfile.XipperID };
                            setGuest((prevGuests) => [...prevGuests, data]);
                            setStep(2);
                        }
                        setFormData({ ...formData, requestId: resp.data.requestId || resp.requestId })
                    }
                    break;

                case 2:
                    if (selectedVerification === "Aadhaar") {
                        const res = await SendGuestAadhaarOTP(verificationNumber);
                        if (res.status !== 200) {
                            throw new Error("Error sending OTP!.");
                        } else {
                            setFormData({
                                ...formData, aadhaarOtpRefId: res.data.data.ref_id,
                                [`aadhaar${currentGuest}`]: verificationNumber, xipperId: ""
                            })
                            setStep(3);
                        }
                    } else if (selectedVerification === "Passport") {
                        const verificationResponse = await VerifyGuestPassport(passportData, formData);
                        console.log(verificationResponse);
                        if (verificationResponse.status !== 200) {
                            throw new Error("Error Verifying Passport!.");
                        } else {
                            data = { passportNumber: "", verificationType: selectedVerification, verificationNumber: passportData.file_number };
                            setGuest((prevGuests) => [...prevGuests, data]);

                            if (currentGuest < formData.totalGuests) {
                                setCurrentGuest((prev) => prev + 1);
                                setStep(2);
                            } else {
                                setHeading("Preview");
                                getPreviewData();
                                setStep(4);
                            }
                        }
                    } else {
                        const verificationResponse = await VerifyGuestXipperID(formData);
                        console.log(verificationResponse);
                        if (verificationResponse.status !== 200) {
                            Alert.alert("Error", verificationResponse.data.message);
                            throw new Error("Error Verifying Xipper Id!.");
                        } else {
                            data = { XipperId: formData.xipperId, verificationType: selectedVerification, verificationNumber: formData.xipperId, name: "(Unverified)" };
                            setGuest((prevGuests) => [...prevGuests, data]);
                            if (currentGuest < formData.totalGuests) {
                                setFormData({ ...formData, xipperId: "" });
                                setCurrentGuest((prev) => prev + 1);
                                setStep(2);
                            } else {
                                setHeading("Preview");
                                getPreviewData();
                                setStep(4);
                            }
                        }
                    }
                    setVerificationNumber("");
                    setOtp("");
                    break;
                case 3:
                    const aadhaarResponse = await VerifyGuestAadhaarOTP(otp, formData, formData?.[`aadhaar${currentGuest}`]);
                    console.log(aadhaarResponse);
                    if (aadhaarResponse.status !== 200) {
                        throw new Error("Error Verifying Aadhaar OTP!.");
                    } else {
                        data = {
                            aadharNumber: formData?.[`aadhaar${currentGuest}`],
                            name: aadhaarResponse.data.data.name,
                            verificationNumber: formData?.[`aadhaar${currentGuest}`],
                            verificationType: selectedVerification
                        };
                        setGuest((prevGuests) => [...prevGuests, data]);

                        if (currentGuest < formData.totalGuests) {
                            setCurrentGuest((prev) => prev + 1);
                            setStep(2);
                            resetVerificationFields();
                        } else {
                            setHeading("Preview");
                            getPreviewData();
                            setStep(4);
                        }
                    }
                    break;

                case 4:
                    const res = await GuestSubmitHotelChekInRequest(formData, previewData);
                    console.log(res)
                    if (res.status !== 200) {
                        throw new Error("Error Checking In!.");
                    } else {
                        setStep(5);
                        setHeading("");
                    }
                    break;
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetVerificationFields = () => {
        setVerificationNumber("");
        setFormData({ ...formData, xipperId: "" });
        setOtp("");
        setPassportData({
            file_number: '',
            dob: null,
        });
    };

    const handleChange = (text, field) => {
        const tempData = { ...formData, [field]: text };
        setFormData(tempData);
    };

    const handleDateChange = (event, selectedDate, type) => {
        if (event.type === 'set') {
            const formattedDate = formatDate(selectedDate);
            handleChange(formattedDate, type);
        }
        setShowDatePicker("");
    };

    const handleSkip = () => {
        const data = { XipperId: "", name: "(Unverified)", verificationType: "", verificationNumber: "", unverified: true };
        setGuest((prevGuests) => [...prevGuests, data]);
        if (formData.totalGuests === currentGuest) {
            setHeading("Preview");
            getPreviewData();
            setStep(4);
        } else {
            setCurrentGuest(currentGuest + 1)
            setStep(2);
        }
    };

    const handleGenerateCode = async () => {
        try {
            setLoading(true);
            const res = await GenerateCheckInOTP(formData);
            if (res.status === 200) {
                setAppCode(res.data.OTP)
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleExistingPendingRequest = async (data) => {
        setFormData({
            ...formData,
            checkIn: data.checkInDate,
            checkOut: data.checkOutDate,
            totalGuests: data.totalGuests,
            rooms: data.totalRooms,
            pnr: data.bookingId,
            requestId: data.requestId,
            hotelXipperId: data.hotelXipperId,
            ...data
        })
        if (data.tempUserCheckInInfo.length === data.totalGuests) {
            const guestData = []
            data.tempUserCheckInInfo.map((item) => {
                guestData.push({ XipperId: item.XipperId, name: item.user ? item.user.fullName : "(Unverified)", verificationType: "Xipper ID", verificationNumber: item.XipperId });
            });
            setHeading("Preview");
            getPreviewData(data.bookingId, data.requestId);
            setGuest(guestData);
            setStep(4);
        } else {
            const guestData = [];
            data.tempUserCheckInInfo.forEach((item, index) => {
                if (data.tempUserCheckInInfo.length === 1 && item.tempNonXipperUserInfo === null) {
                    guestData.push({
                        XipperId: item.XipperId,
                        name: item.user.fullName,
                        verificationType: "Xipper ID",
                        verificationNumber: item.XipperId
                    });
                } else {
                    if (item.XipperId === null && item.tempNonXipperUserInfo && Object.keys(item.tempNonXipperUserInfo).length > 0) {
                        guestData.push({
                            XipperId: "",
                            name: item.tempNonXipperUserInfo.name,
                            verificationType: item.tempNonXipperUserInfo.aadhaarNumber === null ? "Passport File Number" : "Aadhaar Number",
                            verificationNumber: item.tempNonXipperUserInfo.aadhaarNumber === null ? item.tempNonXipperUserInfo.PassportFileNumber : item.tempNonXipperUserInfo.aadhaarNumber
                        });
                    }
                    if (item.XipperId && item.user !== null) {
                        guestData.push({
                            XipperId: item.XipperId,
                            name: item.user.fullName,
                            verificationType: "Xipper ID",
                            verificationNumber: item.XipperId,
                        });
                    }
                }
            });
            setGuest(guestData);
            setCurrentGuest(data.tempUserCheckInInfo.length + 1)
            setStep(2);
        }
    };

    const handleSubmittedRequest = async (data) => {
        try {
            setLoading(true);
            setFormData({
                ...formData,
                checkIn: data.checkInDate,
                checkOut: data.checkOutDate,
                totalGuests: data.totalGuests,
                rooms: data.totalRooms,
                pnr: data.bookingId,
                requestId: data.requestId,
                hotelXipperId: data.hotelXipperId,
                ...data
            })
            if (data.userCheckInInfo && data.userCheckInInfo.length > 0) {
                setStep(5);
                setHeading("");
                const res = await ApprovalStatusCheck(data.bookingId);
                console.log(res.data.approvedStatus);
                setIsConfirm(res.data.approvedStatus);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        switch (step) {
            case 1:
            case 4:
                setStep(6);
                break;
            case 2:
                setStep(6);
                break;
            case 3:
                setStep(2);
                break;
            default:
                toggleModal();
                break;
        }
    }
    return (
        <>
            {step < 5 && (
                <Pressable className="mt-[-50px] mb-10 w-10"
                    onPress={handleBack}>
                    <BackArrowIcon />
                </Pressable>
            )}
            {loading && <CircularLoader />}
            {step < 4 && (
                <>
                    <View className="flex-row items-center">
                        <Text className="font-psemibold text-md text-black mr-2">
                            {hotelData?.name}
                        </Text>
                        <DynamicStars rating={hotelData.hotelStarRating} />
                    </View>

                    <View className="flex-row items-center mt-2">
                        <LocationIcon color={"#ccc"} />
                        <Text className="font-pmedium text-md text-black pr-5 ml-1">
                            {`${hotelData?.locality || hotelData?.address?.locality || ""}, ${hotelData?.city || hotelData?.address?.city || ""}, ${hotelData?.state || hotelData?.address?.state || ""} - ${hotelData?.pincode || hotelData?.address?.pincode || ""}`}
                        </Text>
                    </View>
                </>
            )}

            {step === 1 && (
                <View>
                    <View className="w-full flex gap-2 flex-row justify-between mt-4">
                        <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                            <Calender color={"#000000"} />
                            <TextInput
                                value={formData.checkIn ? formatDate(new Date(formData.checkIn)) : ''}
                                placeholder="Check in date"
                                onFocus={() => setShowDatePicker("checkIn")}
                                showSoftInputOnFocus={false}
                                placeholderTextColor="#000000"
                                 color="#000000"
                            />
                            {showDatePicker === "checkIn" && (
                                <DateTimePicker
                                    value={formData.checkIn ? new Date(formData.checkIn) : new Date()}
                                    mode="date"
                                    minimumDate={new Date()}
                                    display={Platform.OS === 'ios' ? 'inline' : ''}
                                    onChange={(e, date) => handleDateChange(e, date, "checkIn")}
                                />
                            )}
                        </View>
                        <View className="w-[48%] flex-row items-center p-1 border border-gray-200 rounded-md">
                            <Calender color={"#000000"} />
                            <TextInput
                                value={formData.checkOut ? formatDate(new Date(formData.checkOut)) : ''}
                                placeholder="Check out date"
                                onFocus={() => setShowDatePicker("checkOut")}
                                showSoftInputOnFocus={false}
                                placeholderTextColor="#000000"
                                 color="#000000"
                            />
                            {showDatePicker === "checkOut" && (
                                <DateTimePicker
                                    value={formData.checkOut ? new Date(formData.checkOut) : new Date()}
                                    mode="date"
                                    minimumDate={new Date(formData.checkIn)}
                                    display={Platform.OS === 'ios' ? 'inline' : ''}
                                    onChange={(e, date) => handleDateChange(e, date, "checkOut")}
                                />
                            )}
                        </View>
                    </View>
                    <View className="w-full flex gap-2 flex-row justify-between mt-2">
                        <View className="w-[48%] flex flex-row justify-between items-center border border-gray-200 rounded-md p-1">
                            <Guest color={"#000000"} />
                            <Picker
                                selectedValue={formData.totalGuests}
                                onValueChange={(value) => handleChange(value, "totalGuests")}
                                style={styles.picker}
                                placeholder="Guests"
                                 placeholderTextColor="#000000"
                                  color="#000000"
                            >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((guest) => (
                                    <Picker.Item key={guest} label={`${guest}`} value={guest} />
                                ))}
                            </Picker>
                        </View>
                        <View className="w-[48%] flex flex-row items-center justify-between border border-gray-200 rounded-md p-1">
                            <Door color={"#000000"} />
                            <Picker
                                selectedValue={formData.rooms}
                                onValueChange={(value) => handleChange(value, "rooms")}
                                style={styles.picker}
                                placeholder="Rooms"
                                placeholderTextColor="#000000"
                                 color="#000000"

                            >
                                {Array.from({ length: formData.totalGuests || 10 }, (_, i) => i + 1).map((room) => (
                                    <Picker.Item key={room} label={`${room}`} value={room} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View className="w-full mt-4 flex flex-row items-center mb-2 p-1 border border-gray-200 rounded-md">
                        <GovernmentIdIcon color={"#000000"} />
                        <TextInput
                            value={formData.pnr || ''}
                            placeholder="PNR/Booking ID"
                            onChangeText={(text) => handleChange(text, "pnr")}
                            placeholderTextColor="#000000"
                            color="#000000"
                        />
                    </View>


                    <Pressable
                        className={`px-2 py-2 my-5 mx-6 items-center rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        onPress={handleNext}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Continue
                        </Text>
                    </Pressable>
                    <Text className="font-pmedium text-center text-xs text-black">
                        This option is valid for customers who have already booked a hotel
                        and want to avail services via Xipper
                    </Text>
                </View>
            )}

            {step === 2 && (
                <View>
                    <View className="flex-row items-center justify-between  mt-3">
                        <Text className="font-psemibold text-lg text-black ">
                            Verify using {selectedVerification}
                        </Text>
                        <Pressable
                            onPress={() => setShowRadioOptions(!showRadioOptions)}
                        >
                            <DropDownArrow />
                        </Pressable>
                    </View>
                    <Text className="font-pregular text-sm text-black ">
                        Person {currentGuest}
                    </Text>
                    {showRadioOptions && (
                        <View className="absolute bottom-2 right-5 bg-white p-5 rounded-md z-10">
                            {["Aadhaar", "Passport", "Xipper ID"].map((option) => (
                                <RadioButton
                                    key={option}
                                    label={option}
                                    value={option}
                                    selected={selectedVerification === option}
                                    onPress={handleRadioSelect}
                                />
                            ))}
                        </View>
                    )}
                    {selectedVerification === "Aadhaar" ?
                        <AadharInput value={verificationNumber} onChangeText={setVerificationNumber} />
                        : selectedVerification === "Passport" ?
                            <PassportInput value={passportData}
                                onChangeText={handlePassportChange}
                                placeholderText={"Passport File Number"}
                                placeholderTextColor="#000000" />
                            :
                            <View className="w-full mt-4 flex flex-row items-center mb-2 p-1 border border-gray-200 rounded-md">
                                <TextInput
                                    value={formData.xipperId || ''}
                                    placeholder="Xipper ID"
                                    onChangeText={(text) => handleChange(text, "xipperId")}
                                     placeholderTextColor="#000000"
                                />
                            </View>
                    }


                    <Pressable
                        className={`px-2 py-2 my-5 mx-6 items-center rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        onPress={handleNext}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Verify {selectedVerification}
                        </Text>
                    </Pressable>
                    <Pressable
                        className={`px-2 py-2 mx-6 items-center rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        onPress={handleSkip}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Skip
                        </Text>
                    </Pressable>
                </View>
            )}

            {step === 3 && (
                <View>
                    <Text className="font-psemibold text-lg text-black mb-2 mt-3">
                        Verify OTP
                    </Text>
                    <OtpComponent value={otp} onChange={setOtp} />
                    <Pressable
                        className={`px-2 py-2 my-5 mx-6 items-center rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        onPress={handleNext}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Submit
                        </Text>
                    </Pressable>
                </View>
            )}

            {step === 4 && (
                <View>
                    {!loading && previewData?.tempUserCheckInInfo?.map((g, index) => (
                        <View key={index} className="mb-3">
                            <Text className="font-psemibold text-base text-black mb-2">
                                Guest {index + 1} {g?.role === "Primary Guest" && "(Primary Guest)"}
                            </Text>
                            {g?.unverified ?
                                (
                                    <Text className="font-pmedium text-md text-red-600 mb-1">
                                        {"(Unverified)"}
                                    </Text>
                                ) :
                                <>
                                    {g.user ? (
                                        <Text className="font-pmedium text-md text-black mb-1">
                                            Name : {g.user.fullName}
                                        </Text>
                                    ) : g.tempNonXipperUserInfo ? (
                                        <Text className="font-pmedium text-md text-black mb-1">
                                            Name : {g.tempNonXipperUserInfo.name}
                                        </Text>
                                    ) :
                                        (
                                            <Text className="font-pmedium text-md text-red-600 mb-1">
                                                {"(Unverified)"}
                                            </Text>
                                        )}
                                    {(g?.role === "Primary Guest" || g.XipperId) && (<Text className="font-pmedium text-md text-black mb-1">
                                        {`${g?.role === "Primary Guest" || g.XipperId ? `Xipper ID : ${g.XipperId}` : ""}`}
                                    </Text>
                                    )}
                                    {g.tempNonXipperUserInfo && g.tempNonXipperUserInfo.aadhaarNumber && (
                                        <Text className="font-pmedium text-md text-black mb-1">
                                            {`Aadhaar : ${g.tempNonXipperUserInfo.aadhaarNumber}`}
                                        </Text>
                                    )}
                                </>}
                        </View>
                    ))}
                    {!loading && previewData?.totalGuests !== previewData?.tempUserCheckInInfo?.length &&
                        Array(previewData?.totalGuests - previewData?.tempUserCheckInInfo?.length).fill("")?.map((_, index) => (
                            <View key={index} className="mb-3">
                                <Text className="font-psemibold text-base text-black mb-2">
                                    Guest {previewData?.tempUserCheckInInfo.length + index + 1}
                                </Text>
                                <Text className="font-pmedium text-md text-red-600 mb-1">
                                    {"(Unverified)"}
                                </Text>

                            </View>
                        ))}
                    <Pressable
                        className={`px-2 py-2 my-5 mx-6 items-center rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                        onPress={handleNext}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Submit
                        </Text>
                    </Pressable>
                </View>
            )}

            {step === 5 &&
                (isConfirm ? (
                    <>
                        {appCode.length === 6 ? (
                            <>
                                <Text className="font-pmedium text-center text-sm text-black mt-[10px] mb-3">
                                    Please share the code with the receptionist
                                </Text>
                                <OtpComponent length={6} defaultValue={appCode} />
                                <Pressable
                                    onPress={handleGenerateCode}
                                >
                                    <Text className={`text-center  ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'} py-2 mx-5 rounded-md text-white font-psemibold mt-3`}>
                                        Re-Generate Code
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text className={`font-pmedium text-center text-sm mt-[10px] mb-3 ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'}`}>
                                    Congratulations your check-in request has been approved.
                                </Text>
                                <Text className="font-pmedium text-center text-sm text-black mb-3">
                                    If you are at the property, kindly generate the app code and share
                                    it with the receptionist.
                                </Text>
                                <Pressable
                                    disabled={formatDate(new Date(formData.checkIn)) !== formatDate(new Date())}
                                    onPress={handleGenerateCode}
                                >
                                    <Text className={`text-center py-2 mx-5 rounded-md text-white font-psemibold mt-3 ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`} >
                                        Genrate Code
                                    </Text>
                                </Pressable>
                            </>
                        )}
                    </>
                ) : (
                    <Text className="font-pmedium text-center text-sm text-black mt-[10px]">
                        Thank you for sending Check-in request. You check-in request has not
                        been accepted yet. We will notify you once your request has been
                        approved by the property
                    </Text>
                ))}

            {/* existing check in */}
            {step === 6 && (
                <View>
                    <ScrollView className="max-h-[400px] mt-2" showsVerticalScrollIndicator={false}>
                        <View className="w-full flex gap-2 flex-col justify-between mt-4">
                            {checkInData.existingPendingRequests.map((i, ind) => (
                                <Pressable key={ind} onPress={() => handleExistingPendingRequest(i)}
                                    className="w-[100%] flex-row items-center p-1 border border-gray-200 rounded-md">
                                    <Door color={"#000000"} />
                                    <Text className="p-2 text-black">
                                        {formatDate(new Date(i.checkInDate)) || ''}
                                    </Text>
                                    <Text className="p-2 text-black">
                                    PNR : {i.bookingId}
                                    </Text>
                                </Pressable>
                            ))}
                            {checkInData.submittedRequests.map((i, ind) => (
                                <Pressable key={ind} onPress={() => handleSubmittedRequest(i)}
                                    className="w-[100%] flex-row items-center p-1 border border-gray-300 rounded-md">
                                    <Door color={"#000000"} />
                                    <Text className="p-2 text-black">
                                        {formatDate(new Date(i.checkInDate)) || ''}
                                    </Text>
                                    <Text className="p-2 text-black">
                                        PNR : {i.bookingId}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                    <Text className="font-psemibold text-lg text-black mb-2 mt-3">
                        New Check in Request
                    </Text>
                    <Pressable onPress={() => setStep(1)}
                        className={`w-full mt-4 flex flex-row items-center justify-center mb-2 p-1 border border-gray-200 rounded-md ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                            }`}>
                        <GovernmentIdIcon color={"#ccc"} />
                        <Text className="p-2 text-white">Raise a new Request</Text>
                    </Pressable>


                    {/* <Pressable
                        className={`px-2 py-2 my-5 mx-6 items-center rounded-m ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'
                            }`}
                        onPress={handleNext}
                    >
                        <Text className="font-pmedium text-center text-lg text-white">
                            Continue
                        </Text>
                    </Pressable> */}
                    <Text className="font-pmedium text-center mt-5 text-xs text-black">
                        This option is valid for customers who have already booked a hotel
                        and want to avail services via Xipper
                    </Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: "100%"
    },
    picker: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    pickerItem: {
        padding: 0
    }
});


export default VerifyContent;