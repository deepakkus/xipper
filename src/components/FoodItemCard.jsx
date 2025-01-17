import React, { useState, useEffect } from "react";
import { Image, Text, Pressable, View, StyleSheet } from "react-native";
import { DynamicStars } from "../assets/images/Icons/HomeIcon";
import { useNavigation } from "@react-navigation/native";
import { AddFandBItemsToCart } from "../services/servicesService";
import { useDispatch, useSelector } from "react-redux";
import { setFAndBCartId, setRestaurantCart } from "../redux/servicesRedux";

const FoodItemCard = ({ item, setLoading }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { selectedProperty } = useSelector(state => state.account);
  const { restaurantCart } = useSelector(state => state.services);
  const [quantity, setQuantity] = useState(item?.quantity || 0);

  const AddToCart = async (type) => {
    try {
      setLoading(true);
      const payload = {
        "itemId": item.itemId,
        "operation": type,
        "hotelId": selectedProperty.XipperID,
        "roomNumber": selectedProperty.roomNumber,
        "checkInId": selectedProperty.checkInId
      };

      const res = await AddFandBItemsToCart(payload);

      if (res.data.message === "Cart not found" || res.data.cart === "Cart Empty") {
        setQuantity(0);
        dispatch(setRestaurantCart([]));
      } else if ([200, 201].includes(res.status)) {

        if (type === "add") {
          const tempArr = Array.isArray(restaurantCart) ? [...restaurantCart] : [];
          const existingItemIndex = tempArr?.findIndex(i => item.itemId === i.itemId);
          if (existingItemIndex !== -1) {
            tempArr[existingItemIndex].quantity += 1;
          } else {
            tempArr.push({ ...item, quantity: 1 });
          }

          dispatch(setFAndBCartId(res.data.data.cart.cartId))
          dispatch(setRestaurantCart(tempArr));
          setQuantity((prev) => prev + 1);
        }

        if (type === "remove") {
          const existingItemIndex = restaurantCart?.findIndex(i => item.itemId === i.itemId);
          if (restaurantCart[existingItemIndex].quantity > 1) {

            const tempArr = restaurantCart;
            if (existingItemIndex !== -1) {
              tempArr[existingItemIndex].quantity -= 1;
            } else {
              tempArr = [];
            }

            dispatch(setRestaurantCart(tempArr));
            setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
          } else {
            const { [item.name]: _, ...rest } = restaurantCart;
            dispatch(setRestaurantCart(rest));
            setQuantity(0);
          }
        }
      }
    } catch (e) {
      console.error("Error adding item to cart:", e);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    AddToCart("add");
  };

  const decreaseQuantity = () => {
    AddToCart("remove");
  };

  return (
    <View className="flex-row mt-4 rounded-md border-b-2 pb-4 border-gray-200 space-x-1">
      <View className="flex-1">
        <Text className="font-bold text-black text-xl">{item.name}</Text>
        <View className="mt-1">
          <DynamicStars rating={5} />
        </View>
        <Text className="font-bold text-base text-black mb-3 mt-1">
          Rs. {item.price}
        </Text>
        <Text className="font-pmedium text-xs text-gray-400">
          {item.description || "Special Biriyani with 4 pieces chicken and raita included"}
        </Text>
      </View>
      <View className="flex-1">
        <Image
          source={{ uri: item.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XArdJVkpI1uLU-3LxxkUhKHosbHkt8da6w&s" }}
          resizeMode="cover"
          style={{ height: 150, width: "100%", borderRadius: 8 }}
          className="overflow-hidden border p-3"
        />
        {quantity === 0 ? (
          <Pressable
            className="px-3 py-2 bg-white rounded-lg mt-[-20] self-center border border-[#EE1E25] relative w-[80]"
            onPress={increaseQuantity}
          >
            <Text className="absolute top-[-6] right-0 text-[20px] text-[#EE1E25]">
              +
            </Text>
            <Text className="font-pregular text-base text-[#EE1E25] text-center">
              Add
            </Text>
          </Pressable>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#E9D7FE",
              borderColor: "#9F7AEA",
              borderWidth: 1,
              borderRadius: 8,
              marginTop: -20,
              alignSelf: "center",
            }}
          >
            <Pressable onPress={decreaseQuantity} className="pr-4">
              <Text style={{ fontSize: 18 }}>-</Text>
            </Pressable>
            <Text >{quantity}</Text>
            <Pressable onPress={increaseQuantity} className="pl-4">
              <Text style={{ fontSize: 18 }}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 150,
    width: "100%",
    borderRadius: 8
  }
});

export default FoodItemCard;
