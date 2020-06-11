import React from "react";
import { View, StyleSheet } from "react-native";
import { Content } from "native-base";

const Center = (props) => {
  return (
    <View style={{ ...styles.center, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Center;
