import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import SettingsBox from "../SettingsBox";
import Button from "../Buttons";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  input: {
    witdh: "80%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& label.Mui-focused": {
      color: "#123273",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#123273",
    },
  },
  button: {
    marginTop: "20px",
  },
  header: {
    color: "#16428d",
    fontWeight: "500",
  },
  text_gray: {
    color: "#838383",
  },
}));

export default function AccountSecurity(props) {
  const classes = useStyles();
  return (
    <SettingsBox header="Security">
      <Typography align="center" className={classes.header}>
        Two-Factor-Authentification
      </Typography>
      <Typography align="center" className={classes.text_gray}>
        Please insert your phone number with area code and verify your number.
      </Typography>
      <form className={classes.form}>
        <TextField
          className={classes.input}
          type="phone"
          label="+44 1111 22222"
        />
        <TextField
          className={classes.input}
          type="text"
          label="Insert the code"
        />
        <Button className={classes.button}>Submit</Button>
      </form>
    </SettingsBox>
  );
}
