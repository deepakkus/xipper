import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";
import { formatDate } from "../utils/utils";

export const GetGovernmentIDs = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/docs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.docs;
    } catch (err) {
        console.log('Error fetching profile details:----------------', err.response.data, err);
    }
};
export const VerifyPan = async (pan) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/docs/verifypan`, { pan: pan }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error verifying PAN details:----------------', err.response.data, err);
        return err.response.data
    }
};
export const VerifyDrivingLicence = async (dl_number, dob) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/docs/verifyDrivingLicence`, { dl_number: dl_number, dob: formatDate(dob) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error verifying DL details:----------------', err.response.data, err);
        return err.response.data
    }
};
export const VerifyPassport = async (file_number, dob) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/docs/verifypassport`, { file_number: file_number, dob: formatDate(dob) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error verifying passport details:----------------', err.response.data, err);
        return err.response.data
    }
};
export const sendAadhaarOTP = async (inputValue, type) => {
    try {
        const token = type !== "register" ? await AsyncStorage.getItem('accessToken') : ""
        const response = await axios.post(`${BASE_URL}/docs/aadhaarVerify/sendOTP`,
            {
                aadhaarNumber: inputValue,
            },
            type !== "register" && {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (err) {
        console.log('Error sending aadhar otp:----------------', err.response.data, err);
        return type !== "register" ? err.response.data : err;
    }
};
export const verifyAadhaarOTP = async (otp, data, type) => {
    try {
        const token = type !== "register" ? await AsyncStorage.getItem('accessToken') : "";
        const payload = type !== "register" ? data : { otp }
        const response = await axios.post(`${BASE_URL}/docs/aadhaarVerify/verifyOTP`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (err) {
        console.log('Error verifying aadhar otp:----------------', err.response.data, err);
        if (err.response.status === 400) {
            console.log("OTP Invalid");
        } else {
            console.log("Some error occurred on our side");
        }
        return type !== "register" ? err.response.data : err;
    }
};
export const addPassport = async (passportData, phoneNumber) => {
    try {
        const token = type !== "register" ? await AsyncStorage.getItem('accessToken') : ""
        const response = await axios.post(`${BASE_URL}/docs/addpassport`,
            {
                file_number: `${passportData.fileNumber1}`,
                dob: `${formatDate(passportData.expiryDate)}`,
                contactIdentifier: phoneNumber
            },
            type !== "register" && {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error adding Passport:----------------', err.response.data, err);
        if (err.response.status === 400) {
            console.log("OTP Invalid");
        } else {
            console.log("Some error occurred on our side");
        }
        return type !== "register" ? err.response.data : err;
    }
};
