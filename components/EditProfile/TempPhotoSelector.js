import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import SortableGrid from "react-native-sortable-grid";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import PhotoCard from "../PhotoCard";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as tempStorageActions from "../../store/actions/tempStorage";

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

/// Main Component
const TempPhotoSelector = (props) => {
  
  const fetchedImages = useSelector(
    (state) => state.tempStorage.currentUserImages
  );
  const fetchedImagesOrder = useSelector(
    (state) => state.tempStorage.currentUserImagesOrder
  );
  const [imagesObject, setImagesObject] = useState(null);
  const [images, setImages] = useState(
    useSelector((state) => state.tempStorage.currentUserImages)
  );
  const [imagesOrder, setImagesOrder] = useState(
    useSelector((state) => state.tempStorage.currentUserImagesOrder)
  );
  const dispatch = useDispatch();
  const Grid = useRef("SortableGrid");

  // useEffect(() => {
  //   let obj = {};

  //   for (var i = 0; i < fetchedImagesOrder.length; i++) {
  //     obj[fetchedImagesOrder[i]] = fetchedImages[i];
  //   }
  //   setImagesObject(obj);
  // }, [fetchedImages, fetchedImagesOrder]);

  props.changeImagesOrder(imagesOrder);
  props.changeImages(images);

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
      console.log("iu", image.uri);
      let key;
      for (var i = 0; i < 6; i++) {
        let found = false;
        for (var j = 0; j < imagesOrder.length; j++) {
          if (imagesOrder[j] === i) {
            found = true;
            break;
          }
        }
        if (!found) {
          key = i;
          break;
        }
      }

      setImagesOrder([...imagesOrder, key]);

      setImages((prevImages) => [...prevImages, image.uri]);
    } else return;
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerStyle}>Images:</Text>
        <TouchableHighlight
          onPress={async () => {
            if (images.length < 6) await takeImageHandler();
            else {
              const res = Grid.current.toggleDeleteMode();
              if (!res.deleteModeOn) Grid.current.toggleDeleteMode();
            }
          }}
        >
          <Text style={styles.subHeaderStyle}>
            {images.length == 6 ? "Delete Some -" : "Add More +"}
          </Text>
        </TouchableHighlight>
      </View>
      <SortableGrid
        ref={Grid}
        blockTransitionDuration={400}
        activeBlockCenteringDuration={50}
        itemsPerRow={2}
        dragActivationTreshold={100}
        itemHeight={10}
        onDragRelease={(itemOrder) => {
          props.onDrag(false);
          console.log(
            "Drag was released, the blocks are in the following order: ",
            itemOrder
          );
          setImagesOrder(() => {
            const io = itemOrder.itemOrder;
            let newOrder = [];
            io.forEach((item) => {
              newOrder.push(item.key);
            });
            props.changeImagesOrder(newOrder);
            return newOrder;
          });
        }}
        onDragStart={() => {
          props.onDrag(true);
        }}
        onDeleteItem={(item) => {
          props.onDrag(true);
          var keyToBeDeleted = item.item.key;
          
          
          setImagesOrder((prevImagesOrder) => {
            var newImagesOrder = [];
            for (var i = 0; i < prevImagesOrder.length; i++) {
              if (prevImagesOrder[i] == keyToBeDeleted) {
                newImagesOrder = prevImagesOrder.splice(i, 1);
              }
            }
            return newImagesOrder;
          });

          // console.log("here", images);
          // const imageUriToBeDeleted = imagesObject[keyToBeDeleted];
          // setImages((prevImages) => {
          //   for (var i = 0; i < prevImages.length; i++) {
          //     if (prevImages == imageUriToBeDeleted) {
          //       return prevImages.splice(i, 1);
          //     }
          //   }
          // });
        }}
      >
        {images.map((letter, index) => (
          <View
            style={styles.block}
            key={imagesOrder[index]}
            onTap={() => {
              images.length > 1 ? Grid.current.toggleDeleteMode() : null;
            }}
          >
            <PhotoCard image={letter} />
          </View>
        ))}
      </SortableGrid>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    fontFamily: "Quicksand",
    color: Colors.darkText,
    fontSize: 25,
    padding: 10,
  },
  subHeaderStyle: {
    fontFamily: "Quicksand",
    color: Colors.darkText,
    fontSize: 20,
    padding: 10,
  },
});

export default TempPhotoSelector;
