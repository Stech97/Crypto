import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function FluidContainer({
  children,
  background = "#ffffff",
  radius = "0",
  zIndex = "0",
  ...rest
}) {
  const useStyles = makeStyles((theme) => ({
    fluid: {
      background: background,
      borderRadius: radius,
      position: "relative",
      zIndex: zIndex,
    },
    container: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "150px",
      paddingBottom: "150px",
      marginBottom: "-75px",
    },
  }));

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
