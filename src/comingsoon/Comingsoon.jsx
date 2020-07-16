import React, { Component } from "react";
import FluidContainer from "./Content";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ComingSoonForm from "./components/ComingsoonForm";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: contentBack,
      contrastText: darkBlue,
    },
    secondary: {
      main: darkBlue,
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fff",
      dark: orange,
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans"],
    h1: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: "normal",
      textAlign: "left",
      color: "#ffffff",
      fontSize: "2rem",
      fontWeight: 600,
      fontStyle: "normal",
    },

    h2: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: "normal",
      textAlign: "left",
      color: "#005c9f",
      fontSize: "1.75rem",
      fontWeight: 600,
      fontStyle: "normal",
    },

    h3: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: "normal",
      textAlign: "left",
      color: "#005c9f",
      fontSize: "1.5rem",
      fontWeight: 400,
      fontStretch: "normal",
      fontStyle: "italic",
    },

    h4: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: "normal",
      textAlign: "left",
      color: "#005c9f",
      fontSize: "1.0rem",
      fontWeight: 600,
      fontStretch: "normal",
    },

    body1: {
      fontSize: "1.0rem",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.32,
      letterSpacing: "normal",
      textAlign: "left",
      color: "#838383",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
  },
}));

const ComingSoonLogo = () => {
  return (
    <div className="comingsoon-logobox" style={{ width: "100%" }}>
      <img src="img/defimaLogo.png" alt="defimaLogo" />
    </div>
  );
};

function ComingSoon(props) {
  const classes = useStyles();
  const { ComingSoon } = props;
  return (
    <ThemeProvider theme={theme}>
      <FluidContainer>
        <Grid
          xs={12}
          container
          alignContent="space-around"
          direction="row"
          item
          className={classes.container}
        >
          <Grid xs={12} justify="center" container item>
            <img src="img/defimaLogo.png" alt="defimaLogo" />
          </Grid>
          <Grid
            xs={12}
            direction="column"
            alignContent="center"
            justify="space-around"
            container
            item
          >
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ color: "#ffffff" }}
              paragraph
            >
              We Will Launch Soon.
            </Typography>
            <Typography
              align="center"
              variant="body1"
              component="p"
              style={{ color: "#ffffff" }}
              paragraph
            >
              {ComingSoon.visibility
                ? "Subscribe to get notification as soon as we launch"
                : "Thank you for your subscription."}
            </Typography>
            {ComingSoon.visibility && (
              <ComingSoonForm
                updateView={ComingSoon.updateView}
                sendError={ComingSoon.visibility}
                placeholder={ComingSoon.placeholder}
              />
            )}
          </Grid>
        </Grid>
      </FluidContainer>
    </ThemeProvider>
  );
}

const mapStateToProps = (store) => {
  return {
    ComingSoon: store.ComingSoon,
  };
};
/*
const mapDispatchToProps = dispatch => {
  return {
    updateView: email => dispatch(updateView(email)),
  }
}
*/
export default connect(mapStateToProps)(ComingSoon);
