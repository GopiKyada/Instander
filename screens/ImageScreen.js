import {
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,
  Linking,
} from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Feather,
  MaterialIcons,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import ReportPopup from "../components/OTHER/ReportPopup";
import GraphModal from "../components/OTHER/GraphModal";
import Map from "../components/OTHER/Map";
import { Colors } from "../constants/colors";
import { ThemeContext } from "../components/OTHER/ThemeContext";

const ImageScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("medium");
  const [isLiked, setIsLiked] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: image.name,
    });
  });

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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    // Do something with the selected option, such as triggering a download
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    ToastAndroid.show(isLiked ? "Disliked !" : "Liked !", ToastAndroid.SHORT);
  };

  const handleReportPress = () => {
    setReportVisible(true);
  };

  const handleReportClose = () => {
    setReportVisible(false);
  };

  const handleInfoPress = () => {
    setGraphVisible(true);
  };

  const handleGraphClose = () => {
    setGraphVisible(false);
  };

  const onShare = async () => {
    try {
      const { uri: localUri } = await FileSystem.downloadAsync(
        image.url,
        FileSystem.documentDirectory + "image.jpg"
      );

      await Sharing.shareAsync(localUri);
    } catch (error) {
      alert(error.message);
    }
  };

  const openImageUrl = () => {
    Linking.openURL(image.url);
  };

  return (
    <ScrollView style={{ backgroundColor: theme.backgroundColor }}>
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
            <View>
              <Ionicons
                name="arrow-back"
                size={30}
                color={theme.textColor}
                style={{
                  paddingTop: 15,
                  paddingBottom: 10,
                  paddingRight: 5,
                  paddingLeft: 10,
                  // borderWidth: 1,
                  // borderRadius: 50,
                  // backgroundColor: "white",
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.profileImgContainer}>
              <Image
                style={styles.profileImg}
                source={{ uri: image.profileImg }}
              />
            </View>
            <View>
              <Text style={[styles.usersNameText, { color: theme.textColor }]}>
                {image.name}
              </Text>
              {/* <Text style={styles.userNameTxt}>@{image.userName}</Text> */}
              {image.hire == "true" ? (
                <Text style={styles.noViews}>Not Available for hire</Text>
              ) : (
                <View style={styles.userNameTxt}>
                  <Text style={{ color: "#0099FF", paddingRight: 3 }}>
                    Available for hire
                  </Text>
                  <MaterialIcons name="verified" size={18} color="#0099FF" />
                </View>
              )}
            </View>
          </View>
          <View style={styles.profileContainer2}>
            <TouchableOpacity onPress={handleLikePress}>
              <AntDesign
                style={styles.upperLikeIcon}
                name={isLiked ? "heart" : "hearto"}
                size={20}
                color={isLiked ? "red" : theme.textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.downloadMenuContainer}
            >
              <Text style={[styles.downloadText, { color: theme.textColor }]}>
                Download ({selectedOption})
              </Text>
              <Entypo
                name="chevron-thin-down"
                style={styles.downButton}
                size={20}
                color={theme.textColor}
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
                <View
                  style={[
                    styles.modalContainer,
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <Text style={[styles.title, { color: theme.textColor }]}>
                    Select download size
                  </Text>
                  <TouchableOpacity onPress={() => handleOptionSelect("large")}>
                    <Text style={[styles.option, { color: theme.textColor }]}>
                      Large
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("medium")}
                  >
                    <Text style={[styles.option, { color: theme.textColor }]}>
                      Medium
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionSelect("small")}>
                    <Text style={[styles.option, { color: theme.textColor }]}>
                      Small
                    </Text>
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
          <TouchableOpacity
            onPress={openImageUrl}
            style={styles.ViewinBrowserContainer}
          >
            <Text style={styles.ViewinBrowsertxt}>View In Browser</Text>
            <FontAwesome5
              name="firefox-browser"
              size={20}
              color="#0099FF"
              style={{ paddingLeft: 5 }}
            />
          </TouchableOpacity>

          <View style={styles.viewsDownloadsContainer}>
            <View>
              {image.views == 0 ? (
                <View>
                  <Text
                    style={[
                      styles.viewsDownloadsTitleTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    Views
                  </Text>
                  <Text
                    style={[
                      styles.viewsDownloadsTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    --
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={[
                      styles.viewsDownloadsTitleTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    Views
                  </Text>
                  <Text
                    style={[
                      styles.viewsDownloadsTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    {image.views}
                  </Text>
                </View>
              )}

              {image.downloads == 0 ? (
                <View>
                  <Text
                    style={[
                      styles.viewsDownloadsTitleTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    Downloads
                  </Text>
                  <Text
                    style={[
                      styles.viewsDownloadsTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    --
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={[
                      styles.viewsDownloadsTitleTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    Downloads
                  </Text>
                  <Text
                    style={[
                      styles.viewsDownloadsTxt,
                      { color: theme.textColor },
                    ]}
                  >
                    {image.downloads}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={{ paddingLeft: 100 }}>
              <FontAwesome5
                name="share"
                size={20}
                color={theme.textColor}
                style={styles.upperLikeIcon}
                onPress={onShare}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInfoPress}>
              <Feather
                style={styles.upperLikeIcon}
                name="info"
                size={22}
                color={theme.textColor}
              />
            </TouchableOpacity>
            <GraphModal
              visible={graphVisible}
              onClose={handleGraphClose}
              username={image.userName}
            />
            <TouchableOpacity onPress={handleReportPress}>
              <Entypo
                style={styles.upperLikeIcon}
                name="dots-three-horizontal"
                size={24}
                color={theme.textColor}
              />
            </TouchableOpacity>
            <ReportPopup visible={reportVisible} onClose={handleReportClose} />
          </View>
          <View>
            {image.location ? (
              <View style={styles.locationTxtContainer}>
                <Octicons
                  name="location"
                  size={18}
                  color={theme.textColor}
                  style={styles.locationIcon}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.locationTxt, { color: theme.textColor }]}
                >
                  {image.location.length > 15
                    ? `${image.location.substring(0, 15)}...`
                    : image.location}
                </Text>
              </View>
            ) : null}
          </View>
          {image.latitude ? (
            <View>
              <Map lat={image.latitude} lng={image.longitude} />
            </View>
          ) : null}
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
    // color: Colors.white,
  },
  viewsDownloadsTxt: {
    fontSize: 15,
    // color: Colors.white,
  },
  viewsDownloadsTitleTxt: {
    fontSize: 18,
    fontWeight: "bold",
    // color: Colors.white,
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
    // backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 20,
    minWidth: "50%",
    maxWidth: "90%",
    marginTop: 150,
    marginLeft: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // color: Colors.white,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
    // color: Colors.white,
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
    marginLeft: 110,
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
    // color: Colors.white,
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
    // backgroundColor: Colors.black,
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
    // backgroundColor: Colors.black,
  },
  usersNameText: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
    // color: Colors.white,
  },
  userNameTxt: {
    // opacity: 0.5,
    color: "#0099FF",
    paddingLeft: 20,
    flexDirection: "row",
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
  loaderContainer: {
    backgroundColor: "#555",
    padding: 20,
    borderRadius: 10,
  },
  ViewinBrowsertxt: {
    fontSize: 15,
    color: "#0099FF",
    paddingLeft: 100,
  },
  ViewinBrowserContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#0099FF",
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: "row",
  },
});
