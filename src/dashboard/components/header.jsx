import React, { Component } from "react";
import API from "../../config";
import { connect } from "react-redux";
import { setUser } from "../actions/header";
import { userLogoutGet } from "../actions/logout";
import { Link } from "react-router-dom";

class DashHeader extends Component {
	state = {
		isClosed: true,
	};

	toggle = (value) => {
		this.setState({ isClosed: !value });
	};

	componentDidMount() {
		if (this.props.user.user.username === "") {
			this.props.setUserAction();
		}
	}

	render() {
		const { user, getUserLogoutAction } = this.props;
		const clickLogout = () => {
			getUserLogoutAction(user.id);
		};
		return (
			<div className="dash-header">
				<div className="dash-header-logo">
					<img src="/img/logo.png" />
				</div>
				<div className="dash-header-user">
					<div
						className={
							"dash-header-user-menu" +
							(this.state.isClosed ? "-closed" : "")
						}
					>
						<div
							className={
								"dash-header-user-menu" +
								(this.state.isClosed ? "-closed" : "-opened")
							}
						>
							<Link
								to="/account/settings"
								className="dash-header-user-menu-settings"
							>
								<svg
									className="dash-header-user-menu-settings-icon"
									preserveAspectRatio="xMinYMid slice"
									viewBox="0 0 37 37"
								>
									<use href="#settings" />
								</svg>
								<div className="dash-header-user-menu-settings-text">
									<p>Settings</p>
								</div>
							</Link>
							<div
								className="dash-header-user-menu-logout"
								onClick={clickLogout}
							>
								<svg
									className="dash-header-user-menu-logout-icon"
									preserveAspectRatio="xMinYMid slice"
									viewBox="0 0 37 37"
								>
									<use href="#dashboards-icon-white" />
								</svg>
								<div className="dash-header-user-menu-logout-text">
									<p>Logout</p>
								</div>
							</div>
						</div>
					</div>
					<div className="dash-header-user-icon">
						<svg
							preserveAspectRatio="xMinYMid slice"
							viewBox="-1 0 35 37"
						>
							<use href="#dashboards-icon-white" />
						</svg>
					</div>
					<div className="dash-header-user-name">
						<h2>
							{user.isFetching
								? "Loading..."
								: user.user.username}
						</h2>
					</div>
					<div
						className={
							"dash-header-user-arrow" +
							(this.state.isClosed ? "-closed" : "")
						}
					>
						<svg
							onClick={() => this.toggle(this.state.isClosed)}
							role="img"
							preserveAspectRatio="xMinYMin slice"
							viewBox="0 0 25 15"
						>
							<use href="#arrow-down" />
						</svg>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		user: store.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUserAction: (username) => dispatch(setUser(username)),
		getUserLogoutAction: (ID) => dispatch(userLogoutGet(ID)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashHeader);
