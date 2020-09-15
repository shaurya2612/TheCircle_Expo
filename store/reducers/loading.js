import { SET_IMAGES_UPLOADED } from "../actions/tempStorage";

const initialState = {
  currentUserImagesUpdated: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES_UPLOADED:
      return { ...state, currentUserImagesUpdated: action.data };
    default:
        return state;
  }
};
