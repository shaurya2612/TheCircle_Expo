import React, { useEffect, useState } from "react";
import Center from "../components/Center";
import { Text } from "native-base";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import ActionButton from "react-native-action-button";
import Colors from "../constants/Colors";
import { Icon } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { useSelector, useDispatch } from "react-redux";
import * as tempStorageActions from "../store/actions/tempStorage";
import { ActivityIndicator, Caption } from "react-native-paper";
import InfoBar from "../components/Profile/InfoBar";
import HorizontalScrollCard from "../components/Profile/HorizontalScrollCard";
import OnLayout from "react-native-on-layout";
import TextCard from "../components/Profile/TextCard";
import ProfileActionButton from "../components/Profile/ProfileActionButton";

const CurrentUserProfileScreen = (props) => {
  const images = useSelector((state) => state.tempStorage.currentUserImages);
  const profileData = useSelector((state) => state.tempStorage.currentUserProfileData);
  const [imagesAreLoading, setImagesAreLoading] = useState(true);
  const [profileIsLoading, setProfileIsLoading] = useState(true);
  const user = useSelector(state=>state.tempStorage.currentUser);
  const dispatch = useDispatch();

  const fetchImages = async () => {
    dispatch(tempStorageActions.fetchCurrentUserImages());
  };

  const fetchUserProfileData = async () => {
    dispatch(tempStorageActions.fetchCurrentUserProfileData());
  };
console.log(images);
  useEffect(() => {
    setImagesAreLoading(true);
    setProfileIsLoading(true);
    Promise.all([fetchImages(), fetchUserProfileData()]).then(() => {
      setImagesAreLoading(false);
      setProfileIsLoading(false);
    });
  }, [user]);

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
        {profileIsLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !profileData.null ? (
          <View>
            {profileData.about ? <TextCard text={profileData.about} /> : null}
            {profileData.cardImages ? <HorizontalScrollCard /> : null}
          </View>
        ) : <Center><Text>This person is too introverted! :o</Text></Center>}
      </ScrollView>
      <ProfileActionButton {...props} profileData={profileData} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.accent },
});

export default CurrentUserProfileScreen;
