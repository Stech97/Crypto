import React, { Fragment, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
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
  card: {
    justifySelf: "center",
    background: "#fff",
    borderRadius: "1.25rem",
    height: "400px",
    width: "100%",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
  },
  title: {
    background: "linear-gradient(247deg, #005c9f 0%, #123273 100%)",
    height: "20%",
    display: "flex",
    color: "#fff",
  },
  content: {
    padding: "0 20%",
  },
  actions: {
    padding: "0 20% 2rem 20%",
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
  box: {
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  header: {
    "&>*": {
      color: "#ffffff",
    },
  },
  carousel: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const PortfolioHeader = ({ header, subHeader }) => {
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

function Invest(props) {
  const { item } = props;
  const classes = useStyles();
  return (
    <Grid item md={3} xs={12}>
      <Card className={classes.card}>
        <CardHeader
          align="center"
          className={classes.title}
          title={item.header}
        />
        <CardContent className={classes.content}>
          <Typography paragraph variant="body1" component="p">
            Monthly Profit of up to {item.percent}% month
          </Typography>
          <Typography paragraph variant="body1" component="p">
            Starting from ${item.investment}
          </Typography>
          <Typography paragraph variant="body1" component="p">
            Career commission qualified Level 1-{item.level}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
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
}

function PortfolioProduct(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        className={classes.box}
        justify="center"
        spacing={2}
        item
        container
        xs={12}
      >
        {props.data.map((item, i) => (
          <Invest item={item} key={i} />
        ))}
      </Grid>
      <Swiper
        className={classes.carousel}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        pagination={{
          el: ".swiper-pagination",
          type: "bullets",
        }}
      >
        {props.data.map((item, i) => (
          <SwiperSlide key={i} className={classes.slide}>
            <Invest item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
}

function Portfolio(props) {
  const classes = useStyles();
  const { block, data } = props;
  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);
  return (
    <FluidContainer
      background="url(/img/worldmap2.png) left center/ auto 100% no-repeat, linear-gradient(39deg, #ed7102 0%, #ed7102 100%) left top no-repeat"
      radius="0 0 0 75px"
      zIndex="18"
    >
      <Grid container spacing={3} xs={12}>
        <Grid
          className={classes.box}
          spacing={2}
          justify="flex-start"
          item
          container
          xs={12}
        >
          <PortfolioHeader
            header={data.data.header}
            subHeader={data.data.subHeader}
          />
        </Grid>

        <PortfolioProduct data={portfolioProducts} />
      </Grid>
    </FluidContainer>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage[props.block],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetBlock(state.block));
  return {
    GetAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
