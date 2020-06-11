import { FETCH_REQUESTS } from "../actions/requests";

const initialState = {
  requests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return { requests: action.requests };
    default:
      return state;
  }
};
