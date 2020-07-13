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
class SettingsContent extends Component {
	render() {
		return (
			<Container maxWidth="lg">
				<Grid container></Grid>
				<Grid container></Grid>
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
