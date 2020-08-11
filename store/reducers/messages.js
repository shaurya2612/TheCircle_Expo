import {
  FETCH_MESSAGES,
  ADD_MESSAGE,
  FETCH_TEMP_MESSAGES,
  ADD_TEMP_MESSAGE,
} from "../actions/messages";

const initialState = {
  messages: [],
  tempMessages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return { ...state, messages: action.messages };
    case ADD_MESSAGE:
      updatedMessages = [...state.messages, action.data];
      return { ...state, messages: updatedMessages };
    case FETCH_TEMP_MESSAGES:
      return { ...state, tempMessages: action.messages };
    case ADD_TEMP_MESSAGE:
      updatedMessages = [...state.tempMessages, action.data];
      return { ...state, tempMessages: updatedMessages };
    default:
      return state;
  }
};
