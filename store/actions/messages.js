import firebase from "firebase";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";

export const fetchPermiMessages = (sender, reciever) => {
  return async (dispatch, getState) =>{
  let messages = [];
  const database = firebase.database();
  let refString;
  if (sender.uid > reciever.id) refString = reciever.id + "_" + sender.uid;
  else refString = sender.uid + "_" + reciever.id;
  const ref = database.ref("/messages/" + refString);
  await ref.once("value", (snapshot) => {
    if (snapshot) {
      snapshot.forEach((item) => {
        messages.push(item.val());
      });
      messages.pop();
      // console.log("this is what we send")
      // console.log(messages);
      dispatch ({ type: FETCH_MESSAGES, messages: messages });
    }
  });
  ref.endAt().limitToLast(1).on("child_added", data=>{
    dispatch({type:ADD_MESSAGE, data:data.val()});
  })
  }
};

export const sendMessage = (sender, reciever, messages) => {
  return async (dispatch, getState) => {
    const database = firebase.database();
    let refString;
    if (sender.uid > reciever.id) refString = reciever.id + "_" + sender.uid;
    else refString = sender.uid + "_" + reciever.id;
    const ref = database.ref("/messages/" + refString);
    await ref.push(...messages);
    const senderRef = database.ref("/chats/"+sender.uid+"/"+reciever.id);
    const recieverRef = database.ref("/chats/"+reciever.id+"/"+sender.uid);
    await senderRef.child("lastUpdate").set(new Date().toISOString());
    await recieverRef.child("lastUpdate").set(new Date().toISOString());
  };
};
