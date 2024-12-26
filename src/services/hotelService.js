import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";
import { formatDate } from "../utils/utils";

export const GetUserHotelDetails = async (hotelXipper) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/getHotelDetails?hXipperId=${hotelXipper}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel details:----------------', err.response.data, err);
    }
};
export const CheckExistingCheckInRequest = async (hotelXipper) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/hotelCheckIn/checkExistingRequest?hXipperId=${hotelXipper}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error cehcking existing checkin request:----------------', err.response.data, err);
    }
};
export const GetPreviewData = async (selectedPnr, selectedRequestId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/hotelCheckIn/preview?bookingId=${selectedPnr}&requestId=${selectedRequestId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error cehcking existing checkin request:----------------', err.response.data, err);
    }
};
export const GuestSubmitHotelChekInRequest = async (data, previewData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "bookingId": data.pnr || previewData.tempUserCheckInInfo[0].bookingId,
            "checkInDate": formatDate(new Date(data.checkIn || previewData.checkInDate)),
            "checkOutDate": formatDate(new Date(data.checkOut || previewData.checkOutDate)),
            "requestId": data.requestId || previewData.tempUserCheckInInfo[0].requestId,
        }
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/submitCheckIn`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error submit checkin request:----------------', err.response.data, err);
        return err.response;
    }
};
export const SendGuestAadhaarOTP = async (aadhaarNumber) => {
    try {
        const payload = {
            aadhaarNumber: aadhaarNumber
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/generateaadhaarotp`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error sending guest aadhaar otp:----------------', err.response.data, err.response, err);
        return err.response;
    }
};
export const VerifyGuestAadhaarOTP = async (otp, data, aadhaarNumber) => {
    try {
        const payload = {
            ref_id: data.aadhaarOtpRefId,
            otp: otp,
            aadhaarNumber: aadhaarNumber,
            "bookingId": data.pnr,
            "checkInDate": formatDate(new Date(data.checkIn)),
            "checkOutDate": formatDate(new Date(data.checkOut)),
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/verifyaadhaarotp`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error verifying guest aadhar otp:----------------', err.response.data, err);
        return err.response;
    }
};
export const VerifyGuestPassport = async (passportData, data) => {
    try {
        const payload = {
            ...passportData,
            "bookingId": data.pnr,
            "checkInDate": formatDate(new Date(data.checkIn)),
            "checkOutDate": formatDate(new Date(data.checkOut)),
        };
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/verifypassport`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error cerifying guest passport:----------------', err.response.data, err);
    }
};
export const VerifyGuestXipperID = async (data) => {
    try {
        const payload = {
            "XipperId": data.xipperId,
            "bookingId": data.pnr,
            "checkInDate": formatDate(new Date(data.checkIn)),
            "checkOutDate": formatDate(new Date(data.checkOut)),
            "requestId": data.requestId
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/verifyXipperId`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error cerifying guest xipper id:----------------', err.response.data, err);
        return err.response;
    }
};
export const GenerateCheckInOTP = async (data) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/hotelCheckIn/generateOTP?bookingId=${data.pnr}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error generate checkin otp:----------------', err.response.data, err);
    }
};
export const HotelCheckInStep1 = async (hxipperID, cXipperID, data) => {
    try {
        const payload = {
            "hXipperID": hxipperID,
            ...(cXipperID && { "cXipperID": cXipperID }),
            "checkInDate": data.checkIn,
            "checkOutDate": data.checkOut,
            "roomNums": data.rooms,
            "bookingId": data.pnr,
            "guests": data.totalGuests
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data, "resp")
        return response;
    } catch (err) {
        console.log('Error creating guest checkin stwp 1:----------------', err.response, err.response.data, err);
        return err.response
    }
};
export const AcceptNotifications = async (val, data) => {
    try {
        const payload = {
            "hasAccepted": val,
            "bookingId": data.metadata.bookingId,
            "checkInDate": data.metadata.checkInDate,
            "checkOutDate": data.metadata.checkOutDate,
            "requestId": data.metadata.requestId,
            "notificationId": data.notificationId
        };
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/acceptNotifications`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error accepting notifications checkin:----------------', err.response.data, err);
        return err.response;
    }
};
export const SendCheckInRequestToHotel = async () => {
    try {
        const payload = {
            hXipperID: "",
            checkInDate: "",
            checkOutDate: "",
            roomNums: 1,
            bookingId: "",
            guests: [
                {
                    name: "",
                    aadhaarNumber: 123412,
                    address: "",
                    gender: ""
                },
                {
                    name: "",
                    passportNumber: 123412,
                    address: "",
                    gender: ""
                },
                {
                    name: "",
                    XipperId: 123412,
                    address: "",
                    gender: ""
                },
            ]
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotelCheckIn/generate`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error creating guest checkin request:----------------', err.response.data, err);
    }
};
export const GetHotelCustomerDetails = async (xipperId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/customers?hXipperId=${xipperId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel customer details:----------------', err.response.data, err);
    }
};
export const GetHotelCheckInDetails = async () => {
    try {
        const bookingId = ""
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel checkin details:----------------', err.response.data, err);
    }
};
export const GetHotelCheckInList = async (xipperId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/checkinRequest?xipperID=${xipperId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel checkin list:----------------', err.response.data, err);
    }
};
export const GetHotelRoomsList = async () => {
    try {
        const xipperId = ""
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/getRoomNumber?XipperId=${xipperId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel rooms list:----------------', err.response.data, err);
    }
};
export const ApproveCheckInRequest = async (data, name, approveAll, action) => {
    try {
        const payload = {
            "bookingId": data,
            "names": [name],
            "action": action,
            "actionAll": approveAll
        };
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/approveGuests`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error approving checkin request:----------------', err.response.data, err);
    }
};
export const ApprovalStatusCheck = async (bookingId) => {
    try {
        console.log(`${BASE_URL}/user/hotelCheckIn/checkHotelApproved?bookingId=${bookingId}`)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/hotelCheckIn/checkHotelApproved?bookingId=${bookingId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error checking approval status:----------------', err.response.data, err);
    }
};
export const GetCheckInGuestData = async (bookingId) => {
    try {
        console.log(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/getCheckInData/${bookingId}`)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/getCheckInData/${bookingId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error checking approval status:----------------', err.response.data, err);
    }
};
export const AllocateRoomToGuests = async (hotelId, bookingId, guests, roomNumber) => {
    try {
        const payload = {
            "hXipperId": hotelId,
            "bookingId": bookingId,
            "guests": guests,
            "roomNumber": roomNumber
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/allocateRoom`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error allocating rooms:----------------', err.response.data, err);
    }
};


export const GetRoomNumberList = async (hotelXipperId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/getRoomNumber?hXipperId=${hotelXipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error fetching room number list:----------------', err.response.data, err);
    }
};

export const AllocateRoom = async (hotelId, bookingId, guests, roomNumber) => {
    try {
        const payload = {
            "hXipperId": hotelId,
            "bookingId": bookingId,
            "guests": guests,
            "roomNumber": roomNumber,
        }
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/allocateRoom`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error allocating room:----------------', err.response.data, err);
    }
}

export const VerifyOtp = async (bookingId, otp) => {
    try {
        const payload = {
            bookingId: bookingId,
            otp: otp,
        };
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/checkinRequest/verifyOTP`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error verifying otp:', err.response.data, err);
        return err.response;
    }
};

export const GetRoles = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerroles`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error fetching roles:', err.response.data, err);
        return err.response;
    }
};

export const GetDepartments = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerdepartment`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error fetching departments:', err.response.data, err);
        return err.response;
    }
}

export const GetPositions = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerposition`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error fetching positions:', err.response.data, err);
        return err.response;
    }
}

export const GetEmployees = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getemployees?companyId=XC03829346`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error fetching employees:', err.response.data, err);
        return err.response;
    }
}

export const ViewBill = async (hotelId, checkInId) => {
    try {
        const payload = {
            "hXipperId": hotelId,
            "checkInId": checkInId
        };

        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(`${BASE_URL}/user/hotel/getFinalBill`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (err) {
        console.log('Error viewing bill:', err.response.data, err);
        return err.response;
    }
}

export const ServiceRequestPreview = async (serviceId, checkInId, hotelID) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getServiceRequestDetails?serviceId=${serviceId}&checkInId=${checkInId}&hXipperId=${hotelID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (err) {
        console.log('Error previewing:', err.response.data, err);
        return err.response;
    }
}