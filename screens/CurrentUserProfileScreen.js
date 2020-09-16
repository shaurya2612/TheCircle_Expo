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
import IconCards from "../components/Profile/IconCards";


const CurrentUserProfileScreen = (props) => {
  const images = useSelector((state) => state.tempStorage.currentUserImages);
  const about = useSelector(
    (state) => state.tempStorage.currentUserAbout
  );
  const imagesOrder = useSelector(
    (state) => state.tempStorage.currentUserImagesOrder
  );
  const [imagesAreLoading, setImagesAreLoading] = useState(true);
  const [profileIsLoading, setProfileIsLoading] = useState(true);
  const user = useSelector((state) => state.tempStorage.currentUser);
  const imagesUploaded = useSelector(state => state.loading.currentUserImagesUpdated);
  const dispatch = useDispatch();
  const cards = useSelector(state => state.tempStorage.currentUserCards);
  const fetchImages = async () => {
    dispatch(tempStorageActions.fetchCurrentUserImages());
  };

  const fetchImagesOrder = async () => {
    dispatch(tempStorageActions.fetchCurrentUserImagesOrder());
  };

  const goToEditProfileScreen = () => {
    props.navigation.navigate("EditCurrentUserProfileScreen", {
      about: about,
    });
  };

  const fetchUserAbout = async () => {
    dispatch(tempStorageActions.fetchCurrentUserAbout());
  };

  const fetchUserCards = async () =>{
    dispatch(tempStorageActions.fetchCurrentUserCards());
  }

  console.log("cards=====>");
  console.log(JSON.stringify(cards));

  useEffect(() => {
    setImagesAreLoading(true);
    setProfileIsLoading(true);
    fetchImagesOrder().then(() => {
      console.log(imagesOrder);
      Promise.all([fetchImagesOrder(), fetchUserAbout(), fetchUserCards()]).then(() => {
        setProfileIsLoading(false);
      });
    });
  }, [user]);

  useEffect(() => {
    props.navigation.setParams({
      goToEditProfileScreen: goToEditProfileScreen,
    });
  }, [about, cards]);

  useEffect(() => {
    setImagesAreLoading(true);
    if (imagesOrder && imagesUploaded) fetchImages();
    setImagesAreLoading(false);
  }, [imagesOrder, imagesUploaded]);

  return (
    <View style={styles.root}>
      <View style={{ height: 300, backgroundColor: "white" }}>
        {imagesAreLoading || !imagesUploaded ? (
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
            dotColor={Colors.primary}
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
            circleLoop={true}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <OnLayout>
            {({ width, height }) => <InfoBar user={user} height={height} />}
          </OnLayout>
          {profileIsLoading ? (
            <Center style={{ backgroundColor: "blue" }}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </Center>
          ) : !about.null ? (
            <View>
              {about ? <TextCard text={about} /> : null}
            </View>
          ) : (
            <Text>This person is too introverted :O</Text>
          )}
          {cards ? <IconCards cards={cards} /> : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.primary },
});

export default CurrentUserProfileScreen;
