import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {GetCompanyDashboard} from '../../services/companyService';
import {
  BackArrowIcon,
  DropDownArrow,
} from '../../assets/images/Icons/ArrowIcon';
import Dropdown from '../../components/Dropdown';
import {CrossIcon, Iicon} from '../../assets/images/Icons/HomeIcon';
import CircularLoader from '../../components/CircularLoader';
import {DateFormatLong, formatDate} from '../../utils/utils';
import {
  CompanyInviteMember,
  GetCompanyRoles,
  GetCompanyPositions,
  GetCompanyDepartments,
} from '../../services/companyService';
import {
  GetRoles,
  GetDepartments,
  GetPositions,
  GetEmployees,
} from '../../services/hotelService';
import {useSelector} from 'react-redux';
import {GetEmployeeAccess} from '../../services/sellerService';
import {AddEmployee, GetSellerManagement} from '../../services/sellerService';
import ErrorModal from '../../modals/ErrorModal';

const fieldOptions = [
  {value: 'XipperID', label: 'Xipper ID'},
  {value: 'phoneNumber', label: 'Phone No.'},
  {value: 'email', label: 'Email ID'},
];

const CompanyManagement = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {selectedProfile} = useSelector(state => state.account);
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState('all');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedField, setSelectedField] = useState('XipperID');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxToggle = option => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option],
    );
  };

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [positionSuggestions, setPositionSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [inviteUserData, setInviteUserData] = useState({
    identifier: '',
    departments: [],
    positions: [],
    rights: '',
  });
  const [departmentFilterMenu, setDeapartmentFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpenName, setIsDropdownOpenName] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [roleSuggestion, setRoleSuggestion] = useState([]);
  const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
  const [isDropdownOpenDep, setIsDropdownOpenDep] = useState(false);
  const [isDropdownOpenPos, setIsDropdownOpenPos] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTextName, setSearchTextName] = useState('');
  const [searchTextPos, setSearchTextPos] = useState('');
  const [selectedName, setSelectedName] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [accessList, setAccessList] = useState([]);

  const [errorMsg, SetErrorMsg] = useState('');
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const toggleErrorModal = () => setErrorModalVisible(!isErrorModalVisible);

  const handleClose = () => {
    toggleErrorModal();
  };

  const filteredSuggestions = departmentSuggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleButtonPress = button => {
    setSelectedButton(button);
    if (button === 'departments') {
      setDeapartmentFilterMenu(true);
    }
  };

  const removeItem = (field, index) => {
    setInviteUserData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (
        selectedDepartments.length === 0 ||
        selectedPositions.length === 0 ||
        selectedRoles.length === 0 ||
        inviteUserData.identifier.length === 0
      ) {
        setError('Please fill in all details');
        return;
      } else {
        setError('');
        const response = await CompanyInviteMember(
          inviteUserData.identifier,
          selectedDepartments,
          selectedRoles,
          selectedPositions,
          selectedProfile.XipperID,
        );

        if (response.status === 200) setIsModalVisible(false);
        else {
          setError(response.data.message);
          console.log('Error in inviting user: ', response.data.message);
        }
      }
    } catch (error) {
      console.error('An error occurred during the invitation process:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const result = selectedName?.reduce((a, c) => {
    const split = c.split('-');
    a.empNames.push(split[0]);
    a.empIds.push(split[1]?.trim());
    return a;
  }, { empNames: [], empIds: [] });

  const { empNames, empIds } = result;

  const getEmployee = async () => {
    try {
      setIsLoading(true);
      
      if (
        selectedDepartments.length === 0 ||
        selectedPositions.length === 0 ||
        selectedRoles.length === 0 ||
        empIds === 0
      ) {
        setError('Please fill in all details');
        return;
      } else {
        setError('');
        const response = await AddEmployee( 
            empIds[0],
            selectedDepartments,
            selectedRoles[0],
            selectedPositions,
            selectedProfile.XipperID,
            selectedOptions);
        console.log("resAddepl=="+JSON.stringify(response))

        if (response.data.status === 200) {
          Alert.alert('Success')
          //setIsModalVisible(false);
        }
        else {
          setError(response.data.message);
          console.log('Error in inviting user: ');
        }
      }
    } catch (error) {
      console.error('An error occurred during the adding employee:', error);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const response = await AddEmployee();

    //   console.log(response);
    // } catch (error) {
    //   console.error('Error fetching employee:', error);
    // }
  };

  const fetchEmployeeAccess = async () => {
    try {
      const response = await GetEmployeeAccess();
      return response.data.data.accessList;
    } catch (error) {
      console.error('Error fetching employee access:', error);
      return [];
    }
  };
  useEffect(() => {
    if (isModalVisible) {
      const fetchData = async () => {
        const data = await fetchEmployeeAccess();
        setAccessList(data);
      };
      fetchData();
    }
  }, [isModalVisible]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (selectedProfile.type === 'hotel') {
          const response = await GetSellerManagement(selectedProfile?.XipperID);
          if (response.data.status === 'Success') {
            setData(response.data.data?.['employees']);
          } else if (response.data.status === 'Fail') {
            setErrorModalVisible(true);
            SetErrorMsg(response.data.message);
          }
        } else if (selectedProfile.type === 'company') {
          const response = await GetCompanyDashboard(selectedProfile?.XipperID);
          if (response.data.status === 'Success') {
            setData(response.data.data?.['employees']);
          } else if (response.data.status === 'Fail') {
            setErrorModalVisible(true);
            SetErrorMsg(response.data.message);
          }
        }
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedProfile]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const fetchRole = async () => {
    setIsLoading(true);
    try {
      const response = await GetCompanyRoles();
      if (response.status === 'Success') {
        if (response.data?.result) {
        console.log('Setting roles:', response.data?.result);
        setRoleSuggestion(response.data?.result);
        }
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoleHotel = async () => {
    setIsLoading(true);
    try {
      const response = await GetRoles();
      if (response.status === 'Success') {
        if (response.data?.result) {
        console.log('Setting hotel roles:', response.data?.result);
        setRoleSuggestion(response.data?.result);
        }
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await GetCompanyDepartments();
      if (response.status === 'Success') {
          if (response.data?.result) {
          console.log('Setting departments:', response.data?.result);
          setDepartmentSuggestions(response.data?.result);
        }
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartmentsHotel = async () => {
    try {
      const response = await GetDepartments();
      if (response.status === 'Success') {
        if (response.data?.result) {
          console.log('Setting departments Hotel:', response.data?.result);
          setDepartmentSuggestions(response.data?.result);
        }
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }finally {
      setIsLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      setIsLoading(true);
      const response = await GetCompanyPositions();
      if (response.status === 'Success') {
        if (response.data?.result) {
          console.log('Setting positions:', response.data?.result);
          setPositionSuggestions(response.data?.result);
        }
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await GetEmployees(selectedProfile?.XipperID);
      console.log(JSON.stringify(response?.data?.result));
      if (response?.data?.result && Array.isArray(response?.data?.result)) {
        const fullNames = response?.data?.result
          //.map(item => item.user?.fullName)
          .map(item => `${item?.user?.fullName} - ${item.XipperID}`)
          .filter(name => name);

          // const data = response.data.data
          // const emp = data?.result?.map(item => `${item?.user?.fullName} - ${item.XipperID}`)

        console.log('Setting Name Suggestions:', fullNames);
        setNameSuggestions(fullNames);
      } else {
        console.warn('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchPositionsHotel = async () => {
    try {
      const response = await GetPositions();
      if (response.data?.result) {
        console.log('Setting positions:', response.data?.result);
        setPositionSuggestions(response.data?.result);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const toggleDropdown = () => {
    console.log('toggleDropdown called, isDropdownOpen:', isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      if (roleSuggestion.length === 0) {
        if (selectedProfile.type === 'company') {
          fetchRole();
        } else {
          fetchRoleHotel();
        }
      }
      setIsDropdownOpenDep(false);
      setIsDropdownOpenPos(false);
    }
  };

  const toggleDropdowndep = () => {
    if (!isDropdownOpenDep) {
      if (departmentSuggestions.length === 0) {
        if (selectedProfile.type === 'company') {
          fetchDepartments();
        } else {
          fetchDepartmentsHotel();
        }
      }
    }
    setIsDropdownOpenDep(!isDropdownOpenDep);
    setIsDropdownOpen(false);
    setIsDropdownOpenPos(false);
  };

  const toggleDropdownpos = () => {
    setIsDropdownOpenPos(!isDropdownOpenPos);
    if (!isDropdownOpenPos) {
      if (positionSuggestions.length === 0) {
        if (selectedProfile.type === 'company') {
          fetchPositions();
        } else {
          fetchPositionsHotel();
        }
      }
      setIsDropdownOpenDep(false);
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdownname = () => {
    setIsDropdownOpenName(!isDropdownOpenName);
    if (!isDropdownOpenName) {
      if (nameSuggestions.length === 0) {
        fetchEmployee();
      }
      setIsDropdownOpenDep(false);
      setIsDropdownOpen(false);
      setIsDropdownOpenPos(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <View className="flex-row gap-5 items-center">
        <Pressable onPress={() => navigation.goBack()} className="h-auto">
          <BackArrowIcon />
        </Pressable>
        <Text className="text-header font-header text-black text-center px-8 mb-2">{`${
          selectedProfile.type === 'company' ? 'Company' : 'Seller'
        } Management`}</Text>
      </View>
      <SearchBar />

      <View className="flex flex-row justify-between items-center my-5">
        <Pressable
          onPress={() => navigation.navigate('GroupPermission')}
          className={`h-auto pt-1 pb-3 px-3 flex flex-row gap-2 items-center rounded-xl ${
            selectedProfile.type === 'company' ? 'bg-company' : 'bg-seller'
          }`}>
          <Image
            source={require('../../assets/images/companyseller/roles.png')}
            style={{height: 18, width: 18}}
          />
          <Text className="text-white font-semibold text-sm">
            Group Permissions
          </Text>
        </Pressable>
        <Pressable
          onPress={openModal}
          className={`pt-1 pb-3 px-3 flex flex-row gap-2 items-center bg-company rounded-xl ${
            selectedProfile.type === 'company' ? 'bg-company' : 'bg-seller'
          }`}>
          {selectedProfile.type === 'company' ? (
            <Text className="text-white font-semibold text-sm">
              Invite Users
            </Text>
          ) : (
            <Text className="text-white font-semibold text-sm">
              Add Employee
            </Text>
          )}
          <Image
            source={require('../../assets/images/Action/add.png')}
            style={{tintColor: 'white'}}
          />
        </Pressable>
      </View>
      <View className="flex flex-row justify-between items-center my-2">
        {['all', 'departments', 'invited', 'requests'].map((item, index) => {
          const isSelected = selectedButton === item;
          const backgroundColor =
            selectedProfile.type === 'company'
              ? isSelected
                ? '#6D38C3'
                : 'white'
              : isSelected
              ? '#FE830C'
              : 'white';
          const textColor = isSelected ? 'white' : 'black';
          const tiniColor = isSelected ? 'white' : 'black';

          const images = {
            all: require('../../assets/images/companyseller/doubletick.png'),
            departments: require('../../assets/images/companyseller/departments.png'),
            invited: require('../../assets/images/companyseller/invited.png'),
            requests: require('../../assets/images/companyseller/requests.png'),
          };

          return (
            <Pressable
              key={index}
              onPress={() => handleButtonPress(item)}
              className="h-auto pt-1 pb-2 px-2 flex flex-row gap-1 items-center rounded-xl"
              style={{backgroundColor}}>
              <Image source={images[item]} style={{tintColor: tiniColor}} />
              <Text
                className={`font-semibold text-xs`}
                style={{color: textColor}}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View className="ml-10">
        {selectedButton === 'departments' && (
          <Dropdown
            selectedValue={selectedField}
            options={departmentSuggestions.map(dept => ({
              label: dept,
              value: dept,
            }))}
            visible={departmentFilterMenu}
            onSelect={val => {
              setSelectedField(val);
              setDeapartmentFilterMenu(!departmentFilterMenu);
            }}
            toggleDropdown={() =>
              setDeapartmentFilterMenu(!departmentFilterMenu)
            }
          />
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <View className="w-full mt-5">
          {data?.map((item, index) => {
            if (selectedProfile.type === 'company') {
              return (
                <View
                  key={index}
                  className="w-full bg-white flex flex-row items-center justify-between rounded-full border border-gray-200 mb-4">
                  <View className="flex flex-row items-center w-full">
                    <View className="rounded-full w-20 h-20 overflow-hidden">
                      <Image
                        source={{
                          uri: 'https://cdn.shopify.com/s/files/1/0772/5269/0104/files/pexels-dom-j-7304-45057.jpg?v=1722321095',
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('MemberDetails', {empData: item})
                      }>
                      <View className="flex flex-row justify-between items-center w-full mr-[-100px]">
                        <View className="flex flex-col">
                          <Text className="font-medium text-base  ml-3 text-black">
                            {item.user.fullName}
                          </Text>
                          <Text className="font-medium text-company text-sm  ml-3">
                            {item.XipperID}
                          </Text>
                        </View>
                        <Text className="font-medium text-base items-end text-black">
                          {item?.department[0]?.department?.name}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              );
            } else if (selectedProfile.type === 'hotel') {
              return (
                <View
                  key={index}
                  className="w-full bg-white flex flex-row items-center justify-between rounded-full border border-gray-200 mb-4">
                  <View className="flex flex-row items-center w-full">
                    <View className="rounded-full w-20 h-20 overflow-hidden">
                      <Image
                        source={{
                          uri: 'https://cdn.shopify.com/s/files/1/0772/5269/0104/files/pexels-dom-j-7304-45057.jpg?v=1722321095',
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('MemberDetails', {
                          empData: item.employee,
                        })
                      }>
                      <View className="flex flex-row justify-between items-center w-full mr-[-100px]">
                        <View className="flex flex-col">
                          {/* <Text className="font-medium text-base ml-1 text-black"> */}
                          <Text className="font-medium text-base text-black">
                            {item.employee?.user.fullName}
                          </Text>
                          <Text className="font-medium text-company text-sm  ml-3">
                            {item.employee?.XipperID}
                          </Text>
                        </View>
                        <Text className="flex font-medium text-base items-end text-black">
                          {item?.employee?.department?.[0].department?.name}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.card} className="mb-4" key={index}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('MemberDetails', {empData: item})
                    }>
                    <View className="flex flex-row items-center w-full gap-4">
                      <View className="rounded-full w-20 h-20 overflow-hidden">
                        <Image
                          source={{
                            uri: 'https://cdn.shopify.com/s/files/1/0772/5269/0104/files/pexels-dom-j-7304-45057.jpg?v=1722321095',
                          }}
                          style={{
                            height: '100%',
                            width: '100%',
                            // resizeMode: "cover",
                          }}
                        />
                      </View>
                      <View className="flex flex-col gap-1">
                        <Text className="text-black text-sm font-medium">
                          {item.user.fullName}
                        </Text>
                        <Text className="text-[#00000099] text-xs font-medium">
                          {item.XipperID}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-black text-base font-semibold my-2">{`Department : ${item?.department?.[0]?.department?.name}`}</Text>
                    <View className="flex flex-row items-center justify-between mt-4">
                      <View>
                        <Text className="text-[#00000099] text-sm">Rights</Text>
                        <Text className="text-black text-sm font-medium">
                          Admin
                        </Text>
                      </View>
                      <View>
                        <Text className="text-[#00000099] text-sm">Joined</Text>
                        <Text className="text-black text-sm font-medium">
                          {DateFormatLong(item.dateJoined)}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-[#00000099] text-sm">
                          Monthly Spend
                        </Text>
                        <Text className="text-black text-sm font-medium">
                          ₹ 1000
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalContainer}>
            <View style={styles.blackOverlay} />
            <View className="flex-1 justify-center items-center px-5">
              <View className="bg-white w-full p-10 rounded-2xl shadow-xl border border-gray-200">
                <View className="flex-row justify-between items-center mb-4">
                  {selectedProfile.type === 'company' ? (
                    <Text className="font-medium text-black text-xl mb-3">
                      Invite User
                    </Text>
                  ) : (
                    <Text className="font-medium text-black text-xl mb-3">
                      Add Employee
                    </Text>
                  )}
                  <Pressable onPress={closeModal}>
                    {selectedProfile.type === 'company' ? (
                      <CrossIcon color={'#6D38C3'} />
                    ) : (
                      <CrossIcon color={'#FE830C'} />
                    )}
                  </Pressable>
                </View>

                {selectedProfile.type === 'company' ? (
                  <>
                    <View className="relative flex-row items-center w-80">
                      <Text className="my-2 text-lg font-psemibold mr-2 text-black">
                        {
                          fieldOptions.filter(i => i.value === selectedField)[0]
                            .label
                        }
                      </Text>
                      <Pressable
                        onPress={() => setDropdownVisible(!dropdownVisible)}>
                        <DropDownArrow />
                      </Pressable>
                      <Dropdown
                        selectedValue={selectedField}
                        options={fieldOptions}
                        visible={dropdownVisible}
                        onSelect={val => {
                          setSelectedField(val);
                          setDropdownVisible(!dropdownVisible);
                        }}
                        toggleDropdown={() =>
                          setDropdownVisible(!dropdownVisible)
                        }
                      />
                    </View>
                    <View className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl">
                      <TextInput
                        className="py-3 font-pmedium text-gray-700 text-sm flex-1"
                        placeholder={`Enter ${
                          fieldOptions.filter(i => i.value === selectedField)[0]
                            .label
                        }`}
                        value={inviteUserData.identifier}
                        onChangeText={val =>
                          setInviteUserData({
                            ...inviteUserData,
                            identifier: val,
                          })
                        }
                      />
                    </View>
                  </>
                ) : (
                  <View>
                    <Text className="text-lg text-black my-2">Name</Text>
                    <Pressable
                      onPress={toggleDropdownname}
                      className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl py-3">
                      <Text className="text-sm text-gray-700">
                        {selectedName.length > 0
                          ? selectedName.join(', ')
                          : 'Enter Name'}
                      </Text>
                      <Text className="text-gray-400">
                        {isDropdownOpenName ? '▲' : '▼'}
                      </Text>
                    </Pressable>

                    {isDropdownOpenName && (
                      <View className="border border-gray-200 rounded-xl mt-2 bg-white">
                        <View className="p-2 border-b border-gray-200">
                          <TextInput
                            className="text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
                            placeholder="Enter Name"
                            value={searchTextPos}
                            onChangeText={text => setSearchTextName(text)}
                          />
                        </View>

                        {isLoading ? (
                          <CircularLoader />
                        ) : (
                          <FlatList
                            data={nameSuggestions.filter(
                              role =>
                                role
                                  .toLowerCase()
                                  .includes(searchTextName.toLowerCase()) &&
                                !selectedName.includes(role),
                            )}
                            className="max-h-40"
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                              <Pressable
                                onPress={() => {
                                  if (!selectedName.includes(item)) {
                                    setSelectedName([...selectedName, item]);
                                    setIsDropdownOpenName(false);
                                    setSearchTextName('');
                                  }
                                }}
                                className="p-2 border-b border-gray-100 last:border-b-0">
                                <Text className="text-sm text-gray-700">
                                  {item}
                                </Text>
                              </Pressable>
                            )}
                          />
                        )}
                      </View>
                    )}
                  </View>
                )}

                {/* Department Field */}
                <View>
                  <Text className="text-lg text-black my-2">Department</Text>
                  <Pressable
                    onPress={toggleDropdowndep}
                    className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl py-3">
                    <Text className="text-sm text-gray-700">
                      {selectedDepartments.length > 0
                        ? selectedDepartments.join(', ')
                        : 'Select Department'}
                    </Text>
                    <Text className="text-gray-400">
                      {isDropdownOpenDep ? '▲' : '▼'}
                    </Text>
                  </Pressable>

                  {/* Dropdown Options */}
                  {isDropdownOpenDep && (
                    <View className="border border-gray-200 rounded-xl mt-2 bg-white">
                      <View className="border-b border-gray-200 p-2">
                        <TextInput
                          className="text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
                          placeholder="Search department"
                          value={searchQuery}
                          onChangeText={text => setSearchQuery(text)}
                        />
                      </View>

                      {isLoading ? (
                        <CircularLoader />
                      ) : (
                        <FlatList
                          data={filteredSuggestions.filter(
                            item => !selectedDepartments.includes(item),
                          )}
                          className="max-h-40"
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <Pressable
                              onPress={() => {
                                if (!selectedDepartments.includes(item)) {
                                  setSelectedDepartments([
                                    ...selectedDepartments,
                                    item,
                                  ]);
                                  setIsDropdownOpenDep(false);
                                  setSearchQuery('');
                                }
                              }}
                              className="p-2 border-b border-gray-100 last:border-b-0">
                              <Text className="text-sm text-gray-700">
                                {item}
                              </Text>
                            </Pressable>
                          )}
                        />
                      )}
                    </View>
                  )}
                  {selectedDepartments.length > 0 && (
                    <View className="flex flex-row flex-wrap mt-3">
                      {selectedDepartments.map((department, index) => (
                        <View
                          key={index}
                          className={`p-2 m-2 items-center justify-between rounded-xl flex flex-row max-w-fit ${
                            selectedProfile.type === 'company'
                              ? 'bg-company'
                              : 'bg-seller'
                          }`}>
                          <Text className="font-medium text-sm text-white mr-2">
                            {department}
                          </Text>
                          <Pressable
                            onPress={() => {
                              const newSelectedDepartments =
                                selectedDepartments.filter(
                                  item => item !== department,
                                );
                              setSelectedDepartments(newSelectedDepartments);
                            }}>
                            <CrossIcon />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Position Field */}
                <View>
                  <Text className="text-lg text-black my-2">Position</Text>
                  <Pressable
                    onPress={toggleDropdownpos}
                    className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl py-3">
                    <Text className="text-sm text-gray-700">
                      {selectedPositions.length > 0
                        ? selectedPositions.join(', ')
                        : 'Select Position'}
                    </Text>
                    <Text className="text-gray-400">
                      {isDropdownOpenPos ? '▲' : '▼'}
                    </Text>
                  </Pressable>

                  {isDropdownOpenPos && (
                    <View className="border border-gray-200 rounded-xl mt-2 bg-white">
                      <View className="p-2 border-b border-gray-200">
                        <TextInput
                          className="text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
                          placeholder="Search Position"
                          value={searchTextPos}
                          onChangeText={text => setSearchTextPos(text)}
                        />
                      </View>

                      {isLoading ? (
                        <CircularLoader />
                      ) : (
                        <FlatList
                          data={positionSuggestions.filter(
                            role =>
                              role
                                .toLowerCase()
                                .includes(searchTextPos.toLowerCase()) &&
                              !selectedPositions.includes(role),
                          )}
                          className="max-h-40"
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <Pressable
                              onPress={() => {
                                if (!selectedPositions.includes(item)) {
                                  setSelectedPositions([
                                    ...selectedPositions,
                                    item,
                                  ]);
                                  setIsDropdownOpenPos(false);
                                  setSearchTextPos('');
                                }
                              }}
                              className="p-2 border-b border-gray-100 last:border-b-0">
                              <Text className="text-sm text-gray-700">
                                {item}
                              </Text>
                            </Pressable>
                          )}
                        />
                      )}
                    </View>
                  )}

                  {selectedPositions.length > 0 && (
                    <View className="flex flex-row flex-wrap mt-3">
                      {selectedPositions.map((position, index) => (
                        <View
                          key={index}
                          className={`p-2 m-2 items-center justify-between rounded-xl flex flex-row max-w-fit ${
                            selectedProfile.type === 'company'
                              ? 'bg-company'
                              : 'bg-seller'
                          }`}>
                          <Text className="font-medium text-sm text-white mr-2">
                            {position}
                          </Text>
                          <Pressable
                            onPress={() => {
                              const newSelectedPositions =
                                selectedPositions.filter(
                                  item => item !== position,
                                );
                              setSelectedPositions(newSelectedPositions);
                            }}>
                            <CrossIcon />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Role Field */}
                <View>
                  <Text className="text-lg text-black my-2">Role</Text>
                  <Pressable
                    onPress={toggleDropdown}
                    className="flex-row items-center justify-between border px-3 border-gray-200 rounded-xl py-3">
                    <Text className="text-sm text-gray-700">
                      {selectedRoles.length > 0
                        ? selectedRoles.join(', ')
                        : 'Select Role'}
                    </Text>
                    <Text className="text-gray-400">
                      {isDropdownOpen ? '▲' : '▼'}
                    </Text>
                  </Pressable>

                  {isDropdownOpen && (
                    <View className="border border-gray-200 rounded-xl mt-2 bg-white">
                      <View className="p-2 border-b border-gray-200">
                        <TextInput
                          placeholder="Search Role"
                          value={searchText}
                          onChangeText={text => setSearchText(text)}
                          className="text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
                        />
                      </View>
                      {isLoading ? (
                        <CircularLoader />
                      ) : (
                        <FlatList
                          data={roleSuggestion.filter(
                            role =>
                              role
                                .toLowerCase()
                                .includes(searchText.toLowerCase()) &&
                              !selectedRoles.includes(role),
                          )}
                          className="max-h-40"
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <Pressable
                              onPress={() => {
                                if (!selectedRoles.includes(item)) {
                                  setSelectedRoles([...selectedRoles, item]);
                                  setIsDropdownOpen(false);
                                  setSearchText('');
                                }
                              }}
                              className="p-2 border-b border-gray-100 last:border-b-0">
                              <Text className="text-sm text-gray-700">
                                {item}
                              </Text>
                            </Pressable>
                          )}
                        />
                      )}
                    </View>
                  )}
                  {selectedRoles.length > 0 && (
                    <View className="flex flex-row flex-wrap mt-3">
                      {selectedRoles.map((role, index) => (
                        <View
                          key={index}
                          className={`p-2 m-2 items-center justify-between rounded-xl flex flex-row max-w-fit ${
                            selectedProfile.type === 'company'
                              ? 'bg-company'
                              : 'bg-seller'
                          }`}>
                          <Text className="font-medium text-sm text-white mr-2">
                            {role}
                          </Text>
                          <Pressable
                            onPress={() => {
                              const newSelectedRoles = selectedRoles.filter(
                                item => item !== role,
                              );
                              setSelectedRoles(newSelectedRoles);
                            }}>
                            <CrossIcon />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Submit Button */}
                {selectedProfile.type === 'company' && (
                  <Pressable
                    onPress={handleSubmit}
                    className={`bg-${selectedProfile.type} py-3 px-5 mt-4 rounded-xl items-center justify-center`}>
                    <Text className="font-medium text-white text-lg">
                      Submit
                    </Text>
                  </Pressable>
                )}
                {error && <Text className="p-2 text-red-800 font-bold">{error}</Text>}
                <View>
                  {selectedProfile.type === 'hotel' && (
                    <>
                      <View className="p-4 bg-white rounded-md shadow-md">
                        <View className="p-4 border-2 border-gray-200 rounded-xl">
                          {accessList.length > 0 ? (
                            accessList.map((access, index) => (
                              <View
                                key={access.accessId}
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginBottom: 10,
                                }}>
                                <Text style={{fontSize: 16, color: 'black'}}>
                                  {access.name}
                                </Text>
                                <Pressable
                                  onPress={() =>
                                    handleCheckboxToggle(access.name)
                                  }>
                                  <View
                                    style={{
                                      width: 20,
                                      height: 20,
                                      borderWidth: 2,
                                      borderColor: selectedOptions.includes(
                                        access.name,
                                      )
                                        ? '#FE830C'
                                        : '#FE830C',
                                      backgroundColor: selectedOptions.includes(
                                        access.name,
                                      )
                                        ? '#FE830C'
                                        : 'white',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 4,
                                    }}>
                                    {selectedOptions.includes(access.name) && (
                                      <Text
                                        style={{color: 'white', fontSize: 12}}>
                                        ✔
                                      </Text>
                                    )}
                                  </View>
                                </Pressable>
                              </View>
                            ))
                          ) : (
                            <Text>No access options available</Text>
                          )}
                        </View>
                        <View className="flex justify-center items-center mt-2">
                          <Pressable
                            className="border border-gray-200 rounded-lg w-30 h-10 px-2 mt-2 justify-center items-center bg-seller flex"
                            onPress={getEmployee}>
                            <Text className="text-white text-sm font-medium text-center mt-2 mb-2">
                              Add Employee
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
          {loading && <CircularLoader />}
        </ScrollView>
      </Modal>
      {loading && <CircularLoader />}
      {errorMsg ? (
        <ErrorModal
          isModalVisible={isErrorModalVisible}
          toggleErrorModal={toggleErrorModal}
          handleBack={handleClose}
          heading={'Error!'}
          content={errorMsg}
        />
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 100 : 0,
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default CompanyManagement;
