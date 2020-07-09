import React, { Component } from 'react';

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

const useStyles = makeStyles((theme) => ({}));

const OurmissionHeader = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Our Mission
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          The World Of Financial Freedom
        </Typography>
      </Grid>
    </Grid>
  );
};

const OurmissionText = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          Our goal is to find the most profitable and secure way to participate
          in the DeFi markets. In order to get the most profit out of all
          possibilities of decentralized finance, it is of utmost importance to
          have huge investments and useful knowledge.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          So, the reason why we developed the DEFIMA platform is to give
          investors an easy accessibility to invest in DeFi products without
          having a lot of knowledge nor a big budget.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          All of the investor’s money will be bundled in a big pool. With this
          pool, we can reach higher profits, better security and long-term
          investments.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          With this advantage, we can reach up to 11% on your investment each
          month. This wouldn’t be possible, if everyone is on his own.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          Our mission is to give everyone an easy way to join the very
          profitable DeFi lending market.
        </Typography>
      </Grid>
    </Grid>
  );
};

const OurmissionIcons = () => {
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item={6}>
        <div className="ourmission-iconbox-1">
          <img
            className="ourmission-icon-image-1"
            src="img/ourmission-icon-1.png"
            alt="ourmission-icon-1"
            srcSet="img/ourmission-icon-1@2x.png 2x, img/ourmission-icon-1@3x.png 3x"
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="ourmission-iconbox-2">
          <img
            className="ourmission-icon-image-2"
            src="img/ourmission-icon-2.png"
            alt="ourmission-icon-2"
            srcSet="img/ourmission-icon-2@2x.png 2x, img/ourmission-icon-2@3x.png 3x"
          />
        </div>
      </Grid>
      <Grid item x={6}>
        <div className="ourmission-iconbox-3">
          <img
            className="ourmission-icon-image-3"
            src="img/ourmission-icon-3.png"
            alt="ourmission-icon-3"
            srcSet="img/ourmission-icon-3@2x.png 2x, img/ourmission-icon-3@3x.png 3x"
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="ourmission-iconbox-4">
          <img
            className="ourmission-icon-image-4"
            src="img/ourmission-icon-4.png"
            alt="ourmission-icon-4"
            srcSet="img/ourmission-icon-4@2x.png 2x, img/ourmission-icon-4@3x.png 3x"
          />
        </div>
      </Grid>
    </Grid>
  );
};

class Ourmission extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: '#ffffff',
          height: '100%',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="ourmission">
            <OurmissionHeader />
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} md={6}>
                <OurmissionText />
              </Grid>
              <Grid item xs={12} md={6}>
                <OurmissionIcons />
              </Grid>
            </Grid>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Ourmission;
