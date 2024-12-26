/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-get-random-values';
import { AddNotifcation } from './src/redux/authRedux';
import store from './src/redux/store';
//import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);

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

AppRegistry.registerComponent(appName, () => App);