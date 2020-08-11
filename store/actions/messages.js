import firebase from "firebase";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const FETCH_TEMP_MESSAGES = "FETCH_TEMP_MESSAGES";
export const ADD_TEMP_MESSAGE = "ADD_TEMP_MESSAGE";

export const fetchPermiMessages = (sender, reciever) => {
  return async (dispatch, getState) => {
    let messages = [];
    const database = firebase.database();
    let refString;
    if (sender.uid > reciever.id) refString = reciever.id + "@" + sender.uid;
    else refString = sender.uid + "@" + reciever.id;
    const ref = database.ref("/messages/" + refString);
    await ref.once("value", (snapshot) => {
      if (snapshot) {
        snapshot.forEach((item) => {
          messages.push(item.val());
        });
        messages.pop();
        // console.log("this is what we send")
        // console.log(messages);
        dispatch({ type: FETCH_MESSAGES, messages: messages });
      }
    });
    ref
      .endAt()
      .limitToLast(1)
      .on("child_added", (data) => {
        dispatch({ type: ADD_MESSAGE, data: data.val() });
      });
  };
};

export const sendMessage = (sender, reciever, messages) => {
  return async (dispatch, getState) => {
    const database = firebase.database();
    let refString;
    if (sender.uid > reciever.id) refString = reciever.id + "@" + sender.uid;
    else refString = sender.uid + "@" + reciever.id;
    const ref = database.ref("/messages/" + refString);
    await ref.push(...messages);
    const senderRef = database.ref("/chats/" + sender.uid + "/" + reciever.id);
    const recieverRef = database.ref(
      "/chats/" + reciever.id + "/" + sender.uid
    );
    await senderRef.child("lastUpdate").set(new Date().toISOString());
    await recieverRef.child("lastUpdate").set(new Date().toISOString());
  };
};

export const fetchTempMessages = () => {
  return async (dispatch, getState) => {
    const db = firebase.database();
    const currentUser = getState().auth.user;
    const tempId = getState().temps.tempId;
    let messages = [];
    const chatId =
      currentUser.uid < tempId
        ? `${currentUser.uid}@${tempId}`
        : `${tempId}@${currentUser.uid}`;

    const dbRef = db.ref(`/tempMessages/${chatId}`);

    await dbRef.once("value", (snapshot) => {
      if (snapshot) {
        snapshot.forEach((item) => {
          messages.push(item.val());
        });
        messages.pop();
        dispatch({ type: FETCH_TEMP_MESSAGES, messages: messages });
      }
    });
    dbRef.off();
    dbRef
      .endAt()
      .limitToLast(1)
      .on("child_added", (data) => {
        console.log("listener ran", data.val());
        dispatch({ type: ADD_TEMP_MESSAGE, data: data.val() });
      });
  };
};

export const sendTempMessage = (messages) => {
  return async (dispatch, getState) => {
    const database = firebase.database();
    const currentUser = getState().auth.user;
    const tempId = getState().temps.tempId;
    let refString;
    if (currentUser.uid > tempId) refString = tempId + "@" + currentUser.uid;
    else refString = currentUser.uid + "@" + tempId;
    const ref = database.ref("/tempMessages/" + refString);
    await ref.push(...messages);
  };
};
