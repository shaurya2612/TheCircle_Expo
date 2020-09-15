import * as React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { firebaseConfig } from "../config";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import { Text } from "native-base";
import ModalDropdown from "react-native-modal-dropdown";
import { color } from "react-native-reanimated";
import { Icon } from "react-native-elements";
import HeaderText from "../components/HeaderText";
import FormText from "../components/Form/FormText";
import { ScrollView } from "react-native-gesture-handler";

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
/*try {
  firebase.initializeApp({
    ...
  });
} catch (err) {
  // ignore app already initialized error in snack
}*/

export default PhoneAuthScreen = (props) => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const config = firebaseConfig;
  const [countryCode, setCountryCode] = React.useState();
  const [country, setCountry] = React.useState("Country");
  const [message, showMessage] = React.useState(undefined);
  const dispatch = useDispatch();
  let countries = [
    ["India", "+91"],
    ["US", "+1"],
    ["Canada", "+1"],
  ];

  return (
    <View style={styles.root}>
      <ScrollView>
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
              Sign Up
            </Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <View style={styles.card}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={config}
            />
            <HeaderText style={{ color: Colors.primary, fontSize: 20 }}>
              Enter Your Phone Number
            </HeaderText>
            <View style={styles.dropdownContainer}>
              <View style={{ flex: 1 }}>
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
                    <FormText style={{ color: Colors.accent }}>
                      {country}
                    </FormText>
                    <Icon
                      name="chevron-down"
                      type="feather"
                      color={Colors.accent}
                      size={10}
                      style={{ marginHorizontal: 1 }}
                    />
                  </View>
                </ModalDropdown>
              </View>
              <View style={{ flex: 2 }}>
                <TextInput
                  style={{ ...styles.input }}
                  placeholder="999 999 9999"
                  autoFocus
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  onChangeText={(phoneNumber) =>
                    setPhoneNumber(countryCode + phoneNumber)
                  }
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                disabled={!phoneNumber}
                onPress={async () => {
                  // The FirebaseRecaptchaVerifierModal ref implements the
                  // FirebaseAuthApplicationVerifier interface and can be
                  // passed directly to `verifyPhoneNumber`.
                  try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                      phoneNumber,
                      recaptchaVerifier.current
                    );
                    setVerificationId(verificationId);
                    showMessage({
                      text: "Verification code has been sent to your phone.",
                    });
                  } catch (err) {
                    showMessage({
                      text: `Error: ${err.message}`,
                      color: "red",
                    });
                  }
                }}
              >
                <FormText
                  style={{
                    textDecorationLine: "underline",
                    color: Colors.primary,
                  }}
                >
                  Send Code
                </FormText>
              </TouchableOpacity>
            </View>

            <HeaderText style={{ color: Colors.primary, fontSize: 20 }}>
              Enter Verification code
            </HeaderText>
            <TextInput
              style={styles.input}
              placeholder="123456"
              onChangeText={setVerificationCode}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  try {
                    const credential = firebase.auth.PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                    props.navigation.navigate("Signup");
                    dispatch(AuthActions.setPhoneNumber(phoneNumber));
                  } catch (err) {
                    showMessage({
                      text: `Error: ${err.message}`,
                      color: Colors.primary,
                    });
                  }
                }}
              >
                <FormText style={{ color: Colors.accent }}>
                  Confirm Code
                </FormText>
              </TouchableOpacity>
            </View>
            {message ? (
              <TouchableOpacity
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: 0xffffffee,
                    justifyContent: "center",
                    zIndex: 99,
                  },
                ]}
                onPress={() => showMessage(undefined)}
              >
                <View style={styles.root}>
                  <View style={styles.messageBox}>
                    <FormText
                      style={{
                        color: message.color || "blue",
                        fontSize: 17,
                        textAlign: "center",
                        margin: 20,
                      }}
                    >
                      {message.text}
                    </FormText>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          showMessage(undefined);
                        }}
                        style={styles.button}
                      >
                        <FormText style={{ color: Colors.accent }}>
                          Okay
                        </FormText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : undefined}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: Colors.primary,
    width: "50%",
    borderRadius: 50,
  },
  secondaryButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: Colors.accent,
    width: "50%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
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
  root: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    zIndex: 1,
  },
  messageBox: {
    backgroundColor: Colors.accent,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
  },
  dropdown: {
    width: 100,
    height: 35,
    backgroundColor: Colors.primary,
  },
  card: {
    backgroundColor: Colors.accent,
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    overflow: "scroll",
  },
});
