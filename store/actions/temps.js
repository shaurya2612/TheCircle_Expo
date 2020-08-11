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
          const randomPermiIndex = Math.floor(
            Math.random() * (permis.length - 0) + 0
          );
          console.log("PEMIS", permis);
          console.log("RAND YAHA", randomPermiIndex);
          const chosenPermiId = permis[randomPermiIndex];
          let temps = [];
          let hasPotentialMatches;
          if (currentUser.interestedIn != "Both") {
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
          } else {
            await db
              .ref(`/permis/${chosenPermiId}`)
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
          }

          let minTime = new Date(8640000000000000);

          for (var i = 0; i < temps.length; i++) {
            const dbRef = db.ref(`/waitingUsers/${temps[i]}`);
            await dbRef.once("value", async (snapshot) => {
              if (snapshot.exists()) {
                // console.log("YAHA", snapshot.val())
                var tempDate = new Date(snapshot.val());
                if (tempDate < minTime) {
                  var isFit = false;
                  // await db
                  //   .ref(`/genders/${temps[i]}/gender`)
                  //   .once("value", (snapshot) => {
                  //     if (snapshot.val() === currentUserGenderData.gender || snapshot.val() === "Both") {
                  //       console.log("cug", currentUserGenderData.gender);
                  //       console.log("ug", snapshot.val());
                  //       isFit = true;
                  //     }
                  //   });
                  if (permis.indexOf(temps[i]) < 0) {
                    minTime = tempDate;
                    chosenTempId = temps[i];
                  }
                }
              }
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
    if (status == 3) {
      const tempId = getState().temps.tempId;
      const dbRef = db.ref("/matchingStatus").child(tempId);
      dbRef.off();
      dbRef.on("value", async (snapshot) => {
        if (snapshot.val() == 3) {
          db.ref("/matches")
            .child(currentUser.uid)
            .child(tempId)
            .set(new Date().toISOString());
          if (currentUser.uid < tempId) {
            const refString = `${currentUser.uid}@${tempId}`;
            const oldRef = db.ref(`/tempMessages/${refString}`);
            const newRef = db.ref(`/messages/${refString}`);
            await oldRef.once("value", async (snapshot) => {
              newRef.set(snapshot.val());
            });
          }
          dbRef.off();
          status = -1;
          await db.ref(`/matchingStatus`).child(currentUser.uid).set(-1);
        }
      });
    }
    await db.ref(`/matchingStatus`).child(currentUser.uid).set(status);
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
    db.ref(`/matchingStatus`).child(tempId).set(2);
  };
};

export const fetchTempChatRoom = () => {
  return async (dispatch, getState) => {
    const currentUser = getState().auth.user;
    const db = firebase.database();
    const dbRef = db.ref(`/tempRooms/${currentUser.uid}`);
    let tempId;
    dbRef.off();
    dbRef.on("value", (snapshot) => {
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
    const currentUser = getState().auth.user;
    console.log("stp", tempId);
    await db.ref("/tempRooms").child(tempId).remove();
    const date = new Date();
    await db.ref(`/waitingUsers`).child(tempId).set(date.toISOString());
    await db.ref(`/matchingStatus`).child(tempId).set(-1);
    const chatId =
      currentUser.uid < tempId
        ? `${currentUser.uid}@${tempId}`
        : `${tempId}@${currentUser.uid}`;
    db.ref(`/tempMessages/${chatId}`).off();
    await db.ref(`/tempMessages/${chatId}`).remove();
  };
};

export const stopListeningToChat = () => {
  return async (dispatch, getState) => {
    const db = firebase.database();
    const tempId = getState().temps.tempId;
    const currentUser = getState().auth.user;
    const chatId =
      currentUser.uid < tempId
        ? `${currentUser.uid}@${tempId}`
        : `${tempId}@${currentUser.uid}`;
    db.ref(`/tempMessages/${chatId}`).off();
  };
};
