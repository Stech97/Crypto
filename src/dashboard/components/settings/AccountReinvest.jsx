import React, { Component, Fragment } from "react";
import { updateReInvest, getUserInfo } from "../../actions/UserInfo";
import { connect } from "react-redux";

class AccountReinvest extends Component {
	state = {
		reinvest: this.props.userInfo.isReInvest,
	};

	handleChange(value) {
		this.props.updateReInvestAction(value);
		this.props.getUserInfoAction();
	}

	render() {
		const { userInfo } = this.props;

		return (
			<div className="settings-reinvest">
				<h5 className="settings-reinvest-header">
					Automatic Re-Invest
				</h5>
				<div className="settings-reinvest-form settings-whitebox">
					<label
						className="settings-reinvest-form-checkbox"
						htmlFor="reinvest"
					>
						<input
							id="reinvest"
							type="checkbox"
							onChange={(e) =>
								this.handleChange(e.target.checked)
							}
						/>
						<span className="slider round"></span>
						<span className="settings-reinvest-form-checkbox-span">
							Enable Auto Re-Invest
						</span>
					</label>
					<div className="settings-reinvest-form-text">
						<p>
							When automatic re-invest ON, Defima will
							automatically buy new products (product category the
							last you selected) once the minimum amount for
							product buy is reached on Defima Token Balance from
							profits from running products and commissions.
							<br />
							With this on you will profit from the compound
							interest effect.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	userInfo: store.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
	updateReInvestAction: (value) => dispatch(updateReInvest(value)),
	getUserInfoAction: () => dispatch(getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountReinvest);
