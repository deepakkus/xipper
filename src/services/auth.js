import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { BASE_URL } from '../Screens/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInWithPhoneNumber = async (phoneNumber) => {
  // Validate phone number format (you can enhance this further)
  const phoneRegex = /^\+\d{1,3}\d{1,14}$/; // Adjust regex as per your requirement
  if (!phoneRegex.test(phoneNumber)) {
    console.error('Invalid phone number format. Please use international format (e.g., +1234567890).');
    return;
  }

  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('OTP sent successfully. Please verify your code.');
    return confirmation; // Return confirmation to verify later
  } catch (error) {
    console.error('Error sending OTP:', error.message); // Log specific error message
  }
};

const verifyCode = async (confirmation, code) => {
  if (!code) {
    console.error('Code cannot be empty. Please enter a valid code.');
    return;
  }

  try {
    const userCredential = await confirmation.confirm(code);
    console.log('User signed in:', userCredential.user); // Access user details
    return userCredential; // Return user credential if needed
  } catch (error) {
    console.error('Invalid code:', error.message); // Log specific error message
  }
};

const NotificationsRegister = async (fcmToken) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      token: fcmToken
    }
    const response = await axios.post(`${BASE_URL}/notifications/registerToken`,
      payload, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    });
    return response;
  } catch (err) {
    console.log('Error registering FCM token:', err.response, err);
  }
}
export { signInWithPhoneNumber, verifyCode, NotificationsRegister };
