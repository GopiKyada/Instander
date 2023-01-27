import { View, Text, Button } from "react-native";

function UserDetail() {
  function buttonPressHandler() {
    console.log(hii);
  }

  return (
    <View>
      <Button title="data" onPress={buttonPressHandler} />
    </View>
  );
}

export default UserDetail;
