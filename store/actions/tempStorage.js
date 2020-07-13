export const FETCH_TEMP_USER_DATA = "FETCH_USER_DATA";
export const FETCH_TEMP_USER_IMAGES = "FETCH_USER_IMAGES";
export const FETCH_TEMP_USER_PROFILE_DATA = "FETCH_USER_PROFILE_DATA";
export const FETCH_CURRENT_USER_DATA = "FETCH_CURRENT_USER_DATA";
export const FETCH_CURRENT_USER_IMAGES = "FETCH_CURRENT_USER_IMAGES";
export const FETCH_CURRENT_USER_PROFILE_DATA =
  "FETCH_CURRENT_USER_PROFILE_DATA";
export const FETCH_CURRENT_USER_GENDER = "FETCH_CURRENT_USER_GENDER";

import firebase from "firebase";

export const fetchCurrentUserData = () => {
  return (dispatch, getState) => {
    const currentUser = getState().auth.user;
    const database = firebase.database();
    const dbRef = database.ref(`/users/${currentUser.uid}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      const res = { ...snapshot.val(), id: currentUser.uid };
      dispatch({ type: FETCH_CURRENT_USER_DATA, data: res });
    });
  };
};

export const fetchCurrentUserImages = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    var imageUrls;
    const storage = firebase.storage();
    var res = await storage.ref(`/userImages/${id}`).listAll();
    imageUrls = res.items.map((itemRef) => {
      return itemRef.getDownloadURL();
    });
    imageUrls = await Promise.all(imageUrls);
    dispatch({ type: FETCH_CURRENT_USER_IMAGES, images: imageUrls });
  };
};

export const fetchCurrentUserProfileData = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    const db = firebase.database();
    const dbRef = db.ref(`/userProfileData/${id}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      dispatch({ type: FETCH_CURRENT_USER_PROFILE_DATA, data: snapshot.val() });
    });
  };
};

export const fetchTempUserData = (id) => {
  return (dispatch, getState) => {
    const database = firebase.database();
    const dbRef = database.ref(`/users/${id}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      dispatch({ type: FETCH_TEMP_USER_DATA, data: snapshot.val() });
    });
  };
};

export const fetchTempUserImages = (id) => {
  return async (dispatch, getState) => {
    var imageUrls;
    const storage = firebase.storage();
    var res = await storage.ref(`/userImages/${id}`).listAll();
    imageUrls = res.items.map((itemRef) => {
      return itemRef.getDownloadURL();
    });
    imageUrls = await Promise.all(imageUrls);
    dispatch({ type: FETCH_TEMP_USER_IMAGES, images: imageUrls });
  };
};

export const fetchTempUserProfileData = (id) => {
  return async (dispatch, getState) => {
    const db = firebase.database();
    const dbRef = db.ref(`/userProfileData/${id}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      dispatch({ type: FETCH_TEMP_USER_PROFILE_DATA, data: snapshot.val() });
    });
  };
};

export const removeAbout = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    const database = firebase.database();
    await database.ref(`/userProfileData/${id}`).child("about").remove();
  };
};

export const changeAbout = (newAbout) => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    const database = firebase.database();
    database.ref(`/userProfileData/${id}`).update({ about: newAbout });
  };
};

export const fetchCurrentUserGender = () =>{
  return async (dispatch, getState)=>{
    console.log("aaya")
    const id = getState().auth.user.uid;
    const database = firebase.database();
    database.ref(`/genders/${id}`).once('value', snapshot=>{
      console.log("gender sent", snapshot.val())
      dispatch({type:FETCH_CURRENT_USER_GENDER, data:snapshot.val()});
    })
  }
}