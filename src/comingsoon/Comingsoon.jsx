import React, { Component } from 'react';
//import '../styles/comingsoon.scss'
import { connect } from 'react-redux';
import ComingSoonForm from './components/ComingsoonForm';

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

const ComingSoonLogo = () => {
  return (
    <div className="comingsoon-logobox">
      <img src="img/defimaLogo.png" alt="defimaLogo" />
    </div>
  );
};

class ComingSoon extends Component {
  render() {
    const { ComingSoon } = this.props;
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
            <section className="comingsoon">
              <div className="comingsoon-wrapper">
                <div className="comingsoon-grid-container">
                  <ComingSoonLogo />
                  <Typography
                    variant="h2"
                    component="h2"
                    style={{ color: '#ffffff' }}
                  >
                    We Will Launch Soon.
                  </Typography>
                  <div
                    className={
                      ComingSoon.visibility ? 'comingsoon-h2-box' : 'none'
                    }
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ color: '#ffffff' }}
                    >
                      Subscribe to get notification as soon as we launch
                    </Typography>
                  </div>
                  <ComingSoonForm
                    updateView={ComingSoon.updateView}
                    sendError={ComingSoon.visibility}
                    placeholder={ComingSoon.placeholder}
                  />
                  <div
                    className={
                      !ComingSoon.visibility ? 'comingsoon-thanks-box' : 'none'
                    }
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ color: '#ffffff' }}
                    >
                      Thank you for your subscription.
                    </Typography>
                  </div>
                </div>
              </div>
            </section>
          </Container>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (store) => {
  console.log(store);
  return {
    ComingSoon: store.ComingSoon,
  };
};
/*
const mapDispatchToProps = dispatch => {
  return {
  	updateView: email => dispatch(updateView(email)),
  }
}
*/
export default connect(mapStateToProps)(ComingSoon);
