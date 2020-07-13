import { FETCH_CURRENT_USER_MATCHING_STATUS, FETCH_TEMP_CHAT_ROOM } from "../actions/temps";

const initialState = {
  currentUserMatchingStatus: "off",
  tempId:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_MATCHING_STATUS: 
      return { ...state, currentUserMatchingStatus: action.data };
    case FETCH_TEMP_CHAT_ROOM:
      console.log("fire toh ho raha hai")
      return {...state, tempId:action.data}
    default:
      return state;
  }
};
