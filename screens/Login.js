import React from "react";
import Form from "../components/LoginForm";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const Login = (props) => {
  return (
    <View style={styles.root}>
      <View
        style={{
          flex: 1,
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
            The Circle
          </Text>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <Form navigation={props.navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
});
export default Login;
