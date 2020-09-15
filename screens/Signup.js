import React from "react";
import Form from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Signup = (props) => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "row",
            // backgroundColor: "yellow",
          }}
        >
          <View
            style={{
              // backgroundColor: "blue",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Pacifico",
                color: Colors.accent,
                fontSize: 40,
              }}
            >
              Details
            </Text>
          </View>
        </View>
        <View>
          <Form />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
});

export default Signup;
