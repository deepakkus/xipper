import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Image, ScrollView, Alert, StyleSheet} from 'react-native';
import {CrossIcon} from '../../assets/images/Icons/ArrowIcon';
import ProfileHeader from '../../components/ProfileHeader';
import AddButton from '../../components/AddButton';
import AddFamily from '../../modals/AddFamily';
import {LocationIcon} from '../../assets/images/Icons/PersonalInfo';
import {getTextClassInstance} from '../../utils/TextClass';
import {
  GetFamily,
  AddFamilyMem,
  DeleteFamily,
} from '../../services/profileService';
import {useDispatch, useSelector} from 'react-redux';
import {setPersonalInfo} from '../../redux/accountRedux';
import {SafeAreaView} from 'react-native-safe-area-context';
import CircularLoader from '../../components/CircularLoader';
import {BackArrowIcon, CopyIcon} from '../../assets/images/Icons/ArrowIcon';
import {useNavigation, useRoute} from '@react-navigation/native';

const Family = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {personalInfo} = useSelector(state => state.account);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(personalInfo['family'] || []);
  const [loading, setLoading] = useState(false);
  const textClass = getTextClassInstance();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchFamily = async () => {
    try {
      setLoading(true);
      const familyData = await GetFamily();
      console.log(familyData);
      dispatch(setPersonalInfo({key: 'family', value: familyData}));
      setData(familyData);
      familyData.length === 0 && setModalVisible(true);
    } catch (error) {
      console.error('Error fetching family data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async member => {
    try {
      setLoading(true);
      const res = await AddFamilyMem(member);
      if (res && res.status === 200) {
        console.log('Family member added successfully');
      }
    } catch (error) {
      console.error('Error adding family member:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (memberId, memberName) => {
    Alert.alert(
      'Delete Family Member',
      `Are you sure you want to remove ${memberName} from your family list?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const res = await DeleteFamily(memberId);

              if (res && res.status === 200) {
                const updatedData = data.filter(
                  member => member.id !== memberId,
                );
                setData(updatedData);
                dispatch(
                  setPersonalInfo({
                    ...personalInfo,
                    family: updatedData,
                  }),
                );
                console.log('Family member deleted successfully');
              } else {
                Alert.alert('Error', 'Failed to delete family member');
              }
            } catch (error) {
              console.error('Error deleting family member:', error);
              Alert.alert('Error', 'Failed to delete family member');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-100 mt-2">
      <ProfileHeader title="Family" />
      <>
        <Pressable
          onPress={() => navigation.navigate('PersonalInfo')}
          style={styles.backButton}>
          <BackArrowIcon />
          <Text style={styles.headerText}>Back</Text>
        </Pressable>
      </>
      <ScrollView className="flex-1 p-2">
        <View className="mt-2">
          <Text className="text-lg font-bold text-black">Family Members</Text>
          {loading && <CircularLoader />}
          <View className="flex-column justify-between mt-4">
            {data.length > 0 ? (
              data.map((member, index) => (
                <View
                  key={index}
                  className="flex-1 h-22 bg-white rounded-lg shadow mx-2 p-2 m-1">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-semibold text-black-500">
                      {member.relationship}
                    </Text>
                    <Pressable
                      onPress={() => deleteMember(member.id, member.fullName)}>
                      <CrossIcon />
                    </Pressable>
                  </View>
                  <View className="flex-row items-center">
                    {/* <Image
                      source={{uri: 'https://example.com/avatar.jpg'}}
                      className="w-10 h-10 rounded-full mr-3"
                    /> */}
                    <Image source={{uri: 'https://reactjs.org/logo-og.png'}} 
                    className="w-10 h-10 rounded-full mr-3"
                    />
                    <View>
                      <Text className="text-sm font-semibold  text-black-500 mr-2">
                        {member.fullName}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        {member.xipperID}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-center mt-4 text-gray-500">
                No family members found
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="p-4 bg-gray-100">
        <AddButton
          title={<Text>Add Family Member</Text>}
          Icon={<LocationIcon color={'gray'} />}
          onPress={toggleModal}
        />
      </View>
      <AddFamily
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addMember={addMember}
        type={<Text>{textClass.getTextString('TXT4')}</Text>}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Family;
