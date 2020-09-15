import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const FormText = (props) => {
  return (
    <Text {...props} style={{ ...styles.formText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  formText: { color: Colors.accent, fontFamily: "Quicksand", fontSize: 16 },
});

export default FormText;
