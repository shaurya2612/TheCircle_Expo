import firebase from "firebase";

export const FETCH_REQUESTS = "FETCH_REQUESTS";
export const SEND_REQUEST = "SEND_REQUEST";
export const SET_REQUEST_SCREEN_LOADING = "SET_REQUEST_SCREEN_LOADING";
export const ADD_REQUEST = "ADD_REQUEST";
export const REMOVE_REQUEST = "REMOVE_REQUEST";

export const fetchRequests = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_REQUEST_SCREEN_LOADING, data: true });
    const uid = getState().auth.user.uid;
    //       firebase.database().ref('/requests/'+uid).on("value", snapshot=>{
    //                 if(snapshot.val()==null) {dispatch({type:FETCH_REQUESTS, requests: requestsList}); return}
    //         Promise.all(Object.keys(snapshot.val()).map( async (key) => {
    //         (await firebase.database().ref('/users/'+key).once("value", snapshot=>{
    //         requestsList.push({ id: key, ...snapshot.val()});
    //     }))
    // })).then(()=>{dispatch({type:FETCH_REQUESTS, requests: requestsList})});
    // })
    const db = firebase.database();
    const dbRef = db.ref(`/requests/${uid}`);
    dbRef.off();
    dbRef.on("child_added", async (dataSnapshot) => {
      console.log("ds", dataSnapshot.key)
      const key = dataSnapshot.key;
      await db.ref('/users').child(key).once("value", snapshot=>{
        dispatch({type:ADD_REQUEST, data:{id:key,...snapshot.val()}})
        console.log("checkpoint");
      })
    });
    dbRef.on("child_removed", dataSnapshot=>{
        const key = dataSnapshot.key;
        dispatch({type:REMOVE_REQUEST, data:key})
    })
    dispatch({ type: SET_REQUEST_SCREEN_LOADING, data: false });
  };
  
};
