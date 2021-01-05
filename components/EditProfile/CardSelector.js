import React, { useState } from "react";
import SortableGrid from "react-native-sortable-grid";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Colors from "../../constants/Colors";
import Center from "../Center";

const CardSelector = (props) => {
  const [cardDragging, setIsCardDragging] = useState(false);

  const generateCards = () => {
    if (props.cards.null) return null;
    let ans = [];
    let modCards = Object.keys(props.cards)
      .sort()
      .reduce((obj, key) => {
        obj[key] = props.cards[key];
        return obj;
      }, {});
    let cards = new Map(Object.entries(props.cards));
    cards.forEach((value, key, map) => {
      ans.push(
        <Center key={key} style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>{value.head.toString()}</Text>
          </View>
          <Text style={{ fontSize: 50 }}>{value.emoji}</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>{value.ans}</Text>
          </View>
        </Center>
      );
    });
    return ans;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerStyle}>Cards:</Text>
        <TouchableHighlight onPress={props.add}>
          <Text style={styles.subHeaderStyle}>Add More +</Text>
        </TouchableHighlight>
      </View>
      {props.cards ? (
        <SortableGrid
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
            props.changeItemOrder(itemOrder.itemOrder);
          }}
          onDragStart={() => {
            props.onDrag(true);
          }}
        >
          {generateCards()??<View></View>}
        </SortableGrid>
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
    flexDirection: "row",
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

export default CardSelector;
