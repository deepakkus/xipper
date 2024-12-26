import React, { useEffect, useState } from 'react';
import { ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { UserProvider } from './src/constants/Context';
import MainStackNavigator from './MainStackNavigator';
import NotificationHandler from './src/utils/NotificationHandler';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationsRegister } from './src/services/auth';
import NotificationSetup from './src/utils/NotificationSetup';
import MessageModal from './src/modals/MessageModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const permissionStatus = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'We need access to show notifications.',
            }
          );
          if (permissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission Denied")
            return;
          }
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (accessToken) {
            setIsLoggedIn(true);
            const response = await NotificationsRegister(token);
            console.log('Backend response:', response.data);
          }
        }
      } catch (error) {
        console.error('Error requesting permission or getting token:', error);
      }
    };

    requestUserPermission();
  }, []);


  return (
    <Provider store={store}>
      <UserProvider>
        <NotificationSetup />
        {isLoggedIn && <NotificationHandler />}
        <MessageModal />
        <NavigationContainer fallback={<ActivityIndicator animating />}>
          <MainStackNavigator />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}

export default App;
