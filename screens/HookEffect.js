import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const HookEffect = () => {
  const [myUserData, setMyUserData] = useState();
  const [isLoaded, setIsLoaded] = useState(true);

  const getUserData = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/?client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw"
      );
      const mydata = await response.json();
      setMyUserData(mydata);
      setIsLoaded(false);
      //console.log(mydata);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={myUserData}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={{ uri: item.user.profile_image.large }}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{item.user.name}</Text>
                <Text style={styles.usernameText}>@{item.user.username}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HookEffect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dce4e6",
    flex: 1,
    paddingTop: 28,
  },
  card: {
    height: 100,
    width: "95%",
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowOpacity: 1,
  },
  imgContainer: {
    height: 80,
    width: 80,
    // borderRadius: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: "#dce4e6",
    borderRadius: 50,
  },
  bioDataContainer: {},
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  nameContainer: {
    margin: 15,
  },
  nameText: {
    //color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  usernameText: {
    //color: "white",
    fontSize: 15,
  },
});
