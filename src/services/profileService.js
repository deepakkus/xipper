import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const GetProfileData = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user/personal/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log('Error fetching profile details:----------------', err.response.data, err);
  }
};
export const GetUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log('Error fetching user details:----------------', err.response.data, err);
  }
};
export const GetPhoneNumbers = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user/personal/phone`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.userPhoneDetails;
  } catch (err) {
    console.log('Error fetching phone details:----------------', err.response.data, err);
  }
};
export const AddPhoneNumber = async (number, code, otptoken) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "phone": number,
      "countryCode": code,
      otplessToken: otptoken
    }
    const response = await axios.patch(`${BASE_URL}/user/personal/phone`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error adding phone details:----------------', err.response.data, err);
  }
};
export const DeletePhoneNumber = async (number) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "number": number
    }
    const response = await axios.put(`${BASE_URL}/user/personal/removephone`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error removing phone details:----------------', err.response.data, err);
  }
};
export const GetAddresses = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user/personal/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.addresses;
  } catch (err) {
    console.log('Error fetching address details:----------------', err.response.data, err);
  }
};
export const AddAddress = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "name": "Home 2",
      "house": "Agt house",
      "street": "Agt street",
      "landmark": "Near Agartala",
      "city": "Agartala",
      "state": "Tripura",
      "district": "west Tripura",
      "pin": "799001",
      "country": "India"
    }
    const response = await axios.patch(`${BASE_URL}/user/personal/address`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error adding address details:----------------', err.response.data, err);
  }
};
export const DeleteAddress = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "id": "cm0gv1wph0001gvbcx30g5eps"
    }
    const response = await axios.patch(`${BASE_URL}/user/personal/removeaddress`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log('Error delete address details:----------------', err.response.data, err);
  }
};
export const GetEmails = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user/personal/email`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.userEmailDetails;
  } catch (err) {
    console.log('Error fetching email details:----------------', err.response.data, err);
  }
};
export const AddEmail = async (email, otptoken) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "email": email,
      otplessToken: otptoken
    }
    const response = await axios.patch(`${BASE_URL}/user/personal/email`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error adding email details:----------------', err.response.data, err);
  }
};
export const DeleteEmail = async (email) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "email": email
    }
    const response = await axios.put(`${BASE_URL}/user/personal/removeemail`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error deleteing email details:----------------', err.response.data, err);
  }
};
export const GetFamily = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}/user/personal/family`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      const familyData = response.data.data.map(item => ({
        fullName: item.familyMember.fullName,
        xipperID: item.familyMember.XipperID,
        relationship: item.relationship,
      }));
      return familyData;
    } else {
      console.error('Error: API responded with success=false');
      return [];
    }
  } catch (err) {
    console.error('Error fetching family details:', err.response?.data || err.message, err);
    return [];
  }
};
export const AddFamilyMem = async (familyMember) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "yourRelation": familyMember.relation,
      "theirRelation": familyMember.relation,
      "xipperId": familyMember.xipperId
    }
    const response = await axios.patch(`${BASE_URL}/user/personal/family`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error adding family details:----------------', err.response.data, err);
  }
};
export const DeleteFamily = async (id) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "xipperId": id
    }
    const response = await axios.put(`${BASE_URL}/user/personal/removefamily`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error deleteing family details:----------------', err.response.data, err);
  }
};
export const AcceptFamilyRequest = async (val, data) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const payload = {
      "notificationId": data.notificationId,
      "acceptedStatus": val
    }
    const response = await axios.put(`${BASE_URL}/user/personal/acceptFamilyRequest`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error deleteing family details:----------------', err.response.data, err);
  }
};
