import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { BackArrowIcon } from '../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { GetNotificationList } from '../services/commonService';
import CircularLoader from './CircularLoader';
import { AcceptNotifications } from '../services/hotelService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AcceptFamilyRequest } from '../services/profileService';
import { AcceptCompanyNotification } from '../services/companyService';

const NotificationItem = ({ data, onPress = () => { } }) => (
    <View className="flex-col bg-white rounded-lg shadow-md p-4 mb-4">
        {/* <Image
            source={{ uri: imageUri }}
            className="w-12 h-12 rounded-full mr-4"
        /> */}
        <View>
            <Text className="text-lg font-semibold mb-1 text-black">{data.title}</Text>
            <Text className="text-gray-600">{data.message}</Text>
        </View>
        {!["read-only", "hotel-checkin-invite-accepted", "family-request-accepted", "company-invite-accepted"].includes(data.type)
            && !["Accepted", "Rejected"].includes(data.actionStatus) && (
                <View className="flex flex-row items-center p-2">
                    <Pressable
                        className="p-2 rounded-lg mx-1"
                        onPress={() => onPress("Accepted")}
                    >
                        <View className="border border-gray-300 rounded-md p-2">
                            <Text className="text-black font-semibold">Accept</Text>
                        </View>

                    </Pressable>
                    <Pressable
                        className="p-2 rounded-lg mx-1"
                        onPress={() => onPress("Rejected")}
                    >
                        <View className="border border-gray-300 rounded-md p-2">
                            <Text className="text-black font-semibold">Reject</Text>
                        </View>
                    </Pressable>
                </View>

            )}
    </View>
);

const Notifications = () => {
    const nav = useNavigation();
    const [notifications, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await GetNotificationList();
            setNotification(res.data.data.notifications);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handlePress = async (val, data) => {
        try {
            setLoading(true);
            if (data.type === "family-request-invite") {
                await AcceptFamilyRequest(val, data)
            } else if (data.type === "company-invite") {
                await AcceptCompanyNotification(val, data);
            } else {
                await AcceptNotifications(val, data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await fetchNotifications();
            setLoading(false);
        }
    };

    return (
        <SafeAreaProvider>
            <View className= {Platform.OS === 'ios' ?  "p-10 h-full" :  "p-4 h-full"}>
                <View className="flex items-center flex-row gap-10">
                    <Pressable onPress={() => nav.goBack()} className="h-auto pb-3">
                        <BackArrowIcon />
                    </Pressable>
                    <View className="mt-4">
                        <Text className="text-2xl font-bold mb-4 text-black text-center ml-11">Notifications</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className="bg-gray-100">
                    {notifications.map((notification, ind) => (
                        <NotificationItem
                            key={ind}
                            data={notification}
                            onPress={(val) => handlePress(val, notification)}
                        />
                    ))}
                </ScrollView>
                {loading && <CircularLoader />}
            </View>
        </SafeAreaProvider>
    );
};

export default Notifications;
