// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const RadioButton = ({ label, selected, onPress }) => {
//     return (
//         <TouchableOpacity style={styles.container} onPress={onPress}>
//             <View style={[styles.circle, selected && styles.selectedCircle]} />
//             <Text style={styles.label}>{label}</Text>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     circle: {
//         height: 20,
//         width: 20,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 10,
//     },
//     selectedCircle: {
//         backgroundColor: 'orange',
//     },
//     label: {
//         fontSize: 16,
//     },
// });

// export default RadioButton;


import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioButton = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onPress(value)}
    >
      <View
        style={[styles.radioButton, selected && styles.radioButtonSelected]}
      >
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4f4f4f",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#06A77D",
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#06A77D",
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default RadioButton;