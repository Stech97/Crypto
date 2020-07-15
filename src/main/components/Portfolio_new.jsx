import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
  card: {
    justifySelf: "center",
    background: "#fff",
    borderRadius: "1.25rem",
    height: "100%",
    width: "20.125rem",
    justifyContent: "center",
  },

  button_invest: {
    margin: "auto",
    color: "#ffffff",
    width: "12.9625rem",
    height: "3.1563rem",
    backgroundImage: "linear-gradient(77deg,#16428d 1%,#005c9f 78%)",
    margin: "auto",
    borderRadius: "1.5625rem",
    textTransform: "capitalize",
    "&:hover": {
      background: orange,
    },
  },
}));

const PortfolioHeader = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h2" component="h2">
          How It Works
        </Typography>
      </Grid>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h3" component="h3">
          Business model
        </Typography>
      </Grid>
    </Fragment>
  );
};

const portfolioProducts = [
  {
    id: 1,
    header: "Small",
    percent: 6,
    investment: 100,
    level: 2,
  },
  {
    id: 2,
    header: "Medium",
    percent: 8,
    investment: 5000,
    level: 4,
  },
  {
    id: 3,
    header: "Large",
    percent: 11,
    investment: 10000,
    level: 7,
  },
];

const Invest = (item) => {
  const classes = useStyles();
  return (
    <Grid item md={6}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3" component="h3" gutterBottom>
            {item.header}
          </Typography>
          <Typography variant="body1" component="p">
            {" "}
            Monthly Profit of up to {item.percent}% month
          </Typography>
          <Typography variant="body1" component="p">
            Starting from ${item.investment}
          </Typography>
          <Typography variant="body1" component="p">
            Career commission qualified Level 1-{item.level}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href={"/account/investment"}
            className={classes.button_invest}
          >
            Invest
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

function PortfolioProduct(props) {
  const portfolioProductTemplate = props.data.map(function (item) {
    return <Invest item={item} />;
  });
  return <div className="portfolio-product">{portfolioProductTemplate}</div>;
}

function Portfolio() {
  const classes = useStyles();
  return (
    <FluidContainer background="#f5fbff" radius="75px 0 0 75px">
      <Grid container spacing={3} xs={12}>
        <Grid
          className={classes.box}
          spacing={2}
          justify="flex-start"
          item
          container
          xs={12}
        >
          <PortfolioHeader />
        </Grid>
        <Grid className={classes.box} spacing={2} item container xs={12}>
          <PortfolioProduct data={portfolioProducts} />
        </Grid>
      </Grid>
    </FluidContainer>
  );
}

export default Portfolio;
