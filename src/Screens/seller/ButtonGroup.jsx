
// import React from 'react';
// import { View, Text, Pressable, StyleSheet } from 'react-native';

// const ButtonGroup = ({ buttons }) => {
//   return (
//     <View style={styles.buttonGroup}>
//       {buttons.map((button, index) => (
//         <Pressable
//           key={index}
//           style={styles.button}
//           onPress={button.onPress}
//         >
//           <Text style={styles.buttonText}>{button.label}</Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   buttonGroup: {
//     flexDirection: 'row', 
//     justifyContent: 'flex-start', 
//     borderRadius: 10,
//     marginBottom: 20, 
//   },
//   button: {
//     flex: 1, 
//     backgroundColor: '#FE830C', 
//     borderRadius: 10, 
//     paddingVertical: 12, 
//     marginRight: 10, 
//     alignItems: 'center', 
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff', 
//   },
// });

// export default ButtonGroup;

import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ButtonGroup = ({ buttons, activeTab }) => {
  const renderButton = ({ item }) => (
    <Pressable
      className={`${activeTab === item.label ? "bg-hotel" : ""}`}
      style={[styles.button,
      { borderColor: activeTab === item.label ? "transparent" : "#0000001A", borderWidth: 1 }]}
      onPress={item.onPress}
    >
      <Text
        className={`${activeTab === item.label ? "text-[#ffffff]" : "text-[#00000099]"}`}
        style={styles.buttonText}>{item.label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.buttonGroup}>
      <FlatList
        data={buttons}
        renderItem={renderButton}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToAlignment="start"
        snapToInterval={width / 3 + 10}
        decelerationRate="fast"
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3 - 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default ButtonGroup;
