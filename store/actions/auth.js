export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (user) =>{
  return{type:AUTHENTICATE, user: user}
}

export const logout = () =>{
  return{type:LOGOUT}
}
