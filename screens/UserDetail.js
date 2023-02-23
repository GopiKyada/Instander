import { useLayoutEffect, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  SafeAreaView,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import OutlinedButton from "../components/UI/OutlinedButton";
import OutlinedUnfillButton from "../components/UI/OutlinedUnfillButton";
import TabButton from "../components/UI/TabButton";

const UserDetail = ({ route, navigation }) => {
  const [myUserData, setMyUserData] = useState();
  const [imageList, setImageList] = useState([]);

  const getUserImageData = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/users/${items.user.username}/photos/?per_page=&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
      );
      const mydata = await response.json();
      const updatedImages = mydata.map((img) => ({
        id: img.id,
        uri: img.urls.thumb,
      }));
      setImageList(updatedImages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserImageData();
  }, []);

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

  const items = route.params.itemArr;
  function messageSendHandler() {
    navigation.navigate("Message");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{ uri: items.user.profile_image.large }}
          />
        </View>
        <View style={styles.simpleContainer}>
          <Text style={styles.titletxt}>{items.user.name}</Text>
          <Text style={styles.imptxt}>@{items.user.username}</Text>
        </View>
        <View style={styles.likeandPostContainer}>
          <View style={styles.likeContainer}>
            <Text style={styles.titletxt}>Likes</Text>
            <Text style={styles.text}>{items.user.total_likes}</Text>
          </View>
          <View style={styles.postContainer}>
            <Text style={styles.titletxt}>Posts</Text>
            <Text style={styles.text}>{items.user.total_photos}</Text>
          </View>
        </View>

        {items.user.bio ? (
          <View style={styles.bioContainer}>
            <Text style={styles.titletxt}>Bio</Text>
            <Text style={styles.bioText}>{items.user.bio}</Text>
          </View>
        ) : null}

        {items.user.location ? (
          <View style={styles.bioContainer}>
            <Text style={styles.titletxt}>Location</Text>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>
                <Ionicons name="location" size={20} color="black" />
                {items.user.location}
              </Text>
              <OutlinedUnfillButton children="View on Map" />
            </View>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <OutlinedButton children="Message" onpress={messageSendHandler} />
          <OutlinedButton children="Follow" />
        </View>

        {items.user.social.instagram_username ? (
          <View style={styles.socialmediaContainer}>
            <View style={styles.userText}>
              <Entypo
                name="instagram"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {items.user.social.instagram_username}
              </Text>
            </View>
          </View>
        ) : null}

        {items.user.social.portfolio_url ? (
          <View style={styles.socialmediaContainer}>
            <View style={styles.userText}>
              <MaterialCommunityIcons
                name="web"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL(items.user.social.portfolio_url)}
              >
                {items.user.social.portfolio_url}
              </Text>
            </View>
          </View>
        ) : null}

        {items.user.social.twitter_username ? (
          <View style={styles.socialmediaContainer}>
            <View style={styles.userText}>
              <AntDesign
                name="twitter"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {items.user.social.twitter_username}
              </Text>
            </View>
          </View>
        ) : null}

        {items.user.social.paypal_email ? (
          <View style={styles.socialmediaContainer}>
            <View style={styles.userText}>
              <Entypo
                name="paypal"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.socialmediaText}>
                {items.user.social.paypal_email}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.tabBar}>
          <TabButton children="Landscape" />
          <TabButton children="Portrait" />
          <TabButton children="Squarish" />
        </View>

        <View style={styles.imagePanel}>
          {imageList.map((item) => (
            <View style={styles.imgContainers} key={item.id}>
              <Image style={styles.image} source={{ uri: item.uri }} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  imagePanel: {
    flex: 1,
    flexWrap: "wrap", //flexWrep is use for view overflow image at bottom
    flexDirection: "row",
    alignItems: "stretch",
  },
  imgContainers: {
    height: 100,
    width: "31.9%",
    marginVertical: 2,
    marginHorizontal: 2,
  },
  image: {
    height: "100%",
    width: "100%",
  },

  container: {
    marginHorizontal: 30,
  },
  imgContainer: {
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
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 1,
    paddingTop: 10,
  },
  socialmediaContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  locationTextContainer: {
    flexDirection: "row",
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
    paddingLeft: 20,
    paddingBottom: 10,
  },
  likeContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 1,
  },
  postContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
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
  tabBar: {
    flexDirection: "row",
  },
});
