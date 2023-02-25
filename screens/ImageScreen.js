import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

const ImageScreen = ({ route, navigation }) => {
  const [image, setImage] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

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
      };
      console.warn(updatedImages);
      setImage(updatedImages);

      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.warn(image);
  useEffect(() => {
    getUserImage();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: image.name,
    });
  });

  return (
    <View>
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
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  imgContainer: {
    height: 400,
    width: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
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
  },
  profileContainer: {
    flexDirection: "row",
    // borderWidth: 1,
  },
  usersNameText: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
    // fontWeight: "bold",
  },
  userNameTxt: {
    opacity: 0.5,
    paddingLeft: 20,
  },
});
