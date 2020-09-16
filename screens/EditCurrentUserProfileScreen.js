import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as tempStorageActions from "../store/actions/tempStorage";
import { Icon } from "react-native-elements";
import EditProfileScreenTextInput from "../components/EditProfile/EditProfileScreenTextInput";
import CardSelector from "../components/EditProfile/CardSelector";
import TempPhotoSelector from "../components/EditProfile/TempPhotoSelector";

const EditCurrentUserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const about = useSelector(
    (state) => state.tempStorage.currentUserAbout
  );
  const [userImages, setUserImages] = useState(
    useSelector((state) => state.tempStorage.currentUserImages)
  );
  const [userImagesOrder, setUserImagesOrder] = useState(
    useSelector((state) => state.tempStorage.currentUserImagesOrder)
  );
  const [currAbout, setCurrAbout] = useState(about);
  const [isDragging, setIsDragging] = useState(false);
  const [finalCardOrder, setCardItemOrder] = useState(null);
  const fetchedUserImagesOrder = useSelector(
    (state) => state.tempStorage.currentUserImagesOrder
  );

  const addImage = async (nextKey, imageUri) => {
    dispatch(tempStorageActions.addImage(nextKey, imageUri));
  };

  const changeImagesOrder = () => {
    dispatch(tempStorageActions.changeCurrentUserImagesOrder(userImagesOrder));
  };
  const cards = useSelector(state => state.tempStorage.currentUserCards);
  const saveChanges = () => {
    if (about.null || currAbout != about) {
      if (currAbout === "" || currAbout == undefined) {
        dispatch(tempStorageActions.removeAbout());
      } else {
        dispatch(tempStorageActions.changeAbout(currAbout));
      }
    }

    if (finalCardOrder) {
      //card order
      for (var i = 0; i < finalCardOrder.length; i++) {
        // itemOrder = [{key:"xyz", order:num}] and cards={xyz:{pos:num}}
        if (
          cards[finalCardOrder[i].key].pos !==
          finalCardOrder[i].order
        ) {
          dispatch(
            tempStorageActions.changeCardPos(
              finalCardOrder[i].key,
              finalCardOrder[i].order
            )
          );
        }
      }
    }

    // Checking User Images Order and blobs
    let nextKey;
    for (var i = 0; i < 6; i++) {
      let found = false;
      for (var j = 0; j < fetchedUserImagesOrder.length; j++) {
        if (fetchedUserImagesOrder[j] === i) {
          found = true;
          break;
        }
      }
      if (!found) {
        nextKey = i;
        break;
      }
    }
    console.log("yaha fetched", fetchedUserImagesOrder);
    console.log("yaha", userImages);
    for (var i = 0; i < userImages.length; i++) {
      console.log("here", userImages);
      console.log(userImages[i].includes("https://"));
      if (!userImages[i].includes("https://")) {
        console.log("add image is invoked");
        dispatch(tempStorageActions.addImage(nextKey, userImages[i]))
        nextKey++;
      }
    }

    var changed = false;
    console.log("fetchedUserImagesOrder.length", fetchedUserImagesOrder.length);
    console.log("userImagesOrder.length", userImagesOrder.length);
    if (fetchedUserImagesOrder.length == userImagesOrder.length) {
      for (var i = 0; i < fetchedUserImagesOrder.length; i++) {
        if (fetchedUserImagesOrder[i] !== userImagesOrder[i]) {
          changed = true;
          break;
        }
      }
    } else changed = true;

    if (changed) {
      console.log("img order invoked");
      changeImagesOrder();
    }
  };

  console.log(userImages);

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
    <ScrollView
      style={{ backgroundColor: Colors.darkbg }}
      scrollEnabled={!isDragging}
    >
      {/* <PhotoSelector
        images={userImages}
        onChangeImage={setUserImages}
        onDrag={setIsDragging}
        onOrderChange={setUserImagesOrder}
        prevUserImagesOrder={[0]}
      /> */}

      <View style={styles.section}>
        <TempPhotoSelector
          add={() => {
            props.navigation.navigate("AddCardScreen");
          }}
          onDrag={setIsDragging}
          changeImagesOrder={setUserImagesOrder}
          changeImages={setUserImages}
        />
      </View>

      <View style={styles.section}>
        <EditProfileScreenTextInput
          onChangeText={(value) => {
            setCurrAbout(value);
          }}
          value={currAbout}
          placeholder={"Write something about yourself!"}
          header={"About: "}
        />
      </View>
      <View style={styles.section}>
        <CardSelector
          add={() => {
            props.navigation.navigate("AddCardScreen");
          }}
          cards={cards}
          onDrag={setIsDragging}
          changeItemOrder={setCardItemOrder}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    borderBottomWidth: 3,
    borderColor: Colors.accent,
    paddingBottom: 30,
  },
});

export default EditCurrentUserProfileScreen;
