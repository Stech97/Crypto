import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

const CareerHeader = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h2" component="h2">
          Career Team
        </Typography>
      </Grid>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h3" component="h3">
          Commission Plan
        </Typography>
      </Grid>
    </Fragment>
  );
};

const CareerScheme = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src="img/career-strips.png"
        srcSet="img/career-strips@2x.png 2x, img/career-strips@3x.png 3x"
        alt="career-strips"
        className={classes.scheme}
      />
    </Grid>
  );
};

const CareerText = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.box} spacing={2} item container xs={12} md={5}>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          component="p"
          className={classes.career_text}
          paragraph
        >
          Commissions are a part of the weekly earnings of partners in your
          downline.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.career_text}
          paragraph
        >
          The exact percentage depends on which level of your downline a partner
          is seated and on which product you choose.
        </Typography>
      </Grid>
    </Grid>
  );
};

function Career() {
  const classes = useStyles();
  return (
    <FluidContainer>
      <Grid className={classes.box} container spacing={3} xs={12}>
        <CareerHeader />
        <Grid spacing={2} item container xs={12} md={6}>
          <CareerScheme />
        </Grid>
        <CareerText />
      </Grid>
    </FluidContainer>
  );
}

export default Career;
