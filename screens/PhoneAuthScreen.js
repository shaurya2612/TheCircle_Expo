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
  const [country, setCountry] = React.useState("Country")
  const [message, showMessage] = React.useState(undefined);
  const dispatch = useDispatch();
  let countries = [
    ["India", "+91"],
    ["US", "+1"],
    ["Canada", "+1"],
  ];

  return (
    <View style={styles.root}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
      />
      <Text style={{ marginTop: 20, color: Colors.primary }}>
        Enter phone number
      </Text>
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          style={{ ...styles.button, width: "35%" }}
          textStyle={{ color: Colors.accent }}
          options={countries}
          onSelect={(item) => {
            setCountry(countries[item][0])
            setCountryCode(countries[item][1]);
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Colors.accent }}>{country}</Text>
            <Icon
              name="chevron-down"
              type="feather"
              color={Colors.accent}
              size={10}
              style={{ marginHorizontal: 1 }}
            />
          </View>
        </ModalDropdown>
        <TextInput
          style={{ ...styles.input }}
          placeholder="999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => setPhoneNumber(countryCode+phoneNumber)}
        />
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
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        >
          <Text
            style={{ textDecorationLine: "underline", color: Colors.primary }}
          >
            Send Code
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: Colors.primary, marginTop: 20 }}>
        Enter Verification code
      </Text>
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
          <Text style={{ color: Colors.accent }}>Confirm Code</Text>
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
              <Text
                style={{
                  color: message.color || "blue",
                  fontSize: 17,
                  textAlign: "center",
                  margin: 20,
                }}
              >
                {message.text}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    showMessage(undefined);
                  }}
                  style={styles.button}
                >
                  <Text style={{ color: Colors.accent }}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : undefined}
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
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.accent,
  },
  root: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
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
});
