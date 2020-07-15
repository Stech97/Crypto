import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  fluid: {
    background: "#ffffff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "75px",
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
