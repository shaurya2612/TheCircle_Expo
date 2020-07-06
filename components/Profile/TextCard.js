import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import OnLayout from "react-native-on-layout";
import { LinearGradient } from "expo-linear-gradient";
import { LinearVerticalGradient } from "../Gradient/LinearGradient";

const TextCard = (props) => {
  const text = props.text;
  return (
    <View style={styles.cardContainer}>
      {/* <View style={styles.titleContainer}>
    <Text
      style={{
        color: Colors.darkText,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Quicksand",
      }}
    >
      About
    </Text>
  </View> */}
      <View style={styles.textCardContainer}>
        <View>
          <Text
            style={{
              color: Colors.darkText,
              fontFamily: "Quicksand",
              fontSize: 15,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: { padding: 10 },
  root: { borderBottomWidth: 2, flexDirection: "row", padding: 10 },
  rootContainer: { alignItems: "center", justifyContent: "center" },
  cardContainer: {
    borderBottomWidth: 2,
    borderColor: Colors.darkText,
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textCardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textCard: { backgroundColor: Colors.gradient, padding: 10, borderRadius: 10 },
});

export default TextCard;
