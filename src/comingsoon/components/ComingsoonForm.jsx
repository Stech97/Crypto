import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { updateView, updateViewError } from "../actions/ComingsoonForm";
import inputField from "./inputField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

export const darkBlue = "#123273";
export const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
export const grayText = "#838383";
export const grayBack = "#efefef";
export const orange = "#ed7102";
export const lightBlue = "#16428d";
export const whitebox = "#efefef";
export const contentBack = "#f5fbff";

const OrangeButton = withStyles({
  root: {
    color: "#fff",
    backgroundColor: orange,
    border: "3px solid " + orange,
    borderRadius: "30px",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    "&:hover": {
      color: "#fff",
      backgroundColor: "transparent",
    },
    "&[disabled]": {
      color: "#838383",
      borderColor: "#838383",
      backgroundColor: "transparent",
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  input: {
    background: "transparent",
    height: "4rem",
    alignContent: "center",
  },
}));

function ComingSoonForm(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    submitting,
    pristine,
    reset,
    sendError,
    placeholder,
  } = props;

  const submit = (values) => {
    props.updateViewAction(values.email);
    props.reset();
  };

  return (
    <Grid
      component="form"
      xs={12}
      md={4}
      item
      container
      justify="center"
      onSubmit={handleSubmit(submit)}
    >
      <Field
        component={inputField}
        name="email"
        classes={classes}
        type="email"
        placeholder={placeholder}
      />
      <OrangeButton type="submit" disabled={pristine || submitting}>
        Notify Me
      </OrangeButton>
    </Grid>
  );
}

const mapStateToProps = (store) => {
  return {
    ComingSoon: store.ComingSoon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateViewAction: (email) => dispatch(updateView(email)),
  };
};

ComingSoonForm = connect(mapStateToProps, mapDispatchToProps)(ComingSoonForm);

export default reduxForm({
  form: "TESTFORM", // a unique identifier for form
})(ComingSoonForm);
