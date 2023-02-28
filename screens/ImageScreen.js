import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, Fontisto, FontAwesome } from "@expo/vector-icons";

const ImageScreen = ({ route, navigation }) => {
  const [image, setImage] = useState([]);

  const getUserImage = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/${route.params.itemId}/?client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
      );
      const mydata = await response.json();
      const updatedImages = {
        id: mydata.id,
        name: mydata.user.name,
        url: mydata.urls.regular,
        profileImg: mydata.user.profile_image.large,
        userName: mydata.user.username,
        likes: mydata.likes,
        description: mydata.alt_description,
      };
      // console.warn(updatedImages);
      setImage(updatedImages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserImage();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: image.name,
    });
  });

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.profileImgContainer}>
          <Image style={styles.profileImg} source={{ uri: image.profileImg }} />
        </View>
        <View>
          <Text style={styles.usersNameText}>{image.name}</Text>
          <Text style={styles.userNameTxt}>@{image.userName}</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: image.url }} />
      </View>
      <View style={styles.descriptionTextContainer}>
        <Text style={styles.descriptionTxt}>{image.description}</Text>
      </View>
      <View style={styles.likeContainer}>
        <AntDesign
          style={styles.likeIcon}
          name="hearto"
          size={30}
          color="black"
        />
        <Fontisto name="comment" size={30} color="black" />
        <FontAwesome
          style={styles.saveIcon}
          name="bookmark-o"
          size={30}
          color="black"
        />
      </View>
      <View>
        <Text style={styles.likeTxt}>{image.likes} likes</Text>
      </View>
    </ScrollView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  imgContainer: {
    height: 400,
    width: "100%",
    justifyContent: "center",
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  profileImgContainer: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginLeft: 20,
    marginVertical: 10,
  },
  profileImg: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  profileContainer: {
    flexDirection: "row",
  },
  usersNameText: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
  },
  userNameTxt: {
    opacity: 0.5,
    paddingLeft: 20,
  },
  likeContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  likeIcon: {
    paddingRight: 10,
  },
  saveIcon: {
    position: "absolute",
    right: 10,
    paddingVertical: 10,
  },
  likeTxt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionTextContainer: {
    paddingHorizontal: 10,
  },
  descriptionTxt: {
    fontSize: 15,
  },
});
