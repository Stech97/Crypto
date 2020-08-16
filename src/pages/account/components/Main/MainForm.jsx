import React, { useEffect, useState } from "react";
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

function MainForm(props) {
  const classes = useStyles();

  const { block, handleSubmit, pristine, reset, submitting, data } = props;

  const submit = (values) => {
    let data = {
      component: block,
      header: values.header,
      subHeader: values.subHeader,
      text: values.text,
    };
    props.UpdateAction(data);
    props.GetAction();
  };
  if (data.isFetching) {
    return <Loader type="Rings" color="#F9A732" height={80} width={80} />;
  } else {
    if (data.upload && !props.initialized) {
      props.initialize(data.data);
    }
    return (
      <Grid
        component="form"
        onSubmit={handleSubmit(submit)}
        item
        container
        xs={12}
        justify="center"
        spacing={3}
        className={classes.root}
      >
        <Field
          component={renderTextField}
          name="header"
          label="Header"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          name="subHeader"
          label="SubHeader"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          name="text"
          label="Text"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
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
}

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock(state.block));
  return {
    GetAction,
    UpdateAction: (data) => dispatch(UpdateBlock(data)),
  };
};

export default reduxForm({
  form: "MainForm",
})(connect(null, mapDispatchToProps)(MainForm));
