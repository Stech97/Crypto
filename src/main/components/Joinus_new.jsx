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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: '100%',
    marginLeft: '-25%',
  },
  defima_text: {
    width: '74.86%',
    fontFamily: 'IBM Plex Sans',
    fontWeight: 400,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.3,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#fff',
  },

  check_box: {
    color: '#005c9f',
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

  download: {
    margin: 'auto',
    width: '18rem',
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

const JoinusHeader = () => {
  const classes = useStyles();
  return (
    <div className="joinus-header">
      <Typography variant="h2" component="h2">
        Join the Defima Platform Now
      </Typography>
    </div>
  );
};

const JoinusContent = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <CheckCircleOutlineIcon className={classes.check_box} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="p"
              component="p"
              style={{
                margin: 0,
                fontWeight: 200,
                fontStyle: 'normal',
                textAlign: 'left',
                color: '#005c9f',
              }}
            >
              Starting from <span>$100</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <CheckCircleOutlineIcon className={classes.check_box} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="p"
              component="p"
              style={{
                margin: 0,
                fontWeight: 200,
                fontStyle: 'normal',
                textAlign: 'left',
                color: '#005c9f',
              }}
            >
              Earn up to <span>132%</span> APY
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <CheckCircleOutlineIcon className={classes.check_box} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="p"
              component="p"
              style={{
                margin: 0,
                fontWeight: 200,
                fontStyle: 'normal',
                textAlign: 'left',
                color: '#005c9f',
              }}
            >
              Affiliate commission in <span>1-7</span> Levels
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const JoinusButtons = () => {
  const classes = useStyles();
  return (
    <div className="joinus-buttons">
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={6}>
          <Button href={'/signup'} className={classes.get_started}>
            Get started
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button href={'/files/Test_pdf.pdf'} className={classes.download}>
            Download presentation
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

class Joinus extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: contentBack,
          height: '100%',
          borderBottomRightRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="joinus">
            <div className="wrapper joinus-wrapper">
              <JoinusHeader />
              <JoinusContent />
              <JoinusButtons />
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Joinus;
