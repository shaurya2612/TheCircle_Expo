import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import firebase from "firebase";
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig);

export const store = createStore(allReducers, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
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
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
