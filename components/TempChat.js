import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import Colors from "../constants/Colors";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import * as messageActions from "../store/actions/messages";
import ActionButton from "react-native-action-button";
import * as tempActions from "../store/actions/temps";
import { Icon, Header } from "react-native-elements";
import Center from "./Center";
import firebase from "firebase";

const TempChat = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const temp = useSelector((state) => state.temps.tempId);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.tempMessages);
  const [acceptButtonPressed, setAcceptButtonPressed] = useState(false);
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

  const stopAccepting = () => {
    const db = firebase.database();
    changeCurrentUserMatchingStatus(2);
    const dbRef = db.ref("/matchingStatus").child(temp);
    dbRef.off();
  };

  const changeCurrentUserMatchingStatus = (status) => {
    dispatch(tempActions.changeCurrentUserMatchingStatus(status));
  };

  const skipThisTemp = () => {
    dispatch(tempActions.skipThisTemp());
  };

  const fetchMessages = async () => {
    dispatch(messageActions.fetchTempMessages());
  };

  useEffect(() => {
    setIsLoading(true);
    setAcceptButtonPressed(false);
    fetchMessages().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, temp]);

  const onSendHandler = (newMessages) => {
    newMessages.forEach((item) => {
      item.createdAt = new Date().toISOString();
    });
    dispatch(messageActions.sendTempMessage(newMessages));
  };

  console.log(messages);

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
    <View style={{ flex: 1 }}>
      <GiftedChat
        isLoadingEarlier={true}
        renderChatEmpty={() => {
          return (
            <Center>
              <Button style={{ transform: [{ scaleY: -1 }] }}>
                <Text>say hi, you already have a lot in commmon!</Text>
              </Button>
            </Center>
          );
        }}
        isTyping={true}
        inverted={false}
        onSend={onSendHandler}
        user={{
          _id: currentUser.uid,
          name: "Anonymous",
          avatar: "https://placeimg.com/140/140/any",
        }}
        messages={messages}
        // renderAvatarOnTop={true}
        // onPressAvatar={() => {
        //   props.navigation.navigate("UserProfile", {
        //     user: user,
        //   });
        // }}
        renderBubble={renderBubble}
        renderAvatar={null}
        showUserAvatar={false}
        avatar
      />
    </View>
  );
};

export default TempChat;
