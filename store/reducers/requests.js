import {
  FETCH_REQUESTS,
  ADD_REQUEST,
  REMOVE_REQUEST,
} from "../actions/requests";

const initialState = {
  requests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return { ...state, requests: action.requests };
    case ADD_REQUEST:
      return { ...state, requests: [...state.requests, action.data] };
    case REMOVE_REQUEST:
      let updatedRequests = state.requests.filter((obj) => {
        return obj.id != action.data;
      });
      return { ...state, requests: updatedRequests };
    default:
      return state;
  }
};
