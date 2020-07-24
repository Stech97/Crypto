import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { GetBlock, UpdateBlock } from "../actions/mainpage";

const required = (value) => (value ? undefined : "Required");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    display: "flex",
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const renderTextField = ({
  label,
  input,
  placeholder,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <Grid component={Box} item container xs={12}>
    <TextField
      label={label}
      placeholder={placeholder}
      error={touched && invalid}
      helperText={touched && error}
      required={true}
      {...input}
      {...custom}
    />
  </Grid>
);

function Homescreen(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <Field
              component={renderTextField}
              name="header"
              label="Text Editor"
              multiline
              rowsMax={4}
              variant="outlined"
              validate={required}
            />
            <Button variant="contained" color="secondary">
              Apply
            </Button>
          </form>
        </Grid>
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => ({
  homescreen: state.Mainpage,
});

const mapDispatchToProps = (dispatch) => ({
  GetAction: () => dispatch(GetBlock("Homescreen")),
});

Homescreen = connect(mapStateToProps, mapDispatchToProps)(Homescreen);

export default reduxForm({
  form: "Homescreen",
})(Homescreen);
