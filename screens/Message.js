import { View, Text, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Message() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput style={styles.textBox} />
        <FontAwesome name="send" size={35} color="grey" />
      </View>
    </SafeAreaView>
  );
}

export default Message;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flexDirection: "row",
    position: "absolute", //Here is the trick
    bottom: 10, //Here is the trick
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  textBox: {
    height: 50,
    width: "80%",
    marginLeft: 12,
    padding: 10,
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
