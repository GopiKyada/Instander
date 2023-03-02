import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Message({ route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.usrProfileContainer}>
        <View style={styles.usrProfileImageContainer}>
          <Image
            style={styles.usrProfileImage}
            source={{ uri: route.params.profileImage }}
          />
        </View>
        <View style={styles.usrnameTxtContainer}>
          <Text style={styles.usrsnameTxt}>{route.params.name}</Text>
          <Text style={styles.usrnameTxt}>@{route.params.userName}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput style={styles.textBox} />
        <FontAwesome name="send" size={35} color="grey" />
      </View>
    </SafeAreaView>
  );
}

export default Message;

const styles = StyleSheet.create({
  usrProfileContainer: {
    marginTop: 30,
    // borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  usrProfileImageContainer: {
    height: 50,
    width: 50,
    // borderRadius: 50,
    marginLeft: 10,
    marginVertical: 8,
  },
  usrProfileImage: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  usrnameTxtContainer: {
    marginLeft: 15,
    marginTop: 10,
  },
  usrsnameTxt: {
    fontWeight: "bold",
  },
  usrnameTxt: {
    opacity: 0.5,
  },
  bottomContainer: {
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
