import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Menu, MenuItem } from "react-native-material-menu";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import FloatingButton from "../components/OTHER/FloatingButton";
import { ThemeContext } from "../components/OTHER/ThemeContext";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState(null);

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const { theme } = useContext(ThemeContext);

  const latestMenuHandler = () => {
    setVisible(false);
    setOrderBy("latest");
    setCurrentPage(1);
    setUsers([]);
  };

  const oldestMenuHandler = () => {
    setVisible(false);
    setOrderBy("oldest");
    console.log(orderBy);
    setCurrentPage(1);
    setUsers([]);
  };

  const popularMenuHandler = () => {
    setVisible(false);
    setOrderBy("popular");
    setCurrentPage(1);
    setUsers([]);
  };

  const getUserData = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get(
          `https://api.unsplash.com/photos/?page=${currentPage}&order_by=${orderBy}&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
        )
        .then((res) => {
          setUsers([...users, ...res.data]);
          setIsLoading(false);
        });
    }, 1000); // add a delay of 1 second (1000 milliseconds)
  };

  useEffect(() => {
    getUserData();
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
                    color={Colors.white}
                    onPress={showMenu}
                  />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem
                style={styles.menuItem}
                textStyle={styles.menuItemTxt}
                onPress={latestMenuHandler}
              >
                latest
              </MenuItem>
              <MenuItem
                style={styles.menuItem}
                textStyle={styles.menuItemTxt}
                onPress={oldestMenuHandler}
              >
                oldest
              </MenuItem>
              <MenuItem
                style={styles.menuItem}
                textStyle={styles.menuItemTxt}
                onPress={popularMenuHandler}
              >
                popular
              </MenuItem>
            </Menu>
          </View>
        );
      },
    });
  });

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserDetail", {
              selectedUsername: item.user.username,
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
              <Text
                style={styles.nameText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.user.name.length > 18
                  ? `${item.user.name.substring(0, 18)}...`
                  : item.user.name}
              </Text>
              <Text style={styles.usernameText}>@{item.user.username}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
    setCurrentPage(currentPage + 1);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      <FloatingButton />
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
    backgroundColor: Colors.blue,
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
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  usernameText: {
    color: Colors.white,
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
  menuItem: {
    backgroundColor: Colors.black,
  },
  menuItemTxt: {
    color: Colors.white,
  },
});
