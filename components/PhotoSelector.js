import React, { useState, useRef } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import SortableGrid from "react-native-sortable-grid";
import PhotoCard from "./PhotoCard";
import { ScrollView } from "react-native-gesture-handler";

const PhotoSelector = (props) => {
  const [images, setImages] = useState([]);
  const [imageDragging, setImageDragging] = useState(false);
  const Grid = useRef("SortableGrid");

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
    if (image.uri) setImages((prevImages) => [...prevImages, image.uri]);
    else return;
    console.log(images);
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
          dragActivationTreshold={50}
          itemHeight={10}
          onDragRelease={(itemOrder) => {
            setImageDragging(false);
            console.log(
              "Drag was released, the blocks are in the following order: ",
              itemOrder
            );
          }}
          onDragStart={() => {
            console.log("Some block is being dragged now!");
            setImageDragging(true);
          }}
          onDeleteItem={(item) => {
            console.log("Deleted Item");
            setImages((prevImages) => prevImages.splice(item.key, 1));
          }}
        >
          {images.map((letter, index) => (
            <View
              style={styles.block}
              key={index}
              onTap={() => {
                Grid.current.toggleDeleteMode();
              }}
            >
              <PhotoCard image={letter} />
            </View>
          ))}
        </SortableGrid>
      ) : null}

      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
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
});

export default PhotoSelector;
