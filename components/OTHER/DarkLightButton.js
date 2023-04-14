import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./ThemeContext";

const DarkLightButton = () => {
  const { theme, isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.cardColor }]}
      onPress={toggleDarkMode}
    >
      <View>
        <Text style={[styles.txt, { color: theme.textColor }]}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Text style={[styles.smallTxt, { color: theme.textColor }]}>
          {isDarkMode
            ? "(tap for change theme to Light Mode)"
            : "(tap for change theme to Dark Mode)"}
        </Text>
      </View>
      <View style={styles.icon}>
        {isDarkMode ? (
          <FontAwesome name="moon-o" size={30} color={theme.textColor} />
        ) : (
          <Feather name="sun" size={30} color={theme.textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DarkLightButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  txt: {
    fontSize: 22,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 20,
    paddingTop: 25,
  },
  smallTxt: {
    paddingBottom: 5,
  },
});
