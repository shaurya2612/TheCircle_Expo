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
import firebase from "firebase";
import ModalDropdown from "react-native-modal-dropdown";
import { Icon } from "react-native-elements";
import FormText from "./Form/FormText";

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

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleSubmit } = props;
  const [country, setCountry] = useState("Country");
  const [countryCode, setCountryCode] = useState();

  let countries = [
    ["India", "+91"],
    ["US", "+1"],
    ["Canada", "+1"],
  ];

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  });

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={styles.dropdownContainer}>
          <View style={{flex:1, flexDirection:"row", justifyContent:"center"}}>
            <ModalDropdown
              style={{ ...styles.button, width: "100%" }}
              textStyle={{ ...styles.formText, color: Colors.primary }}
              options={countries}
              onSelect={(item) => {
                setCountry(countries[item][0]);
                setCountryCode(countries[item][1]);
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FormText style={{fontSize:14}}>{country}</FormText>
                <Icon
                  name="chevron-down"
                  type="feather"
                  color={Colors.accent}
                  size={15}
                  style={{ marginHorizontal: 1 }}
                />
              </View>
            </ModalDropdown>
          </View>
          <View style={{flex:2}}>
            <Field
              name={"phoneNumber"}
              props={{
                placeholder: "Phone Number",
              }}
              // style={{}}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              component={renderInput}
            />
          </View>
        </View>
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
              onPress={handleSubmit((values) => {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    countryCode + values.phoneNumber + "@circle.com",
                    values.password
                  );
              })}
            >
              <FormText style={styles.formText}>Login</FormText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PhoneAuth");
              }}
            >
              <FormText style={{ color: Colors.primary }}>Sign up</FormText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-start",
    padding:8
    // backgroundColor: Colors.primary
  },
  input: {
    padding: 15,
    marginBottom: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.accent,
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
  dropdownContainer: {
    flexDirection: "row",
    // backgroundColor:"blue",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    zIndex: 1,
  },
  card: {
    backgroundColor: Colors.accent,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    padding: 8
  },
});

export default reduxForm({ form: "LoginForm" })(Form);
