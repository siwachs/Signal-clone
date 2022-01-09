import React, { useState, useLayoutEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileURL, setProfileURL] = useState(null);
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "LogIn",
    });
  }, [navigation]);

  const Register = () => {
    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name.trim(),
          photoURL: profileURL
            ? profileURL
            : "https://i.pinimg.com/280x280_RS/d9/52/83/d95283ea172e9c0f0029a2c54d9f18ba.jpg",
        })
          .then(() => {})
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="auto"></StatusBar>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(name) => setName(name)}
        ></Input>
        <Input
          placeholder="Email Address"
          autoFocus
          type="email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></Input>
        <Input
          placeholder="Password"
          autoFocus
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        ></Input>
        <TouchableOpacity>
          <Input
            placeholder="Profile URL (optional)"
            autoFocus
            type="text"
            value={profileURL}
            onChangeText={(profileURL) => setProfileURL(profileURL)}
            onSubmitEditing={Register}
          ></Input>
        </TouchableOpacity>
      </View>
      <Button raised onPress={Register} title="Register"></Button>
      <View style={{ height: 50 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
