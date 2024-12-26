import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const NotificationSetup = () => {
  useEffect(() => {
    const createNotificationChannels = () => {
      PushNotification.createChannel(
        {
          channelId: 'hotel',
          channelName: 'Hotel Notifications',
          channelDescription: 'Notifications for hotel updates and offers',
          importance: PushNotification.Importance.HIGH,
          vibrate: true,
          soundName: 'notificationsound',
          style: {
            backgroundColor: '#FF6F00',
            textColor: '#FFFFFF',
          },
        },
        (created) => {
          if (created) {
            console.log('Hotel channel created');
          } else {
            console.log('Hotel channel already exists');
          }
        }
      );

      PushNotification.createChannel(
        {
          channelId: 'family',
          channelName: 'Family Notifications',
          channelDescription: 'Notifications for family events and news',
          importance: PushNotification.Importance.DEFAULT,
          vibrate: true,
          soundName: 'notificationsound',
          style: {
            backgroundColor: '#008C4A',
            textColor: '#FFFFFF',
          },
        },
        (created) => {
          if (created) {
            console.log('Family channel created');
          } else {
            console.log('Family channel already exists');
          }
        }
      );
    };

    createNotificationChannels();
  }, []);

  return null;
};

export default NotificationSetup;
