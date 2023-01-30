import { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  Alert,
  Linking,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import OutlinedButton from "../components/UI/OutlinedButton";

const UserDetail = ({ route, navigation }) => {
  //const image = require("../images/bgimage.jpg");
  const item = route.params.itemArr;
  //console.log(route);
  function messageSendHandler() {
    navigation.navigate("Message");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FontAwesome5
            name="facebook-messenger"
            size={30}
            color="black"
            onPress={messageSendHandler}
          />
        );
      },
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{ uri: item.user.profile_image.large }}
          />
        </View>
        <View style={styles.simpleContainer}>
          <Text style={styles.titletxt}>{item.user.name}</Text>
          <Text style={styles.imptxt}>@{item.user.username}</Text>
          {/* <Text numberOfLines={1}>────────────────────────</Text> */}
        </View>
        <View style={styles.likeandPostContainer}>
          <View style={styles.likeContainer}>
            <Text style={styles.titletxt}>Likes</Text>
            <Text style={styles.text}>{item.user.total_likes}</Text>
          </View>
          <View style={styles.postContainer}>
            <Text style={styles.titletxt}>Posts</Text>
            <Text style={styles.text}>{item.user.total_photos}</Text>
          </View>
        </View>

        {item.user.bio ? (
          <View style={styles.bioContainer}>
            <Text style={styles.titletxt}>Bio</Text>
            <Text style={styles.bioText}>{item.user.bio}</Text>
          </View>
        ) : null}

        {item.user.location ? (
          <View style={styles.bioContainer}>
            <Text style={styles.titletxt}>Location</Text>
            <Text style={styles.locationText}>
              <Ionicons name="location" size={20} color="black" />
              {item.user.location}
            </Text>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <OutlinedButton children="Message" onpress={messageSendHandler} />
          <OutlinedButton children="Follow" />
        </View>
        <View style={styles.socialmediaContainer}>
          {/* <Text style={styles.titletxt}>Social Media Appearance</Text> */}

          {item.user.social.instagram_username ? (
            <View style={styles.userText}>
              <Entypo
                name="instagram"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {item.user.social.instagram_username}
              </Text>
            </View>
          ) : null}

          {item.user.social.portfolio_url ? (
            <View style={styles.userText}>
              <MaterialCommunityIcons
                name="web"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL(item.user.social.portfolio_url)}
              >
                {item.user.social.portfolio_url}
              </Text>
            </View>
          ) : null}

          {item.user.social.twitter_username ? (
            <View style={styles.userText}>
              <AntDesign
                name="twitter"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {item.user.social.twitter_username}
              </Text>
            </View>
          ) : null}

          {item.user.social.paypal_email ? (
            <View style={styles.userText}>
              <Entypo
                name="paypal"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {item.user.social.paypal_email}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    //paddingTop: 30,
    marginHorizontal: 30,
  },
  imgContainer: {
    //width: 350,
    //height: 350,
    //margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "white",
    marginTop: 30,
  },
  titletxt: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 6,
    textAlign: "center",
    paddingBottom: 5,
  },
  imptxt: {
    fontSize: 18,
    textAlign: "center",
  },
  bioContainer: {
    marginBottom: 20,
    //height: 140,
    //minHeight: 140,
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 1,
    paddingTop: 10,
  },
  socialmediaContainer: {
    marginBottom: 20,
    //height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  likeandPostContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userText: {
    flexDirection: "row",
  },
  usernameText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 8,
    //paddingBottom: 20,
  },
  bioText: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 18,
    // fontWeight: "bold",
    paddingHorizontal: 20,
    paddingBottom: 10,
    //textAlign: "center",
  },
  likeContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    //paddingHorizontal: 50,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 1,
  },
  postContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    //marginLeft: 20,
    //paddingHorizontal: 50,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 1,
  },
  socialmediaText: {
    fontSize: 15,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  linkText: {
    fontSize: 15,
    paddingBottom: 10,
    paddingLeft: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  simpleContainer: {
    padding: 20,
  },
});
