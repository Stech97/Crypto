import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SettingsBox from "../SettingsBox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import OrangeButton from "../Buttons";
import { uploadFiles } from "../../actions/KYC";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#838383",
    backgroundColor: "#fff",
    border: "3px solid " + "#838383",
    borderRadius: "1.875rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#838383",
    },
    "&[disabled]": {
      borderColor: "#838383",
    },
  },
  text: {
    color: "#16428d",
  },
}));

const GrayButton = withStyles({
  root: {
    color: "#838383",
    backgroundColor: "#fff",
    border: "3px solid " + "#838383",
    borderRadius: "1.875rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#838383",
    },
    "&[disabled]": {
      borderColor: "#838383",
    },
  },
})(Button);

function AccountVerification(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    passport: null,
    proof: null,
    selfie: null,
  });

  const onFileChange = (e) => {
    e.preventDefault();
    // Update the state
    let reader = new FileReader();
    let file = e.target.files[0];
    let id = e.target.id;
    const formData = new FormData();
    formData.append(id, file);
    setState({
      ...state,
      [id]: formData,
    });
  };

  return (
    <SettingsBox header="Account Verification (KYC)">
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={6}>
          <Typography align="left" className={classes.text}>
            Upload Passport or National ID
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <label htmlFor="passport">
            <input
              accept="image/*"
              id="passport"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <GrayButton component="span">Select file</GrayButton>
          </label>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left" className={classes.text}>
            Proof of address e.g. phone or utilities bill
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <label htmlFor="proof">
            <input
              accept="image/*"
              id="proof"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <GrayButton component="span">Select file</GrayButton>
          </label>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left" className={classes.text}>
            Selfie with passport or national ID + written letter with data of
            upload
          </Typography>
        </Grid>
        <Grid item align="center" xs={6}>
          <label htmlFor="selfie">
            <input
              accept="image/*"
              id="selfie"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <GrayButton component="span">Select file</GrayButton>
          </label>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="space-between"
          alignContent="center"
        >
          <OrangeButton
            disabled={!state.passport && !state.selfie && !state.proof}
            onClick={() => props.uploadAction(state)}
          >
            {props.kyc.isFetching ? "Loading..." : "Save"}
          </OrangeButton>
          {props.kyc.isFetching && (
            <Loader type="Rings" color="#F9A732" height={34} width={34} />
          )}
        </Grid>
      </Grid>
    </SettingsBox>
  );
}

const mapStateToProps = (state) => ({
  kyc: state.kyc,
});

const mapDispatchToProps = (dispatch) => ({
  uploadAction: (files) => dispatch(uploadFiles(files)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountVerification);
