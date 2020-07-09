import React, { Component, Fragment } from 'react';
//import '../styles/tech.scss';
import Footer from '../main/components/Footer';
import Header from './Header.jsx';

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

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: '100%',
    marginLeft: '-25%',
  },
}));

const PrivacyHeader = () => {
  const classes = useStyles();
  return (
    <Typography variant="h2" component="h2">
      Personal Data Protection & Privacy Policy
    </Typography>
  );
};

const PrivacyBlocks = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          Defima owns and operates the websites (“Site”), as well as provides
          various apps and social networks, including payment and/or
          distribution apps (the “Mobile Apps”). We may also offer other
          features, contents, contests, payment services and/or distribution
          services from time to time (collectively, “Additional Features” and
          together with the Site and the Mobile Apps, the “Services”).We take
          your privacy very seriously. We ask that you read this privacy policy
          (the “Policy”) carefully as it contains important information about
          what to expect when we collect personal data about you and how we will
          use your personal data.{' '}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          1. What does this Policy Cover?
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          This Policy sets out the principles for collecting, using, disclosing,
          retaining and removing personal data and describes other important
          topics relating to an individual’s privacy, including but not limited
          to the personal data collected on our Site or through the Services.
          This Policy may be amended from time to time without notice, and you
          are only authorized to use the Services if you agree to our Policy as
          amended from time to time. By using the Services, or by providing your
          personal data to us, you acknowledge that you have read and understood
          the Policy and agree to the collection, use and disclosure of your
          personal data in the manner described in this Policy. In addition, if
          you have registered your telephone number with the national Do Not
          Call registry, we will not send you promotional and marketing messages
          via your telephone number unless you have provided us with the consent
          to do so.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          2. Collection, Use and Storage of Personal Data
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          The type of personal data that we may collect from you includes but is
          not limited to the following: 
          <ul>
            <li>name, title, address;</li>
            <li>mobile and/or telephone number; </li>
            <li>email address and online passwords; </li>
            <li>
              records of communications with us (including but not limited to
              voice and text messages);{' '}
            </li>
            <li>technical information;</li>
            <li>
              purchase and/or transaction history, including history on the
              usage of our Services;{' '}
            </li>
            <li>identification and proof of address documents; and </li>
            <li>
              website usage information. We will obtain personal data about you
              when you visit our website.
            </li>
          </ul>
          When you visit us, we may monitor your use of our websites through the
          use of cookies and similar tracking devices. For example, we may
          monitor the number of times you visit our website or which pages you
          go to. This information helps us to build a profile of our users. Some
          of this data will be aggregated or statistical, which means that we
          will not be able to identify you individually. We will generally only
          collect, use, disclose and process personal data for the primary
          purposes of:
          <ul>
            <li>
              conducting, improving, maintaining and developing a business
              relationship;
            </li>
            <li>providing the Services to you;</li>
            <li>
              processing, servicing or enforcing transactions and sending
              related communications, including processing and delivering
              products to you as part of the Services and facilitating product
              collection from our stores;{' '}
            </li>
            <li>
              registration, identification and verification purposes in
              connection with any of the Services or products that may be
              supplied to you;{' '}
            </li>
            <li>responding to your queries; </li>
            <li>
              to the extent permitted under applicable law, marketing (such as
              providing you with information about our products and promotional
              notices and offers and sending regular newsletters, promotions,
              events or contact you about products and services that we think
              may be of interest to you);{' '}
            </li>
            <li>improving and providing the Services; </li>
            <li>
              contacting you for product, service or customer satisfaction
              surveys;
            </li>
            <li>safety, security and legal compliance; and </li>
            <li> the purposes easonably related thereto;</li> 
          </ul>
          (collectively, the “Purposes”)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          3. Disclosure of Personal Data
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          Subject to the provisions of any applicable law, we will disclose
          personal data for the Purposes to third parties engaged to fulfill the
          purposes, or who assist us in operating our services, conducting our
          business, or servicing you, as long as these parties agree to keep
          this information confidential. We may also use and disclose your
          personal data for the purposes with and to our subsidiaries, parent
          company or affiliates.  In addition, we may also disclose your
          personal data when we believe such disclosures are appropriate to
          comply with the law, enforce our site policies, or protect our and
          others’ rights, property, or safety. This includes disclosing personal
          data to government agencies and authorities, regulators, exchanges,
          clearing houses, markets or depositories, where such disclosure is
          required by law or pursuant to the directives of such entities, and
          parties to whom we are under a duty to disclose personal data.
           Non-personally identifiable visitor information may be provided to
          other parties for marketing, advertising, or other uses.  In the event
          we are sold or integrated with another business your personal data may
          be disclosed to our advisers and any prospective purchasers and their
          advisers and will be passed on to the new owners of the business.
           Other than the purposes, we will not disclose your personal data for
          any other purposes unless your consent has been given or if so
          permitted or required under the PDPA or other applicable laws and
          regulations. 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          4. Accuracy and Correction of Personal Data
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          By submitting personal data to us, you warrant and represent that the
          personal data is accurate, true and complete. If you have submitted
          personal data to us electronically or otherwise, and would like it
          corrected, then a request should be sent to our support via email:
          support@defima.io We will respond to your request to correct your
          personal data as soon as practicable. We reserve the right to disagree
          with any request to correct your personal data on reasonable grounds.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          5. Withdrawal of Consent
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          You may withdraw your consent for the collection, use or disclosure of
          personal data by giving us reasonable notice by sending a request to
          support via email: support@defima.io. We will inform you of the likely
          consequences of the withdrawal of the consent. We will cease to
          collect, use or disclose the personal data once the withdrawal request
          has been processed by us unless otherwise permitted or required by the
          PDPA or other applicable laws and regulations.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          6. Cookies and Third Party Sites
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          When you use our services, including visiting our websites or use an
          application on our websites, we may record anonymous information such
          as IP address (not used to identify a specific individual), time,
          date, referring URL, pages accessed and documents downloaded, type of
          browser and operating system. We also use “cookies”. Cookies are small
          data files placed on your computer to collect standard Internet log
          information and visitor behavior information. The information is used
          to track visitor use of a website and to compile statistical reports
          on website activity. We use cookies in order to enhance your user
          experience by enabling our site to recognize you, either for the
          duration of your visit or for repeat visits. When you use our
          services, you are specifically allowing the services to execute all
          cookies as are required for the services to operate as efficiently as
          possible with the best user experience in mind. For further
          information about cookies, visit www.allaboutcookies.org. You can set
          your browser to not accept cookies and the above websites tell you how
          to remove cookies from your browser. However, in a few cases some of
          our site features may not function if you remove cookies from your
          browser. Our site and services may contain links to or from other
          websites. We have no control over such third party websites and we are
          not responsible for the privacy practices of other websites. This
          policy applies only to the information we collect on our site and
          services. 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          7. Security of your Personal Data
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          We will not be liable for any loss or damage of any kind in connection
          with your personal data arising from consequential misuse and/or fraud
          if you do not take reasonable care to ensure the continued
          confidentiality and accuracy of your personal data. 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          8. Access to Personal Data
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          Subject to the PDPA, if you wish to be provided with information
          regarding your personal data that is in our possession or under our
          control, or the ways in which such personal data has been used or
          disclosed by us in the year preceding such request, then you need to
          send a written request to our support via email: support@defima.io. We
          will handle such requests as soon as reasonably possible in accordance
          with the PDPA. A fee may be levied for such requests. 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          9. Anonymity when dealing with us
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          We allow individuals the option not to identify themselves when
          dealing with us, where practicable and to the extent allowed under
          law. To gain access to the full level of service that we are able to
          provide, a full KYC procedure has to be fulfilled. 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ color: grayText }}>
          10. Further Information
        </Typography>
        <Typography variant="p" component="p" style={{ color: grayText }}>
          We reserve the right to modify this Policy at any time. A current
          version of this Policy will be published on our Site. If you have any
          queries or feedback about the Policy, please contact support:
          support@defima.io.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default class Privacy extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Header />
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
                  <PrivacyHeader />
                </Grid>
                <Grid item xs={12}>
                  <PrivacyBlocks />
                </Grid>
              </Grid>
            </Container>
          </Container>
          <Footer />
        </ThemeProvider>
      </Fragment>
    );
  }
}
