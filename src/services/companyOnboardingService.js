import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const GetCompanyOnboardingStep = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/docs/getcompanystep`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching company onboarding last step:----------------', err.response.data, err);
    }
};
export const GetPendingRegistrationList = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/companyregistration/getPendinglist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error fetching company onboarding last step:----------------', err.response.data, err);
    }
};
export const VerifyCompanyPan = async (pan, compType, businessName) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { pan: pan, companyType: compType, businessName: businessName }
        const response = await axios.post(`${BASE_URL}/docs/verifycompanypan`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company Pan:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyCIN = async (cin, compType) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { cin: cin, companyType: compType }
        const response = await axios.post(`${BASE_URL}/docs/verifyCin`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company CIN:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyDIN = async (din, compId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { din: din, companyId: compId }
        const response = await axios.post(`${BASE_URL}/docs/verifyDin`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company DIN:----------------', err.response.data, err);
        return err.response
    }
};
export const SendOTPforDIN = async (aadhaarNumber) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { aadhaarNumber: aadhaarNumber }
        const response = await axios.post(`${BASE_URL}/docs/verifyAadhaarForDIN/sendOTP`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error sending DIN Aadhar OTP:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyOTPforDIN = async (aadhaarNumber, ref_id, otp, din, companyId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "aadhaarNumber": aadhaarNumber,
            "otp": otp,
            "ref_id": ref_id,
            "din": din,
            "companyId": companyId
        }
        const response = await axios.post(`${BASE_URL}/docs/verifyAadhaarForDIN/verifyOTP`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying DIN Aadhar OTP:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyGST = async (gst, companyId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { gst_number: gst, companyId: companyId }
        const response = await axios.post(`${BASE_URL}/docs/verifyGST`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company GST:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyEmail = async (email, companyId, otpToken) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "email": email,
            "companyId": companyId,
            "otplessToken": otpToken
        }
        const response = await axios.post(`${BASE_URL}/docs/verifyemail`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company Email:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyDomain = async (domain) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { domain: domain, XipperId: "" }
        const response = await axios.post(`${BASE_URL}/docs/verifydomain`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company domain:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyUPI = async (upi) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { vpa: upi }
        const response = await axios.post(`${BASE_URL}/docs/verify-UPI`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company UPI:----------------', err.response.data, err);
        return err.response
    }
};
export const VerifyBankDetails = async (data, companyId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode,
            companyId: companyId
        }
        const response = await axios.post(`${BASE_URL}/docs/company/verifyBankAccount`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying company Bank Details:----------------', err.response.data, err);
        return err.response
    }
};
export const RegisterCompany = async (companyId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = { companyId: companyId }
        const response = await axios.put(`${BASE_URL}/docs/registercompany`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error registering company:----------------', err.response.data, err);
        return err.response
    }
};