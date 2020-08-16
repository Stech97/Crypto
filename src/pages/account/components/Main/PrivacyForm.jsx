import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loader from "react-loader-spinner";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { GetBlock, UpdateBlock } from "../../actions/mainpage";

const required = (value) => (value ? undefined : "Required");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const renderTextField = ({
  label,
  input,
  placeholder,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <Grid component={Box} my={2} item container xs={12}>
    <TextField
      label={label}
      placeholder={placeholder}
      error={touched && invalid}
      helperText={touched && error}
      required={true}
      style={input.value === "None" ? { display: "none" } : null}
      {...input}
      {...custom}
    />
  </Grid>
);

function PrivacyForm(props) {
  const classes = useStyles();

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    data,
    initialValues,
  } = props;

  const submit = (values) => {
    let subHeader = "";
    for (var i = 1; i < 7; i++) {
      subHeader = subHeader + values["title-" + i] + "/";
    }
    let text = "";
    for (var i = 1; i < 7; i++) {
      text = text + values["paragraph-" + i] + "/";
    }
    let data = {
      component: "privacy",
      header: values.header + "/" + values.subHeader,
      subHeader,
      text,
    };
    props.UpdateAction(data);
    props.GetAction();
  };

  if (!props.initialized && initialValues) {
    props.initialize(initialValues);
  }
  return (
    <Grid
      component="form"
      container
      spacing={3}
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      onSubmit={handleSubmit(submit)}
    >
      <Field
        component={renderTextField}
        classes={classes}
        name="header"
        label="Header editor"
        multiline
        rowsMax={4}
        variant="outlined"
        validate={required}
      />
      <Field
        component={renderTextField}
        classes={classes}
        name="subHeader"
        label="Text editor"
        multiline
        rowsMax={4}
        variant="outlined"
        validate={required}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <Grid justify="center" item container xs={6} key={i} spacing={2}>
          <Typography variant="h5" component="p" gutterBottom>
            {"Paragraph " + i}
          </Typography>
          <Field
            component={renderTextField}
            classes={classes}
            name={"title-" + i}
            label="Title editor"
            multiline
            rowsMax={4}
            variant="outlined"
            validate={required}
          />
          <Field
            component={renderTextField}
            classes={classes}
            name={"paragraph-" + i}
            label="Paragraph editor"
            multiline
            rowsMax={4}
            variant="outlined"
            validate={required}
          />
        </Grid>
      ))}

      <Button
        type="submit"
        component={Box}
        onClick={handleSubmit(submit)}
        m={2}
        variant="contained"
        disabled={submitting}
        color="secondary"
      >
        Apply
      </Button>
      <Button
        type="button"
        component={Box}
        m={2}
        variant="contained"
        disabled={pristine || submitting}
        color="warn"
        onClick={reset}
      >
        Reset
      </Button>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock("privacy"));
  return {
    GetAction,
    UpdateAction: (data) => dispatch(UpdateBlock(data)),
  };
};

export default reduxForm({
  form: "PrivacyForm",
})(connect(null, mapDispatchToProps)(PrivacyForm));
