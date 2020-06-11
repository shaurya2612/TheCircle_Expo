import React from "react";
import Form from "../components/LoginForm";
import { useDispatch } from "react-redux";
import * as AuthActions from '../store/actions/auth'

const Login = (props) => {
  
  return (
    <Form navigation={props.navigation}/>
  );
};
export default Login;
