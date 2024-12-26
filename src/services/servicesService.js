import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const GetAllServices = async (bookingId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/hotelCheckedIn?checkInId=${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel services:----------------', err.response.data, err);
    }
};
export const GetServiceDetails = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "hXipperId": id,
            "serviceName": cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getSubcategories`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error fetching hotel services:----------------', err.response.data, err);
    }
};
export const GetHouseKeepingItems = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            hXipperId: id,
            serviceName: cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getHousekeepingItems`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get housekeeping services:----------------', err.response.data, err);
        return err.response;
    }
};

export const GetMaintenanceItems = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log(token)
        const payload = {
            hXipperId: id,
            serviceName: cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getMaintenanceItems`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get maintenance services:----------------', err.response.data, err);
        return err.response;
    }
};

export const GetReceptionItems = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            hXipperId: id,
            serviceName: cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getReceptionServices`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get reception services:----------------', err.response.data, err);
        return err.response;
    }
};

export const GetTravelDeskServices = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            hXipperId: id,
            serviceName: cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getTravelDeskServices`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get travel desk services:----------------', err.response.data, err);
        return err.response;
    }
}

export const GetExtraServices = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            hXipperId: id,
            serviceName: cat
        }
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getExtraServices`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get extra services:----------------', err.response.data, err);
        return err.response;

    }
}

export const GetFandBItems = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            hXipperId: id,
            serviceName: cat
        };
        const response = await axios.post(`${BASE_URL}/user/hotel/services/getFANDBItems`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log('Error get F&B services:----------------', err.response.data, err);
    }
};
export const AddFandBItemsToCart = async (payload) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.put(`${BASE_URL}/user/hotel/services/addFANDBItemsToCart`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error Adding F&B Items to cart:----------------', err.response.data, err);
        return err.response;
    }
};
export const AddLaundryItemsToCart = async (property, itemId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "hotelId": property.XipperID,
            "roomNumber": property.roomNumber,
            "checkInId": property.checkInId,
            "itemId": itemId

        };
        const response = await axios.put(`${BASE_URL}/user/hotel/services/addLaundryItemsToCart`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error adding laundry to cart:----------------', err.response.data, err);
        return err.response;
    }
};
export const RemoveLaundryItemsToCart = async (property, itemId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "hotelId": property.XipperID,
            "roomNumber": property.roomNumber,
            "checkInId": property.checkInId,
            "itemId": itemId
        };
        const response = await axios.put(`${BASE_URL}/user/hotel/services/removeLaundryItemsFromCart`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response;
    } catch (err) {
        console.log('Error removing laundry from cart:----------------', err.response.data, err);
        return err.response;
    }
};
export const RequestHouseKeeping = async (id, cat) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "hotelId": "XH21397668",
            "roomNumber": "A101",
            "checkInId": "7c42c9ec-1907-42e6-8a45-ed9ee635cd77",
            "items": [{
                "itemId": "570475a9-2b47-4f60-ae29-1658e5c1d5c9",
                "quantity": 2
            },
            {
                "itemId": "a0f959cc-4d63-4fd7-9de6-55547b51eaa4",
                "quantity": 1
            }]
        };
        const response = await axios.put(`${BASE_URL}/user/hotel/services/requestHousekeeping`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error requesting housekeeping services:----------------', err.response.data, err);
    }
};
export const AddItemsToBill = async (cartId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "cartId": cartId
        };
        const response = await axios.put(`${BASE_URL}/user/hotel/cart/addToBill`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error adding items to bill:----------------', err.response, err);
        return err.response;
    }
};

export const GuestCheckOut = async (hXipperID) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/guestCheckoutRequests?hXipperID=${hXipperID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error guest check out:----------------', err.response.data, err);
    }
}

export const GethotelServiceRequest = async (hXipperID = "XH20770554") => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/serviceRequest?hXipperID=${hXipperID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error fetching hotel service request:----------------', err.response.data, err);
    }
}

export const GetAddServiceRequestDetails = async (hXipperID = "XH21397668") => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getAddServiceRequestDetails?hXipperId=${hXipperID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error fetching hotel service request:----------------', err.response.data, err);
    }
}

export const GetFandBCart = async (cartID) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "cartId": cartID
        };
        const res = await axios.post(`${BASE_URL}/user/hotel/services/getFANDBCart`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    }
    catch (e) {
        console.log(e, e.response);
        return e.response;
    }
}
export const GetLaundryCart = async (cartID) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "cartId": cartID
        };
        const res = await axios.post(`${BASE_URL}/user/hotel/services/getLaundryCart`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (e) {
        console.log(e, e.response);
        return e.response;
    }
}