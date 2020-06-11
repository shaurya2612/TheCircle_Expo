import { FETCH_MESSAGES, ADD_MESSAGE } from "../actions/messages"



const initialState ={
    messages:[]
}

export default (state=initialState, action) =>{
    switch(action.type){
        case FETCH_MESSAGES:
            return{messages:action.messages}
        case ADD_MESSAGE:
            updatedMessages = [...state.messages, action.data]
            return{messages:updatedMessages}
        default:
            return state
    }
}