import React, { useState, useRef } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import SortableGrid from "react-native-sortable-grid";
import PhotoCard from "../PhotoCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";


const PhotoSelector = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.uid);
  const previousOrder = useSelector((state) => state.tempstorage.currentUserImagesOrder);
  const [order, setOrder] = useState(
    useSelector((state) => state.tempstorage.imagesOrder)
  );
  const [images, setImages] = useState(useSelector(state=>state.storage.images));
  const [imageDragging, setImageDragging] = useState(false);
  const Grid = useRef("SortableGrid");

  console.log(previousOrder);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status != "granted") {
      Alert.alert(
        "Insufficient Permissions! You need to grant camera Permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (image.uri) {
      let key;
      let length = images.length;
      props.onChangeImage((prevImages) => [...prevImages, image.uri]);
      setImages((prevImages) => [...prevImages, image.uri]);
      for (var i = 0; i <= 6; i++) {
        let found = false;
        for (var j = 0; j < previousOrder.length; j++) {
          if (previousOrder[j] == i) {
            found = true;
            break;
          }
        }
        if (!found) {
          key = i;
          break;
        }
      }
      dispatch(storageActions.addNewImage(id, image.uri, key, length));
    } else return;
  };

  return (
    <ScrollView scrollEnabled={!imageDragging} style={styles.container}>
      {images.length > 0 ? (
        <SortableGrid
          // style={{flex:1}}
          ref={Grid}
          blockTransitionDuration={400}
          activeBlockCenteringDuration={50}
          itemsPerRow={2}
          dragActivationTreshold={100}
          itemHeight={10}
          onDragRelease={(itemOrder) => {
            setImageDragging(false);
            props.onDrag(false);
            console.log(
              "Drag was released, the blocks are in the following order: ",
              itemOrder
            );
            var tempList=[];
            itemOrder.itemOrder.forEach(item=>{
              tempList.push(Number(item.key));
            })
            setOrder(tempList);
            props.onOrderChange(tempList);
            console.log("Here's the order",tempList);
          }}
          onDragStart={() => {
            console.log("Some block is being dragged now!");
            setImageDragging(true);
            props.onDrag(true);
          }}
          onDeleteItem={(item) => {
            console.log(item);
            console.log("Deleted Item");
            props.onChangeImage((prevImages) => prevImages.splice(item.key, 1));
          }}
        >
          {images.map((letter, index) => (
            <View
              style={styles.block}
              key={index}
              onTap={() => {
                images.length > 1 ? Grid.current.toggleDeleteMode() : null;
              }}
            >
              <PhotoCard image={letter} />
            </View>
          ))}
        </SortableGrid>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button
          titleStyle={{ fontFamily: "Quicksand" }}
          buttonStyle={{ backgroundColor: Colors.primary }}
          containerStyle={{ width: "35%" }}
          disabled={images.length >= 6 ? true : false}
          title="Add Image"
          onPress={takeImageHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PhotoSelector;
