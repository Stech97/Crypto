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

const useStyles = makeStyles((theme) => ({
  card: {
    justifySelf: 'center',
    background: '#fff',
    borderRadius: '1.25rem',
    height: '100%',
    width: '20.125rem',
    justifyContent: 'center',
  },

  button_invest: {
    margin: 'auto',
    color: '#ffffff',
    width: '12.9625rem',
    height: '3.1563rem',
    backgroundImage: 'linear-gradient(77deg,#16428d 1%,#005c9f 78%)',
    margin: 'auto',
    borderRadius: '1.5625rem',
    textTransform: 'capitalize',
    '&:hover': {
      background: orange,
    },
  },
}));

const OurteamHeader = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          About Us
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Employee Spotlight
        </Typography>
      </Grid>
    </Grid>
  );
};

const ourteamMembers = [
  {
    id: 1,
    name: 'Thomas',
    post: 'CEO & Founder',
  },
  {
    id: 2,
    name: 'Scarlett',
    post: 'CEO & Founder',
  },
  {
    id: 3,
    name: 'Cagdas',
    post: 'Brand Ambassador',
  },
];

const OurteamMemberCard = (item) => {
  const classes = useStyles();
  return (
    <Grid item md={6}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={'img/member-photo-' + item.id + '.png'}
          title={'member-photo-' + item.id}
        />
        <CardContent>
          <Typography variant="body1" component="p">
            {' '}
            {item.name}
          </Typography>
          <Typography variant="body1" component="p">
            {item.post}
          </Typography>
          <div className="ourteam-member-mailbutton">
            <a href="https://www.linkedin.com/">
              <span>
                <svg viewBox="0 0 42 42">
                  <use href="#linkedin" />
                </svg>
              </span>
            </a>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

class OurteamMember extends Component {
  render() {
    const ourteamMemberTemplate = this.props.data.map(function (item) {
      return (
        <React.Fragment key={item.id}>
          <div className={'ourteam-member-caption-' + item.id}></div>
        </React.Fragment>
      );
    });

    return <React.Fragment>{ourteamMemberTemplate}</React.Fragment>;
  }
}

class Ourteam extends Component {
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
          <section className="ourteam">
            <div className="wrapper ourteam-wrapper">
              <OurteamHeader />
              <div className="ourteam-member">
                <OurteamMember data={ourteamMembers} />
              </div>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Ourteam;
