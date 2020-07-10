import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

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
import { Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Swiper, SwiperSlide } from 'swiper/react';

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const theme = createMuiTheme({
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
  typography: {
    fontFamily: ['IBM Plex Sans'],
    h1: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#ffffff',
      fontSize: '2rem',
      fontWeight: 600,
      fontStyle: 'normal',
    },

    h2: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.75rem',
      fontWeight: 600,
      fontStyle: 'normal',
    },

    h3: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.5rem',
      fontWeight: 400,
      fontStretch: 'normal',
      fontStyle: 'italic',
    },

    h4: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.0rem',
      fontWeight: 600,
      fontStretch: 'normal',
    },

    body1: {
      fontSize: '1.0rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.32,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#838383',
    },
  },
});

const LoginHeader = () => {
  return (
    <div className="login-header">
      <Typography variant="h2" component="h2" style={{ color: '#ffffff' }}>
        Login to defima
      </Typography>
    </div>
  );
};

const LoginForgot = () => {
  return (
    <div className="login-forgot">
      <Typography variant="body1" component="p" style={{ color: '#ffffff' }}>
        Forgot your password?{' '}
        <Link to="/forgot">
          <Typography
            variant="body1"
            component="p"
            style={{ color: '#ffffff', fontWeight: 500 }}
          >
            <u>Restore it</u>
          </Typography>
        </Link>
      </Typography>
    </div>
  );
};

const LoginFooter = () => {
  return (
    <Grid container direction="row" justifyItems="center">
      <Grid item xs={6}>
        <Link to="/terms&conditions">
          {' '}
          <Typography
            variant="body1"
            component="p"
            style={{ color: '#ffffff' }}
          >
            <u>Terms of use</u>
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/privacy">
          <Typography
            variant="body1"
            component="p"
            style={{ color: '#ffffff' }}
          >
            <u>Privacy policy</u>
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

class Content extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="xl"
          style={{
            backgroundColor: darkBlue,
            height: '100%',
            borderBottomLeftRadius: '9.375rem',
            border: 'none',
          }}
        >
          <Container maxWidth="lg">
            <section className="login">
              <div className="login-wrapper wrapper">
                <LoginHeader />
                <LoginForm />
                <LoginForgot />
                <LoginFooter />
              </div>
            </section>
          </Container>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Content;
