import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import Colors from "../constants/Colors";
import { Text } from "native-base";
import firebase from 'firebase'

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleSubmit } = props;

  useEffect(()=>{
    if(error){
      Alert.alert("An Error Occured!", error, [{text: "Okay"}])
    }
  })

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
          placeholder: "Email",
        }}
        component={renderInput}
      />
      <Field
        name={"password"}
        props={{
          placeholder: "Password",
          secureTextEntry: true,
        }}
        component={renderInput}
      />
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size="small" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit( (values) => {firebase.auth().signInWithEmailAndPassword(values.email, values.password)})}
          >
            <Text style={{ color: Colors.accent }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: Colors.primary }}>Sign up</Text>
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

export default reduxForm({ form: "LoginForm" })(Form);
