import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import ItemContainer from "../../components/ItemContainer";
import {
    BirthdayIcon,
    EmailIcon,
    FamilyIcon,
    LocationIcon,
    PhoneIcon,
} from "../../assets/images/Icons/PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileData } from "../../services/profileService";
import { setProfileData } from "../../redux/accountRedux";
import { getTextClassInstance } from "../../utils/TextClass";

const PersonalInfo = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { profileData, selectedProfile } = useSelector((state) => state.account);
    const [loading, setLoading] = useState(false);
    const textClass = getTextClassInstance();

    const fetchProfileDetails = async () => {
        try {
            setLoading(true);
            const resp = await GetProfileData();
            dispatch(setProfileData(resp));
        } catch (err) {
            console.error('Error fetching profile details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!profileData["dob"] && !profileData["citizenship"]) {
            fetchProfileDetails();
        }
    }, []);

    const data = [
        {
            title: "Phone Number",
            navigateTo: "PhoneNumber",
            IconComponent: PhoneIcon,
        },
        ...(selectedProfile.type !== 'company' && selectedProfile.type !== 'hotel' ? [
            {
                title: "Family",
                navigateTo: "Family",
                IconComponent: FamilyIcon,
            }
        ] : []),
        {
            title: "Address Book",
            navigateTo: "AddressBook",
            IconComponent: LocationIcon,
        },
        {
            title: "Email",
            navigateTo: "EmailInfo",
            IconComponent: EmailIcon,
        },
        {
            title: profileData.dob || "DD MM YYYY",
            navigateTo: "BirthDate",
            IconComponent: BirthdayIcon,
        },
        {
            title: profileData.country || "India",
            IconComponent: "",
        },
    ];

    return (
        <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2">
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHeader />
                {selectedProfile.type === 'user' ? (
                    <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
                        {textClass.getTextString('TXT28')}
                    </Text>
                ) : selectedProfile.type === 'company' ? (
                    <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
                       {textClass.getTextString('TXT31')}
                    </Text>
                ) : (
                    <Text className="font-poppins font-bold text-[24px] text-md text-black mb-4">
                       {textClass.getTextString('TXT32')}
                    </Text>
                )}
                <View className="bg-white rounded-md p-6 mb-8">
                    {data.map((item, index) => (
                        <ItemContainer
                            key={index}
                            title={item.title}
                            showBorder={index !== data.length - 1}
                            onPress={() => item.navigateTo && navigation.navigate(item.navigateTo, { profileData: profileData })}
                            IconComponent={item.IconComponent}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PersonalInfo;
