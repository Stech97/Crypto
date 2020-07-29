import React, { Fragment } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

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
    boxShadow: "none",
    background: "transparent",
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
  name: {
    color: "#005c9f",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& a": {
      borderTop: "2px solid #ebebeb",
    },
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  carousel: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  media: {
    [theme.breakpoints.down("sm")]: {
      width: "33vw",
      height: "33vw",
      display: "flex",
      margin: "10px auto",
    },
  },
  slide: {
    background: "transparent",
  },
  button: {
    borderRadius: "0",
  },
}));

const OurteamHeader = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          About Us
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Employee Spotlight
        </Typography>
      </Grid>
    </Fragment>
  );
};

const ourteamMembers = [
  {
    id: 1,
    name: "Thomas",
    post: "CEO & Founder",
  },
  {
    id: 2,
    name: "Scarlett",
    post: "CEO & Founder",
  },
];

function LinkedIcon() {
  return (
    <SvgIcon viewBox="0 0 42 42">
      <path d="M34.963 35.536h-5.93V26.25c0-2.214-.044-5.063-3.08-5.063-3.089 0-3.562 2.411-3.562 4.902v9.447h-5.928v-19.09h5.687v2.608h.08c.795-1.5 2.733-3.08 5.616-3.08 6 0 7.117 3.955 7.117 9.097zM9.775 13.839a3.439 3.439 0 01-3.437-3.437 3.439 3.439 0 013.437-3.438 3.445 3.445 0 013.438 3.438 3.433 3.433 0 01-3.438 3.437zM6.811 35.536v-19.09h5.937v19.09zM37.793 1.25H3.498C1.927 1.25.65 2.545.65 4.134v34.232c0 1.59 1.277 2.884 2.848 2.884h34.295c1.571 0 2.857-1.295 2.857-2.884V4.134c0-1.59-1.286-2.884-2.857-2.884z"></path>
      <path
        fill="#005c9f"
        strokeMiterlimit="20"
        d="M34.963 35.536h-5.93V26.25c0-2.214-.044-5.063-3.08-5.063-3.089 0-3.562 2.411-3.562 4.902v9.447h-5.928v-19.09h5.687v2.608h.08c.795-1.5 2.733-3.08 5.616-3.08 6 0 7.117 3.955 7.117 9.097zM9.775 13.839a3.439 3.439 0 01-3.437-3.437 3.439 3.439 0 013.437-3.438 3.445 3.445 0 013.438 3.438 3.433 3.433 0 01-3.438 3.437zM6.811 35.536v-19.09h5.937v19.09zM37.793 1.25H3.498C1.927 1.25.65 2.545.65 4.134v34.232c0 1.59 1.277 2.884 2.848 2.884h34.295c1.571 0 2.857-1.295 2.857-2.884V4.134c0-1.59-1.286-2.884-2.857-2.884z"
      ></path>
    </SvgIcon>
  );
}

function OurteamMemberCard(props) {
  const { item } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        image={"/img/member-photo-" + item.id + ".png"}
        title={"member-photo-" + item.id}
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.name}
          align="center"
          variant="body1"
          component="p"
          paragraph
        >
          {item.name}
        </Typography>
        <Typography paragraph align="center" variant="body1" component="p">
          {item.post}
        </Typography>
        <IconButton
          component="a"
          href="https://www.linkedin.com/"
          aria-label="linkedin"
          className={classes.button}
        >
          <LinkedIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

function OurteamMember(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        className={classes.desktop}
        item
        container
        justify="space-around"
        spacing={3}
        xs={12}
      >
        {props.data.map((item, i) => (
          <OurteamMemberCard key={i} item={item} />
        ))}
      </Grid>
      <Swiper
        className={classes.carousel}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        slideClass={classes.slide}
      >
        {props.data.map((item, i) => (
          <SwiperSlide key={i} className={classes.slide}>
            <Grid
              className={classes.mobile}
              item
              container
              justify="space-around"
              spacing={3}
              xs={12}
            >
              <OurteamMemberCard item={item} />
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
}

function Ourteam() {
  return (
    <FluidContainer background="linear-gradient(0deg, #ed7102 100%, #ed7102 100%) left center/ 100% 20% no-repeat, #fff">
      <Grid id="Team" container spacing={3} xs={12}>
        <OurteamHeader />
        <OurteamMember data={ourteamMembers} />
      </Grid>
    </FluidContainer>
  );
}

export default Ourteam;
