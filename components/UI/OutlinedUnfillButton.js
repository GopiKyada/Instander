import { Pressable, Text, StyleSheet, View } from "react-native";

function OutlinedUnfillButton({ onpress, children }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onpress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default OutlinedUnfillButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    right: 10,
    //justifyContent: "flex-end",
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    //marginHorizontal: 8,
    //flexDirection: "row",
    //justifyContent: "center",
    //alignItems: "center",
    borderWidth: 2,
    borderColor: "#dce4e6",
    //backgroundColor: "#0765e0",
    borderRadius: 5,
    alignItems: "flex-end",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 15,
    //fontWeight: "bold",
    //color: "white",
  },
});
