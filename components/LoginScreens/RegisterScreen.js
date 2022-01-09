import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("form create");
        console.log(user);
        // ...
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profileURL
            ? profileURL
            : "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-1024.png",
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log("after update");
            console.log(user);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
          type="email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></Input>
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        ></Input>
        <Input
          placeholder="Profile URL (optional)"
          type="text"
          value={profileURL}
          onChangeText={(profileURL) => setProfileURL(profileURL)}
          onSubmitEditing={Register}
        ></Input>
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
