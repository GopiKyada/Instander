import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FloatingButton = ({ onToggleColorScheme }) => {
  const navigation = useNavigation();
  const actions = [
    {
      text: "Dark",
      icon: <FontAwesome name="moon-o" size={24} color="black" />,
      name: "dark",
      position: 1,
      onPress: () => onToggleColorScheme(),
    },
    {
      text: "Light",
      icon: <Feather name="sun" size={24} color="black" />,
      name: "light",
      position: 2,
      onPress: () => onToggleColorScheme(),
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
