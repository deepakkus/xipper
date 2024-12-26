import { View, Text, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Clock } from "../../assets/images/Icons/Hotel";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { useSelector } from "react-redux";

const WakeUpCall = ({ onTimeSelect }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState("10:30 AM");
    const [time, setTime] = useState(new Date());
    const { selectedProfile } = useSelector(state => state.account)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (event, selectedDate) => {
        const currentTime = selectedDate || time;
        setDatePickerVisibility(Platform.OS === 'ios');
        const formattedTime = moment(currentTime).format("hh:mm A");
        setSelectedTime(formattedTime);
        setTime(currentTime);
        if (onTimeSelect) {
            onTimeSelect(formattedTime);
        }
    };

    return (
        <View>
            <View className="flex-row justify-evenly">
                <Text className="font-pmedium text-base mt-3 text-black">Select Time</Text>
                <Pressable
                    className="flex-row items-center p-2 border border-gray-200 rounded-md"
                    onPress={showDatePicker}
                >
                    <Clock
                        fill={selectedProfile.type === 'user' ? '#06A77d' : '#6D38C3'} 
                    />
                    <Text
                        className={`font-psemibold text-sm ml-2 ${selectedProfile.type === 'user' ? 'text-user' : 'text-company'
                            }`}
                    >
                        {selectedTime}
                    </Text>

                </Pressable>
            </View>

            {isDatePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode="time"
                    is24Hour={false}
                    onChange={handleConfirm}
                />
            )}
        </View>
    );
};

export default WakeUpCall;
