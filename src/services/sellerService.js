
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Screens/helper";

export const GetSellerRoles = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerroles`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller roles:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerDepartments = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getsellerdepartment`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller departments:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerEmployees = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "XC12345678";
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getemployees?xipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting company employees:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerManagement = async (xipperId) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard?hXipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error getting seller dashboard:----------------', err.response.data, err);
        return err.response
    }
};
export const GetSellerDashboard = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const xipperId = "";
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard?XipperID=${xipperId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error getting seller dashboard:----------------', err.response.data, err);
        return err.response
    }
};
export const AddHotelEmployees = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            xipperIds: ["X12312412", ""],
            name: [""],
            department: "",
            role: "",
            companyId: "",
            hXipperId: ""
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/addemployees`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response.data;
    } catch (err) {
        console.log('Error adding hotel employees:----------------', err.response.data, err);
        return err.response
    }
};

export const GetEmployeeAccess = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getEmployeeAccess`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error getting employee access:----------------', err.response.data, err);
        return err.response
    }
}

export const acceptServiceRequest = async (val, serviceId, hotelId) => {
    try {
        const body = {
            "serviceid": serviceId,
            "hXipperID": hotelId,
            "action": val
        }
        console.log(body)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(
            `${BASE_URL}/hotel/sellerDashboard/acceptServiceRequest`, body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        return response;
    }
    catch (err) {
        console.log(err, err.response);
        return err.response;
    }
}

export const CheckOutGuest = async () => {
    try {
        const body = {
            "checkInId": "7369995c-0ee1-4206-ac96-bf5498347ffd",
            "hXipperId": "XH76140714"
        };
        console.log(body)
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.post(
            `${BASE_URL}/hotel/checkout`, body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        return response;
    }
    catch (err) {
        console.log(err, err.response);
        return err.response;
    }
}

const groupBy = (arr, criteria) =>
    arr.reduce((obj, item) => {
        let key = typeof criteria === "function" ? criteria(item) : item[criteria];
        if (!obj.hasOwnProperty(key)) obj[key] = [];
        obj[key].push(item);
        return obj;
    }, {});

const processBillData = (x) =>{

    const billBreakdown = x?.billBreakdown

    //const groupedFood = groupBy(billBreakdown?.["Food and Beverage"]?.["Food"]?.itemWiseTaxation, "orderDate");

    const food = {
        items: billBreakdown?.["Food and Beverage"]?.["Food"]?.itemWiseTaxation?.map((x) => ({
        //items: groupedFood?.map((x) => ({
            name: x?.itemName || "",
            qty: x?.quantity || 0,
            price: x?.unitPrice || 0,
            status: x?.amountStatus || "",
            orderDate: x?.orderDate || ""
        })) || [],
        taxesList: Object.entries(billBreakdown?.["Food and Beverage"]?.["Food"]?.totalTaxation || {}).map(([taxName, taxValue]) => ({
            taxName,
            taxValue,
        })),
        totalTax: (
            billBreakdown?.["Food and Beverage"]?.["Food"]?.totalTaxationAmount || 0
        ).toFixed(2),
        totalPriceAfterTax: (billBreakdown?.["Food and Beverage"]?.["Food"]?.totalPriceAfterTax ||0).toFixed(2) || 0,
        amountPaid: (
            (billBreakdown?.["Food and Beverage"]?.["Food"]?.totalPriceAfterTax || 0) - 
            (billBreakdown?.["Food and Beverage"]?.["Food"]?.totalPayablePriceAfterTax || 0)
        ).toFixed(2),
        amountDue: (
            billBreakdown?.["Food and Beverage"]?.["Food"]?.totalPayablePriceAfterTax || 0
        ).toFixed(2)
    };

    

    const beverages = {
        items: billBreakdown?.["Food and Beverage"]?.["Beverage"]?.itemWiseTaxation?.map((x) => ({
            name: x?.itemName || "",
            qty: x?.quantity || 0,
            price: x?.unitPrice || 0,
            status: x?.amountStatus || "",
            orderDate: x?.orderDate || ""
        })) || [],
        taxesList: Object.entries(billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalTaxation || {}).map(([taxName, taxValue]) => ({
            taxName,
            taxValue,
        })),
        totalTax: (
            billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalTaxationAmount || 0
        ).toFixed(2),
        totalPriceAfterTax: (billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalPriceAfterTax ||0).toFixed(2) || 0,
        amountPaid: (
            (billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalPriceAfterTax || 0) - 
            (billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalPayablePriceAfterTax || 0)
        ).toFixed(2),
        amountDue: (
            billBreakdown?.["Food and Beverage"]?.["Beverage"]?.totalPayablePriceAfterTax || 0
        ).toFixed(2)
    };


    const services = {
        items: billBreakdown?.["Services"]?.itemWiseTaxation?.map(x => (
            {
                name: x?.itemName || "",
                qty: x?.quantity || 0,
                price: x?.unitPrice || 0,
                status: x?.amountStatus || "",
                orderDate: x?.orderDate || ""
            }
        )),
        taxesList: Object.entries(billBreakdown?.["Services"]?.totalTaxation || {}).map(([taxName, taxValue]) => ({
            taxName,
            taxValue,
        })),
        totalTax: (
            billBreakdown?.["Services"]?.totalTaxationAmount || 0
        ).toFixed(2),
        totalPriceAfterTax: (billBreakdown?.["Services"]?.totalPriceAfterTax ||0).toFixed(2) || 0,
        amountPaid: (
            (billBreakdown?.["Services"]?.totalPriceAfterTax || 0) - 
            (billBreakdown?.["Services"]?.totalPayablePriceAfterTax || 0)
        ).toFixed(2),
        amountDue: (
            billBreakdown?.["Services"]?.totalPayablePriceAfterTax || 0
        ).toFixed(2)
    }

    const processedBill = {

        food: food,
        beverages: beverages,
        services : services,
        total : x?.finalBill?.toFixed(2) || 0

    };


    return processedBill;
}
export const GetBill = async ($hXipperID, $bookingId, $roomNumber) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "bookingId": $bookingId,//"avishekpnr1",
            "hXipperId": $hXipperID,//"XH76140714",
            "roomNumber": $roomNumber//"107"
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/getCustomersDetails`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        if (response.data.status === "Success") {

            const guestData = response.data.data?.bookingDetails?.map((booking) => ({
                roomNum: booking?.roomNumber || "",
                roomType: booking?.roomType || "",
                guestName: booking?.guests?.[0]?.guestName || "",
                checkInDate: booking?.checkInDate?.substring(0, 10) || "",
                checkOutDate: booking?.checkOutDate?.substring(0, 10) || "",
                guest: booking?.guests?.[0] ? {
                    name: booking?.guests?.[0]?.guestName || "",
                    email: booking?.guests?.[0]?.email || "",
                    dateOfBirth: booking?.guests?.[0]?.dob || "",
                    gender: booking?.guests?.[0]?.gender || "",
                    status: booking?.guests?.[0]?.status || "",
                    aadhaarNumber: booking?.guests?.[0]?.aadhaarNumber || "",
                    phone: booking?.guests?.[0]?.phone || "",
                    address: booking?.guests?.[0]?.address?.[0]
                        ? [
                            booking?.guests?.[0]?.address?.[0]?.house || "",
                            booking?.guests?.[0]?.address?.[0]?.street || "",
                            booking?.guests?.[0]?.address?.[0]?.city || "",
                            booking?.guests?.[0]?.address?.[0]?.state || "",
                            booking?.guests?.[0]?.address?.[0]?.country || "",
                        ]
                            .filter((part) => part.trim() !== "")
                            .join(", ")
                        : ""
                } : {},
            }));


            const services = response?.data?.data?.serviceDetails?.map((service) => ({
                roomDetails: service?.roomDetails || "",
                name: service?.name || "",
                price: service?.price || "",
                category: service?.category || "",
                subCategory: service?.subCategory || "",
                status: service?.status || ""
            }));
 
            const billBreakdown = response?.data?.data?.bill
            const processedBill = processBillData(billBreakdown);

            const result = {
                guests: guestData || [],
                services: services || [],
                bill: processedBill
            }

            return { success: true, data: result };
            //return response;
        }
        
    } catch (err) {
        console.log('Error getting bill:----------------', err.response.data, err);
        return err.response
    }
}

export const GetCustomersList = async (hXipperID) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/hotel/sellerDashboard/getCustomersList?hXipperId=${hXipperID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (err) {
        console.log('Error getting customer list:----------------', `${BASE_URL}/hotel/sellerDashboard/getCustomersList?hXipperId=${hXipperID}`);
        return err.response
    }
}

export const AddEmployee = async(xipperId, department, role, position, sXipperId, accessList) =>{
    try {
        const token = await AsyncStorage.getItem('accessToken');
        // const payload = {
        //     "xipperId": "X646464637",
        //     "departments": ["Kitchen", "Reception"],
        //     "positions": ["Manager"],
        //     "role": "Employee",
        //     "hXipperId": "XH20770554",
        //     "accessList": ["CAN_ACCESS_WALLET", "CAN_ACCESS_INBOX"]
        // }
        const payload = {
            "xipperId": 'X651210446',//xipperId,
            "departments": department,
            "positions": position,
            "role": role[0],
            "hXipperId": sXipperId,
            "accessList": accessList
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/addemployees`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(payload)
        return response;
    } catch (err) {
        console.log('Error adding employee:----------------', err.response.data, err);
        return err.response
    }
}

export const Requestdone = async(serviceId,hotelId) =>{
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const payload = {
            "serviceid": serviceId,
            "hXipperID": hotelId,
        }
        const response = await axios.post(`${BASE_URL}/hotel/sellerDashboard/markServiceComplete`,payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response)
        return response;
    } catch (err) {
        console.log('Error marking request as done:----------------', err.response.data, err);
        return err.response
    }
}