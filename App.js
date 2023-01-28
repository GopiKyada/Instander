import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import UserList from "./screens/Userlist";
import UserDetail from "./screens/UserDetail";

const Stack = createNativeStackNavigator();

function messageHandler() {
  Alert.alert("you have sent message");
}

export default function App({ route }) {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
          }}
        >
          <Stack.Screen name="Users" component={UserList} />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={({ route }) => ({
              title: route.params.itemArr.user.name,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
              headerTitleAlign: "center",
              headerRight: () => {
                return (
                  <FontAwesome5
                    name="facebook-messenger"
                    size={30}
                    color="black"
                    onPress={messageHandler}
                  />
                );
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
