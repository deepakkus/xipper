import React, { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import { BackArrowIcon, GreaterArrowIcon } from "../assets/images/Icons/ArrowIcon";
import FoodItemCard from "./FoodItemCard";
import VegOptionsModal from "../modals/VegOptionModal";
import Ratings from "../modals/Ratings";
import Categories from "../modals/Categories";
import OrderList from "../modals/OrderList";
import { GetFandBCart, GetFandBItems } from "../services/servicesService";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "./CircularLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import { setRestaurantCart } from "../redux/servicesRedux";
import { extractUniqueCategoryAndItemTypes } from "../utils/utils";

const FoodCard = () => {
    const dispatch = useDispatch();
    const nav = useNavigation();
    const { selectedProfile, selectedProperty } = useSelector(state => state.account);
    const { fAndBCartId, restaurantCart } = useSelector(state => state.services);
    const [searchText, setSearchText] = useState("");
    const [isVegModalVisible, setVegModalVisible] = useState(false);
    const [isFiveStarModalVisible, setFiveStarModalVisible] = useState(false);
    const [isFoodModalVisible, setFoodModalVisible] = useState(false);
    const [isOrderListVisible, setOrderListVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Preference");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [restaurantItems, setRestaurantItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [uniqueDataSet, setUniqueDataSet] = useState({});
    const scrollViewRef = useRef(null);
    const categoryRefs = useRef({});

    const getRestaurantItems = async () => {
        try {
            setLoading(true);
            const res = await GetFandBItems(selectedProperty.XipperID, "Restaurant Menu");
            const cart = fAndBCartId ? await getCart() : null;
            const subCategories = res.data?.subCategories || [];

            const { uniqueCategories, uniqueItemTypes } = extractUniqueCategoryAndItemTypes(subCategories);
            setUniqueDataSet({ uniqueCategories, uniqueItemTypes });

            const cartItems = cart?.cartResponse || [];
            
            const updatedItems = subCategories.map(item => {
                const cartItem = cartItems.find(cartItem => cartItem.itemName === item.name);
                return cartItem ? { ...item, quantity: cartItem.quantity } : { ...item, quantity: 0 };
            });
            setRestaurantItems(updatedItems);
        } catch (e) {
            console.error("Error fetching restaurant items:", e);
        } finally {
            setLoading(false);
        }
    };

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await GetFandBCart(fAndBCartId);
            dispatch(setRestaurantCart(res.data.data.cartResponse));
            return res.data.data;
        } catch (e) {
            console.error("Error fetching cart:", e);
        } finally {
            setLoading(false);
        }
    };

    const filterItems = () => {
        let filtered = [...restaurantItems];
        if (searchText.trim()) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        if (selectedOption !== "Preference") {
            filtered = filtered.filter(item => {
                if (typeof item.isVeg !== 'boolean') return false;
                return selectedOption === "Veg"
                    ? item.isVeg
                    : selectedOption === "Egg"
                        ? item.isEgg
                        : item.isNonVeg;
            });
        }
        if (!["All", "Category"].includes(selectedCategory)) {
            filtered = filtered.filter(item =>
                item.itemType.name.toLowerCase() === selectedCategory.toLowerCase()
            );
        } else if(selectedCategory === "All"){
            filtered = [...restaurantItems];
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        getRestaurantItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [searchText, selectedOption, selectedCategory, restaurantItems]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setVegModalVisible(false);
    };

    const handleFiveStarOptionSelect = (option) => {
        const filtered = restaurantItems.filter(item =>
            typeof item.rating === 'number' && item.rating >= option
        );
        setFilteredItems(filtered);
        closeFiveStarModal();
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFoodModalVisible(false);
    };

    const openVegModal = () => setVegModalVisible(true);
    const closeVegModal = () => setVegModalVisible(false);
    const openFiveStarModal = () => setFiveStarModalVisible(true);
    const closeFiveStarModal = () => setFiveStarModalVisible(false);
    const openFoodModal = () => setFoodModalVisible(true);
    const closeFoodModal = () => setFoodModalVisible(false);
    const openOrderList = () => setOrderListVisible(true);
    const closeOrderList = () => setOrderListVisible(false);

    const FilterButton = ({ label, onPress }) => (
        <Pressable
            style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 12,
                padding: 12,
                marginHorizontal: 3,
                alignItems: "center",
                borderColor: "gray",
                borderWidth: 1,
                minWidth: 100
            }}
            onPress={onPress}
        >
            <Text style={{ fontWeight: "bold", color: "gray" }}>{label}</Text>
        </Pressable>
    );

    const renderItems = () => {
        if (filteredItems.length === 0) {
            return (
                <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                    No items found
                </Text>
            );
        }

        return filteredItems.map((item, index) => (
            <View key={item.id || `item-${index}`}
                ref={(el) => categoryRefs.current[item.itemCategoryType?.name] = el}>
                <FoodItemCard item={item} setLoading={setLoading} />
            </View>
        ));
    };

    const handleMenuSelect = (category) => {
        const categoryRef = categoryRefs.current[category];
        if (categoryRef) {
            categoryRef.measureLayout(
                scrollViewRef.current,
                (x, y, width, height) => {
                    scrollViewRef.current.scrollTo({ y, animated: true });
                }
            );
        }

        setOrderListVisible(false);
    };

    return (
        <SafeAreaView className="h-full">
            <View className={(Platform.OS === 'ios') ? "flex flex-row items-center p-1 mt-1 ml-2" : "flex flex-row items-center mt-1 ml-2" }>
                <Pressable className="py-2 mr-2 px-1" onPress={() => nav.goBack()}>
                    <BackArrowIcon />
                </Pressable>
                <Text className={`text-center flex-1 p-2 font-header text-header mr-6 ${selectedProfile.type === 'user' ? "text-user" : "text-company"}`}>Restaurant Menu</Text>
            </View>
            <ScrollView ref={scrollViewRef} className="px-4" showsVerticalScrollIndicator={false}>
                <View className="px-2">
                    <View style={{ paddingBottom: 10, marginTop: 6 }}>
                        <SearchBar
                            placeholder="Search food items..."
                            value={searchText}
                            searchText={searchText}
                            setSearchText={setSearchText}
                        />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginBottom: 15,
                        flexWrap: "wrap",
                        gap: 8
                    }}>
                        <FilterButton
                            label={selectedOption}
                            onPress={openVegModal}
                        />
                        <FilterButton
                            label="Ratings"
                            onPress={openFiveStarModal}
                        />
                        <FilterButton
                            label={selectedCategory}
                            onPress={openFoodModal}
                        />
                    </View>

                    {renderItems()}

                    {/* Modals */}
                    <VegOptionsModal
                        visible={isVegModalVisible}
                        onClose={closeVegModal}
                        onSelectOption={handleOptionSelect}
                    />
                    <Ratings
                        visible={isFiveStarModalVisible}
                        onClose={closeFiveStarModal}
                        onSelectOption={handleFiveStarOptionSelect}
                    />
                    <Categories
                        visible={isFoodModalVisible}
                        onClose={closeFoodModal}
                        onSelectOption={handleCategorySelect}
                        categoryData={uniqueDataSet.uniqueItemTypes}
                    />
                </View>
            </ScrollView>

            <Pressable
                style={{
                    position: "absolute",
                    bottom: restaurantCart?.length > 0 ? 100 : 50,
                    right: 20,
                    backgroundColor: selectedProfile.type === 'user' ? "#06A77D" : "#6D38C3",
                    borderRadius: 20,
                    padding: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: selectedProfile.type === 'user' ? "#06A77D" : "#6D38C3",
                    borderWidth: 1,
                }}
                onPress={openOrderList}
            >
                <Text style={{ fontWeight: "bold", color: "white" }}>Menu</Text>
            </Pressable>
            {loading && <CircularLoader />}
            <OrderList
                visible={isOrderListVisible}
                onClose={closeOrderList}
                items={uniqueDataSet.uniqueCategories}
                onSelectOption={handleMenuSelect}
            />

            {restaurantCart?.length > 0 && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            {`${restaurantCart?.length} ${restaurantCart?.length > 1 ? "items in cart" : "item added to the cart"}`}
                        </Text>
                        <Pressable style={styles.viewCartButton} onPress={() => nav.navigate("ViewCart", { type: "screen" })}>
                            <View style={styles.viewCartButtonContent} >
                                <Text style={styles.viewCartButtonText}>View Cart</Text>
                                <GreaterArrowIcon />
                            </View>
                        </Pressable>
                    </View>
                </View>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    },
    modalContent: {
        backgroundColor: "#6d38C3",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 8,
    },
    modalText: {
        fontSize: 16,
        marginRight: 10,
        color: "white",
    },
    viewCartButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewCartButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    viewCartButtonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default FoodCard;
