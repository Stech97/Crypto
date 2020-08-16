import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FAQForm from "./FAQForm";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { GetAboutBlock } from "../../actions/mainpage";
import AboutForm from "./AboutForm";
import AboutImage from "./AboutImage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    background: "#fff",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function AboutUs(props) {
  const classes = useStyles();

  const { data } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          About Us component
        </Typography>
      </Grid>
      <AboutForm data={data} />
      <AboutImage />
    </main>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage.about_us,
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetAboutBlock());
  return {
    GetAction,
  };
};

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs);

export default AboutUs;
