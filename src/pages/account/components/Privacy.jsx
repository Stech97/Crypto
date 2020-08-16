import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import PrivacyForm from "./Main/PrivacyForm";
import { connect } from "react-redux";
import { GetBlock } from "../actions/mainpage";
import Loader from "react-loader-spinner";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    background: "#FFF",
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

function Privacy(props) {
  const classes = useStyles();

  useEffect(() => {
    props.GetAction();
  }, []);

  const ParseData = () => {
    if (props.terms.data.header) {
      let headers = props.terms.data.header.split("/");
      let data = { header: headers[0], subHeader: headers[1] };
      let titles = props.terms.data.subHeader.split("/");
      let paragraphs = props.terms.data.text.split("/");
      for (var i = 1; i < 11; i++) {
        data = {
          ...data,
          ["title-" + i]: titles[i - 1],
          ["paragraph-" + i]: paragraphs[i - 1],
        };
      }
      console.log("data", data);
      return data;
    } else {
      return null;
    }
  };
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid item xs={12}>
        <Typography
          align="center"
          className={classes.title}
          variant="h3"
          gutterBottom
        >
          Privacy Policy
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {props.terms.isFetching ? (
          <Loader type="Rings" color="#F9A732" height={80} width={80} />
        ) : (
          <PrivacyForm initialValues={ParseData()} data={props.terms.data} />
        )}
      </Grid>
    </main>
  );
}

const mapStateToProps = (state, props) => ({
  terms: state.Mainpage["privacy"],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock("privacy"));
  return {
    GetAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
