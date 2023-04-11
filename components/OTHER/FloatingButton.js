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
      text: "Dark",
      icon: <FontAwesome name="moon-o" size={24} color="white" />,
      name: "dark",
      position: 1,
      onPress: () => toggleDarkMode(),
    },
    {
      text: "Light",
      icon: <Feather name="sun" size={24} color="white" />,
      name: "light",
      position: 2,
      onPress: () => onToggleColorScheme(),
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
        }}
      />
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
