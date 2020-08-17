import React, { Fragment, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { GetBlock, getPicture } from "../actions/mainpage";

export const darkBlue = "#123273";
export const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
export const grayText = "#838383";
export const grayBack = "#efefef";
export const orange = "#ed7102";
export const lightBlue = "#16428d";
export const whitebox = "#efefef";
export const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: "100%",
  },
  career_text: {
    width: "72.9%",
    fontSize: "1.575rem",
    fontWeight: 400,
    fontStyle: "normal",
    letterSpacing: "normal",
    color: "#005c9f",
    textAlign: "left",
    lineHeight: 1.3,
  },
  box: {
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
}));

const CareerHeader = ({ header, subHeader }) => {
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

const CareerScheme = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src={`${props.data}`}
        alt="career-strips"
        className={classes.scheme}
      />
    </Grid>
  );
};

const CareerText = ({ text }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.box} spacing={2} item container xs={12} md={5}>
      <Grid item xs={12}>
        {text &&
          text.split("\n").map((block, i) => (
            <Typography
              variant="body1"
              component="p"
              className={classes.career_text}
              paragraph
              key={i}
            >
              {block}
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
};

function Career(props) {
  const classes = useStyles();
  const { data, block } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer>
      <Grid className={classes.box} container spacing={3} xs={12}>
        <CareerHeader
          header={data.data.header}
          subHeader={data.data.subHeader}
        />
        <Grid spacing={2} item container xs={12} md={6}>
          <CareerScheme data={data.image.image} />
        </Grid>
        <CareerText text={data.data.text} />
      </Grid>
    </FluidContainer>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage[props.block],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock(state.block));
  let GetPicture = () => dispatch(getPicture(state.block));
  GetPicture();
  return {
    GetAction,
    GetPicture,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Career);
