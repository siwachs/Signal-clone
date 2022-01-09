import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const addChatScreen = ({ navigation }) => {
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, []);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: text,
      });
      navigation.goBack();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter Chat Name"
        value={text}
        type="text"
        onSubmitEditing={createChat}
        onChangeText={(text) => setText(text)}
        leftIcon={
          <Icon name="wechat" color={"black"} type="antdesign" size={24}></Icon>
        }
      ></Input>
      <Button onPress={createChat} title="Create new chat"></Button>
    </View>
  );
};

export default addChatScreen;

const styles = StyleSheet.create({
  container: {},
});
