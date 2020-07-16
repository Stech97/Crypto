import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    <div className="defimatoken-content-text">
      <Grid container="row" spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            Defima Token is a cryptocurrency token and operates on the Ethereum
            platform. We developed the token in order to get more financial
            power to build the platform.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            All profits and commission earnings will be paid out in our
            defimatoken. You can, of course, always exchange the token to
            Bitcoin or USD, and withdraw the money.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            For now, the token is only reserved for all Defima investors, and
            you can only get defimatoken by profits or commissions from Defima
            products. One token is currently worth 1 USD.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            As part of its strategy plan, Defima plans to make a public sale
            (ICO) in the near future. When this happens, we expect that the
            token will double or triple its price. We recommend all Defima
            investors to hold as many defimatoken as possible in order to
            benefit from the public sale.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

function DefimaToken() {
  const classes = useStyles();
  return (
    <FluidContainer
      background="url(/img/worldmap2.png) center left/ 100% auto no-repeat, linear-gradient(97deg, #001029 -39%, #235fc8 76%) left top no-repeat"
      radius="75px 0 75px 0"
      zIndex="20"
    >
      <Grid container spacing={3} xs={12}>
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <DefimaTokenImage />
        </Grid>
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <DefimaTokenHeader />
          <DefimaTokenText />
        </Grid>
      </Grid>
    </FluidContainer>
  );
}

export default DefimaToken;
