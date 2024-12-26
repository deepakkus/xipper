import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import { MicIcon, CrossIcon } from '../../assets/images/Icons/HomeIcon';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { SearchChatIcon } from '../../assets/images/Icons/chatIcons';
import { CheckBoxIcon } from '../../assets/images/Icons/Account';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Currency = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('Rupees');
    const { selectedProfile } = useSelector((state) => state.account);
    const navigation = useNavigation();

    const currencies = [
        { id: '1', name: 'Rupees', flag: '🇮🇳' },
        { id: '2', name: 'US Dollar', flag: '🇺🇸' },
        { id: '3', name: 'Japanese Yen', flag: '🇯🇵' },
        { id: '4', name: 'Australian Dollar', flag: '🇦🇺' },
        { id: '5', name: 'Rupees', flag: '🇮🇳' },
        { id: '6', name: 'Japanese Yen', flag: '🇯🇵' },
        { id: '7', name: 'Rupees', flag: '🇮🇳' },
        { id: '8', name: 'Japanese Yen', flag: '🇯🇵' },
        { id: '9', name: 'Rupees', flag: '🇮🇳' },
    ];

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.currencyItem}
            onPress={() => setSelectedCurrency(item.name)}
        >
            <View style={styles.currencyRow}>
                <Text style={styles.flag}>{item.flag}</Text>
                <Text style={styles.currencyName}>{item.name}</Text>
                {selectedCurrency === item.name && (
                    <CheckBoxIcon />
                )}
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <BackArrowIcon/>
                </Pressable>
                <Text style={styles.title}>Currency</Text>
            </View>

            <View style={styles.searchContainer}>
                <SearchChatIcon />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rupees"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={'#000'}
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery('')}>
                        <CrossIcon />
                    </Pressable>
                )}
                <Pressable>
                    <MicIcon />
                </Pressable>
            </View>

            <View style={styles.flatListContainer}>
                <FlatList
                    data={currencies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                />
            </View>
            <Pressable
                style={[
                    styles.saveButton,
                    {
                        backgroundColor: selectedProfile.type === 'user'
                            ? '#06A77D'
                            : selectedProfile.type === 'company'
                                ? '#6D38C3'
                                : '#FE830C'
                    }
                ]}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: "center",
        textAlign: "center",
        color: "#000000",
        marginLeft: 100,
        marginTop: 5
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        margin: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },


    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 2,
        marginTop: 5,
    },
    micIcon: {
        marginLeft: 8,
    },
    list: {
        flex: 1,
    },
    flatListContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 6,
        marginVertical: 16,
        marginHorizontal: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        height: 600
    },
    currencyItem: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    currencyRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 20,
        marginRight: 12,
    },
    currencyName: {
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
    saveButton: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: 120,
        height: 50,
        marginLeft: 150,
        marginBottom: 50
    },
    saveButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Currency;