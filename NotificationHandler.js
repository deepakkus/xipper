import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from "./src/Screens/helper"; // Adjust import based on your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationHandler = () => {
    const [notifications, setNotifications] = useState([]);
    const [xipperID, setXipperID] = useState('');

    useEffect(() => {
        fetchUserDetails();

        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Notification received in foreground:', remoteMessage);
            addNotification(remoteMessage.notification.title, remoteMessage.notification.body);
        });

        const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage);
        });

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
            console.log('New FCM Token:', token);
            sendSubscriptionToServer(token); // Uncommented to send token to server
        });

        requestUserPermission();

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnNotificationOpened();
            unsubscribeOnTokenRefresh();
        };
    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken'); // Replace with your token fetching logic
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setXipperID(response.data.data.XipperID);
        } catch (err) {
            console.error('Error fetching user details:', err);
        }
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            const fcmToken = await messaging().getToken();
            console.log('FCM Token:', fcmToken);
            await registerToken(fcmToken);
            await sendSubscriptionToServer(fcmToken); // Moved inside here for clarity
        } else {
            console.log('Notification permission denied');
        }
    };

    const sendSubscriptionToServer = async (token) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const body = {
                // id: xipperID,
                
                deviceToken:token,
            };
            const response = await axios.post(`${BASE_URL}/notifications/register`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log('Subscription sent to server:', response.data);
        } catch (error) { 
            console.error('Error sending subscription to server:', error, error.response);
        }
    };

    const registerToken = async (token) => {
        try { 
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.post(`${BASE_URL}/mobile/send-notifications`,
                {
                    message: token
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data, "register token done");
        } catch (error) {
            console.error('Error registering token:', error, error.response);
            Alert.alert('Error', 'Failed to register token');
        }
    };

    // Function to send a notification
    const sendNotification = async (message) => {
        try {
            const response = await fetch(`${BASE_URL}/mobile/send-notification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.status !== 200) { // Changed from response.ok
                throw new Error('Failed to send notification');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending notification:', error);
            Alert.alert('Error', 'Failed to send notification');
        }
    };

    const addNotification = (title, body) => {
        setNotifications(prev => [...prev, { title, body, id: Date.now() }]);
        Alert.alert(title, body); // Show alert for demo purposes
    };

    console.log(notifications);
    return null;
};

export default NotificationHandler;
