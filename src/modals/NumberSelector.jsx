import React from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NumberSelectorModal = ({
  isVisible,
  onClose,
  onSelect,
  currentNumber,
}) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <StyledView className="flex-1 justify-end bg-slate-800 bg-opacity-50">
        <StyledView className="bg-white rounded-t-3xl p-6 w-full max-w-sm mx-auto h-72 pb-10">
          <FlatList
            data={numbers}
            numColumns={5} // Adjust the number of columns as needed
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              borderRadius: 100,
            }}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <StyledTouchableOpacity
                className={`p-4 m-1 ${
                  item === currentNumber ? "bg-primary" : "bg-gray-100"
                } rounded-md mb-2`}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <StyledText
                  className={`text-center ${
                    item === currentNumber ? "text-white" : "text-black"
                  }`}
                >
                  {item}
                </StyledText>
              </StyledTouchableOpacity>
            )}
          />
          <StyledTouchableOpacity onPress={onClose} className="mt-4">
            <StyledText className="text-primary text-center font-bold">
              Cancel
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default NumberSelectorModal;
