import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

const PhotoCard = (props) => {
  return (
    <View style={styles.container}>
      {props.add ? (
        <Image style={styles.image} source={require("../assets/images/plus-sign.jpg")} />
      ) : (
        <Image style={styles.image} source={{ uri: props.image }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height:"100%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  image:{
      width:"100%",
      height:"100%",
  }
});

export default PhotoCard;
