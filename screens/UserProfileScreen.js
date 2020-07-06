import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "native-base";
import firebase from "firebase";
import Center from "../components/Center";
import Colors from "../constants/Colors";
import * as tempStorageActions from "../store/actions/tempStorage";
import * as requestActions from "../store/actions/requests";
import { SliderBox } from "react-native-image-slider-box";
import InfoBar from "../components/Profile/InfoBar";
import HorizontalScrollCard from "../components/Profile/HorizontalScrollCard";
import OnLayout from "react-native-on-layout";
import TextCard from "../components/Profile/TextCard";

const UserProfileScreen = (props) => {
  const images = useSelector((state) => state.tempStorage.tempImages);
  const profileData = useSelector((state) => state.tempStorage.tempUserProfileData);
  const [imagesAreLoading, setImagesAreLoading] = useState(true);
  const [profileIsLoading, setProfileIsLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const user = props.route.params.user;
  const [isSent, setIsSent] = useState(false);
  const [isInRequests, setIsInRequests] = useState(false);
  const [isPermi, setIsPermi] = useState(false);

  const fetchImages = async () => {
    dispatch(tempStorageActions.fetchTempUserImages(user.id));
  };

  const fetchUserProfileData = async () => {
    dispatch(tempStorageActions.fetchTempUserProfileData(user.id));
  };

  const checkIfPending = async () => {
    const database = firebase.database();
    const userRef = database.ref("/requests/" + user.id).child(currentUser.uid);

    userRef.on("value", (snapshot) => {
      console.log("yeh", snapshot.val());
      if (snapshot.val() === "pending") {
        setIsSent(true);
      } else {
        setIsSent(false);
      }
    });

    const currentUserRef = database
      .ref("/requests/" + currentUser.uid)
      .child(user.id);

    currentUserRef.on("value", (snapshot) => {
      if (snapshot.val() === "pending") {
        setIsInRequests(true);
      } else {
        setIsInRequests(false);
      }
    });

    database
      .ref(`permis/${currentUser.uid}/${user.id}`)
      .on("value", (snapshot) => {
        setIsPermi(snapshot.exists());
      });
  };

  useEffect(() => {
    setImagesAreLoading(true);
    setProfileIsLoading(true);
    Promise.all([fetchImages(), fetchUserProfileData(), checkIfPending()]).then(
      () => {
        setImagesAreLoading(false);
        setProfileIsLoading(false);
      }
    );
  }, [user]);

  const sendRequestHandler = async () => {
    const database = firebase.database();
    await database
      .ref("/requests/" + user.id)
      .child(currentUser.uid)
      .set("pending");
  };

  const acceptButtonHandler = async (deleteId) => {
    const database = firebase.database();
    const uid = currentUser.uid;
    console.log(uid);
    await database
      .ref("/requests/" + uid)
      .child(deleteId)
      .remove();
    await database
      .ref("/permis/" + deleteId)
      .child(uid)
      .set("node");
    await database
      .ref("/permis/" + uid)
      .child(deleteId)
      .set("node");
    dispatch(requestActions.fetchRequests());
  };

  return (
    <View style={styles.root}>
      <View style={{ height: 300, backgroundColor: "white" }}>
        {imagesAreLoading ? (
          <Center>
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </Center>
        ) : (
          <SliderBox
            sliderBoxHeight={300}
            dotStyle={{
              width: 11,
              height: 11,
              borderRadius: 10,
            }}
            dotColor={Colors.gradient}
            images={images}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            imageLoadingColor={Colors.primary}
          />
        )}
      </View>
      <ScrollView style={{ flex: 1 }}>
        <OnLayout>
          {({ width, height }) => <InfoBar user={user} height={height} />}
        </OnLayout>
        {!isPermi ? (
          isSent ? (
            <Button
              disabled={true}
              color={Colors.primary}
              title="Request already sent !"
            />
          ) : isInRequests ? (
            <Button
              color={Colors.primary}
              title="accept request?"
              onPress={() => {
                acceptButtonHandler(user.id);
              }}
            />
          ) : (
            <Button
              color={Colors.primary}
              title="Send Permi Request!"
              onPress={sendRequestHandler}
            />
          )
        ) : null}
        {profileIsLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !profileData.null ? (
          <View>
            {profileData.about ? <TextCard text={profileData.about} /> : null}
            {profileData.cardImages ? <HorizontalScrollCard /> : null}
          </View>
        ) : (
          <Center>
            <Text>This person is too introverted! :o</Text>
          </Center>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.accent },
});

export default UserProfileScreen;
