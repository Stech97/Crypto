import React, { Component, Fragment } from 'react';
import clsx from 'clsx';
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
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { MailIcon, TelegramIcon } from '../../svg/iconComponents';
import Box from '@material-ui/core/Box';

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '200px',
    height: '200px',
    borderRadius: '2vw',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '1rem',
      width: '150px',
      height: '150px',
    },
  },

  media_holder: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
    marginTop: '25px',
    color: '#FFF',
    height: '6rem',
  },

  media: {
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
    },
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
    height: '4rem',
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
    justifySelf: 'flex-end',
  },

  marketing_follow_header: {
    color: darkBlue,
    fontWeight: 500,
  },

  subheading: {
    color: lightBlue,
    textTransform: 'capitalize',
  },
  contentbox: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  iconMail: {
    fill: darkBlue,
    stroke: darkBlue,
  },
  iconTelegram: {
    fill: '#0088cc',
    stroke: '#0088cc',
  },
  icons: {
    width: 'auto',
    height: '1em',
    fontSize: '1.8rem',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MarketingContentBox = ({ box: { className, link, header, img } }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.contentbox} item xs={6} md={3}>
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
  );
};

const MarketingContentFollow = ({}) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} md={6}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          element="h5"
          className={classes.marketing_follow_header}
        >
          Follow Us
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          <ListItem alignItems="center">
            <ListItemIcon className={classes.iconBox}>
              <MailIcon className={clsx(classes.icons, classes.iconMail)} />
            </ListItemIcon>
            <ListItemText> Subscribe to our Newsletter</ListItemText>
          </ListItem>
          <ListItem alignItems="center">
            <ListItemIcon className={classes.iconBox}>
              <img src="/img/followus-blog-icon.png" alt="followus-blog-icon" />
            </ListItemIcon>
            <ListItemText>
              <a href="https://medium.com/">Subscribe our Blog</a>
            </ListItemText>
          </ListItem>
          <ListItem alignItems="center">
            <ListItemIcon className={classes.iconBox}>
              <TelegramIcon
                className={clsx(classes.icons, classes.iconTelegram)}
              />
            </ListItemIcon>
            <ListItemText>
              <a href="https://telegram.org/">Join our Telegram News Channel</a>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default class MarketingContent extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <MarketingContentBox key={0} box={marketboxes[0]} />
          <MarketingContentBox key={1} box={marketboxes[1]} />
          <MarketingContentFollow />
          <MarketingContentBox key={2} box={marketboxes[2]} />
          <MarketingContentBox key={3} box={marketboxes[3]} />
          <MarketingContentBox key={4} box={marketboxes[4]} />
          <MarketingContentBox key={5} box={marketboxes[5]} />
        </Grid>
      </Container>
    );
  }
}
