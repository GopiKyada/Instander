import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const listTab = [
  {
    status: "All",
  },
  {
    status: "Purple",
  },
  {
    status: "Green",
  },
];

const Tab = () => {
  const [status, setStatus] = useState("All");

  const [myUserData, setMyUserData] = useState();

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const getUserImageData = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/users/maxberg/photos/?client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw"
      );
      const mydata = await response.json();
      setMyUserData(mydata);
      // console.log(mydata);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserImageData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {listTab.map((e) => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text
              key="status"
              style={[
                styles.textTab,
                status === e.status && styles.textTabActive,
              ]}
            >
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={myUserData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={{ uri: item.urls.full }} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 10,
  },
  btnTabActive: {
    backgroundColor: "#E6838D",
  },
  textTabActive: {
    color: "white",
  },
  imgContainer: {
    height: 300,
    width: 300,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
