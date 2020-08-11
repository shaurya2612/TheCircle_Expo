import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Center from "../components/Center";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as tempStorageActions from "../store/actions/tempStorage";
import { Icon } from "react-native-elements";
import EditProfileScreenTextInput from "../components/EditProfile/EditProfileScreenTextInput";
import PhotoSelector from "../components/EditProfile/PhotoSelector";

const EditCurrentUserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profileData = props.route.params.profileData;
  const [userImages, setUserImages] = useState(
    useSelector((state) => state.tempStorage.currentUserImages)
  );
  const [userImagesOrder, setUserImagesOrder] = useState([]);
  const [about, setAbout] = useState(profileData.about);
  const [isDragging, setIsDragging] = useState(false);

  const saveChanges = () => {
    if (profileData.null || about != profileData.about) {
      if (about === "" || about == undefined) {
        dispatch(tempStorageActions.removeAbout());
      } else {
        dispatch(tempStorageActions.changeAbout(about));
      }
    }
    // if (userImagesOrder.length > 0) {
    //   let different = false;
    //   for (var i = 0; i < userImagesOrder.length; i++) {
    //     if (userImagesOrder[i] != prevUserImagesOrder[i]) {
    //       different = true;
    //       break;
    //     }
    //   }
    //   if (different) {
    //     dispatch(storageActions.changeImagesOrder(user.uid, userImagesOrder));
    //   }
    // }
  };

  console.log("images array in editScreen", userImages);
  console.log("images order in editscreen", userImagesOrder);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              saveChanges();
              props.navigation.goBack();
            }}
          >
            <Icon
              containerStyle={{
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              type="feather"
              size={30}
              name="check"
              color={Colors.accent}
            />
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <ScrollView style={{backgroundColor:Colors.darkbg}} scrollEnabled={!isDragging}>
      {/* <PhotoSelector
        images={userImages}
        onChangeImage={setUserImages}
        onDrag={setIsDragging}
        onOrderChange={setUserImagesOrder}
        prevUserImagesOrder={prevUserImagesOrder}
      /> */}

      <EditProfileScreenTextInput
        onChangeText={(value) => {
          setAbout(value);
        }}
        value={about}
        theme={{ fonts: { regular: "Quicksand" } }}
        placeholder={"Write something about yourself!"}
        header={"About: "}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EditCurrentUserProfileScreen;
