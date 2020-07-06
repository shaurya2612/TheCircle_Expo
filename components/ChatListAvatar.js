import React from "react";
import { TouchableOpacity, Button } from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import Colors from "../constants/Colors";
import ListAvatarRequestButton from "./ListAvatarRequestButton";
import {useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase'
import * as requestActions from '../store/actions/requests'

const ChatListAvatar = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.auth.user.uid);

  const onPressHandler = () => {
    props.navigation.navigate('ChatScreen', {
        screen: 'Chat',
        params: { user: props.user },
      });
  };

  console.log("yeh batao", props.user)

  return (
    <ListItem
      onPress={onPressHandler}
      containerStyle={{
        borderColor: Colors.accent,
        borderRadius: 5,
        borderWidth: 2,
      }}
      //   Component={TouchableScale}
      //   friction={90} //
      //   tension={100} // These props are passed to the parent component (here TouchableScale)
      //   activeScale={0.95} //
      //   linearGradientProps={{
      //     colors: [Colors.primary, Colors.accent],
      //     start: { x: 1, y: 0 },
      //     end: { x: 0.2, y: 0 },
      //   }}
      leftAvatar={{
        size: "large",
        title: "",
        source: { uri: props.user.displayImage },
      }}
      titleStyle={{ fontSize: 18, color: Colors.primary, fontWeight: "bold" }}
      subtitleStyle={{ fontSize: 15 }}
      title={props.user.name}
      subtitle={`@${props.user.username}`}
      chevron={{ color: Colors.primary }}
    />
  );
};

export default ChatListAvatar;
