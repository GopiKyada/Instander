import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DarkLightToggle from "../components/OTHER/DarkLightToggle";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <DarkLightToggle />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // alignItems: "center",
  },
});
