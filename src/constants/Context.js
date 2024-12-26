import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await loadUserData();
      await loadMessages();
      setIsLoading(false);
    };

    loadData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem("messages");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  const saveMessage = async (roomName, messageData) => {
    const updatedMessages = {
      ...messages,
      [roomName]: [...(messages[roomName] || []), messageData],
    };
    setMessages(updatedMessages);
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Or any loading indicator you prefer
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, messages, saveMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotelData, setHotelData] = useState({});

  const updateHotelData = (newData) => {
    setHotelData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <HotelContext.Provider value={{ hotelData, updateHotelData }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
};