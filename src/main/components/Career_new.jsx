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
  career_text: {
    width: '72.9%',
    fontSize: '1.575rem',
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: 'normal',
    color: '#005c9f',
    textAlign: 'left',
    lineHeight: 1.3,
  },
}));

const CareerHeader = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Career Team
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Commission Plan
        </Typography>
      </Grid>
    </Grid>
  );
};

const CareerScheme = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <img
        src="img/career-strips.png"
        srcSet="img/career-strips@2x.png 2x, img/career-strips@3x.png 3x"
        alt="career-strips"
        className={classes.scheme}
      />
    </Grid>
  );
};

const CareerText = () => {
  const classes = useStyles();
  return (
    <div className="career-text">
      <Grid container="row" spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.career_text}
          >
            Commissions are a part of the weekly earnings of partners in your
            downline.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            component="p"
            className={classes.career_text}
          >
            The exact percentage depends on which level of your downline a
            partner is seated and on which product you choose.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

class Career extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: '#ffffff',
          height: '100%',
          borderBottomRightRadius: '9.375rem',
          borderTopLeftRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="career">
            <CareerHeader />
            <Grid container direction="row" spacing={6}>
              <Grid item xs={12} md={6}>
                <CareerScheme />
              </Grid>
              <Grid item xs={12} md={6}>
                <CareerText />
              </Grid>
            </Grid>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Career;
