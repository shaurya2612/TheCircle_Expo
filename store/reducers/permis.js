import { FETCH_PERMIS, SET_PERMIS } from "../actions/permis";

const initialState = {
  permis: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERMIS:
      return { permis: action.permis };
    default:
      return state;
  }
};
