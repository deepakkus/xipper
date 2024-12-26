import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, amount }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
                <Text style={styles.cardAmount}>{amount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 5,
    },
    card: {
        backgroundColor: '#FE830C',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: 115, 
        height: 88, 
    },
    cardTitle: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        overflow: 'hidden',
    },
    cardAmount: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 2,
    },
});

export default Card;
