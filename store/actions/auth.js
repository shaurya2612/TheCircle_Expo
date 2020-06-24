export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_PHONE_NUMBER = "SET_PHONE_NUMBER"

export const authenticate = (user) =>{
  return{type:AUTHENTICATE, user: user}
}

export const logout = () =>{
  return{type:LOGOUT}
}

export const setPhoneNumber = (phoneNumber)=>{
  return{type:SET_PHONE_NUMBER, phoneNumber: phoneNumber}
}