import React, { useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const EmailRef = useRef(null);
  const PassRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("HomeScreen");
      }
    });
    return unsubscribe;
  }, []);

  const SignIn = () => {
    signInWithEmailAndPassword(auth, EmailRef.current, PassRef.current)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        alert(error.code);
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <Image
        source={require("../../assets/img/T_logo.png")}
        style={{ height: 200, width: 200 }}
      ></Image>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email Address"
          autoFocus
          type="email"
          ref={EmailRef}
        ></Input>
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          ref={PassRef}
          onSubmitEditing={SignIn}
        ></Input>
      </View>
      <Button
        containerStyle={styles.button}
        title="Sign In"
        onPress={SignIn}
      ></Button>
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => navigation.navigate("RegisterScreen")}
      ></Button>
      <View style={{ height: 50 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
