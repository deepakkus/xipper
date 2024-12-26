import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import SingleProduct from "../../components/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { RequestHouseKeeping } from "../../services/userdataservice";
import CircularLoader from "../../components/CircularLoader";
import { setMessageModalShow } from "../../redux/commonRedux";

const Slipper = ({ data, type, service, serviceData, toggleNewModal=()=>{} }) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { selectedProfile } = useSelector((state) => state.account);

    useEffect(() => {
        const filteredItems = serviceData
            .filter((i) => i.name === service || i.houseKeepingType?.name === service)
            .flatMap((item) =>
                item?.subCategories.map((subItem) => ({
                    itemId: subItem.itemId,
                    name: subItem.name || subItem.houseKeepingType?.name,
                    price: subItem.price,
                    quantity: 0
                }))
            );
        setItems(filteredItems);
    }, [serviceData, service]);

    const requestHouseKeeping = async () => {
        try {
            setMessage("");
            setLoading(true);
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            if (totalQuantity === 0) {
                setMessage("Please select at least one item before requesting.");
                return;
            }

            const selectedItems = items
                .filter((i) => i.quantity > 0)
                .map((i) => ({
                    itemId: i.itemId,
                    quantity: i.quantity
                }));

            const res = await RequestHouseKeeping(data, selectedItems);

            if ([200, 201].includes(res.status)) {
                toggleNewModal()
                dispatch(setMessageModalShow({ show: true, type: "success", message: `You have requested ${totalQuantity} ${service}.` }))
                setMessage(`You have requested ${totalQuantity} ${service}.`);
            } else {
                setMessage("There was an issue placing your request. Please try again.");
            }
        } catch (e) {
            console.error("Error requesting housekeeping:", e);
            setMessage("An error occurred while placing the request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (index, amount) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity + amount);
            return updatedItems;
        });
    };

    const incrementQuantity = (index) => updateQuantity(index, 1);
    const decrementQuantity = (index) => updateQuantity(index, -1);

    return (
        <View className="p-4">
            <SingleProduct
                items={items}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
            />
            {loading ? (
                <View className={`p-3 rounded-md m-5 mx-auto`}>
                    <CircularLoader />
                </View>
            ) : (
                <Pressable
                    onPress={requestHouseKeeping}
                    className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile?.type === "user" ? "bg-user" : "bg-company"}`}
                    disabled={loading || items.every((item) => item.quantity === 0)}
                >
                    <Text className="text-white text-center mx-16">Request</Text>
                </Pressable>
            )}

            {message ? (
                <Text className="text-center text-green-500 mt-4">{message}</Text>
            ) : null}
        </View>
    );
};

export default Slipper;
