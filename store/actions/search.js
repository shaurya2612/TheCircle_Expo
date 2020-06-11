import firebase from "firebase";

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";

export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    var usersList= [];
    const currentUser = getState().auth.user;
    var database = await firebase.database();
    var ref = await database.ref("/users");
    await ref.once("value", (snapshot) => {
      Object.keys(snapshot.val()).map((key) => {
        if(key === currentUser.uid) return
        usersList.push({ id: key, ...snapshot.val()[key] });
      });
    });
    dispatch({type: FETCH_ALL_USERS, users: usersList });
  };
};
