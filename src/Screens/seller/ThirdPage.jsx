
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { CrossIcon, Iicon } from "../../assets/images/Icons/HomeIcon";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import RadioButton from "../../components/RadioButton";

const ThirdPage = ({ onContinue, onBack, updateData }) => {
    const allLanguages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
    ];

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [cardsList, setCardsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cardsQuery, setCardsQuery] = useState("");

    const handleAddLanguage = () => {
        if (searchQuery && !languages.includes(searchQuery)) {
            setLanguages([...languages, searchQuery]);
            setSearchQuery("");
        }
    };
    const handleAddCards = () => {
        if (cardsQuery && !cardsList.includes(cardsQuery)) {
            setCardsList([...cardsList, cardsQuery]);
            setCardsQuery("");
        }
    };

    const handleRemoveLanguage = (name) => {
        setLanguages((prevLanguages) =>
            prevLanguages.filter((language) => language !== name)
        );
    };

    const filteredLanguages = allLanguages.filter((language) =>
        language.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleRemoveCard = (name) => {
        setCardsList((prevLanguages) =>
            prevLanguages.filter((language) => language !== name)
        );
    };

    const filteredCards = cardsList.filter((language) =>
        language.toLowerCase().includes(cardsQuery.toLowerCase())
    );

    const handleContinue = () => {
        const data = {
            languagesSpoken: languages,
            modeOfPaymentAvailable: selectedPayment ? [selectedPayment] : [],
        };
        updateData(data);
        onContinue();
    };

    return (
        <>
            <View style={styles.card}>
                <View className="mb-5 flex-row items-center space-x-3">
                    <TouchableOpacity onPress={onBack}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <Text className="font-pmedium text-lg">Back</Text>
                </View>
                <View className="mb-3">
                    <Text className="mb-2 font-pmedium text-lg">Policies of your Property</Text>
                    <Text className="mb-3 font-pmedium text-base text-gray-400">
                        Entering these details are mandatory for setting up your account
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <View className="mb-3">
                    <Text className="mb-2 font-pmedium text-lg">Languages spoken at your Property</Text>
                    <Text className="mb-3 font-pmedium text-base text-gray-400">
                        Entering these details are mandatory for setting up your account
                    </Text>
                </View>
                <View className="flex-row items-center space-x-2 mb-4">
                    <View className="flex-row px-4 border items-center justify-between border-gray-200 rounded-md flex-1">
                        <TextInput
                            placeholder="Search Language"
                            className="py-2 mr-2 font-pmedium text-sm text-gray-400 flex-1"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {filteredLanguages.length === 0 && searchQuery.length > 0 ? (
                            <TouchableOpacity onPress={handleAddLanguage}>
                                <Text className="font-pmedium text-sm text-primary">Add</Text>
                            </TouchableOpacity>
                        ) : (
                            <Image source={require("../../assets/images/Action/search.png")} />
                        )}
                    </View>
                </View>
                {searchQuery.length > 0 && (
                    <View className="flex-row flex-wrap justify-start mb-3">
                        {filteredLanguages.map((language) => (
                            <TouchableOpacity
                                key={language}
                                onPress={() => {
                                    if (!languages.includes(language)) {
                                        setLanguages([...languages, language]);
                                        setSearchQuery("");
                                    }
                                }}
                                className="flex-row bg-gray-300 p-2 m-2 justify-evenly rounded-xl"
                            >
                                <Iicon />
                                <Text className="font-pmedium text-sm mx-3 text-white">{language}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <View className="flex-row flex-wrap justify-start mb-3">
                    {languages.map((language) => (
                        <View key={language} className="flex-row bg-primary p-2 m-2 justify-evenly rounded-xl">
                            <Iicon />
                            <Text className="font-pmedium text-sm mx-3 text-white">{language}</Text>
                            <TouchableOpacity onPress={() => handleRemoveLanguage(language)}>
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.card}>
                <View className="mb-3">
                    <Text className="mb-2 font-pmedium text-lg">Acceptable Cards at your Property</Text>
                    <Text className="mb-3 font-pmedium text-base text-gray-400">
                        Entering these details are mandatory for setting up your account
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <RadioButton
                        onPress={() => setSelectedPayment("Credit / Debit Cards")}
                        selected={selectedPayment === "Credit / Debit Cards"}
                    />
                    <Text className="mb-3 font-pmedium text-base text-black">Credit / Debit Cards</Text>
                </View>
                <View className="flex-row items-center space-x-2 mb-4">
                    <View className="flex-row px-4 border items-center justify-between border-gray-200 rounded-md flex-1">
                        <TextInput
                            placeholder="Search Cards"
                            className="py-2 mr-2 font-pmedium text-sm text-gray-400 flex-1"
                            value={cardsQuery}
                            onChangeText={setCardsQuery}
                        />
                        {filteredCards.length === 0 && cardsQuery.length > 0 ? (
                            <TouchableOpacity onPress={handleAddCards}>
                                <Text className="font-pmedium text-sm text-primary">Add</Text>
                            </TouchableOpacity>
                        ) : (
                            <Image source={require("../../assets/images/Action/search.png")} />
                        )}
                    </View>
                </View>
                {cardsQuery.length > 0 && (
                    <View className="flex-row flex-wrap justify-start mb-3">
                        {filteredCards.map((card) => (
                            <TouchableOpacity
                                key={card}
                                onPress={() => {
                                    if (!cardsList.includes(card)) {
                                        setCardsList([...cardsList, card]);
                                        setCardsQuery("");
                                    }
                                }}
                                className="flex-row bg-gray-300 p-2 m-2 justify-evenly rounded-xl"
                            >
                                <Iicon />
                                <Text className="font-pmedium text-sm mx-3 text-white">{card}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <View className="flex-row flex-wrap justify-start mb-3">
                    {cardsList.map((card) => (
                        <View key={card} className="flex-row bg-primary p-2 m-2 justify-evenly rounded-xl">
                            <Iicon />
                            <Text className="font-pmedium text-sm mx-3 text-white">{card}</Text>
                            <TouchableOpacity onPress={() => handleRemoveCard(card)}>
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View className="flex-row items-center">
                    <RadioButton
                        onPress={() => setSelectedPayment("Cash")}
                        selected={selectedPayment === "Cash"}
                    />
                    <Text className="mb-3 font-pmedium text-base text-black">Cash</Text>
                </View>
                <Text className="mb-3 font-pmedium text-base text-gray-400 px-5 border py-2 border-gray-200 rounded-md">
                    Amount till which you accept Cash Eg: 40,000 or Any Amount
                </Text>
                <TouchableOpacity onPress={handleContinue} className="mt-5 items-end px-3">
                    <Text className="p-3 bg-primary rounded-md font-pmedium text-sm text-white">
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20,
        marginBottom: 20
    },
});

export default ThirdPage;
