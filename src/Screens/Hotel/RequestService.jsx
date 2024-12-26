import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RequestHouseKeeping, RequestReception } from "../../services/userdataservice";
import CircularLoader from "../../components/CircularLoader";
import WakeUpCall from "./WakeUpCall";
import RoomChange from "./RoomChange";
import { setMessageModalShow } from "../../redux/commonRedux";

const RequestService = ({ data, type, service, serviceData }) => {
    const dispatch = useDispatch();
    const { selectedProfile } = useSelector((state) => state.account);
    const [message, setMessage] = useState("");
    const [wakeUpTime, setWakeUpTime] = useState("10:30 AM");
    const [roomchange, setRoomChange] = useState({ current: "", new: "" });
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState({ name: service });

    useEffect(() => {
        const item = serviceData.filter((i) => i.name === service)[0]
        setItemData(item)
    }, [service, serviceData])

    const handleSelectService = async () => {
        try {
            setMessage("");
            setLoading(true);
            let res;
            switch (type) {
                case "Housekeeping":
                    const temp = serviceData.filter((i) => i.name === service)[0]
                    const items = [{
                        "itemId": temp.itemId,
                        "quantity": temp?.quantity || 1
                    }]
                    res = await RequestHouseKeeping(data, items);
                    break;
                case "Reception":
                    res = await RequestReception(data, itemData.itemid, service, wakeUpTime, roomchange);
                    break;
                default:
                    res = await RequestHouseKeeping(data);
                    break;
            }

            if ([201, 200].includes(res.status)) {
                dispatch(setMessageModalShow({ show: true, type: "success", message: `Request for ${service} placed successfully!` }))
                setMessage(`Request for ${service} placed successfully!`);
            } else {
                setMessage("Failed to place the order. Please try again.");
            }
        } catch (e) {
            console.error("Error requesting service:", e);
            setMessage("Failed to raise the request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="p-4">
            {itemData?.price && parseInt(itemData?.price) !== 0 && <Text className={`text-${selectedProfile.type} text-sm font-semibold`}>Price -  ₹ {itemData.price}</Text>}
            {service === "Wake up call" && <WakeUpCall onTimeSelect={setWakeUpTime} />}
            {service === "Room Change" &&
                <RoomChange roomchange={roomchange} setRoomChange={setRoomChange} />
            }
            {loading &&
                <CircularLoader />}
            <Pressable
                onPress={handleSelectService}
                className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile?.type === "user" ? "bg-user" : "bg-company"}`}
                disabled={loading}
            >

                <Text className="text-white text-center mx-16">Request</Text>
            </Pressable>

            {message ? (
                <Text className="text-center text-green-500 mt-4">{message}</Text>
            ) : null}
        </View>
    );
};

export default RequestService;
