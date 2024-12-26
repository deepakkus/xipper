import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { getTextClassInstance } from "../utils/TextClass";

const AadharInput = ({ value, onChangeText }) => {
  const [inputs, setInputs] = useState(Array(12).fill(""));
  const textClass = getTextClassInstance();

  const handleChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;

    if (text && index < 11) {
      refs[index + 1].focus();
    }

    setInputs(newInputs);
    onChangeText(newInputs.join(""));
  };

  const refs = [];

  return (
    <View style={styles.inputContainer}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          style={[
            styles.textInput,
            {
              borderBottomColor: input ? "black" : "gray",
              marginRight: (index + 1) % 4 === 0 && index !== 11 ? 10 : 2,
            },
          ]}
          value={input}
          onChangeText={(text) => handleChange(text, index)}
          maxLength={1}
          keyboardType={textClass.getTextString('TXT5')}
          ref={(ref) => (refs[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  textInput: {
    width: 18,
    height: 40,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 2,
    paddingHorizontal: "auto",
  },
});

export default AadharInput;
