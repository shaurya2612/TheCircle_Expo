import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "native-base";
import { LinearHorizontalGradient } from "../Gradient/LinearGradient";
import { Icon } from "react-native-elements";

const InfoBar = (props) => {
  const user = props.user;
  const name = user.name.split(" ")[0];
  return (
    <View style={styles.root}>
      <LinearHorizontalGradient height={props.height} />
      <View style={{ padding: 5 }}>
        <Text style={styles.infoBarText}>{name}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text style={styles.infoBarText}>{user.age+" yrs"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 2,
  },
  infoBarText: {
    color: Colors.accent,
    fontSize: 28,
    letterSpacing: 1,
    fontFamily: "Quicksand",
  },
});

export default InfoBar;
