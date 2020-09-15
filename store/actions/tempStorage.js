export const FETCH_TEMP_USER_DATA = "FETCH_USER_DATA";
export const FETCH_TEMP_USER_IMAGES = "FETCH_USER_IMAGES";
export const FETCH_TEMP_USER_PROFILE_DATA = "FETCH_USER_PROFILE_DATA";
export const FETCH_CURRENT_USER_DATA = "FETCH_CURRENT_USER_DATA";
export const FETCH_CURRENT_USER_IMAGES = "FETCH_CURRENT_USER_IMAGES";
export const FETCH_CURRENT_USER_PROFILE_DATA =
  "FETCH_CURRENT_USER_PROFILE_DATA";
export const FETCH_CURRENT_USER_IMAGES_ORDER =
  "FETCH_CURRENT_USER_IMAGES_ORDER";
export const FETCH_CURRENT_USER_GENDER = "FETCH_CURRENT_USER_GENDER";
export const SET_IMAGES_UPLOADED = "SET_IMAGES_UPLOADED";

import firebase from "firebase";
import { Platform } from "react-native";

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
    var imageUrls = [];
    const storage = firebase.storage();
    let imagesOrder = getState().tempStorage.currentUserImagesOrder;
    console.log(imagesOrder);
    for (var i = 0; i < imagesOrder.length; i++) {
      var pathReference = storage.ref(`userImages/${id}/${imagesOrder[i]}`);
      const url = await pathReference.getDownloadURL();
      imageUrls.push(url);
    }
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

export const fetchCurrentUserImagesOrder = () => {
  return async (dispatch, getState) => {
    const db = firebase.database();
    const id = getState().auth.user.uid;
    const dbRef = db.ref(`/imagesOrder/${id}`);
    dbRef.off();
    dbRef.on("value", (snapshot) => {
      let dataString = snapshot.val();
      let data = dataString.split(" ").map((item) => parseInt(item));
      dispatch({ type: FETCH_CURRENT_USER_IMAGES_ORDER, data: data });
    });
  };
};

export const changeCurrentUserImagesOrder = (newOrder) => {
  return async (dispatch, getState) => {
    console.log("change Images called");
    let newOrderString = "";
    for (var i = 0; i < newOrder.length; i++) {
      newOrderString = newOrderString.concat(newOrder[i].toString() + " ");
    }
    newOrderString = newOrderString.trim();
    const db = firebase.database();
    const id = getState().auth.user.uid;
    const dbRef = db.ref(`/imagesOrder/${id}`);
    await dbRef.set(newOrderString);
  };
};

export const addImage = (key, uri) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_IMAGES_UPLOADED, data: false });
    const storage = firebase.storage();
    const id = getState().auth.user.uid;
    const storageRef = storage.ref(`/userImages/${id}`);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    await storageRef.child(key.toString()).put(blob);
    dispatch({ type: SET_IMAGES_UPLOADED, data: true });
  };
};

export const deleteImage = (key) =>{
  return async (dispatch, getState) =>{
    const storage = firebase.storage();
    const id = getState().auth.user.uid;
    const storageRef = storage.ref(`/userImages/${id}`);
    await storageRef.child(key.toString()).delete();
  }
}

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

export const fetchCurrentUserGender = () => {
  return async (dispatch, getState) => {
    console.log("aaya");
    const id = getState().auth.user.uid;
    const database = firebase.database();
    database.ref(`/genders/${id}`).once("value", (snapshot) => {
      console.log("gender sent", snapshot.val());
      dispatch({ type: FETCH_CURRENT_USER_GENDER, data: snapshot.val() });
    });
  };
};

export const addCard = (head, emoji, ans) => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    let pos;
    if (getState().tempStorage.currentUserProfileData.cards) {
      pos = Object.entries(getState().tempStorage.currentUserProfileData.cards)
        .length;
    } else {
      pos = 0;
    }
    console.log(id, pos);
    const db = firebase.database();
    var ref = await db.ref(`/userProfileData/${id}/cards`).push();
    await ref.set({
      head: head,
      emoji: emoji,
      ans: ans,
      pos: pos,
    });
    console.log("ac ended ", id);
  };
};

export const changeCardPos = (key, newPos) => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.uid;
    const db = firebase.database();
    const ref = db.ref(`/userProfileData/${id}/cards/${key}`);
    await ref.child("pos").set(newPos);
  };
};
