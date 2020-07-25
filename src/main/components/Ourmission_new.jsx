import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

const OurmissionHeader = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h2" component="h2">
          Our Mission
        </Typography>
      </Grid>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h3" component="h3">
          The World Of Financial Freedom
        </Typography>
      </Grid>
    </Fragment>
  );
};

const OurmissionText = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Typography paragraph variant="body1" component="p">
        Our goal is to find the most profitable and secure way to participate in
        the DeFi markets. In order to get the most profit out of all
        possibilities of decentralized finance, it is of utmost importance to
        have huge investments and useful knowledge.
      </Typography>
      <Typography paragraph variant="body1" component="p">
        So, the reason why we developed the DEFIMA platform is to give investors
        an easy accessibility to invest in DeFi products without having a lot of
        knowledge nor a big budget.
      </Typography>
      <Typography paragraph variant="body1" component="p">
        All of the investor’s money will be bundled in a big pool. With this
        pool, we can reach higher profits, better security and long-term
        investments.
      </Typography>
      <Typography paragraph variant="body1" component="p">
        With this advantage, we can reach up to 11% on your investment each
        month. This wouldn’t be possible, if everyone is on his own.
      </Typography>
      <Typography paragraph variant="body1" component="p">
        Our mission is to give everyone an easy way to join the very profitable
        DeFi lending market.
      </Typography>
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

function Ourmission() {
  const classes = useStyles();
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
          <OurmissionHeader />
          <OurmissionText />
        </Grid>
        <OurmissionIcons />
      </Grid>
    </FluidContainer>
  );
}

export default Ourmission;
