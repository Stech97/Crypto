import React, { Component, Fragment } from "react";
import AccountInfo from "./AccountInfo";
import AccountVerification from "./AccountVerification";
import AccountSecurity from "./AccountSecurity";
import AccountChange from "./AccountChangePassword";
import AccountReinvest from "./AccountReinvest";
import { getUserInfo } from "../../actions/UserInfo";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

class SettingsContent extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <Grid item container spacing={3} justify="space-between" item xs={12}>
          <Grid container xs={12} md={6}>
            <AccountInfo />
            <AccountVerification />
          </Grid>
          <Grid container xs={12} md={4} direction="row">
            <AccountSecurity />
            <AccountChange />
            <AccountReinvest />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (store) => ({
  userInfo: store.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoAction: () => dispatch(getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent);
