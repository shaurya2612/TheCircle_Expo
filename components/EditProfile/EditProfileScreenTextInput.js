import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";

const EditProfileScreenTextInput = (props) => (
  <View>
    <View>
      <Text style={styles.headerStyle}>{props.header}</Text>
    </View>
    <TextInput
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
    headerStyle: {
        fontFamily: "Quicksand",
        color: Colors.darkText,
        fontSize: 25,
        padding:10
      },
      inputTextStyle: { fontFamily: "Quicksand", color: Colors.darkText },
});

export default EditProfileScreenTextInput;
