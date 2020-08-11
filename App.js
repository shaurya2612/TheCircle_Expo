import React, { useState, Fragment } from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import Colors from "./constants/Colors";
import 'react-native-gesture-handler';

firebase.initializeApp(firebaseConfig);

export const store = createStore(allReducers, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    Quicksand: require("./assets/fonts/Quicksand-Bold.ttf"),
    Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
    Bebas:require("./assets/fonts/BebasNeue-Regular.ttf"),
    GreatVibes:require("./assets/fonts/GreatVibes-Regular.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar barStyle="auto" />
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({});
