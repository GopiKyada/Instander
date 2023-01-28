import { Pressable, StyleSheet, Text } from "react-native";

function OutlinedButton({ onpress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onpress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 45,
    paddingVertical: 6,
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dce4e6",
    backgroundColor: "#0765e0",
    borderRadius: 5,
  },
  pressed: { opacity: 0.7 },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
