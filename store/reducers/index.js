import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import searchReducer from './search'
import requestsReducer from './requests'
import permisReducer from './permis';
import messagesReducer from './messages'
import chatsReducer from './chats';
const reducers = {
  form: formReducer,
  auth: authReducer,
  search: searchReducer,
  requests:requestsReducer,
  permis: permisReducer,
  chats: chatsReducer,
  messages: messagesReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;