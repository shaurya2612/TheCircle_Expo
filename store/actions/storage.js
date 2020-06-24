import firebase, { database } from "firebase";
import { set } from "react-native-reanimated";

export const FETCH_USER_DATA = "FETCH_USER_DATA";

export const fetchUserData = (id) => {
  return (dispatch, setState) => {
    const database = firebase.database();
    const dbRef = database.ref(`/users/${id}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      dispatch({ type: FETCH_USER_DATA, data: snapshot.val() });
    });
  };
};
