import React, { useState, useEffect, useCallback } from "react";
import { Button, FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import firebase from "firebase";
import { Text } from "native-base";
import * as chatActions from "../store/actions/chats";
import Center from "../components/Center";
import Colors from "../constants/Colors";
import ChatListAvatar from "../components/ChatListAvatar";

const ChatListScreen = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chats.chatListScreenLoading);
  const chats = useSelector((state) => state.chats.chats);

  const fetchChats = () => {
    dispatch(chatActions.fetchChats());
  };

  useEffect(() => {
    fetchChats();
  }, []);

  if (!isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={(itemData) => (
          <ChatListAvatar {...props} user={itemData.item} />
        )}
      />
    </View>
  );
};

export default ChatListScreen;
