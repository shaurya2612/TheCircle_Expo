import React from "react";
import { View, StyleSheet, Button, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import Center from "../Center";
import { Text } from "react-native-paper";
import Colors from "../../constants/Colors";
//{1:{head:"turn on" ans:"eyes", emoji:"o"}}
const IconCards = (props) => {
  const generateCards = () => {
    if (!props.cards) return;
    let ans = [];
    let modCards = Object.keys(props.cards)
      .sort()
      .reduce((obj, key) => {
        obj[key] = props.cards[key];
        return obj;
      }, {});
    let cards = new Map(Object.entries(props.cards));
    let count = 0;
    cards.forEach((value, key, map) => {
      ans.push(
        // <View style={count%2==0?styles.subContainer:null}>
        <View style={styles.card}>
          <Center>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{value.head.toString()}</Text>
            </View>
            <Text style={{ fontSize: 50 }}>{value.emoji}</Text>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{value.ans}</Text>
            </View>
          </Center>
        </View>
        // </View>
      );
      count++;
    });
    return ans;
  };

  return (
    <View style={StyleSheet.root}>
      {props.edit ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerStyle}>Cards:</Text>
          <TouchableHighlight>
            <Text style={styles.subHeaderStyle}>Add More +</Text>
          </TouchableHighlight>
        </View>
      ) : null}
      {props.cards ? (
        <View style={styles.subContainer}>{generateCards()}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "red",
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: Colors.primary,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 10,
    padding: 15,
    flexBasis:"30%"
  },
  cardText: {
    fontFamily: "Quicksand",
    color: Colors.primary,
    fontSize: 18,
    textAlign: "center",
  },
  cardTextContainer: { margin: 3, paddingHorizontal: 5 },
  emoji: {
    fontSize: 70,
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

export default IconCards;
