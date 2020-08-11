import firebase from "firebase";

export const FETCH_CHATS = "FETCH_CHATS";
export const ADD_CHAT= "ADD_CHAT";
export const SET_CHAT_LIST_SCREEN_LOADING = "SET_CHAT_LIST_SCREEN_LOADING";
export const REMOVE_CHAT = "REMOVE_CHAT";
export const UPDATE_CHATS = "UPDATE_CHATS";

export const fetchChats = () => {
  return (dispatch, getState) => {
    dispatch({type:SET_CHAT_LIST_SCREEN_LOADING, data:true})
    var chatsList = [];
    const db = firebase.database();
    const uid = getState().auth.user.uid;
    const dbRef = db.ref("/matches/" + uid);

    dbRef.off()
    dbRef.on("child_added", async dataSnapshot=>{
      const key = dataSnapshot.key;
      await db.ref(`/users/${key}`).once("value", snapshot=>{
        dispatch({type:ADD_CHAT, data:{id:key, timestamp:dataSnapshot.val() ,...snapshot.val()}});
      })
    })

    dbRef.on('child_changed', dataSnapshot=>{
      dispatch({type:UPDATE_CHATS , id:dataSnapshot.key, timestamp:dataSnapshot.val()})
    })

    dbRef.on('child_removed', dataSnapshot=>{
      const key = dataSnapshot.key;
      dispatch({type:REMOVE_CHAT, data:key})
    })

    dispatch({type:SET_CHAT_LIST_SCREEN_LOADING, data:true})
  };
};
