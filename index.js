/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-get-random-values';
import { AddNotifcation } from './src/redux/authRedux';
import store from './src/redux/store';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);

const requestPermission = async () => { const authStatus = await messaging().requestPermission(); console.log('Permission status:', authStatus); };

// PushNotification.configure({
//     onNotification: function (notification) {
//       console.log('Notification received:', notification);
//     },
//     onAction: function (action) {
//       console.log('Action received:', action);
//     },
//     onRegistrationError: function (err) {
//       console.error(err);
//     },
//     requestPermissions: true,
//   });

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//     let temp;
//     if(remoteMessage.notification.body && JSON.parse(remoteMessage.notification.body)){
//       temp = JSON.parse(remoteMessage.notification.body)
//     }
//     PushNotification.localNotification({
//       channelId: 'hotel',
//       title: remoteMessage.notification.title,
//       message: temp.message,
//       data: remoteMessage.data,
//     });
//     store.dispatch(AddNotifcation(remoteMessage));
//   });
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    //requestPermissions: true,
    requestPermissions: Platform.OS === 'ios',
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    let temp;
    if (remoteMessage.notification.body && JSON.parse(remoteMessage.notification.body)) {
        temp = JSON.parse(remoteMessage.notification.body)
    }
    if (Platform.OS === 'android') {
        PushNotification.localNotification({
            channelId: 'hotel',
            title: remoteMessage.notification.title,
            message: temp.message,
            data: remoteMessage.data,
        });
    }
    store.dispatch(AddNotifcation(remoteMessage));
});
AppRegistry.registerComponent(appName, () => App);