import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Center from "../../components/Center";
import { Button, Avatar, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as tempActions from "../../store/actions/temps";
import * as tempStorageActions from "../../store/actions/tempStorage";
import { Text, Icon } from "react-native-elements";
import TempChat from "../../components/TempChat";
import Modal from "react-native-modal";
import firebase from 'firebase'

const TempRoom = (props) => {
  const [acceptButtonPressed, setAcceptButtonPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const temp = useSelector(state=>state.temps.tempId);

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

  const stopAccepting = () => {
    const db = firebase.database();
    changeCurrentUserMatchingStatus(2);
    const dbRef = db.ref("/matchingStatus").child(temp);
    dbRef.off();
  };

  const stopListeningToChat = () => {
    dispatch(tempActions.stopListeningToChat());
  };

  const skipThisTemp = () => {
    dispatch(tempActions.skipThisTemp());
  };

  useEffect(() => {
    if (currentUserMatchingStatus == 2) {
      dispatch(tempActions.fetchTempChatRoom());
    }
    if (currentUserMatchingStatus == -1) {
      changeCurrentUserMatchingStatus(1);
    }
  }, [currentUserMatchingStatus]);

  useEffect(() => {
    dispatch(tempStorageActions.fetchCurrentUserGender());
    dispatch(tempActions.fetchCurrentUserMatchingStatus());
  }, []);

  useEffect(() => {
    console.log("ran");
    if (currentUserMatchingStatus == 2 || currentUserMatchingStatus == 3) {
      props.navigation.setOptions({ headerShown: true });
      props.navigation.setOptions({
        headerStyle: { backgroundColor: Colors.primary },
        headerTitleStyle: { fontFamily: "Quicksand", color: Colors.accent },
        headerRight: () => {
          return (
            <Icon
              onPress={() => {
                setIsModalVisible(true);
              }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              type="feather"
              size={30}
              name="plus"
              color={Colors.accent}
            />
          );
        },
      });
    } else {
      props.navigation.setOptions({ headerShown: false });
    }
  }, [currentUserMatchingStatus]);

  console.log(currentUserMatchingStatus);
  console.log("ctid", currentTempId);
  return (
    <View style={styles.root}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.modalRowContainer}>
            <Icon
              onPress={() => {
                skipThisTemp();
                changeCurrentUserMatchingStatus(0);
                setIsModalVisible(false);
              }}
              containerStyle={{
                backgroundColor: "black",
                padding: 15,
                borderRadius: 50,
              }}
              name="pause"
              type="feather"
              size={40}
              color={"white"}
            />
            <Icon
              onPress={() => {
                if (acceptButtonPressed) {
                  stopAccepting();
                } else {
                  changeCurrentUserMatchingStatus(3);
                }
                setAcceptButtonPressed((prev) => !prev);
              }}
              containerStyle={{
                backgroundColor: acceptButtonPressed?"grey":"black",
                padding: 15,
                borderRadius: 50,
              }}
              name="check"
              type="feather"
              size={40}
              color={"white"}
            />
            <Icon
              onPress={() => {
                skipThisTemp();
                changeCurrentUserMatchingStatus(1);
                setIsModalVisible(false);
              }}
              containerStyle={{
                backgroundColor: "black",
                padding: 15,
                borderRadius: 50,
              }}
              name="slash"
              type="feather"
              size={40}
              color={"white"}
            />
          </View>
        </View>
      </Modal>
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
                  color: Colors.primary,
                }}
              >
                Start Matching
              </Text>
            </Button>
          </View>
        </Center>
      ) : currentUserMatchingStatus == 1 ? (
        <Center>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Quicksand",
              color: Colors.primary,
            }}
          >
            Searching
          </Text>
          <Button
            onPress={() => {
              changeCurrentUserMatchingStatus(0);
            }}
          >
            <Text style={{ color: Colors.primary, fontFamily: "Quicksand" }}>
              Cancel
            </Text>
          </Button>
        </Center>
      ) : currentUserMatchingStatus == 2 || currentUserMatchingStatus == 3 ? (
        <View style={{ flex: 1 }}>
          <TempChat />
        </View>
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
  modalRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default TempRoom;
