import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import Colors from "../constants/Colors";
import { Text } from "native-base";
import * as AuthActions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleSubmit } = props;

  const submitHandler = async (values) => {
    setIsLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password).then(result=>{
        result.user.updateProfile({
          displayName: values.name,
          photoURL: values.photoURL
        })
      });
    setIsLoading(false);
    var user = firebase.auth().currentUser;
    console.log(user);
    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        email: values.email,
        username: values.username,
        name: values.name
      });
    firebase.database().ref("usernames").child(values.username).set(user.uid);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  });

  const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
    return (
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={onChange}
        {...input}
        {...rest}
      />
    );
  };

  return (
    <View style={styles.root}>
      <Field
        name={"email"}
        props={{
          placeholder: "Enter an Email",
        }}
        component={renderInput}
      />
      <Field
        name={"username"}
        props={{
          placeholder: "Enter a Username",
        }}
        component={renderInput}
      />
      <Field
        name={"password"}
        props={{
          placeholder: "Enter a Password",
          secureTextEntry: true,
        }}
        component={renderInput}
      />
      <Field
        name={"name"}
        props={{
          placeholder: "Enter Full Name",
        }}
        component={renderInput}
      />
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size="small" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit((values) => submitHandler(values))}
          >
            <Text style={{ color: Colors.accent }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
  },
  input: {
    padding: 15,
    marginBottom: 8,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: Colors.primary,
    width: "50%",
    borderRadius: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default reduxForm({ form: "SignupForm" })(Form);
