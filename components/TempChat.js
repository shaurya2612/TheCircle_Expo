import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Colors from "../constants/Colors";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import * as messageActions from "../store/actions/messages";

const TempChat = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = props.route.params.user;
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.messages);
  // const messages = [
  //   {
  //     _id: "110ae769-51a2-468b-a72b-a528037ad884",
  //     createdAt: new Date(),
  //     text: "Hello chat",
  //     user: {
  //       _id: "SyyQYLwhKAhOetl7yTFOr0wFfXH3",
  //       avatar: "https://placeimg.com/140/140/any",
  //     },
  //   },
  //   {
  //     _id: "110ae769-51a2-468b-a72b-a528037ad885",
  //     createdAt: new Date(),
  //     text: "Hello chat",
  //     user: {
  //       _id: "NLLh3C85dEPiEZonQNNKN5WviZL2",
  //       avatar: "https://placeimg.com/140/140/any",
  //     },
  //   },
  // ];

  const fetchMessages = async () => {
    dispatch(messageActions.fetchPermiMessages(currentUser, user));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMessages().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, user]);

  const onSendHandler = (newMessages) => {
    newMessages.forEach((item) => {
      item.createdAt = new Date().toISOString();
    });
    dispatch(messageActions.sendMessage(currentUser, user, newMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primary,
          },
          left: {
            backgroundColor: Colors.accent,
          },
        }}
      />
    );
  };

  if (isLoading) {
    return null;
  }

  return (
    <GiftedChat
      inverted={false}
      onSend={onSendHandler}
      user={{
        _id: currentUser.uid,
        name: currentUser.displayName,
        avatar: "https://placeimg.com/140/140/any",
      }}
      messages={messages}
      renderAvatarOnTop={true}
      onPressAvatar={() => {
        props.navigation.navigate("UserProfile", {
          user: user,
        });
      }}
      renderBubble={renderBubble}
    />
  );
};

export default TempChat;
