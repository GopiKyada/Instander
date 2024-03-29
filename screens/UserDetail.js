import { useLayoutEffect, useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";

import OutlinedButton from "../components/UI/OutlinedButton";
import OutlinedUnfillButton from "../components/UI/OutlinedUnfillButton";
import { Colors } from "../constants/colors";
import { ThemeContext } from "../components/OTHER/ThemeContext";

const backgroundColor = Colors.blue;

const color = Colors.white;

const UserDetail = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const navigations = useNavigation();
  const [imageList, setImageList] = useState([]);
  const [orientation, setorientation] = useState("landscape");
  const [style, setStyle] = useState(styles.landscapeImg);
  const [landscapeStyle, setLandscapeStyle] = useState([
    styles.buttonLandscapeActive,
    { backgroundColor: theme.activeTab },
  ]);
  const [portraitStyle, setPortraitStyle] = useState([
    styles.portraitBtn,
    { backgroundColor: theme.tabColor },
  ]);
  const [squarishStyle, setSquarishStyle] = useState([
    styles.squaishBtn,
    ,
    { backgroundColor: theme.tabColor },
  ]);

  const landscapeHandler = () => {
    setorientation("landscape");
    setStyle(styles.landscapeImg);
    setLandscapeStyle([
      styles.buttonLandscapeActive,
      { backgroundColor: theme.activeTab },
    ]);
    setPortraitStyle([styles.portraitBtn, { backgroundColor: theme.tabColor }]);
    setSquarishStyle([styles.squaishBtn, { backgroundColor: theme.tabColor }]);
  };

  const portraitHandler = () => {
    setorientation("portrait");
    setStyle(styles.portraitImg);
    setPortraitStyle([
      styles.portraitBtnActive,
      { backgroundColor: theme.activeTab },
    ]);
    setLandscapeStyle([
      styles.landscapeBtn,
      { backgroundColor: theme.tabColor },
    ]);
    setSquarishStyle([styles.squaishBtn, { backgroundColor: theme.tabColor }]);
  };

  const squarishHandler = () => {
    setorientation("squarish");
    setStyle(styles.squarishImg);
    setSquarishStyle([
      styles.squarishBtnActive,
      { backgroundColor: theme.activeTab },
    ]);
    setLandscapeStyle([
      styles.landscapeBtn,
      { backgroundColor: theme.tabColor },
    ]);
    setPortraitStyle([styles.portraitBtn, { backgroundColor: theme.tabColor }]);
  };

  const getUserImageData = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/users/${items.user.username}/photos/?orientation=${orientation}&per_page=9&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
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
    navigations.setOptions({
      headerStyle: {
        backgroundColor: theme.backgroundColor, // set your desired color here
      },
      headerTitleStyle: {
        color: theme.textColor, // set your desired color here
      },
      headerTintColor: theme.textColor,
    });
  }, [getUserImageData, orientation, theme]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FontAwesome5
            name="facebook-messenger"
            size={30}
            color="#256BFE"
            // style={{ backgroundColor: "white" }}
            onPress={messageSendHandler}
          />
        );
      },
    });
  });

  const items = route.params.itemArr;
  function messageSendHandler() {
    navigation.navigate("Message", {
      name: items.user.name,
      userName: items.user.username,
      profileImage: items.user.profile_image.large,
      item: items,
    });
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{ uri: items.user.profile_image.large }}
          />
        </View>
        <View style={styles.simpleContainer}>
          <Text style={[styles.titletxt, { color: theme.textColor }]}>
            {items.user.name}
          </Text>
          <Text style={[styles.imptxt, { color: theme.textColor }]}>
            @{items.user.username}
          </Text>
        </View>
        <View style={styles.likeandPostContainer}>
          <View
            style={[styles.likeContainer, { backgroundColor: theme.cardColor }]}
          >
            <Text style={[styles.titletxt, { color: theme.textColor }]}>
              Likes
            </Text>
            <Text style={[styles.text, , { color: theme.textColor }]}>
              {items.user.total_likes}
            </Text>
          </View>
          <View
            style={[styles.postContainer, { backgroundColor: theme.cardColor }]}
          >
            <Text style={[styles.titletxt, { color: theme.textColor }]}>
              Posts
            </Text>
            <Text style={[styles.text, { color: theme.textColor }]}>
              {items.user.total_photos}
            </Text>
          </View>
        </View>
        {items.user.bio ? (
          <View
            style={[styles.bioContainer, { backgroundColor: theme.cardColor }]}
          >
            <Text style={[styles.titletxt, { color: theme.textColor }]}>
              Bio
            </Text>
            <Text style={[styles.bioText, { color: theme.textColor }]}>
              {items.user.bio}
            </Text>
          </View>
        ) : null}
        {items.user.location ? (
          <View
            style={[styles.bioContainer, { backgroundColor: theme.cardColor }]}
          >
            <Text style={[styles.titletxt, { color: theme.textColor }]}>
              Location
            </Text>
            <View style={styles.locationTextContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.locationText, { color: theme.textColor }]}
              >
                <EvilIcons name="location" size={25} color={theme.textColor} />
                {items.user.location.length > 20
                  ? `${items.user.location.substring(0, 20)}...`
                  : items.user.location}
              </Text>
              {/* <OutlinedUnfillButton children="View on Map" /> */}
            </View>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <OutlinedButton children="Message" onpress={messageSendHandler} />
          <OutlinedButton children="Follow" />
        </View>
        {items.user.social.instagram_username ? (
          <View
            style={[
              styles.socialmediaContainer,
              { backgroundColor: theme.cardColor },
            ]}
          >
            <View style={styles.userText}>
              <Entypo
                name="instagram"
                size={20}
                color={theme.textColor}
                style={styles.icon}
              />
              <Text
                style={[styles.socialmediaText, { color: theme.textColor }]}
              >
                {items.user.social.instagram_username}
              </Text>
            </View>
          </View>
        ) : null}
        {items.user.social.portfolio_url ? (
          <View
            style={[
              styles.socialmediaContainer,
              { backgroundColor: theme.cardColor },
            ]}
          >
            <View style={styles.userText}>
              <MaterialCommunityIcons
                name="web"
                size={20}
                color={theme.textColor}
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
          <View
            style={[
              styles.socialmediaContainer,
              { backgroundColor: theme.cardColor },
            ]}
          >
            <View style={styles.userText}>
              <AntDesign
                name="twitter"
                size={20}
                color={theme.textColor}
                style={styles.icon}
              />
              <Text
                style={[styles.socialmediaText, { color: theme.textColor }]}
              >
                {items.user.social.twitter_username}
              </Text>
            </View>
          </View>
        ) : null}
        {items.user.social.paypal_email ? (
          <View
            style={[
              styles.socialmediaContainer,
              { backgroundColor: theme.cardColor },
            ]}
          >
            <View style={styles.userText}>
              <Entypo
                name="paypal"
                size={20}
                color={theme.textColor}
                style={styles.icon}
              />
              <Text
                style={[styles.socialmediaText, { color: theme.textColor }]}
              >
                {items.user.social.paypal_email}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            borderWidth: 3,

            borderColor: theme.cardColor,
            borderRadius: 5,
            backgroundColor: theme.cardColor,
          }}
        >
          <TouchableOpacity onPress={landscapeHandler} style={landscapeStyle}>
            <Text style={[styles.lpstxt, { color: theme.textColor }]}>
              Landscape
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={portraitHandler} style={portraitStyle}>
            <Text style={[styles.lpstxt, { color: theme.textColor }]}>
              Portrait
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={squarishHandler} style={squarishStyle}>
            <Text style={[styles.lpstxt, { color: theme.textColor }]}>
              Squarish
            </Text>
          </TouchableOpacity>
        </View>

        {imageList == "" ? (
          <View style={styles.nullImgTxtContainer}>
            <MaterialIcons
              style={styles.nullImgIcon}
              name="image-not-supported"
              size={70}
              color={Colors.white}
            />
            <Text style={styles.nullImgTxt}>No Images ...</Text>
          </View>
        ) : (
          <View style={styles.imagePanel}>
            {imageList.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Image", {
                    itemId: item.id,
                    itemImage: item.uri,
                  });
                }}
                style={style}
                key={item.id}
              >
                <Image style={styles.image} source={{ uri: item.uri }} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  nullImgTxt: {
    fontSize: 20,
    paddingLeft: 130,
    opacity: 0.5,
    // color: Colors.white,
  },
  nullImgTxtContainer: {
    marginVertical: 100,
  },
  nullImgIcon: {
    paddingLeft: 140,
    paddingBottom: 10,
    opacity: 0.5,
  },
  tab: {
    flexDirection: "row",
  },
  imagePanel: {
    flex: 1,
    flexWrap: "wrap", //flexWrep is use for view overflow image at bottom
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 30,
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
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 30,
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
    // color,
  },
  imptxt: {
    fontSize: 18,
    textAlign: "center",
    // color,
  },
  bioContainer: {
    marginBottom: 20,
    justifyContent: "center",
    // backgroundColor,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 1,
    paddingTop: 10,
  },
  socialmediaContainer: {
    marginBottom: 10,
    // backgroundColor,
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
    // color: Colors.white,
  },
  bioText: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    // color,
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 20,
    // color,
  },
  locationText: {
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 10,
    // color,
  },
  likeContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 100,
    // backgroundColor,
    borderRadius: 10,
    shadowOpacity: 1,
  },
  postContainer: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor,
    borderRadius: 10,
    shadowOpacity: 1,
  },
  socialmediaText: {
    fontSize: 15,
    paddingBottom: 10,
    paddingLeft: 10,
    // color,
  },
  linkText: {
    fontSize: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  simpleContainer: {
    padding: 20,
  },
  tabBar: {
    flexDirection: "row",
  },
  landscapeImg: {
    height: 75,
    width: "31.9%",
    marginVertical: 2,
    marginHorizontal: 2,
    justifyContent: "center",
  },
  portraitImg: {
    height: 150,
    width: "31.9%",
    marginVertical: 2,
    marginHorizontal: 2,
    justifyContent: "center",
  },
  squarishImg: {
    height: 100,
    width: "31.9%",
    marginVertical: 2,
    marginHorizontal: 2,
    justifyContent: "center",
  },
  landscapeBtn: {
    // borderColor: "white",
    // backgroundColor: Colors.black,
    width: "33.34%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
  },
  portraitBtn: {
    // borderColor: "white",
    // backgroundColor: Colors.black,
    width: "33.33%",
    paddingVertical: 10,
  },
  squaishBtn: {
    // borderColor: "white",
    // backgroundColor: Colors.black,
    width: "33.33%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 10,
  },
  buttonLandscapeActive: {
    width: "33.34%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
    // backgroundColor: Colors.blue,
  },
  portraitBtnActive: {
    width: "33.33%",
    paddingVertical: 10,
    // backgroundColor: Colors.blue,
  },
  squarishBtnActive: {
    width: "33.33%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 10,
    // backgroundColor: Colors.blue,
  },
  lpstxt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    // color,
  },
});
