import firebase from "firebase";

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const CHANGE_LOADING = "CHANGE_LOADING";

export const fetchResults = (username) => {
  return async (dispatch, getState) => {
    dispatch({type:CHANGE_LOADING, newState:true});
    console.log("heres the username sent", username);
    var usersList = [];
    const currentUser = getState().auth.user;
    var database = firebase.database();
    var userId;
    await database.ref(`/usernames/${username}`).once("value", (snapshot) => {
      userId = snapshot.val();
      console.log(userId);
    });
    if (userId === currentUser.uid) {
      dispatch({ type: FETCH_ALL_USERS, users: [] });
      return;
    }
    if (!userId) {
      dispatch({ type: FETCH_ALL_USERS, users: [] });
      return;
    }
    await database.ref(`/users/${userId}`).once("value", (snapshot) => {
      usersList.push({...snapshot.val(), id:userId});
      console.log("I ran")
    });
    await Promise.all(usersList);
    console.log(usersList);
    dispatch({ type: FETCH_ALL_USERS, users: usersList });
    dispatch({type:CHANGE_LOADING, newState:false});
  };
};

export const setLoading = (newState) =>{
   return({type:CHANGE_LOADING, newState:newState});
}