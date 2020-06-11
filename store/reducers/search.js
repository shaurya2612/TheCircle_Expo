import { FETCH_ALL_USERS } from "../actions/search";

const initialState={users:[]};

export default (state=initialState, action)=>{
    switch(action.type){
        case FETCH_ALL_USERS:
            return {users:action.users}
        default:
            return state
    }
}