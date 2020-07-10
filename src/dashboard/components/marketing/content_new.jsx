import React, { Component, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { Container } from '@material-ui/core';

const marketboxes = [
  {
    className: 'business',
    link: '/files/Business_presentation.pptx',
    header: 'Business Presentation',
    img: 'pdf-icon.png',
  },
  {
    className: 'video',
    link: '/files/Business_presentation.pptx',
    header: 'Video Presentation',
    img: 'video-icon.png',
  },
  {
    className: 'facebook',
    link: '/files/Test.zip',
    header: 'Social Media Posts',
    img: 'facebook-icon.png',
  },
  {
    className: 'instagram',
    link: '/files/Test.zip',
    header: 'Instagram Stories',
    img: 'instagram-icon.png',
  },
  {
    className: 'promopictures',
    link: '/files/Test.zip',
    header: 'Promo Pictures',
    img: 'pictures-folder-icon.png',
  },
  {
    className: 'promovideos',
    link: '/files/Test.zip',
    header: 'Promo Videos',
    img: 'videos-folder-icon.png',
  },
];

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const headerTheme = createMuiTheme({
  palette: {
    primary: {
      main: contentBack,
      contrastText: darkBlue,
    },
    secondary: {
      main: darkBlue,
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fff',
      dark: orange,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: '2.35714vw 2.35714vw 2.35714vw 2.35714vw;',
  },

  media_holder: {
    color: '#FFF',
    height: '6rem',
  },

  media: {
    margin: 'auto',
    width: 75,
    height: 75,
    position: 'relative',
  },

  card_header: {
    fontFamily: ['IBM Plex Sans'],
    color: lightBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  download: {
    margin: 'auto',
    color: '#fff',
    width: '100%',
    height: '100%',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
      // color: '#FFF',
    },
  },

  action_area: {
    background: 'linear-gradient(50deg, #123273 0%, #005c9f 100%)',
    '&:hover': {
      background: orange,
    },
  },

  marketing_follow_header: {
    color: darkBlue,
    fontWeight: 500,
  },

  subheading: {
    color: lightBlue,
    textTransform: 'capitalize',
  },
}));

const MarketingContentBox = ({ box: { className, link, header, img } }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={6} md={3}>
        <Typography className={classes.card_header}>{header}</Typography>
        <Card className={classes.root}>
          <CardActionArea className={classes.media_holder}>
            <CardMedia
              className={classes.media}
              image={'/img/' + img}
              title={className}
            />
          </CardActionArea>
          <CardActions className={classes.action_area}>
            <Button size="large" className={classes.download} href={link}>
              Download
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
};

const MarketingContentFollow = ({}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          element="h5"
          className={classes.marketing_follow_header}
        >
          Follow Us
        </Typography>{' '}
      </Grid>
      <Grid iitem xs={12} md={6}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <SvgIcon>
              {/* Это должна была быть вот эта: но я запутался с относительными путями: followus-newsletter-icon */}
              <path d="M 0.568 2.466 c 0 -0.02 0.03 -0.212 0.09 -0.577 l 10.297 8.807 l -10.266 9.87 c -0.08 -0.283 -0.121 -0.486 -0.121 -0.607 Z M 1.935 0.675 c 0.141 -0.061 0.313 -0.092 0.516 -0.092 H 30.18 c 0.181 0 0.364 0.03 0.546 0.092 L 20.4 9.512 l -1.367 1.093 l -2.703 2.217 l -2.702 -2.217 l -1.367 -1.093 Z M 12.322 11.82 l 4.008 3.25 l 4.01 -3.25 l 10.355 9.93 a 1.45 1.45 0 0 1 -0.515 0.091 H 2.45 a 1.39 1.39 0 0 1 -0.485 -0.09 Z m 9.384 -1.124 L 31.972 1.89 c 0.06 0.182 0.09 0.375 0.09 0.577 V 19.96 c 0 0.182 -0.03 0.384 -0.09 0.607 Z" />
            </SvgIcon>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.subheading}>
              Subscribe to our Newsletter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Icon>
              <img src="/img/followus-blog-icon.png" alt="followus-blog-icon" />
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.subheading} href="https://medium.com/">
              Subscribe to our Blog
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <SvgIcon>
              {/* Это должна была быть вот эта: но я запутался с относительными путями: followus-telegram-icon */}
              <path d="M 31.113 15.383 c 0 8.436 -6.836 15.27 -15.272 15.27 c -8.438 0 -15.273 -6.834 -15.273 -15.27 C 0.568 6.946 7.403 0.11 15.841 0.11 c 8.436 0 15.272 6.835 15.272 15.272 Z m -7.772 -4.81 c 0.222 -1.034 -0.376 -1.446 -1.059 -1.2 L 7.557 15.05 c -1.01 0.395 -0.99 0.955 -0.172 1.213 l 3.769 1.176 l 8.745 -5.505 c 0.406 -0.27 0.782 -0.117 0.474 0.154 l -7.076 6.392 l -0.27 3.886 c 0.394 0 0.566 -0.173 0.77 -0.376 l 1.84 -1.773 l 3.818 2.814 c 0.696 0.394 1.195 0.19 1.38 -0.647 Z" />
            </SvgIcon>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.subheading} href="https://telegram.org/">
              Join our Telegram News Channel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default class MarketingContent extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <div className="marketing-box">
          <Grid container spacing={3}>
            {marketboxes.map((box, id) => (
              <MarketingContentBox key={id} box={box} />
            ))}
          </Grid>
          <Grid container spacing={1} direction="column">
            <MarketingContentFollow />
          </Grid>
        </div>
      </Container>
    );
  }
}
