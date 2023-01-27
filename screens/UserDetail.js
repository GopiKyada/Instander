import { useLayoutEffect } from "react";
import { View, Text, Button, Image, StyleSheet, FlatList } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const UserDetail = ({ route, navigation }) => {
  function messageHandler() {}

  const item = route.params.itemArr;
  //console.log(route);
  return (
    <View>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{ uri: item.user.profile_image.large }}
          />
        </View>
        <View>
          <Text>{item.user.name}</Text>
          <Text>@{item.user.username}</Text>
        </View>
        <View>
          <View>
            <Text>Likes</Text>
            <Text>{item.user.total_likes}</Text>
          </View>
          <View>
            <Text>Posts</Text>
            <Text>{item.user.total_photos}</Text>
          </View>
        </View>
        <View>
          <Text>Bio</Text>
          <Text>{item.user.bio}</Text>
          <Text>
            <Ionicons name="location" size={20} color="grey" />
            {item.user.location}
          </Text>
        </View>
        <View>
          <Button title="message" />
          <Button title="Follow" />
        </View>
        <View>
          <Text>SOCIAL MEDIA APPEARANCE</Text>
          <Text>
            Instagram Username : {item.user.social.instagram_username}
          </Text>
          <Text>Portfolio Url : {item.user.social.portfolio_url}</Text>
          <Text>Twitter Username : {item.user.social.twitter_username}</Text>
          <Text>Paypal Email : {item.user.social.paypal_email}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  imgContainer: {
    height: 150,
    width: 150,
  },
  img: {
    height: "100%",
    width: "100%",
  },
});
