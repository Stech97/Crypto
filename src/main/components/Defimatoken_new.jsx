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
}));

const DefimaTokenImage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <div className="defimatoken-image">
        <img
          src="img/defimacoin.png"
          srcSet="img/defimacoin@2x.png 2x, img/defimacoin@3x.png 3x"
          alt="defima coin"
          className={classes.scheme}
        />
      </div>
    </Grid>
  );
};

const DefimaTokenHeader = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" style={{ color: '#ffffff' }}>
          Defima Token
        </Typography>
      </Grid>
    </Grid>
  );
};

const DefimaTokenText = () => {
  const classes = useStyles();
  return (
    <div className="defimatoken-content-text">
      <Grid container="row" spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            Defima Token is a cryptocurrency token and operates on the Ethereum
            platform. We developed the token in order to get more financial
            power to build the platform.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            All profits and commission earnings will be paid out in our
            defimatoken. You can, of course, always exchange the token to
            Bitcoin or USD, and withdraw the money.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            For now, the token is only reserved for all Defima investors, and
            you can only get defimatoken by profits or commissions from Defima
            products. One token is currently worth 1 USD.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.defima_text}
          >
            As part of its strategy plan, Defima plans to make a public sale
            (ICO) in the near future. When this happens, we expect that the
            token will double or triple its price. We recommend all Defima
            investors to hold as many defimatoken as possible in order to
            benefit from the public sale.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

class DefimaToken extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: darkBlue,
          height: '100%',
          borderTopRightRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="defimatoken">
            <div className="defimatoken-wrapper">
              <Grid container direction="row" spacing={6}>
                <Grid item xs={12} md={6}>
                  <DefimaTokenImage />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container direction="row" spacing={6}>
                    <Grid item xs={12} md={6}>
                      <DefimaTokenHeader />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <DefimaTokenText />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default DefimaToken;
