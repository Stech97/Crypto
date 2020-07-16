import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const orange = "#ed7102";

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
  fluid: {
    background:
      "url(./img/waveimage.png) center center / 70% auto no-repeat, linear-gradient(61deg, #001029 4%, #235fc8 98%) left top no-repeat",
    borderBottomLeftRadius: "75px",
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    minHeight: "100vh",
    marginTop: "-75px",
    paddingBottom: "75px",
    "&>div": {
      alignContent: "center",
    },
  },
}));

function Homescreen() {
  const classes = useStyles();
  return (
    <Container className={classes.fluid} maxWidth={false}>
      <Container className={classes.container} maxWidth="xl">
        <Grid container spacing={3} xs={12}>
          <Grid xs={12} item className={classes.header}>
            <Typography variant="h1">
              The most profitable and secure way
              <br />
              to get cashflow from the DeFi markets.
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <OrangeButton component={Link} to="/signup">
              Get started
            </OrangeButton>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Homescreen;
