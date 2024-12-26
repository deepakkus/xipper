// components/CircleStepper.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CircleStepper = ({ currentStep, steps }) => {
    return (
        <View style={styles.stepContainer}>
            {steps.map((label, index) => (
                <View key={index} style={styles.step}>
                    <View style={styles.circle(currentStep >= index)}>
                        {/* <Text style={styles.circleText}>{index + 1}</Text> */}
                    </View>
                    {index < steps.length - 1 && <View style={styles.line(currentStep > index ? '#06A77D' : 'gray')} />}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    step: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    circle: (isActive) => ({
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: isActive ? '#06A77D' : 'lightgray',
    }),
    circleText: {
        color: 'white',
        fontWeight: 'bold',
    },
    line: (color) => ({
        height: 2,
        width: 15,
        backgroundColor: color,
        marginHorizontal: 5
    }),
});

export default CircleStepper;
