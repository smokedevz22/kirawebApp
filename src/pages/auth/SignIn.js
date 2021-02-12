import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { Auth } from 'aws-amplify';
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';

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

function SignInx() {
  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <BigAvatar alt="Lucy" src="/static/img/banner_06_on.png" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        BIENVENIDO      </Typography>
      <Typography component="h2" variant="body1" align="center">

      </Typography>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: false,
        }}

        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

          console.log("SDasd")
          try {

            await Auth.signIn(values.email, values.password).then((data) => {
              console.log("datalogin", data)
              // history.push("/pages/mi_cuenta");
              window.location.href = '/pages/mi_cuenta'
            })

          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>

            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Email Address"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar cuenta"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Ingresar
            </Button>

          </form>
        )}




      </Formik>


    </Wrapper>
  );
}

export default SignInx;
