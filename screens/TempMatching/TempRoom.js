import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Center from "../../components/Center";
import { Button, Avatar, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as tempActions from "../../store/actions/temps";
import * as tempStorageActions from "../../store/actions/tempStorage";
import { Text } from "react-native-elements";

const TempRoom = () => {
  const currentUserDisplayImage = useSelector(
    (state) => state.tempStorage.currentUser.displayPicture
  );
  const dispatch = useDispatch();
  const currentUserMatchingStatus = useSelector(
    (state) => state.temps.currentUserMatchingStatus
  );
  const currentTempId = useSelector((state) => state.temps.tempId);

  const changeCurrentUserMatchingStatus = (status) => {
    dispatch(tempActions.changeCurrentUserMatchingStatus(status));
  };

  const skipThisTemp = () =>{
    dispatch(tempActions.skipThisTemp());
  }

  useEffect(() => {
    if (currentUserMatchingStatus == 2) {
      dispatch(tempActions.fetchTempChatRoom());
      // dispatch(tempActions.listenForTempChange());
    }
    if(currentUserMatchingStatus==-1){
      changeCurrentUserMatchingStatus(1);
    }
  }, [currentUserMatchingStatus]);

  useEffect(() => {
    dispatch(tempStorageActions.fetchCurrentUserGender());
    dispatch(tempActions.fetchCurrentUserMatchingStatus());
  }, []);

  console.log(currentUserMatchingStatus);
  console.log("ctid", currentTempId);
  return (
    <View style={styles.root}>
      {currentUserMatchingStatus == 0 ? (
        <Center>
          <Avatar.Image size={150} source={{ uri: currentUserDisplayImage }} />
          <View
            style={{
              padding: 10,
              borderColor: Colors.primary,
              borderWidth: 2,
              margin: 10,
              borderRadius: 50,
            }}
          >
            <Button
              onPress={() => {
                changeCurrentUserMatchingStatus(1);
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Quicksand",
                  color: Colors.darkText,
                }}
              >
                Start Matching
              </Text>
            </Button>
          </View>
        </Center>
      ) : currentUserMatchingStatus == 1 ? (
        <Center>
          <ActivityIndicator size="large" />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Quicksand",
              color: Colors.darkText,
            }}
          >
            Searching
          </Text>
          <Button
            onPress={() => {
              changeCurrentUserMatchingStatus(0);
            }}
          >
            Cancel
          </Button>
        </Center>
      ) : currentUserMatchingStatus == 2 ? (
        <Center>
          <Text>This is a chatRoom</Text>
          <Text>{currentTempId}</Text>
          <Button
            onPress={() => {
              skipThisTemp();
              changeCurrentUserMatchingStatus(1);
            }}
          >
            Next Match
          </Button>
        </Center>
      ) : currentUserMatchingStatus == -1 ? (
        <Center>
          <ActivityIndicator size="large" />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Quicksand",
              color: Colors.darkText,
            }}
          >
            Searching
          </Text>
          <Button
            onPress={() => {
              changeCurrentUserMatchingStatus(0);
            }}
          >
            Cancel
          </Button>
        </Center>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default TempRoom;
