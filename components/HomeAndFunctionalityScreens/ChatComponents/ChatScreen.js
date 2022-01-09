import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import {Ionicons, FontAwesome } from "@expo/vector-icons";
// import {AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../../../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const [messages, setMeassages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      // headerLeft: () => (
        // <TouchableOpacity
        //   style={{ marginLeft: 10 }}
        //   onPress={() => navigation.goBack()}
        // >
        //   <AntDesign
        //     name="arrowleft"
        //     size={24}
        //     color={"white"}
        //     behavior={Platform.OS == "ios"}
        //   ></AntDesign>
        // </TouchableOpacity>
      // ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          ></Avatar>
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome
              color={"white"}
              name="video-camera"
              size={24}
            ></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={"white"}></Ionicons>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    try {
      const docRef = addDoc(
        collection(db, `chats/${route.params.id}/messages`),
        {
          timestamp: serverTimestamp(),
          message: text,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
        }
      );
      setText("");
    } catch (e) {
      alert(e);
    }
  };

  //Display Messages
  useLayoutEffect(() => {
    const docRef = collection(db, `chats/${route.params.id}/messages`);
    const Query = query(docRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(Query, { includeMetadataChanges: true }, (doc) =>
      setMeassages(
        doc.docs.map((docx) => ({
          id: docx.id,
          data: docx.data(),
        }))
      )
    );
    return unsub;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto"></StatusBar>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth?.currentUser?.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={30}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      source={{
                        uri: data?.photoURL,
                      }}
                    ></Avatar>

                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      size={30}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      source={{
                        uri: data?.photoURL,
                      }}
                    ></Avatar>
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
                value={text}
                onChangeText={(text) => setText(text)}
                onSubmitEditing={sendMessage}
              ></TextInput>
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons size={24} name="send" color="#2B68E6"></Ionicons>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    fontWeight: "500",
    color: "white",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    fontWeight: "500",
    color: "black",
    marginLeft: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
