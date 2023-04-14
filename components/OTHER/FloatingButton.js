import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { FloatingAction } from "react-native-floating-action";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./ThemeContext";

const FloatingButton = ({ onToggleColorScheme }) => {
  const { isDarkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const actions = [
    {
      text: isDarkMode ? "Light" : "Dark",
      icon: isDarkMode ? (
        <Feather name="sun" size={24} color="white" />
      ) : (
        <FontAwesome name="moon-o" size={24} color="white" />
      ),
      name: "darkLight",
      position: 1,
    },
    {
      text: "Settings",
      icon: <Ionicons name="ios-settings-sharp" size={24} color="white" />,
      name: "setting",
      position: 3,
    },
  ];

  return (
    <View style={styles.container}>
      {/* other components */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "setting") {
            navigation.navigate("Setting");
          }
          if (name === "darkLight") {
            toggleDarkMode();
          }
        }}
      />
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
