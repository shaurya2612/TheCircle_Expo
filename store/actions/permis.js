import firebase from "firebase";

export const FETCH_PERMIS = "FETCH_PERMIS";
export const SET_PERMIS = "SET_PERMIS";

// export const fetchPermis = () => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.user.uid;
//     firebase.database().ref("/users/" + uid + "/permis").on("value", (snapshot) => {
//       console.log("this thing ran");
//       if (snapshot.val() == null) {
//         dispatch({ type: FETCH_PERMIS, permis: [] });
//         return;
//       }
//       dispatch({ type: FETCH_PERMIS, permis: Object.keys(snapshot.val()) });
//     });
//   };
// };

export const fetchPermis = () =>{
  var permisList =[];
  return async (dispatch, getState) =>{
      const uid = getState().auth.user.uid
        firebase.database().ref('/permis/'+uid).on("value", snapshot=>{
                  if(snapshot.val()==null) {dispatch({type:FETCH_PERMIS, permis: permisList}); return}
                  Promise.all(Object.keys(snapshot.val()).map( async (key) => {
                  (await firebase.database().ref('/users/'+key).once("value", snapshot=>{
                  permisList.push({ id: key, ...snapshot.val()});
              }))
          })).then(()=>{dispatch({type:FETCH_PERMIS, permis: permisList})});
  })
  }
}

export const setPermis = (permis) => {
  return { type: SET_PERMIS, permis: permis };
};
