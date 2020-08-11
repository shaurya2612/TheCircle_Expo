import {
  FETCH_CHATS,
  SET_CHAT_LIST_SCREEN_LOADING,
  ADD_CHAT,
  REMOVE_CHAT,
  UPDATE_CHATS
} from "../actions/chats";

const initialState = {
  chats: [],
  chatListScreenLoading: false,
};

export default (state = initialState, action) => {
  let updatedChats;
  switch (action.type) {
    case FETCH_CHATS:
      return { chats: action.chats };
    case SET_CHAT_LIST_SCREEN_LOADING:
      return { ...state, chatListScreenLoading: action.data };
    case ADD_CHAT:
      updatedChats = [...state.chats, action.data].sort((a, b) => {
        if (new Date(a.timestamp) > new Date(b.timestamp)) return 1;
        if (new Date(a.timestamp) < new Date(b.timestamp)) return -1;
        return 0;
      });
      return { ...state, chats: updatedChats };
    case UPDATE_CHATS:
      for (var i = 0; i < state.chats.length; i++) {
        const obj = state.chats[i];
        if (obj.id === action.id) {
          obj.timestamp = action.timestamp;
          const index = state.chats.indexOf(obj);
          state.chats.splice(index, 1);
          state.chats.unshift(obj);
          break;
        }
      }
      return { ...state };
    case REMOVE_CHAT:
      updatedChats = state.chats.filter((obj) => {
        return obj.id != action.data;
      });
      return { ...state, chats: updatedChats };
    default:
      return state;
  }
};
