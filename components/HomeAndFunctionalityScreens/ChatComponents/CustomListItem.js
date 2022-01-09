import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

const CustomListItem = ({ id, chatName, enterInChat, ChatMessages }) => {
  const [messages, setMeassages] = useState([]);

  useEffect(() => {
    const docRef = collection(db, `chats/${id}/messages`);
    const Query = query(docRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(Query, { includeMetadataChanges: true }, (doc) =>
      setMeassages(doc.docs.map((docx) => docx.data()))
    );
    return unsub;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterInChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            messages?.[0]?.photoURL ||
            "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-1024.png",
        }}
      ></Avatar>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {messages?.[0]?.displayName}: {messages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
