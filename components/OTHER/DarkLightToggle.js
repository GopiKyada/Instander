import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { Feather, FontAwesome } from "@expo/vector-icons";

const DarkLightToggle = () => {
  const { isDarkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>
        Hello, world!
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleDarkMode}>
        <Text style={styles.buttonText}>
          {isDarkMode ? (
            <Feather name="sun" size={24} color="white" />
          ) : (
            <FontAwesome name="moon-o" size={24} color="white" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default DarkLightToggle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#BB86FC",
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
