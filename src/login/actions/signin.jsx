import { API } from "../../config";
import axios from "axios";
import React from "react";
import { setUser } from "../../dashboard/actions/header";
import { ipLocation } from "ip-location";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

const loginUserSuccess = () => ({
	type: USER_LOGIN_SUCCESS,
});

const loginUserError = (error) => ({
	type: USER_LOGIN_ERROR,
	payload: error,
});

const loginUserRequest = () => ({
	type: USER_LOGIN_REQUEST,
});

const loginUserFetch = (username, password, ip, country) =>
	API("/Identity/token", "post", {
		username: username,
		password: password,
		IP: ip,
		Country: country,
	});

const getIpFetch = async () =>
	await axios.get("https://api.ipify.org?format=json", { mode: "cors" });

const getCountryFetch = async (ip) =>
	await axios.get("https://ipinfo.io/" + ip + "/?token=7a04a322ea8440");

const userLoginDispatch = (dispatch, user, ip, country) => {
	loginUserFetch(user.username, user.password, ip, country)
		.then((res) => {
			if (res.ok) {
				if (res.data.isVerified) {
					localStorage.setItem("id", res.data.id);
					dispatch(loginUserSuccess());
					dispatch(setUser(res.data));
				} else {
					dispatch(
						loginUserError({
							type: "Not Verified",
							message:
								"Verify your E-Mail address. Check your mailbox, please.",
						})
					);
				}
			} else if ((res.error.status = 401)) {
				dispatch(
					loginUserError({
						type: res.error.status,
						message: "Wrong username or password",
					})
				);
			} else if (res.error.status == 403) {
				dispatch(
					loginUserError({
						type: res.error.status,
						message: "Account blocked. Check your E-Mail.",
					})
				);
			} else {
				dispatch(
					loginUserError({
						type: res.error.status,
						message: res.error,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				loginUserError({
					type: error.status,
					message: error,
				})
			);
		});
};

export const userPostFetch = (user) => {
	return (dispatch) => {
		dispatch(loginUserRequest());
		getIpFetch()
			.then((res) => {
				if (res.status === 200 && res.data.ip) {
					getCountryFetch(res.data.ip)
						.then((resp) => {
							if (resp.status === 200 && resp.data.country) {
								userLoginDispatch(
									dispatch,
									user,
									res.data.ip,
									resp.data.country
								);
							} else {
								userLoginDispatch(
									dispatch,
									user,
									res.data.ip,
									"Unknown"
								);
							}
						})
						.catch((error) =>
							userLoginDispatch(
								dispatch,
								user,
								"127.0.0.1",
								"Unknown"
							)
						);
				} else {
					userLoginDispatch(dispatch, user, "127.0.0.1", "Unknown");
				}
			})
			.catch((error) =>
				userLoginDispatch(dispatch, user, "127.0.0.1", "Unknown")
			);
	};
};
