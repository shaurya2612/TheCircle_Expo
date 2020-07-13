import firebase from "firebase";

export const FETCH_CURRENT_USER_MATCHING_STATUS =
  "FETCH_CURRENT_USER_MATCHING_STATUS";

export const FETCH_TEMP_CHAT_ROOM = "FETCH_TEMP_CHAT_ROOM";

export const fetchCurrentUserMatchingStatus = () => {
  return (dispatch, getState) => {
    const currentUser = getState().auth.user;
    const db = firebase.database();
    db.ref(`/matchingStatus/${currentUser.uid}`).on("value", (snapshot) => {
      dispatch({
        type: FETCH_CURRENT_USER_MATCHING_STATUS,
        data: snapshot.val(),
      });
    });
  };
};

export const changeCurrentUserMatchingStatus = (status) => {
  return async (dispatch, getState) => {
    var obj;
    const currentUser = getState().auth.user;
    const currentUserGenderData = getState().tempStorage.currentUserGender;
    const db = firebase.database();

    if (status == 0) {
      db.ref("/tempRooms").child(currentUser.uid).remove();
      db.ref("/waitingUsers").child(currentUser.uid).remove();
    }

    if (status == 1) {
      db.ref("/tempRooms").child(currentUser.uid).remove();
      db.ref("/waitingUsers").child(currentUser.uid).remove();
      let hasPermis;
      let chosenTempId;
      let permis = [];
      await db.ref(`/permis/${currentUser.uid}`).once("value", (snapshot) => {
        if (snapshot.exists()) {
          permis = Object.keys(snapshot.val());
          hasPermis = true;
        } else {
          //The currentUser has no permis
          hasPermis = false;
          status = -2;
        }
      });
      if (hasPermis) {
        while (permis.length > 0) {
          const randomPermiIndex =
            Math.floor(Math.random() * (permis.length - 1 - 0 + 1)) +
            (permis.length - 1);
          const chosenPermiId = permis[randomPermiIndex];
          let temps = [];
          let hasPotentialMatches;
          await db
            .ref(`/permis/${chosenPermiId}`)
            .orderByValue()
            .equalTo(currentUserGenderData.interestedIn)
            .once("value", (snapshot) => {
              if (snapshot.exists()) {
                temps = Object.keys(snapshot.val());
                console.log("temps", temps);
                if (temps.indexOf(currentUser.uid) >= 0) {
                  temps.splice(temps.indexOf(currentUser.uid));
                }
                hasPotentialMatches = true;
              } else {
                hasPotentialMatches = false;
                console.log("no potential");
                permis.splice(randomPermiIndex, 1);
              }
            });

          if (!hasPotentialMatches) continue;

          let minTime = new Date(8640000000000000);

          for (var i = 0; i < temps.length; i++) {
            const dbRef = db.ref(`/waitingUsers/${temps[i]}`);
            await dbRef.once("value", async (snapshot) => {
              if (snapshot.exists()) {
                var tempDate = new Date(snapshot.val());
                if (tempDate < minTime) {
                  var isFit;
                  // await db.ref(`/genders/${temps[i]}`).once("value",snapshot=>{
                  //   console.log("snv", snapshot.val())
                  //   console.log("ti", temps[i]);
                  //   if(snapshot.val().interestedIn!=currentUserGenderData.gender){
                  //     isFit = false;
                  //   }
                  // })
                  // if(isFit){
                  minTime = tempDate;
                  chosenTempId = temps[i];
                  // }
                }
              }
              // dbRef.off()
            });
          }
          if (chosenTempId) break;
          else {
            permis.splice(randomPermiIndex, 1);
            continue;
          }
        }

        if (chosenTempId) {
          dispatch(createTempChatRoom(chosenTempId));
          status = 2;
        } else {
          obj = {};
          obj[currentUser.uid] = new Date().toISOString();
          db.ref("/waitingUsers").update(obj);
        }
      }
    }
    var o = {};
    o[currentUser.uid] = status;
    await db.ref(`/matchingStatus`).update(o);
  };
};

export const createTempChatRoom = (tempId) => {
  return async (dispatch, getState) => {
    const currentUser = getState().auth.user;
    const db = firebase.database();
    const obj = {};
    obj[currentUser.uid] = tempId;
    obj[tempId] = currentUser.uid;
    db.ref(`/tempRooms`).update(obj);
    db.ref(`/waitingUsers/${tempId}`).remove();
    db.ref(`/waitingUsers/${currentUser.uid}`).remove();
    let o = {};
    o[tempId] = 2;
    db.ref(`/matchingStatus`).update(o);
  };
};

export const fetchTempChatRoom = () => {
  return async (dispatch, getState) => {
    const currentUser = getState().auth.user;
    const db = firebase.database();
    const dbRef = db.ref(`/tempRooms/${currentUser.uid}`);
    let tempId;
    dbRef.off();
    dbRef
      .on("value", (snapshot) => {
      tempId = snapshot.val();
      dispatch({ type: FETCH_TEMP_CHAT_ROOM, data: tempId });
    });
  };
};

// export const listenForTempChange = () => {
//   return async (dispatch, getState) => {
//     const currentUser = getState().auth.user;
//     const db = firebase.database();
//     const tempId = getState().temps.tempId;
//     const dbRef = db.ref(`/tempRooms`).child(tempId);

//     dbRef.on("value", (snapshot) => {
//       if (!snapshot.exists()) {
//         dispatch(changeCurrentUserMatchingStatus(1));
//         dbRef.off();
//       } else {
//         if (snapshot.val() != currentUser.uid) {
//           dispatch(changeCurrentUserMatchingStatus(1));
//           dbRef.off();
//         }
//       }
//     });
//   };
// };

export const skipThisTemp = () => {
  return async (dispatch, getState) => {
    const db = firebase.database();
    const tempId = getState().temps.tempId;
    console.log("stp", tempId);
    await db.ref("/tempRooms").child(tempId).remove();
    const date = new Date();
    await db.ref(`/waitingUsers`).child(tempId).set(date);
    await db.ref(`/matchingStatus`).child(tempId).set(-1);
  };
};
