import { AUTHENTICATE,LOGOUT, SET_PHONE_NUMBER } from "../actions/auth";

const initialState = {
    user: null,
    phoneNumber: null
}

export default (state=initialState, action)=>{
    switch(action.type){
        case AUTHENTICATE:
            return {
              user: action.user
            };
        case LOGOUT:
            return initialState;
        case SET_PHONE_NUMBER:
            return {user: state.user, phoneNumber : action.phoneNumber}
        default:
            return state;
    }
}