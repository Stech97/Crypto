import React, { Fragment, useState } from "react";
import FluidContainer from "../Content";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

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
    marginBottom: "-155px",
  },
}));

const DefimaTokenImage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src="img/defimacoin.png"
        srcSet="img/defimacoin@2x.png 2x, img/defimacoin@3x.png 3x"
        alt="defima coin"
        className={classes.scheme}
      />
    </Grid>
  );
};

const DefimaTokenHeader = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" style={{ color: "#ffffff" }}>
          Defima Token
        </Typography>
      </Grid>
    </Grid>
  );
};

const DefimaTokenText = () => {
  const classes = useStyles();
  return (
    <Grid container="row" spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          component="p"
          className={classes.defima_text}
          paragraph
        >
          Defima Token is a cryptocurrency token and operates on the Ethereum
          platform. We developed the token in order to get more financial power
          to build the platform.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.defima_text}
          paragraph
        >
          All profits and commission earnings will be paid out in our
          defimatoken. You can, of course, always exchange the token to Bitcoin
          or USD, and withdraw the money.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.defima_text}
          paragraph
        >
          For now, the token is only reserved for all Defima investors, and you
          can only get defimatoken by profits or commissions from Defima
          products. One token is currently worth 1 USD.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.defima_text}
          paragraph
        >
          As part of its strategy plan, Defima plans to make a public sale (ICO)
          in the near future. When this happens, we expect that the token will
          double or triple its price. We recommend all Defima investors to hold
          as many defimatoken as possible in order to benefit from the public
          sale.
        </Typography>
      </Grid>
    </Grid>
  );
};

function DefimaToken() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          <DefimaTokenImage />
        </Grid>
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <DefimaTokenHeader />
          <Grid spacing={2} item container xs={12} className={classes.text}>
            <DefimaTokenText />
          </Grid>
          <Grid spacing={2} item container xs={12} className={classes.mobile}>
            <Collapse collapsedHeight="11rem" in={expanded}>
              <DefimaTokenText />
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

export default DefimaToken;
