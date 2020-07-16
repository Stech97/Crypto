import React, { Component } from "react";
import { SubmissionError, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { API } from "../../config";
import { Link } from "react-router-dom";
import { createUserPostFetch } from "../actions/signup";
import Loader from "react-loader-spinner";
import inputField from "../inputField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

export const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength10 = maxLength(10);

const maxLength15 = maxLength(15);

export const maxLength25 = maxLength(25);

export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

export const minLength3 = minLength(3);

export const minLength6 = minLength(6);

const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

const minValue = (min) => (value) =>
  value && value < min ? `Must be at least ${min}` : undefined;

const minValue13 = minValue(13);

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const aol = (value) =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

export const validateUsername = (value) =>
  value && !/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(value)
    ? "Invalid username"
    : undefined;

export const validatePassword = (value) =>
  value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    ? "At least one number and one letter"
    : undefined;

const checkUserGetFetch = async (user) => {
  let response = await API("/Identity/CheckInfo", "post", user);
  return response;
};

const asyncValidate = (values /*, dispatch*/) => {
  return checkUserGetFetch({
    Username: values.username,
    Email: values.email,
  }).then((res) => {
    if (res.status === 200) {
      return undefined;
    } else if (res.error.status === 400) {
      console.log("##### :", res);
      if (res.data.username || res.data.email) {
        if (res.data.username && res.data.email)
          throw {
            username: "Username exists",
            email: "Email exists",
            error: "Signup failed",
          };
        if (res.data.username)
          throw {
            username: "Username exists",
            error: "Signup failed",
          };
        if (res.data.email)
          throw {
            email: "Email exists",
            error: "Signup failed",
          };
      }
    } else {
      return undefined;
    }
  });
};

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

const checkField = ({
  input,
  classes,
  id,
  label,
  meta: { touched, error },
}) => {
  return (
    <Checkbox
      label={label}
      id={id}
      onCheck={input.onChange}
      checked={input.value ? true : false}
      error={touched && error}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  input: {
    background: "transparent",
    height: "4rem",
    alignContent: "center",
  },
  checkbox: {
    height: "4rem",
    alignContent: "center",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      "& h6": {
        fontSize: "10px",
      },
    },
  },
  text: {
    display: "flex",
    alignItems: "center",
    "& a": {
      color: "#fff",
    },
  },
}));

function TermsLink(props) {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="h6">
      I agree with
      <Link to="/terms&conditions">
        <u>Terms and Conditions</u>
      </Link>
    </Typography>
  );
}

function CountryLink(props) {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="h6">
      I am NOT an USA or Canada Citizen
    </Typography>
  );
}

function SignupForm(props) {
  const {
    handleSubmit,
    reset,
    pristine,
    submitting,
    createUser,
    error,
    hasErrors,
    invalid,
  } = props;

  const classes = useStyles();

  const submit = (values) => {
    if (values.password !== values.password2) {
      throw new SubmissionError({
        password2: "Passwords must match",
        _error: "Signup failed",
      });
    }
    if (!values.termsagree) {
      throw new SubmissionError({
        termsagree: "Field reuired!",
        _error: "Signup failed",
      });
    }
    if (!values.countrycheck) {
      throw new SubmissionError({
        countrycheck: "Field required!",
        _error: "Signup failed",
      });
    }
    if (values.password === values.username) {
      throw new SubmissionError({
        password: "Username and password should mismatch!",
        _error: "Signup failed",
      });
    }
    props.createUserAction({ ...values, parent: props.parent });
  };

  if (createUser.error.type === "done") {
    return (
      <section className="signup-wrapper">
        <form className="signup-box">
          <div className="signup-box-header">
            <h2>
              Thanks for creating your defima account, please go to your email
              inbox and confirm your registration
            </h2>
          </div>
        </form>
      </section>
    );
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
        <Grid item container xs={12} spacing={2}>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="firstname"
              placeholder="First Name"
              classes={classes}
              type="text"
              validate={[required, maxLength10, minLength2]}
              warn={alphaNumeric}
            />
          </Grid>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="lastname"
              placeholder="Last Name"
              classes={classes}
              type="text"
              validate={[required, maxLength25, minLength3]}
              warn={alphaNumeric}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="email"
              placeholder="E-Mail"
              classes={classes}
              type="text"
              validate={[required, email]}
              warn={aol}
            />
          </Grid>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="username"
              placeholder="Username"
              classes={classes}
              type="text"
              validate={[required, maxLength25, minLength3, validateUsername]}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="password"
              placeholder="Password"
              classes={classes}
              type="password"
              validate={[required, maxLength25, minLength6, validatePassword]}
            />
          </Grid>
          <Grid item container xs={12} md={6}>
            <Field
              component={inputField}
              name="password2"
              placeholder="Repeat Password"
              classes={classes}
              type="password"
              validate={[required, maxLength25, minLength6, validatePassword]}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid className={classes.checkbox} item container xs={12} md={6}>
            <Field
              component={Checkbox}
              name="termsagree"
              label="I agree with Terms and conditions"
              validate={[required]}
            />
            <TermsLink />
          </Grid>
          <Grid className={classes.checkbox} item container xs={12} md={6}>
            <Field
              component={Checkbox}
              name="countrycheck"
              label="I am NOT an USA or Canada Citizen"
              validate={[required]}
            />
            <CountryLink />
          </Grid>
        </Grid>

        <OrangeButton
          type="submit"
          disabled={invalid || hasErrors || pristine || submitting}
        >
          {createUser.isFetching || submitting
            ? "Loading..."
            : "Create an account"}
        </OrangeButton>
        {createUser.error.type && (
          <Alert variant="filled" severity="error">
            {createUser.error.message}
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
}

const mapStateToProps = (store) => {
  return {
    createUser: store.createUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createUserAction: (userInfo) => dispatch(createUserPostFetch(userInfo)),
});

SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default reduxForm({
  form: "SignupForm", // a unique identifier for this form
  asyncValidate,
  asyncBlurFields: ["username", "email"],
})(SignupForm);
