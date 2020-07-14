import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { updateReInvest, getUserInfo } from "../../actions/UserInfo";
import { connect } from "react-redux";
import SettingsBox from "../SettingsBox";

function AccountReinvest(props) {
	const handleChange = (value) => {
		props.updateReInvestAction(value);
		props.getUserInfoAction();
	};

	const { userInfo } = props;

	return (
		<SettingsBox>
			<h5 className="settings-reinvest-header">Automatic Re-Invest</h5>
			<div className="settings-reinvest-form settings-whitebox">
				<label
					className="settings-reinvest-form-checkbox"
					htmlFor="reinvest"
				>
					<input
						id="reinvest"
						type="checkbox"
						value={userInfo.isReInvest}
						onChange={(e) => handleChange(e.target.checked)}
					/>
					<span className="slider round"></span>
					<span className="settings-reinvest-form-checkbox-span">
						Enable Auto Re-Invest
					</span>
				</label>
				<div className="settings-reinvest-form-text">
					<p>
						When automatic re-invest ON, Defima will automatically
						buy new products (product category the last you
						selected) once the minimum amount for product buy is
						reached on Defima Token Balance from profits from
						running products and commissions.
						<br />
						With this on you will profit from the compound interest
						effect.
					</p>
				</div>
			</div>
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
