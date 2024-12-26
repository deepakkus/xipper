import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    StatusBar,
    StyleSheet,TouchableOpacity
  } from 'react-native';
  import React from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useNavigation } from '@react-navigation/native';
  import HotelCardFull from '../../components/HotelCardFull';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
  import { MicIcon } from '../../assets/images/Icons/HomeIcon';
import { SearchChatIcon } from '../../assets/images/Icons/chatIcons';
  
  const Wishlist = () => {
    const navigation = useNavigation();
  
    const TopCategyData = [
      {
        id: 1,
        imageUri:
          'https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Travel',
      },
      {
        id: 2,
        imageUri:
          'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Food',
      },
      {
        id: 3,
        imageUri:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Shopping',
      },
      {
        id: 4,
        imageUri:
          'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Health',
      },
      {
        id: 5,
        imageUri:
          'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Travel',
      },
    ];
  
    const TopCategoryItem = ({ item }) => (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryItemContainer}>
          <Image
            source={{ uri: item.imageUri }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ScrollView style={styles.scrollView}  showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerText}>Wishlist</Text>
  
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <SearchChatIcon />
              <TextInput
                style={styles.searchInput}
                placeholder=""
                placeholderTextColor="#A0A0A0"
              />
              <MicIcon />
            </View>
          </View>
  
          <View style={styles.categoriesHeader}>
            <Text style={styles.sectionTitle}>Top Categories</Text>
          </View>
  
          <FlatList
            data={TopCategyData}
            renderItem={TopCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
  
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <Text style={styles.subText}>
              We are currently showing hotels near you, you can change the location
              in the filters section
            </Text>
          </View>
  
          <View style={styles.hotelCardsContainer}>
            <HotelCardFull />
            <HotelCardFull />
            <HotelCardFull />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginHorizontal: 8,
    },
    scrollView: {
      padding: 20,
      marginTop: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    searchContainer: {
      marginTop: 12,
    },
    searchBar: {
      backgroundColor: '#ffffff',
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 20,
      marginHorizontal: 12,
      borderWidth: 1,
      borderColor: '#E5E5E5',
    },
    searchInput: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#A0A0A0',
      marginTop: 4,
      marginLeft: 12,
    },
    categoriesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 8,
      paddingHorizontal: 16,
    },
    categoryContainer: {
      marginTop: 10,
    },
    categoryItemContainer: {
      marginTop: 16,
      alignItems: 'center',
      gap: 8,
    },
    categoryImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
    },
    flatListContainer: {
      gap: 20,
      paddingHorizontal: 20,
    },
    searchResultsContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: '#000000',
    },
    subText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#A0A0A0',
    },
    hotelCardsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  });
  
  export default Wishlist;