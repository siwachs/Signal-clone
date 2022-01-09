import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "./ChatComponents/CustomListItem";
import { auth, db } from "../../config/firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { onSnapshot, collection } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "chats"), (doc) => {
      setChats(
        doc.docs.map((docx) => ({
          id: docx.id,
          data: docx.data(),
        }))
      );
    });
    return unsub;
  }, []);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            ></Avatar>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            marginRight: 20,
            width: 80,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color={"black"}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("addChat")}
          >
            <SimpleLineIcons
              name="pencil"
              color={"black"}
              size={24}
            ></SimpleLineIcons>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterInChat = (id, chatName) => {
    navigation.navigate("ChatScreen", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            id={id}
            chatName={chatName}
            enterInChat={enterInChat}
          ></CustomListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { height: "100%" },
});
