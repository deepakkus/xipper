import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import { AddNotifcation } from '../redux/authRedux';
import PushNotification from 'react-native-push-notification';

const NAVIGATION_IDS = ["MainHome", "Orders"];

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    return null;
  }
  if (navigationId === 'MainHome') {
    return 'myapp://MainHome';
  }
  if (navigationId === 'Orders') {
    return 'myapp://Orders';
  }
  return null;
}

const NotificationHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    messaging().requestPermission();
    
    const onForegroundMessage = messaging().onMessage(async (remoteMessage) => {
      dispatch(AddNotifcation(remoteMessage));
      let temp;
      if(remoteMessage.notification.body && JSON.parse(remoteMessage.notification.body)){
        temp = JSON.parse(remoteMessage.notification.body)
      }
      if (remoteMessage.notification) {
        PushNotification.localNotification({
          channelId: 'hotel',
          title: remoteMessage.notification.title,
          message: temp.message,
          data: remoteMessage.data,
          soundName: 'notificationsound',
        });
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (url) {
        console.log('Deep link URL:', url);
      }
      dispatch(AddNotifcation(remoteMessage));
      let temp;
      if(remoteMessage.notification.body && JSON.parse(remoteMessage.notification.body)){
        temp = JSON.parse(remoteMessage.notification.body)
      }
      if (remoteMessage.notification) {
        PushNotification.localNotification({
          channelId: 'hotel',
          title: remoteMessage.notification.title,
          message: temp.message,
          data: remoteMessage.data,
          soundName: 'notificationsound',
        });
      }
    });

    const onNotificationOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (url) {
        console.log('Deep link URL:', url);
      }
    });

    const checkInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (url) {
          console.log('Deep link URL:', url);
        }
        dispatch(AddNotifcation(remoteMessage));
      }
    };

    checkInitialNotification();

    return () => {
      onForegroundMessage();
      onNotificationOpened();
    };
  }, [dispatch]);

  return null;
};

export default NotificationHandler;
