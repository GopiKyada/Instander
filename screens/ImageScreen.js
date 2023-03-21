import {
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  AntDesign,
  Ionicons,
  Entypo,
  FontAwesome5,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ImageScreen = ({ route, navigation }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("medium");
  const [isLiked, setIsLiked] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    // Do something with the selected option, such as triggering a download
  };

  const getUserImage = async () => {
    setLoading(true);
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
        latitude: mydata.location.position.latitude,
        longitude: mydata.location.position.longitude,
        views: mydata.views,
        downloads: mydata.downloads,
        hire: mydata.user.for_hire,
        location: mydata.user.location,
        tags: mydata.tags,
      };
      // console.warn(updatedImages);
      setImage(updatedImages);
      setLoading(false);
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

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    Toast.show({
      type: "success",
      text1: isLiked ? "Unliked" : "Liked",
      text2: "Thanks for your feedback!",
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 0,
      bottomOffset: 0,
    });
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loader}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#aaa"
            />
            <Text style={styles.loadingTxt}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.profileContainer}>
            <View style={styles.profileImgContainer}>
              <Image
                style={styles.profileImg}
                source={{ uri: image.profileImg }}
              />
            </View>
            <View>
              <Text style={styles.usersNameText}>{image.name}</Text>
              {/* <Text style={styles.userNameTxt}>@{image.userName}</Text> */}
              {image.hire == "true" ? (
                <Text style={styles.noViews}>Not Available for hire</Text>
              ) : (
                <Text style={styles.userNameTxt}>
                  Available for hire
                  <MaterialIcons name="verified" size={18} />
                </Text>
              )}
            </View>
          </View>
          <View style={styles.profileContainer2}>
            <TouchableOpacity onPress={handleLikePress}>
              <AntDesign
                style={styles.upperLikeIcon}
                name={isLiked ? "heart" : "hearto"}
                size={20}
                color={isLiked ? "red" : "black"}
              />
            </TouchableOpacity>
            <Toast />
            <TouchableOpacity>
              <Ionicons
                name="ios-add"
                style={styles.upperAddIcon}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.downloadMenuContainer}
            >
              <Text style={styles.downloadText}>
                Download ({selectedOption})
              </Text>
              <Entypo
                name="chevron-thin-down"
                style={styles.downButton}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.title}>Select download size</Text>
                  <TouchableOpacity onPress={() => handleOptionSelect("large")}>
                    <Text style={styles.option}>Large</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("medium")}
                  >
                    <Text style={styles.option}>Medium</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionSelect("small")}>
                    <Text style={styles.option}>Small</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <ImageBackground
            source={{ uri: image.url }}
            resizeMode="cover"
            style={styles.imageBackground}
            opacity={0.5}
          >
            <Image
              source={{ uri: image.url }}
              resizeMode="contain"
              style={styles.image}
            />
          </ImageBackground>

          <View style={styles.viewsDownloadsContainer}>
            <View>
              {image.views == 0 ? (
                <View>
                  <Text style={styles.viewsDownloadsTitleTxt}>Views</Text>
                  <Text style={styles.viewsDownloadsTxt}>--</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.viewsDownloadsTitleTxt}>Views</Text>
                  <Text style={styles.viewsDownloadsTxt}>{image.views}</Text>
                </View>
              )}

              {image.downloads == 0 ? (
                <View>
                  <Text style={styles.viewsDownloadsTitleTxt}>Downloads</Text>
                  <Text style={styles.viewsDownloadsTxt}>--</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.viewsDownloadsTitleTxt}>Downloads</Text>
                  <Text style={styles.viewsDownloadsTxt}>
                    {image.downloads}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={{ paddingLeft: 100 }}>
              <FontAwesome5
                name="share"
                size={20}
                color="#555"
                style={styles.upperLikeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                style={styles.upperLikeIcon}
                name="info"
                size={22}
                color="#555"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                style={styles.upperLikeIcon}
                name="dots-three-horizontal"
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          <View>
            {image.location ? (
              <View style={styles.locationTxtContainer}>
                <Octicons
                  name="location"
                  size={18}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.locationTxt}
                >
                  {image.location.length > 15
                    ? `${image.location.substring(0, 15)}...`
                    : image.location}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  locationIcon: {
    paddingLeft: 15,
    paddingTop: 7,
  },
  locationTxtContainer: {
    flexDirection: "row",
  },
  locationTxt: {
    paddingLeft: 8,
    fontSize: 20,
  },
  viewsDownloadsTxt: {
    fontSize: 15,
  },
  viewsDownloadsTitleTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewsDownloadsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  imageBackground: {
    width: "100%",
    aspectRatio: 1, // set the aspect ratio to the image aspect ratio
  },
  image: {
    width: "100%",
    aspectRatio: 1, // set the aspect ratio to the image aspect ratio
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    // justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    minWidth: "50%",
    maxWidth: "90%",
    marginTop: 200,
    marginLeft: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
  },
  downButton: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  downloadMenuContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#555",
    marginLeft: 50,
    // width: 230,
  },
  upperLikeIcon: {
    borderWidth: 2,
    paddingLeft: 15,
    paddingRight: 13,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    borderColor: "#555",
    marginLeft: 10,
  },
  downloadText: {
    // borderWidth: 2,
    borderRightWidth: 2,
    width: 200,
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 6,
    paddingHorizontal: 5,
    // borderRadius: 5,
    borderColor: "#555",
  },
  upperAddIcon: {
    borderWidth: 2,
    paddingLeft: 15,
    paddingRight: 13,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    borderColor: "#555",
    marginLeft: 10,
  },

  profileContainer2: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
  },
  imgContainer: {
    // height: 400,
    // width: "100%",
    // justifyContent: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    // height: "100%",
    // width: "100%",
    // resizeMode: "contain",
    width: "100%",
    height: undefined,
    aspectRatio: 1,
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
    backgroundColor: "white",
  },
  usersNameText: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
  },
  userNameTxt: {
    // opacity: 0.5,
    color: "#0099FF",
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
  loader: {
    marginVertical: 380,
    alignItems: "center",
    // backgroundColor: "red",
    // justifyContent: "center",
  },
  loadingTxt: {
    fontSize: 20,
    color: "white",
  },
  loadingIndicator: {},
  loaderContainer: {
    backgroundColor: "#555",
    padding: 20,
    borderRadius: 10,
  },
});
