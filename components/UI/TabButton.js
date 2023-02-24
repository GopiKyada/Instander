import { StyleSheet, Text, Pressable } from "react-native";

const TabButton = ({ onpress, children }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onpress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    marginVertical: 15,
    width: "33.33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dce4e6",
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
