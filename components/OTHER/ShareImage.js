import React from "react";
import { View, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { FontAwesome5 } from "@expo/vector-icons";

const ShareImage = ({ image }) => {
  const onShare = async () => {
    try {
      const { uri: localUri } = await FileSystem.downloadAsync(
        image,
        FileSystem.documentDirectory + "image.jpg"
      );

      await Sharing.shareAsync(localUri);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      <FontAwesome5
        name="share"
        size={20}
        color="#555"
        style={styles.upperLikeIcon}
        onPress={onShare}
      />
    </View>
  );
};

export default ShareImage;

const styles = StyleSheet.create({
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
});
