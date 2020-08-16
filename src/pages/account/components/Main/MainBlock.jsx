import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import MainForm from "./MainForm";
import MainImage from "./MainImage";
import { connect } from "react-redux";
import { GetBlock } from "../../actions/mainpage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
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
    background: "#fff",
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

function MainBlock(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { block, data } = props;
  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          {block + " component"}
        </Typography>
      </Grid>
      <Grid
        spacing={3}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item container xs={12}>
          <MainForm block={block} data={data} />
        </Grid>
        <MainImage block={block} />
      </Grid>
    </main>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage[props.block],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock(state.block));
  return {
    GetAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock);
