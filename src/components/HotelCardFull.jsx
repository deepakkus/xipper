import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import {
  HeartIcon,
  LocationIcon,
  ThreeDotIcon,
} from "../assets/images/Icons/HomeIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../redux/accountRedux";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const scaleFontSize = (size) => {
  const guidelineBaseWidth = 411;
  return size * (width / guidelineBaseWidth);
};

const HotelCardFull = ({ data }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector((state) => state.account);

  const handlePress = () => {
    dispatch(setSelectedProperty(data));
    nav.push("HotelDetails", { hotelData: data });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 8,
        width: width,
        alignSelf: "center",
      }}
    >
      <ImageBackground
        source={{
          uri: data.hotelImages?.[0] || "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}

        style={{
          height: 200,
          borderRadius: 8,
          marginBottom: 8,
          overflow: "hidden",
          paddingHorizontal: 10,
        }}
        resizeMode="cover"
      >
        <Text
          style={{
            backgroundColor: selectedProfile.type === "user" ? "#06A77D" : "#6D38C3",
            position: "absolute",
            paddingHorizontal: 10,
            height: 24,
            borderBottomRightRadius: 8,
            color: "white",
            fontWeight: "500",
            fontSize: scaleFontSize(14),
          }}
        >
          {data.offer || "Booking Fast"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 8,
          }}
        >
          <HeartIcon />
          <ThreeDotIcon />
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              backgroundColor: selectedProfile.type === "user" ? "#06A77D" : "#6D38C3",
              paddingHorizontal: 4,
              color: "white",
              borderRadius: 4,
              marginRight: 4,
              fontSize: scaleFontSize(12),
            }}
          >
            {data.hotelStarRating} Stars
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: scaleFontSize(12),
              color:  selectedProfile.type === "user" ? "#06A77D" : "#6D38C3",
            }}
          >
            Very Good
            <Text style={{ color: "black" }}> (120 ratings)</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* <FiveStarIcon />
            <Text
              style={{
                fontWeight: "500",
                fontSize: scaleFontSize(16),
                color: "black",
              }}
            >
              5 Star
            </Text> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: scaleFontSize(16),
            color: "black",
            marginTop: 5,
          }}
        >
          {data.name}
        </Text>
        <Text
          style={{
            fontWeight: "500",
            fontSize: scaleFontSize(12),
            color: "#808080",
            textDecorationLine: "line-through",
          }}
        >
          $2200
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LocationIcon color={"#999"} />
          <Text
            style={{
              fontWeight: "500",
              fontSize: scaleFontSize(12),
              color: "#808080",
            }}
          >
            {data.locality}, {data.city} - {data.pincode}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: scaleFontSize(12),
            color: "black",
          }}
        >
          $2200
        </Text>
      </View>
    </Pressable>
  );
};

export default HotelCardFull;
