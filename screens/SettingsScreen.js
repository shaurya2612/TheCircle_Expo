import React from "react";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import firebase from "firebase";
import Center from "../components/Center";
import * as tempStorageActions from "../store/actions/tempStorage";
import { View, StyleSheet, Text } from "react-native";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();
  // const currentGender = useSelector((state) => {
  //   state.tempStorageActions.currentUserGenderData.gender;
  // });
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
  // useEffect(() => {
  //   tempStorageActions.changeGender(() => {});
  // });
  return (
    <Center>
      <Button title="Logout" onPress={onPresshandler} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Interested in:</Text>
        {/* <ModalDropdown
          defaultValue={}
          options={["Male", "Female", "Both"]}
        ></ModalDropdown> */}
      </View>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default LogoutScreen;
