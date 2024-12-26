
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const GetSellerRoles = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerroles`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller roles:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerDepartments = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerdepartment`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller departments:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerEmployees = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "XC12345678";
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getemployees?xipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company employees:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerDashboard = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "";
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard?XipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller dashboard:----------------', err.response.data, err);
        return err.response
    }
};
export const AddHotelEmployees = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            xipperIds: ["X12312412", ""],
            name: [""],
            department: "",
            role: "",
            companyId: "",
            hXipperId: ""
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/addemployees`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error adding hotel employees:----------------', err.response.data, err);
        return err.response
    }
};

export const GetEmployeeAccess = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getEmployeeAccess`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error getting employee access:----------------', err.response.data, err);
        return err.response
    }
}

export const acceptServiceRequest = async (val, serviceId, hotelId) => {
    try {
        const body = {
            "serviceid": serviceId,
            "hXipperID": hotelId,
            "action": val
        }
        console.log(body)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(
            `${BASE_URL}/hotel/sellerDashboard/acceptServiceRequest`, body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        return response;
    }
    catch (err) {
        console.log(err, err.response);
        return err.response;
    }
}

export const CheckOutGuest = async () => {
    try {
        const body = {
            "checkInId": "7369995c-0ee1-4206-ac96-bf5498347ffd",
            "hXipperId": "XH76140714"
        };
        console.log(body)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(
            `${BASE_URL}/hotel/checkout`, body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        return response;
    }
    catch (err) {
        console.log(err, err.response);
        return err.response;
    }
}

export const GetBill = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "bookingId": "avishekpnr1",
            "hXipperId": "XH76140714",
            "roomNumber": "107"
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/getCustomersDetails`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error getting bill:----------------', err.response.data, err);
        return err.response
    }
}

export const AddEmployee = async() =>{
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "xipperId": "X646464637",
            "departments": ["Kitchen", "Reception"],
            "positions": ["Manager"],
            "role": "Employee",
            "hXipperId": "XH20770554",
            "accessList": ["CAN_ACCESS_WALLET", "CAN_ACCESS_INBOX"]
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/addemployees`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error adding employee:----------------', err.response.data, err);
        return err.response
    }
}

export const Requestdone = async(serviceId,hotelId) =>{
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "serviceid": serviceId,
            "hXipperID": hotelId,
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/markServiceComplete`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error marking request as done:----------------', err.response.data, err);
        return err.response
    }
}