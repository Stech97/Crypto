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
import { GetAboutBlock, UpdateAboutBlock } from "../../actions/mainpage";

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

function AboutForm(props) {
  const classes = useStyles();

  const { handleSubmit, pristine, reset, submitting, data } = props;

  const submit = (values) => {
    let data = {
      component: "about_us",
      ...values,
      name3: "none",
      title3: "none",
      link3: "none",
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
          label="SubHeader editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          classes={classes}
          name="text"
          label="Text editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            variant="h5"
            component="p"
            gutterBottom
          >
            Teammate 1
          </Typography>
        </Grid>
        <Field
          component={renderTextField}
          classes={classes}
          name="name1"
          label="Name editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          classes={classes}
          name="title1"
          label="Position editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          classes={classes}
          name="link1"
          label="Link editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            variant="h5"
            component="p"
            gutterBottom
          >
            Teammate 2
          </Typography>
        </Grid>
        <Field
          component={renderTextField}
          classes={classes}
          name="name2"
          label="Name editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          classes={classes}
          name="title2"
          label="Position editor"
          multiline
          rowsMax={4}
          variant="outlined"
          validate={required}
        />
        <Field
          component={renderTextField}
          classes={classes}
          name="link2"
          label="Link editor"
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
  let GetAction = () => dispatch(GetAboutBlock());
  return {
    GetAction,
    UpdateAction: (data) => dispatch(UpdateAboutBlock(data)),
  };
};

export default reduxForm({
  form: "About",
})(connect(null, mapDispatchToProps)(AboutForm));
