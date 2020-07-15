import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SettingsBox from '../SettingsBox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OrangeButton from '../Buttons';

const useStyles = makeStyles((theme) => ({}));

const GrayButton = withStyles({
  root: {
    color: '#838383',
    backgroundColor: '#fff',
    border: '3px solid ' + '#838383',
    borderRadius: '1.875rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#838383',
    },
    '&[disabled]': {
      borderColor: '#838383',
    },
  },
})(Button);

export default function AccountVerification(props) {
  const classes = useStyles();
  return (
    <SettingsBox header="Account Verification (KYC)">
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={6}>
          <Typography align="left" className={classes.text}>
            Upload Passport or National ID
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <GrayButton className={classes.button}>Select file</GrayButton>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left">
            Proof of address e.g. phone or utilities bill
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <GrayButton>Select file</GrayButton>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left">
            Selfie with passport or national ID + written letter with data of
            upload
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <GrayButton>Select file</GrayButton>
        </Grid>
        <Grid item xs={12}>
          <OrangeButton>Save</OrangeButton>
        </Grid>
      </Grid>
    </SettingsBox>
  );
}
