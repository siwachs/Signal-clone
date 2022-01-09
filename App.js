import { StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreens/LoginScreen";
import RegisterScreen from "./components/LoginScreens/RegisterScreen";
import HomeScreen from "./components/HomeAndFunctionalityScreens/HomeScreen";
import addChatScreen from "./components/HomeAndFunctionalityScreens/ChatComponents/addChatScreen";
import ChatScreen from "./components/HomeAndFunctionalityScreens/ChatComponents/ChatScreen";

const Stack = createNativeStackNavigator();
const globalStyle = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalStyle}>
        <Stack.Screen
          options={{ title: "LogIn" }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ title: "SignUp" }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ title: "Home" }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ title: "Add Chat" }}
          name="addChat"
          component={addChatScreen}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
