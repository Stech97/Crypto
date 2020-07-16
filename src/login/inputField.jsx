import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const orange = "#ed7102";

const CustomField = withStyles({
  root: {
    "& .MuiInput-underline": {
      color: "#fff",
      "&:before": {
        borderBottomColor: "#fff",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottomColor: orange,
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
