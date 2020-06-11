import React from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import firebase from "firebase";
import Center from "../components/Center";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();
  const onPresshandler = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {
        // An error happened.
      });
    dispatch(AuthActions.logout());
  };
  return (
    <Center>
      <Button title="Logout" onPress={onPresshandler} />
    </Center>
  );
};

export default LogoutScreen;
