import { Pressable, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackArrowIcon } from "../../assets/images/Icons/ArrowIcon";
import SpendRight from "./SpendRight";

const spentData = [
    {
        entityKey: "Hotel",
        entityValue: "Radisson",
        spent: 1000,
        status: "Reimbursed"
    },
    {
        entityKey: "Hotel",
        entityValue: "Radisson",
        spent: 1000,
        status: "Reimbursed"
    },
    {
        entityKey: "Hotel",
        entityValue: "Radisson",
        spent: 1000,
        status: "Reimbursed"
    },
]
const MemberDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { empData } = route.params;

    return (
        <SafeAreaView className="flex-1 px-5 mt-2">
            <View className="flex-row gap-5 items-center my-5">
                <Pressable onPress={() => navigation.goBack()} className="h-auto">
                    <BackArrowIcon />
                </Pressable>
                <Text className="text-xl font-semibold text-black">Member Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text className="text-black text-base font-medium mb-2">Employee</Text>
                    <View className="flex flex-row items-center w-full gap-4">
                        <View className="rounded-full w-20 h-20 overflow-hidden">
                            <Image
                                source={{ uri: "https://cdn.shopify.com/s/files/1/0772/5269/0104/files/pexels-dom-j-7304-45057.jpg?v=1722321095" }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    resizeMode: "cover",
                                }}
                            />
                        </View>
                        <View className="flex flex-col gap-1">
                            <Text className="text-black text-sm font-medium">{empData.user.fullName}</Text>
                            <Text className="text-[#00000099] text-xs font-medium">{empData.XipperID}</Text>
                        </View>
                    </View>
                    <View className="flex flex-row items-center justify-between mt-4">
                        <View>
                            <Text className="text-[#00000099] text-sm">Department</Text>
                            <Text className="text-black text-sm font-medium">{empData.department[0]?.department.name}</Text>
                        </View>
                        <View>
                            <Text className="text-[#00000099] text-sm">Role</Text>
                            <Text className="text-black text-sm font-medium">{empData.user.role?.name}</Text>
                        </View>
                        <View>
                            <Text className="text-[#00000099] text-sm">Country</Text>
                            <Text className="text-black text-sm font-medium">India</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text className="text-black text-base font-medium mb-2">Employee Recent Spend Details</Text>
                    {spentData?.map((item, index)=>(
                        <View
                        key={index}
                        className="w-full flex flex-col items-center justify-between rounded-lg border border-gray-200 mb-4"
                    >
                        <View className="flex flex-row items-center justify-between mt-4">
                            <View>
                                <Text className="text-[#00000099] text-sm">{item.entityKey}</Text>
                                <Text className="text-black text-sm font-medium">{item.entityValue}</Text>
                            </View>
                            <View>
                                <Text className="text-[#00000099] text-sm">Spend</Text>
                                <Text className="text-black text-sm font-medium">₹ {item.spent}</Text>
                            </View>
                            <View>
                                <Text className="text-[#00000099] text-sm">Status</Text>
                                <Text className="text-black text-sm font-medium">{item.status}</Text>
                            </View>
                            <Pressable>
                                <Text>View More</Text>
                            </Pressable>
                        </View>
                    </View>
                    ))}
                    
                </View>
                <View className="mt-2">
                <SpendRight />
                </View>
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
        marginBottom: 5
    },
})
export default MemberDetails;