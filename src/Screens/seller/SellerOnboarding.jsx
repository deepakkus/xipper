import React, { useState } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { BASE_URL } from "../../constants/Helper";
import FirstPage from "./FirstPage";
import SecPage from "./SecPage";
import ThirdPage from "./ThirdPage";
import FourPage from "./FourPage";
import FivePage from "./FivePage";
import SixPage from "./SixPage";
import SevenPage from "./SevenPage";
import CircleStepper from "../../components/CircleStepper";

const SellerOnboarding = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [onboardingData, setOnboardingData] = useState({});
    const navigation = useNavigation();

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const updateData = (newData) => {
        setOnboardingData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const submitData = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/hotel/register/6692433fd3b9483238117a0e`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(onboardingData),
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const result = await response.json();
            Alert.alert("Success", "Property added successfully");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="pb-6">
                {/* Header */}
                <View className="m-5 border border-gray-100 bg-white p-4 rounded-md"
                    style={styles.card}
                >
                    <Text className="mb-3 font-pmedium text-lg">Business Onboarding</Text>
                    <CircleStepper currentStep={currentPage} steps={Array(7).fill("")} />
                </View>

                {/* Page content */}
                {currentPage === 0 && (
                    <>
                        <FirstPage
                            onContinue={goToNextPage}
                            onBack={() => navigation.goBack()}
                            updateData={updateData}
                        />
                        <SecPage
                            onContinue={goToNextPage}
                            onBack={goToPreviousPage}
                            updateData={updateData}
                        />
                    </>
                )}
                {currentPage === 1 && (
                    <ThirdPage
                        onContinue={goToNextPage}
                        onBack={goToPreviousPage}
                        updateData={updateData}
                    />
                )}
                {currentPage === 2 && (
                    <FourPage
                        onContinue={goToNextPage}
                        onBack={goToPreviousPage}
                        updateData={updateData}
                    />
                )}
                {currentPage === 3 && (
                    <FivePage
                        onContinue={goToNextPage}
                        onBack={goToPreviousPage}
                        updateData={updateData}
                    />
                )}
                {currentPage === 4 && (
          <SixPage
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 5 && (
          <SevenPage
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
                {/* 
    
        {currentPage === 8 && (
          <EightPage
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 9 && (
          <NinePage
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 10 && (
          <TenPage
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 11 && (
          <MandatoryAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 12 && (
          <BathroomAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 13 && (
          <GuestAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 14 && (
          <MediaAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 15 && (
          <KitchenAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 16 && (
          <ExtraAmenities
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 17 && (
          <AmenitiesnServices
            onContinue={goToNextPage}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )}
        {currentPage === 18 && (
          <BasicAminities
            onContinue={submitData}
            onBack={goToPreviousPage}
            updateData={updateData}
          />
        )} */}

            </ScrollView>
        </SafeAreaView>
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
    },
});

export default SellerOnboarding;
