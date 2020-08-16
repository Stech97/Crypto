import React, { useEffect } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { userPostFetch } from "../actions/signin";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import inputField from "../inputField";

const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";
const validateUsername = (value) =>
  value && !/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(value)
    ? "Invalid username"
    : undefined;

const validatePassword = (value) =>
  value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    ? "At least one number and one letter"
    : undefined;

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

  let history = useHistory();

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
  if (props.user.error.type === "done") {
    return <Redirect to="/pages/account/dashboard" />;
  } else {
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
        <Grid
          item
          container
          xs={12}
          justify="center"
          alignContent="center"
          component={Box}
          my={2}
        >
          <OrangeButton
            type="submit"
            disabled={invalid || hasErrors || pristine || submitting}
          >
            {user.isFetching || submitting ? "Loading..." : "Login"}
          </OrangeButton>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="center"
          alignContent="center"
          component={Box}
          my={2}
        >
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
      </Grid>
    );
  }
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
