import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpComponent = ({ length = 6, onChange, defaultValue = "" }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focusedInput, setFocusedInput] = useState(null);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (defaultValue.length > 0) {
      setOtp(defaultValue.split("").slice(0, length));
    }
  }, [defaultValue, length]);

  const handleFocus = (index) => {
    setFocusedInput(index);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" || e.nativeEvent.keyCode === 8) {
      if (otp[index] === "" && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            defaultValue={defaultValue}
            editable={!defaultValue}
            style={[
              styles.input,
              focusedInput === index && styles.focusedInput,
            ]}
            ref={(ref) => (inputs.current[index] = ref)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    width: 40,
    height: 45,
    borderWidth: 2,
    borderColor: "#00000099",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    borderRadius: 8,
    color: "#000"
  },
  focusedInput: {
    borderColor: "#000",
  },
});

export default OtpComponent;
