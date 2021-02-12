import React from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components/macro";

import createTheme from "./theme";
import Routes from "./routes/Routes";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import {
  esES
} from '@material-ui/core/locale';


Amplify.configure({
  "aws_project_region": "us-east-2",
  "aws_cognito_identity_pool_id": "us-east-2:3b155b63-d3d0-4c82-8173-a0b7f361d6c0",
  "aws_cognito_region": "us-east-2",
  "aws_user_pools_id": "us-east-2_3gEsQPJl9",
  "aws_user_pools_web_client_id": "2fpdejodgp34hafe5m9k7fgrap",
  "aws_appsync_graphqlEndpoint": "https://k7zkd5vcifcfrc75jjqhbunjli.appsync-api.us-east-2.amazonaws.com/graphql", // AWS AppSync endpoint
  "aws_appsync_authenticationType": "API_KEY", //Primary AWS AppSync authentication type
  "aws_appsync_apiKey": "da2-opojh4dtifcvfmcuojhzrwmk2y", // AppSync API Key
  "oauth": {},
  "aws_user_files_s3_bucket": "kirastoragebucket112236-dev",
  "aws_user_files_s3_bucket_region": "us-east-2"
})

function App() {


  const theme = useSelector((state) => state.themeReducer);
  const themex = createMuiTheme({
    palette: {
      primary: { main: '#1976d2' },
    },
  }, esES);
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s | Kirawebapp"
      />
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
            <ThemeProvider theme={createTheme(theme.currentTheme)}>
              <Routes />



            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}
export default App

