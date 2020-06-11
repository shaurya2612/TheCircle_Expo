import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as permiActions from "./store/actions/permis";
import firebase from "firebase";

export const fetchPermis = () => {
  const dispatch= useDispatch();
  const uid = useSelector(state.auth.uid)
  const database = firebase.database();
  if(!uid) {console.log("no uid"); return;}
  database.ref("/users/" + uid + "/permis").on("value", (snapshot) => {
    if (snapshot.val()) {
      console.log('this ran')
      dispatch(permiActions.setPermis(snapshot.val()));
    }
  });
};
