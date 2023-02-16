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
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { AntDesign } from "@expo/vector-icons";

// import Popup from "../components/OTHER/Popup";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState(null);

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const latestMenuHandler = () => {
    setVisible(false);
    setOrderBy("latest");
    setCurrentPage(1);
    setUsers([]);
    // console.log("Latest Menu clicked");
  };

  const oldestMenuHandler = () => {
    setVisible(false);
    navigation.navigate("Users");
    setOrderBy("oldest");
    console.log(orderBy);
    setCurrentPage(1);
    setUsers([]);
    // console.log("oldest Menu clicked");
  };

  const popularMenuHandler = () => {
    setVisible(false);
    setOrderBy("popular");
    setCurrentPage(1);
    setUsers([]);
    // console.log("Popular Menu clicked");
  };

  const getUserData = () => {
    // alert(currentPage + " = " + orderBy);
    // alert(
    //   "https://api.unsplash.com/photos/?page=${" +
    //     currentPage +
    //     "}&order_by=${" +
    //     orderBy +
    //     "}&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw"
    // );
    setIsLoading(true);
    axios
      .get(
        `https://api.unsplash.com/photos/?page=${currentPage}&order_by=${orderBy}&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
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
    //console.log(getUserData);
  }, [currentPage, orderBy]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu
              visible={visible}
              anchor={
                <TouchableOpacity>
                  <AntDesign
                    name="bars"
                    size={24}
                    color="black"
                    onPress={showMenu}
                  />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem onPress={latestMenuHandler}>latest</MenuItem>
              <MenuItem onPress={oldestMenuHandler}>oldest</MenuItem>
              <MenuItem onPress={popularMenuHandler}>popular</MenuItem>
            </Menu>
          </View>
        );
      },
    });
  });

  function cardPressHandler() {
    navigation.navigate("UserDetail", {
      selectedItem: users,
    });
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
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
        keyExtractor={(item, index) => index}
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
