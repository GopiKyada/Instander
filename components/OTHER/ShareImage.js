// import React from "react";
// import { View, Image, Button } from "react-native";
// import RNFS from "react-native-fs";
// import Share from "react-native-share";

// const ShareImage = ({ image }) => {
//   const onShare = async () => {
//     try {
//       const response = await RNFS.downloadFile({
//         fromUrl: image,
//         toFile: `${RNFS.DocumentDirectoryPath}/image.jpg`,
//       });

//       await Share.open({
//         url: `file://${response.path()}`,
//         message: "Check out this image!",
//         type: "image/jpeg",
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <View>
//       <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       <Button onPress={onShare} title="Share" />
//     </View>
//   );
// };

// export default ShareImage;
