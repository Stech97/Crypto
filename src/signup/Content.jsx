import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  fluid: {
    background:
      "url(./img/waveimage.png) center center / 70% auto no-repeat, linear-gradient(61deg, #001029 4%, #235fc8 98%) left top no-repeat",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    paddingTop: "150px",
    paddingBottom: "75px",
  },
}));

function FluidContainer({ children, ...rest }) {
  const classes = useStyles();
  return (
    <Container className={classes.fluid} maxWidth={false}>
      <Container className={classes.container} maxWidth="xl">
        {children}
      </Container>
    </Container>
  );
}

export default FluidContainer;
