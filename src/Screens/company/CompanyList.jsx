import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Pressable } from 'react-native';
import { AddIcon, BackArrowIcon, ThreeDotIcon } from '../../assets/images/Icons/ArrowIcon';
import { Edit } from '../../assets/images/Icons/Hotel';
import { RemoveDataIcon } from '../../assets/images/Icons/ArrowIcon';
import { GetPendingRegistrationList } from '../../services/companyOnboardingService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setPendingRegistrationList, setResumeRegistrationCompany } from '../../redux/companyRedux';
import CircularLoader from '../../components/CircularLoader';

const CompanyList = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pendingRegistrations } = useSelector((state) => state.company)

  const toggleMenu = (index) => {
    setVisibleMenuIndex(visibleMenuIndex === index ? null : index);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await GetPendingRegistrationList();
      dispatch(setPendingRegistrationList(res.data.pendingRegistrations))
      console.log(res.data.pendingRegistrations)
      res.data.pendingRegistrations.length === 0 && nav.navigate("Account/CompanyOnboading");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (mappedData) => {
    const DEFAULT_COMPANY_TYPE = "Select";
    const DEFAULT_BUSINESS_NAME = "";

    const {
      companyType: { name: companyTypeName } = {},
      documents: {
        cinNumber = "",
        dinNumber = "",
        panNumber = "",
        gstNumber = "",
        udyogaadhar = ""
      } = {},
      bankDetails = [],
      tempXipperID,
      email = ""
    } = mappedData;

    const accountNumber = bankDetails[0]?.accountNumber || "";
    const ifscCode = bankDetails[0]?.ifscCode || "";

    const tempData = {
      companyType: companyTypeName || DEFAULT_COMPANY_TYPE,
      cinNumber,
      cinNumberVerified: !!cinNumber,
      dinNumber,
      dinNumberVerified: !!dinNumber,
      businessName: mappedData.name || DEFAULT_BUSINESS_NAME,
      panNumber,
      panNumberVerified: !!panNumber,
      gstinNumber: gstNumber,
      gstinNumberVerified: !!gstNumber,
      udyogAadhar: udyogaadhar,
      accountNumber,
      ifscCode,
      ifscCodeVerified: !!accountNumber,
      companyId: tempXipperID,
      email: email,
      emailVerified: !!email,
    };

    console.log("Preparing to dispatch registration data:", tempData);

    try {
      await dispatch(setResumeRegistrationCompany(tempData));
      nav.navigate("Account/CompanyOnboading");
    } catch (error) {
      console.log("Failed to dispatch registration data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const closeMenu = () => {
    setVisibleMenuIndex(null);
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        {loading && <CircularLoader />}
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={() => nav.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <Text style={styles.header}>List Of Companies</Text>
          <Pressable style={styles.backButton}
            onPress={() => nav.navigate("CompanyRegistration")}>
            <AddIcon />
          </Pressable>
        </View>

        {pendingRegistrations.length > 0 ? pendingRegistrations.map((company, index) => (
          <View key={index} style={styles.companyContainer}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{company.name}</Text>
              {company.id ? <Text style={styles.companyId}>{company.id}</Text> : null}
            </View>
            <Pressable onPress={(e) => {
               e.stopPropagation(); 
              toggleMenu(index)}}
              >
              <ThreeDotIcon />
            </Pressable>

            {visibleMenuIndex === index && (
              <View style={styles.menu}>
                <Pressable style={styles.menuItem}>
                  <RemoveDataIcon />
                  <Text style={styles.menuText}>Remove</Text>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => handleEdit(company)}>
                  <Edit />
                  <Text style={styles.menuText}>Edit</Text>
                </Pressable>
              </View>
            )}
          </View>
        )) : (
          <View className="flex flex-col items-center justify-center">
            <Pressable className="flex flex-row items-center gap-2 p-2 rounded-lg border-gray-300 border-2"
              onPress={() => nav.navigate("Account/CompanyOnboading")}>
              <AddIcon />
              <Text className="mb-2 font-bold">Add Company</Text>
            </Pressable>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  companyId: {
    fontSize: 14,
    color: 'black'
  },
  menu: {
    position: 'absolute',
    right: 20,
    top: 30,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default CompanyList;
