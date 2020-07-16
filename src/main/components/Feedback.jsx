import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const orange = "#ed7102";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "#ffffff",
  },
}));

const BlueButton = withStyles({
  root: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "3px solid #fff",
    borderRadius: "30px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    textTransform: "none",
    "&:hover": {
      color: orange,
      borderColor: orange,
    },
  },
})(Button);

function Feedback() {
  const classes = useStyles();
  return (
    <FluidContainer background="linear-gradient(116deg, #061d4d 0%, #005c9f 100%) left center no-repeat">
      <Grid container spacing={3} xs={12}>
        <Grid justify="center" item xs={12}>
          <Typography className={classes.header} variant="h2" align="center">
            Need some help?
          </Typography>
        </Grid>
        <Grid justify="center" container item xs={12}>
          <BlueButton component="a" href="mailto:support@defima.io">
            Contact us
          </BlueButton>
        </Grid>
      </Grid>
    </FluidContainer>
  );
}

export default Feedback;
