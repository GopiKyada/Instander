import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";

function Message({ route, navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.usrProfileContainer}>
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              paddingLeft: 10,
              // borderWidth: 1,
              borderRadius: 50,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
            }}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <View style={styles.usrProfileImageContainer}>
          <Image
            style={styles.usrProfileImage}
            source={{ uri: route.params.profileImage }}
          />
        </View>
        <View style={styles.usrnameTxtContainer}>
          {/* <Text style={styles.usrsnameTxt}>{route.params.name}</Text> */}
          <Text style={styles.usrsnameTxt}>
            {route.params.name.length > 17
              ? `${route.params.name.substring(0, 17)}...`
              : route.params.name}
          </Text>
          <Text style={styles.usrnameTxt}>@{route.params.userName}</Text>
        </View>
        <TouchableOpacity style={styles.infoIcon}>
          <Feather
            name="info"
            size={30}
            color="black"
            onPress={() => {
              navigation.navigate("UserDetail", {
                itemArr: route.params.item,
              });
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.videocallIcon}>
          <Feather name="video" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.callIcon}>
          <Ionicons name="call-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput style={styles.textBox} placeholder="Message..." />
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
  infoIcon: {
    marginTop: 15,
    marginRight: 5,
    position: "absolute",
    right: 5,
  },
  videocallIcon: {
    marginTop: 15,
    marginRight: 5,
    position: "absolute",
    right: 44,
  },
  callIcon: {
    marginTop: 15,
    marginRight: 5,
    position: "absolute",
    right: 84,
  },
});
