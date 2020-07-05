import { API } from "../../config";
import axios from "axios";
import React from "react";
import { setUser } from "../../dashboard/actions/header";
import Cookies from "js-cookie";
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

const getIpFetch = () =>
	axios.get("https://api.ipify.org?format=json", { mode: "cors" });

const getCountryFetch = (ip) =>
	axios.get("https://ipinfo.io/" + ip + "/?token=7a04a322ea8440");

export const userPostFetch = (user) => {
	return (dispatch) => {
		dispatch(loginUserRequest());

		getIpFetch()
			.then((req) => {
				getCountryFetch(req.data.ip).then((res) => {
					loginUserFetch(
						user.username,
						user.password,
						res.data.ip,
						res.data.country
					)
						.then((res) => {
							console.log(res);
							if (res.ok) {
								if (!res.data.isVerified) {
									Cookies.set("token", res.data.token);
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
										message:
											"Account blocked. Check your E-Mail.",
									})
								);
							} else {
								console.log("res", res);
								dispatch(
									loginUserError({
										type: res.error.status,
										message: "Unknown error",
									})
								);
							}
						})
						.catch((error) => {
							console.log(error);
							dispatch(
								loginUserError({
									type: error.status,
									message: "Unknown error",
								})
							);
						});
				});
			})
			.catch((error) => {
				dispatch(
					loginUserError({
						type: error.status,
						message: error.message,
					})
				);
			});
	};
};
