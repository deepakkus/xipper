import React, { useState } from "react";
import { View, TextInput, Image, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { MicIcon } from "../assets/images/Icons/HomeIcon";

const SearchBar = ({
  placeholder,
  onSearch,
  searchText = "",
  setSearchText,
  onFocus,
  autoFocus = false,
  suggestions = [],
  loading = false,
  showResult = () => { }
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  const handleSuggestionPress = (item) => {
    setSearchText(item.name);
    showResult(item);
    setIsFocused(false); // Close the suggestions
    console.log("item", item);
  };

  return (
    <View style={[styles.container, { marginBottom: isFocused && 20 }]}>
      <View style={[styles.searchBar, isFocused && styles.focused]}>
        <View style={styles.searchInputWrapper}>
          <Image source={require("../assets/images/Action/search.png")} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSearch}
          />
          <Pressable onPress={() => console.log("Microphone icon clicked!")}>
            <MicIcon />
          </Pressable>
        </View>
      </View>

      {isFocused && searchText.length > 0 && (
        <ScrollView style={styles.suggestionsContainer}>
          {loading ? (
            <View style={styles.suggestionItem}>
              <Text style={styles.suggestionsText}>Loading...</Text>
            </View>
          ) : (
            suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleSuggestionPress(item)}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionsText}>{item.name}</Text>
                </Pressable>
              ))
            ) : (
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionsText}>No suggestions available</Text>
              </View>
            )
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  searchBar: {
    backgroundColor: "white",
    paddingVertical: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  focused: {
    borderColor: "#1E90FF", // Blue border when focused
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  suggestionsContainer: {
    position: "absolute",
    top: 50, // Adjust depending on where your input field is
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 3,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionsText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
