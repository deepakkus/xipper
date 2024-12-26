import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const FetchSearchSuggestions = async (searchtext) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/user/search?query=${searchtext}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error fetching suggestions:----------------', err.response.data, err);
    }
};
export const GetNotificationList = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/notifications/notificationsList`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log('Error fetching suggestions:----------------', err.response.data, err);
    }
};