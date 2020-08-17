import React, { Fragment, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { GetBlock, getPicture } from "../actions/mainpage";

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
  },
  image: {
    width: "100px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
      height: "auto",
    },
    [theme.breakpoints.down("md")]: {
      width: "80px",
      height: "auto",
    },
  },
}));

const HowitworksHeader = ({ header, subHeader }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h2" component="h2">
          {header}
        </Typography>
      </Grid>
      <Grid className={classes.header} item xs={12}>
        <Typography variant="h3" component="h3">
          {subHeader}
        </Typography>
      </Grid>
    </Fragment>
  );
};

const HowitworksScheme = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src={`${props.data}`}
        alt="howitworks_scheme"
        className={classes.scheme}
      />
    </Grid>
  );
};

const howitworksPoints = [
  {
    id: 1,
    header: "Investor",
    text: "The Investor deposits and buys a product.",
  },
  {
    id: 2,
    header: "Defima Pool",
    text:
      "Every Investor is a small part of the Defima pool. With this pool, we are able to get the best profits in the market.",
  },
  {
    id: 3,
    header: "Defima Oracle",
    text:
      "Together with Artificial Intelligence, our finance experts invest in safe and highly profitable investment opportunities in the DeFi market.",
  },
  {
    id: 4,
    header: "DeFi Markets",
    text:
      "We close the positions and collect all profits from the DeFi markets every week. We pay all our investors and keep a small amount as a backup in the Defima pool.",
  },
];

function HowitworksPoints(props) {
  const classes = useStyles();
  const Point = () =>
    props.data.map((item) => {
      return (
        <Grid
          key={item.id}
          item
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item align="center" xs={6}>
            <img
              src={"img/howitworks-icon-" + item.id + ".png"}
              alt={"howitworks-icon-" + item.id}
              className={classes.image}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="h4">
              {item.header}
            </Typography>
            <Typography variant="body1" component="p">
              {item.text}
            </Typography>
          </Grid>
        </Grid>
      );
    });

  return <Point />;
}

function Howitworks(props) {
  const classes = useStyles();
  const { data, block } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer background="#f5fbff" radius="75px 0 75px 0" zIndex="20">
      <Grid container spacing={3} xs={12}>
        <Grid className={classes.box} spacing={2} item container xs={12} sm={6}>
          <HowitworksHeader
            header={data.data.header}
            subHeader={data.data.subHeader}
          />
          <HowitworksScheme data={data.image.image} />
        </Grid>
        <Grid className={classes.box} spacing={3} item container xs={12} sm={6}>
          <HowitworksPoints data={howitworksPoints} />
        </Grid>
      </Grid>
    </FluidContainer>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage[props.block],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock(state.block));
  let GetPicture = () => dispatch(getPicture(state.block));
  GetPicture();
  return {
    GetAction,
    GetPicture,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Howitworks);
