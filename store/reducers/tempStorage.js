import {
  FETCH_TEMP_USER_DATA,
  FETCH_TEMP_USER_IMAGES,
  FETCH_TEMP_USER_PROFILE_DATA,
  FETCH_CURRENT_USER_DATA,
  FETCH_CURRENT_USER_IMAGES,
  FETCH_CURRENT_USER_PROFILE_DATA,
} from "../actions/tempStorage";

initialState = {
  currentUser: { null: true },
  currentUserImages: [],
  currentUserProfileData: { null: true },
  tempUser: { null: true },
  tempImages: [],
  tempUserProfileData: { null: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_DATA:
      return { ...state, currentUser: action.data };
    case FETCH_TEMP_USER_DATA:
      if (action.data != null) {
        return { ...state, tempUser: action.data };
      } else {
        return { ...state, tempUser: { null: true } };
      }
    case FETCH_TEMP_USER_IMAGES:
      return { ...state, tempImages: action.images };
    case FETCH_TEMP_USER_PROFILE_DATA:
      if (action.data != null) {
        return { ...state, tempUserProfileData: action.data };
      } else {
        return { ...state, tempUserProfileData: { null: true } };
      }
    case FETCH_CURRENT_USER_IMAGES:
      return { ...state, currentUserImages: action.images };
    case FETCH_CURRENT_USER_PROFILE_DATA:
      if (action.data != null) {
        return { ...state, currentUserProfileData: action.data };
      } else {
        return { ...state, currentUserProfileData: { null: true } };
      }
    default:
      return state;
  }
};
