import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const DateTimePicker = ({ isVisible, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const renderCalendar = () => {
    const days = [];
    const totalSlots = 42; // 6 rows * 7 days

    for (let i = 1; i <= totalSlots; i++) {
      const dayOfMonth = i - firstDayOfMonth;
      if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          dayOfMonth
        );
        const isToday = date.toDateString() === new Date().toDateString();
        days.push(
          <StyledTouchableOpacity
            key={i}
            className={`w-10 h-10 justify-center items-center m-0.5 ${
              date.toDateString() === selectedDate.toDateString()
                ? "bg-primary rounded-full"
                : isToday
                ? "bg-gray-200 rounded-full"
                : ""
            }`}
            onPress={() => setSelectedDate(date)}
          >
            <StyledText
              className={`text-center font-medium ${
                date.toDateString() === selectedDate.toDateString()
                  ? "text-white"
                  : isToday
                  ? "text-primary"
                  : "text-black"
              }`}
            >
              {dayOfMonth}
            </StyledText>
          </StyledTouchableOpacity>
        );
      } else {
        days.push(<StyledView key={i} className="w-10 h-10 m-0.5" />);
      }
    }
    return days;
  };

  const changeMonth = (delta) => {
    const newMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + delta)
    );
    setCurrentMonth(newMonth);
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <StyledView className="flex-1 justify-center items-center px-5 bg-black  bg-opacity-5">
        <StyledView className="bg-white rounded-3xl p-6 w-11/12 max-w-sm shadow-xl">
          <StyledView className="flex-row justify-between items-center mb-6">
            <StyledTouchableOpacity
              onPress={() => changeMonth(-1)}
              className="p-2"
            >
              <StyledText className="text-2xl text-primary font-bold">
                {"<"}
              </StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-xl font-bold text-black">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => changeMonth(1)}
              className="p-2"
            >
              <StyledText className="text-2xl text-primary font-bold">
                {">"}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          <StyledView className="flex-row flex-wrap justify-between mb-4">
            {renderCalendar()}
          </StyledView>
          <StyledView className="flex-row justify-between mt-6">
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-base text-gray-600 font-medium">
                Cancel
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => {
                onDateSelect(formatDate(selectedDate));
                onClose();
              }}
              className="bg-primary py-2 px-6 rounded-full"
            >
              <StyledText className="text-base text-white font-bold">
                Confirm
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default DateTimePicker;
