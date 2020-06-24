import React from "react";
import Form from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Signup = (props) => {
  return (
    <ScrollView>
      <Form />
    </ScrollView>
  );
};

export default Signup;
