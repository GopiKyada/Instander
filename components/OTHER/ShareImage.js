import React from "react";
import { View, Image, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareImage;
