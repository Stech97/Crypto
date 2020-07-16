import React, { Component, Fragment } from 'react';
//import '../styles/tech.scss';
import TermsAndConditionsContent from './terms';
import Footer from '../main/components/Footer';
import Header from './Header.jsx';
import { ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import FluidContainer from './Content';

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

class TermsAndConditions extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Header />
          <FluidContainer>
            <section className="terms-content">
              <TermsAndConditionsContent />
            </section>
          </FluidContainer>
          <Footer />
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default TermsAndConditions;
