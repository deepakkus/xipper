import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PassportInput = ({value, onChangeText, placeholderText}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (text, field) => {
    const newPassportData = {...value, [field]: text};
    onChangeText(newPassportData);
  };

  // Function to handle date selection
  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {

      const formattedDate = formatDate(selectedDate);
      handleChange(formattedDate, 'dob');
    }

  };

  // Function to format date as YYYY-MM-DD
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value.file_number}
          onChangeText={text => handleChange(text, 'file_number')}
          placeholder={placeholderText || "File Number"}
          keyboardType="default"
          returnKeyType="done"
        />
        <TextInput
          style={styles.textInput}
          value={value.dob || ''}
          placeholder="DOB (YYYY-MM-DD)"
          onFocus={() => setShowDatePicker(true)} 
          showSoftInputOnFocus={false} 
        />
        {showDatePicker && (
          <DateTimePicker
            value={value.dob ? new Date(value.dob) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'spinner'} 
            onChange={handleDateChange}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: "100%"
  },
  textInput: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default PassportInput;
