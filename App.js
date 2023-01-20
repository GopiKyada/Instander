import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import HookEffect from "./screens/HookEffect";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HookEffect />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
