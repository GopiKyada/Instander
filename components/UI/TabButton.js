import { TouchableOpacity, StyleSheet, Text } from "react-native";

const TabButton = ({ onpress, children }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onpress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
