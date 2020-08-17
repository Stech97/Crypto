import React, { Fragment, useState, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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

const OrangeButton = withStyles({
  root: {
    color: "#fff",
    backgroundColor: orange,
    border: "3px solid " + orange,
    borderRadius: "30px",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textTransform: "none",
    "&:hover": {
      color: "#fff",
      backgroundColor: "transparent",
    },
    "&[disabled]": {
      color: "#838383",
      borderColor: "#838383",
      backgroundColor: "transparent",
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: "100%",
    marginLeft: "-25%",
  },
  defima_text: {
    fontFamily: "IBM Plex Sans",
    fontWeight: 400,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.3,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#fff",
  },
  text: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobile_image: {
    width: "100%",
    marginBottom: "-150px",
  },
}));

const DefimaTokenImage = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img src={`${data}`} alt="defima coin" className={classes.scheme} />
    </Grid>
  );
};

const DefimaTokenHeader = ({ header }) => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" style={{ color: "#ffffff" }}>
          {header}
        </Typography>
      </Grid>
    </Grid>
  );
};

const DefimaTokenText = ({ text }) => {
  const classes = useStyles();
  return (
    <Grid container="row" spacing={3}>
      <Grid item xs={12}>
        {text &&
          text.split("\n").map((block, i) => (
            <Typography
              variant="body1"
              component="p"
              className={classes.defima_text}
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

function DefimaToken(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { block, data } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer
      background="url(/img/worldmap2.png) center left/ 100% auto no-repeat, linear-gradient(97deg, #001029 -39%, #235fc8 76%) left top no-repeat"
      radius="75px 0 0 0"
      zIndex="20"
    >
      <Grid container spacing={3} xs={12}>
        <Grid
          className={classes.image}
          spacing={2}
          item
          container
          xs={12}
          sm={6}
        >
          <DefimaTokenImage data={data.image.image} />
        </Grid>
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <DefimaTokenHeader header={data.data.header} />
          <Grid spacing={2} item container xs={12} className={classes.text}>
            <DefimaTokenText text={data.data.text} />
          </Grid>
          <Grid spacing={2} item container xs={12} className={classes.mobile}>
            <Collapse collapsedHeight="11rem" in={expanded}>
              <DefimaTokenText text={data.data.text} />
            </Collapse>
            <Box my={2}>
              <OrangeButton onClick={handleExpandClick}>
                {expanded ? "Hide" : "View More"}
              </OrangeButton>
            </Box>
          </Grid>
        </Grid>
        <Grid className={classes.mobile} item xs={12}>
          <img
            src="img/defimacoinrotate.png"
            alt="defima coin rotate"
            className={classes.mobile_image}
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

export default connect(mapStateToProps, mapDispatchToProps)(DefimaToken);
