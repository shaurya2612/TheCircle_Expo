import { FETCH_CHATS } from "../actions/chats"

initialState = {
    chats:[]
}

export default (state=initialState, action)=>{
    switch(action.type){
        case FETCH_CHATS:
            return{chats:action.chats}
        default: 
            return state
    }
}