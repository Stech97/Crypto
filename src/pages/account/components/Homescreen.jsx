import React, { useEffect } from "react";
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
  <Grid component={Box} my={2} item container xs={10}>
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

  const { data, handleSubmit, load, pristine, reset, submitting } = props;

  useEffect(() => {
    props.GetAction("homescreen");
  }, []);

  const submit = (values) => {
    let data = {
      component: "homescreen",
      header: values.header,
      subHeader: values.subHeader,
      text: values.text,
    };
    props.UpdateAction(data);
  };

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
        <Grid item container xs={12}>
          <Grid
            component="form"
            onSubmit={handleSubmit(submit)}
            item
            container
            xs={12}
            justify="center"
            className={classes.root}
            noValidate
            autoComplete="off"
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
              variant="contained"
              disabled={pristine || submitting}
              color="secondary"
            >
              Apply
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={pristine || submitting}
              color="warn"
              onClick={reset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => ({
  data: state.Mainpage.homescreen,
});

const mapDispatchToProps = (dispatch) => ({
  UpdateAction: (data) => dispatch(UpdateBlock(data)),
});

Homescreen = connect(mapStateToProps, mapDispatchToProps)(Homescreen);

Homescreen = reduxForm({
  form: "Homescreen",
})(Homescreen);

Homescreen = connect(
  (state) => ({
    initialValues: state.data.homescreen,
  }),
  (dispatch) => ({
    GetAction: (block) => dispatch(GetBlock(block)),
  })
)(Homescreen);

export default Homescreen;
