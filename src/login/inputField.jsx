import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const orange = "#ed7102";
const darkBlue = "#123273";

const CustomField = withStyles({
  root: {
    "& .MuiInput-underline": {
      color: darkBlue,
      "&:before": {
        borderBottomColor: darkBlue,
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottomColor: orange,
      },
      "&>input:-webkit-autofill": {
        transition: "background-color 5000s",
        WebkitTextFillColor: darkBlue + " !important",
        "&:hover, &:focus, &:active": {
          transition: "background-color 5000s",
          WebkitTextFillColor: darkBlue + " !important",
        },
      },
    },
  },
})(TextField);

export default function inputField({
  input,
  placeholder,
  classes,
  type,
  meta: { touched, error, warning },
}) {
  return (
    <Grid item xs={12} justify="center">
      <CustomField
        type={type}
        fullWidth
        className={classes.input}
        error={touched && error}
        placeholder={placeholder}
        inputProps={{ ...input, disableUnderline: true }}
        helperText={touched && error ? error : ""}
      />
    </Grid>
  );
}
