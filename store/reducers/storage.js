import { FETCH_USER_DATA } from "../actions/storage";

initialState = {
    user:{}
};

export default (state= initialState , action)=>{
 switch(action.type){
     case FETCH_USER_DATA:
         return {user:action.data};
     default:
         return state;
 }
}