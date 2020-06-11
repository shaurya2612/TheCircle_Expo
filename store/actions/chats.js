import firebase from "firebase";

export const FETCH_CHATS = "FETCH_CHATS";

export const fetchChats = () => {
  return (dispatch, getState) => {
    var chatsList = [];
    const uid = getState().auth.user.uid;
    firebase
      .database()
      .ref("/chats/" + uid)
      .orderByChild("lastUpdate")
      .on("value", (snapshot) => {
        if (snapshot.val() == null) {
          dispatch({ type: FETCH_CHATS, chats: chatsList });
          return;
        }
        Promise.all(
          Object.keys(snapshot.val()).reverse().map(async (key) => {
            await firebase
              .database()
              .ref("/users/" + key)
              .once("value", (snapshot) => {
                chatsList.push({ id: key, ...snapshot.val() });
              });
          })
        ).then(() => {
          dispatch({ type: FETCH_CHATS, chats: chatsList });
        });
      });
  };
};
