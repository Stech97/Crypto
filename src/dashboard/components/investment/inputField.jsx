import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

const CustomField = withStyles({
  root: {
    "& .MuiInput-root": {
      color: "#fff",
      height: "1rem",
      "&:before": {
        borderBottomColor: "#fff",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
      "&>input:-webkit-autofill": {
        WebkitTextFillColor: "#fff",
      },
    },
    "& input": {
      padding: "10px 12px",
    },
  },
})(TextField);

export default function inputField({
  input,
  placeholder,
  meta: { touched, error, warning },
}) {
  return (
    <Grid item xs={12} justify="center">
      <CustomField
        type="number"
        step="any"
        fullWidth
        variant="filled"
        InputProps={{
          startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
        error={touched && error}
        placeholder={placeholder}
        inputProps={{ ...input, disableUnderline: true }}
        helperText={touched && error ? error : ""}
      />
    </Grid>
  );
}
