import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import RadioButton from "../../components/RadioButton";

const FourPage = ({ onContinue, onBack, updateData }) => {
    const [selected, setSelected] = useState(false);
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");

    const handleContinue = () => {
        const data = {
            checkInTime,
            checkOutTime,
        };
        updateData(data);
        onContinue();
    };

    return (
        <>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Back</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Check-in & Check-out time of your Property</Text>
                    <Text style={styles.sectionSubtitle}>
                        Entering these details is mandatory for setting up your account
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Check-in time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Check in time"
                        value={checkInTime}
                        onChangeText={setCheckInTime}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Check-out time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Check out time"
                        value={checkOutTime}
                        onChangeText={setCheckOutTime}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cancellation policy of your Property</Text>
                    <Text style={styles.sectionSubtitle}>
                        Entering these details is mandatory for setting up your account
                    </Text>
                </View>
                {["Room Visa", "Room Visa", "Applicable for all"].map((label, index) => (
                    <View key={index} style={styles.policyContainer}>
                        <View style={styles.policyHeader}>
                            <RadioButton
                                onPress={() => {
                                    setSelected(index);
                                }}
                                selected={selected === index}
                            />
                            <Text style={styles.policyLabel}>{label}</Text>
                        </View>
                        <View style={styles.policyDetails}>
                            <Text style={styles.policyDetail}>
                                Time Eg: Cancellation 48hrs before check-in
                            </Text>
                            {index < 2 && (
                                <Text style={styles.policyDetail}>
                                    {index === 0 ? "Room Type eg : Elective" : "Price range Eg: €2000 - €4000"}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.addMoreButton}>
                            <Text style={styles.addMoreText}>Add More</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={handleContinue} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderColor: "#e5e5e5",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontFamily: "Pmedium",
        fontSize: 18,
        marginLeft: 10,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontFamily: "Pmedium",
        fontSize: 18,
    },
    sectionSubtitle: {
        fontFamily: "Pmedium",
        fontSize: 14,
        color: "#A0AEC0",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontFamily: "Pmedium",
        fontSize: 16,
    },
    input: {
        borderColor: "#D1D5DB",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        color: "#A0AEC0",
    },
    policyContainer: {
        marginBottom: 15,
    },
    policyHeader: {
        flexDirection: "row",
        // alignItems: "center",
    },
    policyLabel: {
        fontFamily: "Pmedium",
        fontSize: 16,
        marginLeft: 10,
    },
    policyDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    policyDetail: {
        fontFamily: "Pmedium",
        fontSize: 14,
        color: "#A0AEC0",
        flex: 1,
        borderColor: "#D1D5DB",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
    },
    addMoreButton: {
        backgroundColor: "#4F46E5",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        alignSelf: "flex-start",
    },
    addMoreText: {
        fontFamily: "Pmedium",
        color: "white",
        fontSize: 14,
    },
    nextButton: {
        backgroundColor: "#4F46E5",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        marginTop: 20,
    },
    nextButtonText: {
        fontFamily: "Pmedium",
        color: "white",
        fontSize: 16,
    },
});

export default FourPage;