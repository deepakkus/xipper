import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Buildings } from "../../assets/images/Icons/Hotel";
import { useDispatch, useSelector } from "react-redux";
import { RequestMaintenance } from "../../services/userdataservice";
import { setMessageModalShow } from "../../redux/commonRedux";
import CircularLoader from "../../components/CircularLoader";

const Issue = ({ title, serviceData, data, type }) => {
    const dispatch = useDispatch();
    const { selectedProfile } = useSelector((state) => state.account);
    const [selected, setSelected] = useState({ name: "Select", itemId: "" });
    const [showOptions, setShowOptions] = useState(false);
    const [otherMessage, setOtherMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const options = serviceData.filter((i) => i.name === title)?.[0]?.data

    const requestMaintenance = async () => {
        try {
            setLoading(true);
            if (selected.itemId === "" && selected.name === "Select") {
                dispatch(setMessageModalShow({ show: true, type: "error", message: `Select a valid ${title} ${type} issue.` }));
                return;
            }
            const res = await RequestMaintenance(data, selected.itemId, otherMessage);
            console.log(res);
            if ([200, 201].includes(res.status)) {
                dispatch(setMessageModalShow({ show: true, type: "success", message: `You have requested ${title} ${type} - ${selected.name}` }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <View className="p-4">
                {title !== "Other" ? (
                    <>
                        <Text className="font-p-medium text-base text-gray-700">Select the Issue</Text>
                        <Pressable
                            onPress={() => setShowOptions(!showOptions)}
                            className="mt-2"
                        >
                            <View className="flex-row items-center border border-gray-300 p-2 bg-white rounded-md">
                                <Text className="font-p-medium text-sm text-gray-500">{selected?.name}</Text>
                            </View>
                        </Pressable>
                        {showOptions && (
                            <ScrollView className="mt-2 max-h-[200px] bg-white border border-gray-300 rounded-md shadow-md z-10">
                                {options.map((i, _index) => (
                                    <Pressable
                                        key={_index}
                                        onPress={() => {
                                            setSelected(i);
                                            setShowOptions(!showOptions);
                                        }}
                                        className={`p-2 ${_index !== options.length - 1 ? 'border-b border-gray-200' : ''}`}
                                    >
                                        <Text className="font-p-regular text-base text-gray-700">{i.name}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                        {["other issue", "other issues"].includes(selected?.name?.toLocaleLowerCase()) && (
                            <>
                                <Text className="font-p-medium text-base mt-4 text-black">Describe your Problem</Text>
                                <View className="flex-row items-center px-3 py-2 border mt-4 rounded-md border-gray-200">
                                    <Buildings />
                                    <TextInput
                                        className="ml-3 flex-1 text-sm text-gray-700"
                                        placeholder="Message here"
                                        placeholderTextColor="#000000"
                                        multiline
                                        value={otherMessage}
                                        onChangeText={(val) => setOtherMessage(val)}
                                    />
                                </View>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Text className="font-p-medium text-base mt-4">Other Issues</Text>
                        <View className="flex-row items-center px-3 py-2 border mt-4 rounded-md border-gray-200">
                            <Buildings />
                            <TextInput
                                className="ml-3 flex-1 text-sm text-gray-700"
                                placeholder="Message here"
                            />
                        </View>
                    </>
                )}

                <Pressable
                    className={`px-3 py-2 rounded-md mb-2 my-5 mx-auto ${selectedProfile.type === 'user' ? 'bg-user' : 'bg-company'}`}
                    onPress={requestMaintenance}
                >
                    <Text className="text-white text-center mx-16">
                        {title !== "Other" ? "Request" : "Send"}
                    </Text>
                </Pressable>
                {loading && <CircularLoader />}
            </View>
        </>
    );
};

export default Issue;
