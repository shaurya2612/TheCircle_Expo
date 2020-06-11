import React, { useEffect, useState, useCallback } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "native-base";
import firebase from "firebase";
import Center from "../components/Center";
import Colors from "../constants/Colors";

const UserProfileScreen = (props) => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const user = props.route.params.user;
  const [isLoading, setIsLoading] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [isInRequests, setIsInRequests] = useState(false);

  const checkIfPending = async ()=>{
    const database = await firebase.database();

    const userRef = await database
      .ref("/users/" + user.id + "/requests")
      .child(currentUser.uid);

    userRef.on("value", (snapshot) => {
      if (snapshot.val() === "pending") {
        setIsSent(true);
      }
    });

    const currentUserRef = await database
      .ref("/users/" + currentUser.uid + "/requests")
      .child(user.id);

    currentUserRef.on("value", (snapshot) => {
      if (snapshot.val() === "pending") {
        setIsInRequests(true);
      }
    });
  }

  checkIfPending().then(()=>{
    setIsLoading(false)
  })

  const sendRequestHandler = async () => {
    const database = await firebase.database();
    await (
      await database
        .ref("/requests/" + user.id)
        .child(currentUser.uid)
    ).set("pending");
  };

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator color={Colors.primary} size={"large"} />
      </Center>
    );
  }

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.username}</Text>
      {isSent ? (
        <Button title="Request sent" />
      ) : isInRequests? <Button title="accept request?"/> :(
        <Button title="Send Permi Request!" onPress={sendRequestHandler} />
      )}
    </View>
  );
};
export default UserProfileScreen;
