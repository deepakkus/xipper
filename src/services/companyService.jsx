
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";


export const GetCompanyDashboard = async (id) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = id || "XC30908138";
        const response = await axios.get(`${BASE_URL}/companyDashboard?xipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response.data)
        return response;
    } catch (err) {
        console.log('Error getting company dashboard:----------------', err.response, err);
        return err.response
    }
};
export const GetCompanyRoles = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/company/getRoles`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company roles:----------------', err.response.data, err);
        return err.response
    }
};
export const GetCompanySearchMember = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "XC12345678";
        const name = "";
        const response = await axios.get(`${BASE_URL}/companyDashboard/createRole/searchMember?xipperID=${xipperId}&name=${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company search member:----------------', err.response.data, err);
        return err.response
    }
};
export const CompanyInviteMember = async (xipperId, department, role, position, companyId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            xipperId: xipperId,
            departments: department,
            role: role?.[0],
            positions: position,
            companyId: companyId,
        };
        const response = await axios.post(`${BASE_URL}/companyDashboard/invitemember`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error inviting company member:----------------', err, err.response);
        return err.response
    }
};
export const GetCompanyDepartments = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/company/getdepartment`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company departments:----------------', err.response.data, err);
        return err.response
    }
};

export const GetCompanyPositions = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/company/getpositions`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company positions:----------------', err.response.data, err);
        return err.response
    }
}
export const GetCompanyWallet = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "";
        const name = "";
        const response = await axios.get(`${BASE_URL}/companyWallet?XipperID=${xipperId}&name=${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company wallet:----------------', err.response.data, err);
        return err.response
    }
};
export const AcceptCompanyNotification = async (val, data) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "status": val,
            "notificationId": data.notificationId,
            "cXipperId": data.metadata.companyId
        }
        const response = await axios.post(`${BASE_URL}/company/acceptInvite`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error accepting company invite:----------------', err.response.data, err);
        return err.response
    }
};

export const GetCompanyList = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/docs/getCompanyTypeList`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company list:----------------', err.response.data, err);
        return err.response
    }
}

