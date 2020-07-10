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
}));

const TermsHeader = () => {
  const classes = useStyles();
  return (
    <Typography variant="h2" component="h2">
      Terms & Conditions
    </Typography>
  );
};

const TermsBlocks = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Risk Notice
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          Bitcoin is a not backed or value guaranteed by any financial
          institution; when purchasing bitcoins the customer assumes all risk
          the bitcoins may become worthless in value. Customers should research
          and consider the risks before purchasing any bitcoins. The company
          makes absolutely no guarantee about the future value of the bitcoins
          purchased.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Sever ability
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          In the event any court shall declare any section or sections of this
          Agreement invalid or void, such declaration shall not invalidate the
          entire Agreement and all other paragraphs of the Agreement shall
          remain in full force and effect.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Customer input errors
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          It is the sole responsibility of the customer to check the accuracy of
          information entered and saved on the website. Account details
          displayed on the order summary web page will be the final transfer
          destination. In the case that this information is incorrect, and funds
          are transferred to an unintended destination, the company shall not
          reimburse the customer and shall not transfer additional funds. As
          such customers must ensure the Bitcoin address and bank information
          they enter is completely correct.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Binding Agreement
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          The terms and provisions of this Agreement are binding upon Your
          heirs, successors, assigns, and other representatives. This Agreement
          may be executed in counterparts, each of which shall be considered to
          be an original, but both of which constitute the same Agreement.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Choice of Law
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          This Agreement, and its application and interpretation, shall be
          governed exclusively by the laws of the Seychelles, without regard to
          its conflict of law rules. You consent to the exclusive jurisdiction
          of the federal and state courts located in or near Mahe, Seyshells for
          any dispute arising under this Agreement.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          Security
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          We have implemented security measures designed to secure your
          information from accidental loss and from unauthorized access, use,
          alteration or disclosure. However, we cannot guarantee that
          unauthorized persons will never gain access to your information, and
          you acknowledge that you provide your information at your own risk,
          except as otherwise provided by applicable law.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default class TermsAndConditionsContent extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: '#ffffff',
          height: '100%',
          borderBottomRightRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="md">
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
              <TermsHeader />
            </Grid>
            <Grid item xs={12}>
              <TermsBlocks />
            </Grid>
          </Grid>
        </Container>
      </Container>
    );
  }
}
