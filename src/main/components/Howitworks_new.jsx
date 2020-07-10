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

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: '100%',
  },
}));

const HowitworksHeader = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          How It Works
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Business model
        </Typography>
      </Grid>
    </Grid>
  );
};

const HowitworksScheme = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src="img/howitworks_scheme.png"
        alt="howitworks_scheme"
        className={classes.scheme}
      />
    </Grid>
  );
};

const howitworksPoints = [
  {
    id: 1,
    header: 'Investor',
    text: 'The Investor deposits and buys a product.',
  },
  {
    id: 2,
    header: 'Defima Pool',
    text:
      'Every Investor is a small part of the Defima pool. With this pool, we are able to get the best profits in the market.',
  },
  {
    id: 3,
    header: 'Defima Oracle',
    text:
      'Together with Artificial Intelligence, our finance experts invest in safe and highly profitable investment opportunities in the DeFi market.',
  },
  {
    id: 4,
    header: 'DeFi Markets',
    text:
      'We close the positions and collect all profits from the DeFi markets every week. We pay all our investors and keep a small amount as a backup in the Defima pool.',
  },
];

class HowitworksPoints extends Component {
  render() {
    const howitworksPointTemplate = this.props.data.map(function (item) {
      return (
        <React.Fragment key={item.id}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="stretch"
          >
            <Grid item xs={6}>
              <img
                src={'img/howitworks-icon-' + item.id + '.png'}
                alt={'howitworks-icon-' + item.id}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" component="h4">
                {item.header}
              </Typography>
              <Typography variant="body1" component="p">
                {item.text}
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    });

    return <React.Fragment>{howitworksPointTemplate}</React.Fragment>;
  }
}

class Howitworks extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: contentBack,
          height: '100%',
          borderBottomRightRadius: '9.375rem',
          borderTopLeftRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="howitworks">
            <div className="howitworks-wrapper wrapper">
              <HowitworksHeader />
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={7}>
                  <HowitworksScheme />
                </Grid>
                <Grid item xs={12} md={5}>
                  <HowitworksPoints data={howitworksPoints} />
                </Grid>
              </Grid>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Howitworks;
