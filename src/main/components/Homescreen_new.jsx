import React, { Component } from 'react';
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
      main: whitebox,
      contrastText: lightBlue,
    },
  },
  typography: {
    fontFamily: ['IBM Plex Sans'],
  },
});

const useStyles = makeStyles((theme) => ({
  p: {
    fontFamily: ['IBM Plex Sans'],
    maxWidth: '52.1875rem',
    fontSize: '1.5625rem',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.32,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#838383',
  },
  get_started: {
    margin: 'auto',
    width: '12rem',
    height: '2.75rem',
    borderRadius: '1.875rem',
    border: '.1875rem solid #ed7102',
    backgroundColor: '#ed7102',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1.25rem',
    lineHeight: 1.29,
    textAlign: 'center',
    padding: '.8125rem 1.9375rem',
    color: '#ffffff',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#ed7102',
    },
  },
}));

const HomescreenHeader = () => {
  const classes = useStyles();
  return (
    // Он на месте, просто переделай в белый цвет
    <Grid container direction="row">
      <Grid item xs={6}>
        <Typography variant="h1" component="h1">
          The most profitable and secure way to get cashflow from the DeFi
          markets.
        </Typography>
      </Grid>
    </Grid>
  );
};

const HomescreenButton = () => {
  const classes = useStyles();
  return (
    <Button href={'/signup'} className={classes.get_started}>
      Get started
    </Button>
  );

  // <a href="#" className="button-main button-getstarted homescreen-button">Get started</a>
};

class Homescreen extends Component {
  render() {
    return (
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
          <section className="homescreen">
            <div className="wrapper">
              <div className="homescreen-grid-container">
                <HomescreenHeader />
                <HomescreenButton />
              </div>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Homescreen;
