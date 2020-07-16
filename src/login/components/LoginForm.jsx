import React from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { userPostFetch } from "../actions/signin";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import inputField from "../inputField";

import {
  required,
  validateUsername,
  validatePassword,
} from "../../signup/components/SignupForm";

const useStyles = makeStyles((theme) => ({
  input: {
    background: "transparent",
    height: "4rem",
    alignContent: "center",
  },
}));

const orange = "#ed7102";

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

function LoginForm(props) {
  const {
    handleSubmit,
    reset,
    pristine,
    dirty,
    submitting,
    user,
    error,
    hasErrors,
    invalid,
  } = props;

  const submit = (values) => {
    if (values.username.length < 6) {
      throw new SubmissionError({
        username: "Too short username!",
      });
    } else if (values.username.length >= 15) {
      throw new SubmissionError({
        username: "Too long username!",
      });
    } else if (values.password.length <= 6) {
      throw new SubmissionError({
        password: "Too short password!",
      });
    } else if (values.password.length >= 15) {
      throw new SubmissionError({
        password: "Too long password!",
      });
    } else {
      props.userPostFetch({
        username: values.username,
        password: values.password,
      });
    }
  };

  const classes = useStyles();
  return (
    <Grid
      component="form"
      xs={12}
      item
      container
      justify="center"
      onSubmit={handleSubmit(submit)}
    >
      <Field
        component={inputField}
        name="username"
        classes={classes}
        type="text"
        placeholder="Username"
        validate={[required, validateUsername]}
      />
      <Field
        component={inputField}
        name="password"
        classes={classes}
        type="password"
        placeholder="Password"
        validate={[required, validatePassword]}
      />
      <OrangeButton
        type="submit"
        disabled={invalid || hasErrors || pristine || submitting}
      >
        {user.isFetching || submitting ? "Loading..." : "Login"}
      </OrangeButton>
      {user.error.type && (
        <Alert variant="filled" severity="error">
          {user.error.message}
        </Alert>
      )}
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
    </Grid>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo)),
});

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: "LoginForm", // a unique identifier for this form
})(LoginForm);
