import { FETCH_ALL_USERS, CHANGE_LOADING } from "../actions/search";

const initialState={users:[],
loading:false};

export default (state=initialState, action)=>{
    switch(action.type){
        case FETCH_ALL_USERS:
            return {...state ,users:action.users}
        case CHANGE_LOADING:
            return {...state, loading:action.newState}
        default:
            return state
    }
}