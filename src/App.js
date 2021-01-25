import React from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components/macro";

import createTheme from "./theme";
import Routes from "./routes/Routes";

function App() {
  const theme = useSelector((state) => state.themeReducer);

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

export default App;
