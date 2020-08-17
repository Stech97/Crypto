import React, { Fragment, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { connect } from "react-redux";
import { GetBlock, getPicture } from "../actions/mainpage";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: "100%",
    marginLeft: "-25%",
  },
  defima_text: {
    width: "74.86%",
    fontFamily: "IBM Plex Sans",
    fontWeight: 400,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.3,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#fff",
  },

  check_box: {
    color: "#005c9f",
  },

  get_started: {
    margin: "10px",
    width: "12rem",
    height: "2.75rem",
    borderRadius: "1.875rem",
    border: ".1875rem solid #ed7102",
    backgroundColor: "#ed7102",
    fontFamily: "IBM Plex Sans",
    fontSize: "1.25rem",
    lineHeight: 1.29,
    textAlign: "center",
    padding: ".8125rem 1.9375rem",
    color: "#ffffff",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#ed7102",
    },
  },
  box: {
    minHeight: "450px",
  },
  download: {
    margin: "10px",
    width: "18rem",
    height: "2.75rem",
    borderRadius: "1.875rem",
    border: ".1875rem solid #ed7102",
    backgroundColor: "#ed7102",
    fontFamily: "IBM Plex Sans",
    fontSize: "1.25rem",
    lineHeight: 1.29,
    textAlign: "center",
    padding: ".8125rem 1.9375rem",
    color: "#ffffff",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#ed7102",
    },
  },
  text: {
    marginLeft: "10px",
    fontWeight: 200,
    fontStyle: "normal",
    textAlign: "left",
    color: "#005c9f",
    fontSize: "1.2rem",
    "&>span": {
      fontWeight: 500,
      borderBottom: "2px solid " + orange,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
  image: {
    width: "60vw",
    height: "auto",
    marginLeft: "-84px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "auto",
      marginLeft: "-84px",
    },
  },
  margins: {
    alignContent: "space-evenly",
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const JoinusHeader = ({ header }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Typography variant="h2" component="h2">
        Join the Defima Platform Now
      </Typography>
    </Grid>
  );
};

const JoinusContent = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <CheckCircleOutlineIcon className={classes.check_box} />

          <Typography variant="p" component="p" className={classes.text}>
            Starting from <span>$100</span>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <CheckCircleOutlineIcon className={classes.check_box} />

          <Typography variant="p" component="p" className={classes.text}>
            Earn up to <span>132%</span> APY
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <CheckCircleOutlineIcon className={classes.check_box} />

          <Typography variant="p" component="p" className={classes.text}>
            Affiliate commission in <span>1-7</span> Levels
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const JoinusButtons = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} justify="flex-start">
        <Box m={1}>
          <Button href={"/signup"} className={classes.get_started}>
            Get started
          </Button>
          <Button href={"/files/Test_pdf.pdf"} className={classes.download}>
            Download presentation
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

function Joinus(props) {
  const classes = useStyles();
  const { block, data } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer background="#f5fbff" radius="75px 0 75px 0" zIndex="20">
      <Grid
        className={classes.box}
        direction="row-reverse"
        container
        spacing={3}
        xs={12}
      >
        <Grid
          className={classes.margins}
          spacing={2}
          item
          container
          xs={12}
          md={6}
        >
          <JoinusHeader header={data.data.header} />
          <JoinusContent />
          <JoinusButtons />
        </Grid>
        <Grid spacing={2} item container xs={12} md={6}>
          <img
            className={classes.image}
            src={`${data.image.image}`}
            alt="joinus"
          />
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Joinus);
