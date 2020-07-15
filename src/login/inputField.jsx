import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function inputField({
  input,
  placeholder,
  classes,
  type,
  meta: { touched, error, warning },
}) {
  return (
    <Grid item xs={12} justify="center">
      <TextField
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
