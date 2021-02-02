import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../redux/actions/authActions";
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';
import { Redirect, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify';

import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;
const AlwaysOn = (props) => {
  return (
    <div>
      <div>I am always here to show current auth state: {props.authState}</div>
      <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
    </div>
  )
}


function handleAuthStateChange(state) {
  if (state === 'signedIn') {
    /* Do something when the user has signed-in */
  }
}

let renderItem = 'cargando'
function SignInx() {
  const dispatch = useDispatch();
  const history = useHistory();

  let logoutActivo = 'cargando'

  let fnLogOut = async () => {

    await Auth.signOut({ global: true }).then((response) => {

      console.log('asdasd')
      console.log(response)
      logoutActivo = 'salir'
      fnChange();
    });
  }
  let fnChange = () => {

    switch (logoutActivo) {
      case 'cargando':
        renderItem = <Redirect to="/" />
        break;

      case 'salir':
        renderItem = <Redirect to="/" />
        break;
    }
  }


  fnLogOut();
  fnChange();



  return (<div> {renderItem}</div>)



}

export default SignInx;
