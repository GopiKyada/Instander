import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Popup from "../components/OTHER/Popup";

const UserList = ({ navigation }) => {
  // const [myUserData, setMyUserData] = useState();
  // const [isLoaded, setIsLoaded] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [headerName, setHeaderName] = useState();

  // const getUserData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://api.unsplash.com/photos/?client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw"
  //     );
  //     const mydata = await response.json();
  //     setMyUserData(mydata);
  //     setIsLoaded(false);
  //     //console.log(mydata);
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };

  const getUserData = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.unsplash.com/photos/?page=${currentPage}&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
      )
      .then((res) => {
        //setUsers(res.data);
        //console.log(res.data);
        setUsers([...users, ...res.data]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, [currentPage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Popup />;
      },
    });
  });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (
  //         <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15 }}>
  //           <AntDesign name="bars" size={24} color="black" />
  //         </TouchableOpacity>
  //       );
  //     },
  //   });
  // });

  // useEffect(() => {
  //   getUserData();
  // }, []);

  function cardPressHandler() {
    navigation.navigate("UserDetail", {
      selectedItem: users,
    });
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // //android_ripple={{ color: "#ccc" }}
        // style={({ pressed }) => [
        //   styles.button,
        //   pressed ? styles.buttonPressed : null,
        // ]}
        onPress={() => {
          navigation.navigate("UserDetail", {
            selectedId: item.user.name,
            itemArr: item,
          });
        }}
      >
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
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    //console.log("Load More Item....");
    setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.urls.raw}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#dce4e6",
    flex: 1,
    paddingTop: 10,
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
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  usernameText: {
    color: "black",
    fontSize: 15,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  loader: {
    marginVertical: 8,
    alignItems: "center",
  },
});
