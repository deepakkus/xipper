import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";
import { convertTo24HourFormat, formatDate } from "../utils/utils";

export const RequestHouseKeeping = async (data,items) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "hotelId": data.XipperID,
            "roomNumber": data.roomNumber,
            "checkInId": data.checkInId,
            "items": items
        };
        const res = await axios.post(`${BASE_URL}/user/hotel/services/requestHousekeeping`,
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (e) {
        console.log(e, e.response);
        return e.response;
    }
};

export const RequestMaintenance = async (data, itemId, message) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            ...(message && {"description": message}),
            "hotelId": data.XipperID,
            "roomNumber": data.roomNumber,
            "checkInId": data.checkInId,
            "itemId": itemId,
        };
        console.log("Payload:", payload);
        const res = await axios.post(`${BASE_URL}/user/hotel/services/requestMaintenance`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        return e.response;
    }
}

export const RequestReception = async (data, itemId, service, time, roomchange) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "hotelId": data.XipperID,
            "type": service,
            "checkInId": data.checkInId,
            "roomNumber": data.roomNumber,
            "itemId": itemId,
            ...(service === "Wake up call" && { "wakeTime": convertTo24HourFormat(time) }),
            ...(service === "Room Change" && { "currentRoomProblem": roomchange.current, "newRoomRequirement": roomchange.new  })
        };
        console.log(payload)
        const res = await axios.post(`${BASE_URL}/user/hotel/services/requestReception`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)
        return res;
    }
    catch (e) {
        console.log(e, e.response);
        return e.response;
    }
}

export const RequestExtraService = async (data, itemId) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "hotelId": data.XipperID,
            "type": service,
            "checkInId": data.checkInId,
            "roomNumber": data.roomNumber,
            "itemId": itemId
        };
        const res = await axios.post(`${BASE_URL}/user/hotel/services/requestExtraService`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        return e.response;
    }
}

export const RequestTravelDesk = async (data, itemId) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "hotelId": data.XipperID,
            "checkInId": data.checkInId,
            "roomNumber": data.roomNumber,
            "itemId": itemId
        };
        const res = await axios.post(`${BASE_URL}/user/hotel/services/requestTravelDeskService`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        return e.response;
    }
}

export const checkOut = async (hotelID,checkInId) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        const payload = {
            "checkInId": "a650dbda-59ff-4928-ac1f-432dc4da03e9",
            "hXipperId": "XH76140714",
        };
        console.log(payload)
        const res = await axios.post(`${BASE_URL}/user/hotel/checkout`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    }
    catch (e) {
        console.log(e);
        return e.response;
    }
}