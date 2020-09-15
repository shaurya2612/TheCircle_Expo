import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import EditProfileScreenTextInput from "../components/EditProfile/EditProfileScreenTextInput";
import Center from "../components/Center";
import EmojiBoard from "react-native-emoji-board";
import { Icon } from "react-native-elements";
import * as tempStorageActions from "../store/actions/tempStorage";
import { useDispatch } from "react-redux";

const AddCardScreen = (props) => {
  const [cardVisible, setCardVisible] = useState(true);
  const [headerValue, setHeadervalue] = useState("");
  const [emojiValue, setEmojiValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");
  const [emojiBoardVisible, setEmojiBoardVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setCardVisible(false);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setCardVisible(true);
    });
  });

  const addCard = async () => {
    dispatch(tempStorageActions.addCard(headerValue, emojiValue, bottomValue));
  };

  const emojiHandler = () => {
    if (emojiValue == "") return "😃";
    else return emojiValue;
  };

  useEffect(() => {
    let modHeaderValue = headerValue.trim();
    let modEmojiValue = emojiValue.trim();
    let modBottomValue = bottomValue.trim();
    if (
      modHeaderValue !== "" &&
      modEmojiValue !== "" &&
      modBottomValue !== ""
    ) {
      props.navigation.setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={async () => {
                await addCard();
                props.navigation.goBack();
              }}
            >
              <Icon
                containerStyle={{
                  marginLeft: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
                type="feather"
                size={30}
                name="check"
                color={Colors.accent}
              />
            </TouchableOpacity>
          );
        },
      });
    } else {
      props.navigation.setOptions({
        headerRight: () => {
          return <View></View>;
        },
      });
    }
  }, [headerValue, emojiValue, bottomValue]);

  return (
    <View style={styles.root}>
      <Text style={styles.headerStyle}>Add Card</Text>
      <EditProfileScreenTextInput
        onChangeText={(value) => {
          setHeadervalue(value);
        }}
        onFocus={() => {
          setCardVisible(false);
        }}
        onBlur={() => {
          setCardVisible(true);
        }}
        value={headerValue}
        placeholder={"Write something for the header!"}
        header={"Header: "}
      />
      <EditProfileScreenTextInput
        onFocus={() => {
          setCardVisible(false);
        }}
        onBlur={() => {
          setCardVisible(true);
        }}
        onChangeText={(value) => {
          setEmojiValue(value);
        }}
        value={emojiValue}
        placeholder={"Add an emoji!"}
        header={"Emoji: "}
      />
      <EditProfileScreenTextInput
        onFocus={() => {
          setCardVisible(false);
        }}
        onBlur={() => {
          setCardVisible(true);
        }}
        onChangeText={(value) => {
          setBottomValue(value);
        }}
        value={bottomValue}
        placeholder={"Write something for the bottom!"}
        header={"Bottom: "}
      />
      <View style={styles.subContainer}>
        {cardVisible ? (
          <View style={styles.card}>
            <Center>
              <View style={styles.cardTextContainer}>
                <Text
                  style={{
                    ...styles.cardText,
                    color: headerValue == "" ? Colors.darkText : Colors.primary,
                  }}
                >
                  {headerValue == "" ? "Header" : headerValue}
                </Text>
              </View>
              <Text style={{ fontSize: 50 }}>{emojiHandler()}</Text>
              <View style={styles.cardTextContainer}>
                <Text
                  style={{
                    ...styles.cardText,
                    color: bottomValue == "" ? Colors.darkText : Colors.primary,
                  }}
                >
                  {bottomValue == "" ? "Bottom" : bottomValue}
                </Text>
              </View>
            </Center>
            <EmojiBoard showBoard={emojiBoardVisible} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.darkbg,
    flex: 1,
    justifyContent: "space-evenly",
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    fontFamily: "Quicksand",
    color: Colors.darkText,
    fontSize: 25,
    padding: 10,
  },
  card: {
    height: "55%",
    width: "55%",
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
    fontSize: 21,
    textAlign: "center",
  },
  cardTextContainer: { margin: 3, paddingHorizontal: 5 },
  emoji: {
    fontSize: 70,
  },
});

export default AddCardScreen;
