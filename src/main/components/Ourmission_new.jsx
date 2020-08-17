import React, { Fragment, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { GetBlock } from "../actions/mainpage";

const useStyles = makeStyles((theme) => ({
  box: {
    alignContent: "flex-start",
  },
  images: {
    alignContent: "flex-start",

    justifyContent: "space-around",
    "&>div": {
      justifyContent: "center",
    },
    "& img": {
      width: "182px",
      height: "182px",
      [theme.breakpoints.down("sm")]: {
        width: "30vw",
        height: "auto",
      },
      [theme.breakpoints.down("md")]: {
        width: "20vw",
        height: "auto",
      },
    },
  },
}));

const OurmissionHeader = ({ header, subHeader }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h2" component="h2">
          {header}
        </Typography>
      </Grid>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h3" component="h3">
          {subHeader}
        </Typography>
      </Grid>
    </Fragment>
  );
};

const OurmissionText = (props) => {
  const classes = useStyles();
  const { text } = props;

  return (
    <Grid item xs={12}>
      {text &&
        text.split("\n").map((block, i) => (
          <Typography key={i} paragraph variant="body1" component="p">
            {block}
          </Typography>
        ))}
    </Grid>
  );
};

const OurmissionIcons = () => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      alignContent="flex-start"
      justify="center"
      spacing={2}
      xs={12}
      sm={6}
    >
      <Grid className={classes.images} item container spacing={2} xs={12}>
        <Grid
          justify="center"
          alignContent="center"
          container
          item
          md={4}
          sm={12}
          xs={6}
        >
          <img
            className="ourmission-icon-image-1"
            src="img/ourmission-icon-1.png"
            alt="ourmission-icon-1"
            srcSet="img/ourmission-icon-1@2x.png 2x, img/ourmission-icon-1@3x.png 3x"
          />
        </Grid>
        <Grid
          justify="center"
          alignContent="center"
          container
          item
          md={4}
          sm={12}
          xs={6}
        >
          <img
            className="ourmission-icon-image-2"
            src="img/ourmission-icon-2.png"
            alt="ourmission-icon-2"
            srcSet="img/ourmission-icon-2@2x.png 2x, img/ourmission-icon-2@3x.png 3x"
          />
        </Grid>
      </Grid>
      <Grid className={classes.images} item container spacing={2} xs={12}>
        <Grid
          justify="center"
          alignContent="center"
          container
          item
          md={4}
          sm={12}
          xs={6}
        >
          <img
            className="ourmission-icon-image-3"
            src="img/ourmission-icon-3.png"
            alt="ourmission-icon-3"
            srcSet="img/ourmission-icon-3@2x.png 2x, img/ourmission-icon-3@3x.png 3x"
          />
        </Grid>
        <Grid
          justify="center"
          alignContent="center"
          container
          item
          md={4}
          sm={12}
          xs={6}
        >
          <img
            className="ourmission-icon-image-4"
            src="img/ourmission-icon-4.png"
            alt="ourmission-icon-4"
            srcSet="img/ourmission-icon-4@2x.png 2x, img/ourmission-icon-4@3x.png 3x"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

function Ourmission(props) {
  const classes = useStyles();
  const { data, block } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer>
      <Grid
        id="OurMission"
        justify="space-between"
        container
        spacing={3}
        xs={12}
      >
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <OurmissionHeader
            header={data.data.header}
            subHeader={data.data.subHeader}
          />
          <OurmissionText text={data.data.text} />
        </Grid>
        <OurmissionIcons />
      </Grid>
    </FluidContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ourmission);
