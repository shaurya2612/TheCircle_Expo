import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const HeaderText = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text {...props} style={{ ...styles.headerStyle, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    fontFamily: "Quicksand",
    color: Colors.darkText,
    fontSize: 25,
    padding: 10,
  },
});

export default HeaderText;
