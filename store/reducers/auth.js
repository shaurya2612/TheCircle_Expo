import { AUTHENTICATE,LOGOUT } from "../actions/auth";

const initialState = {
    user: null
}

export default (state=initialState, action)=>{
    switch(action.type){
        case AUTHENTICATE:
            return {
              user: action.user
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}