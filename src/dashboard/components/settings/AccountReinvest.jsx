import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { updateReInvest, getUserInfo } from "../../actions/UserInfo";
import { connect } from "react-redux";
import SettingsBox from "../SettingsBox";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	switch: {
		alignContent: "center",
	},
}));

function AccountReinvest(props) {
	const [state, setState] = useState(false);

	const handleChange = (event) => {
		props.updateReInvestAction(event.target.checked);
		props.getUserInfoAction();
		setState(props.userInfo.isReInvest);
	};

	const { userInfo } = props;
	const classes = useStyles();

	return (
		<SettingsBox header="Automatic Re-Invest">
			<Grid item container xs={12}>
				<Grid className={classes.switch} item container xs={12}>
					<Grid item xs={2}>
						<Switch
							id="reinvest"
							checked={state}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={10}>
						<Typography align="left">
							Enable Auto Re-Invest
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						When automatic re-invest ON, Defima will automatically
						buy new products (product category the last you
						selected) once the minimum amount for product buy is
						reached on Defima Token Balance from profits from
						running products and commissions.
						<br />
						With this on you will profit from the compound interest
						effect.
					</Typography>
				</Grid>
			</Grid>
		</SettingsBox>
	);
}

const mapStateToProps = (store) => ({
	userInfo: store.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
	updateReInvestAction: (value) => dispatch(updateReInvest(value)),
	getUserInfoAction: () => dispatch(getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountReinvest);
