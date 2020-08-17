import { API } from "../../config";
export const TEAM_POPUP_REQUEST = "TEAM_POPUP_REQUEST";
export const TEAM_POPUP_ERROR = "TEAM_POPUP_ERROR";
export const TEAM_POPUP_SUCCESS = "TEAM_POPUP_SUCCESS";

const getTeamPopupRequest = () => ({
	type: TEAM_POPUP_REQUEST,
});

const getTeamPopupError = (payload) => ({
	type: TEAM_POPUP_ERROR,
	payload,
});

const getTeamPopupSuccess = (payload) => ({
	type: TEAM_POPUP_SUCCESS,
	payload,
});

const getTeamPopupFetch = async (level) => {
	let response = API(
		"https://back.defima.io/Investment/GetTeamPop?UserId=" +
			localStorage.getItem("id") +
			"&Level=" +
			level
	);
	return response;
};

export const getTeamPopup = (level) => {
	return (dispatch) => {
		dispatch(getTeamPopupRequest());
		console.log(level);
		getTeamPopupFetch(level)
			.then((res) => {
				console.log(res);
				if (res.ok) {
					let payload = res.data;

					dispatch(getTeamPopupSuccess(payload));
				} else if ((res.error.status = 400)) {
					let payload = [];

					dispatch(getTeamPopupSuccess(payload));
				} else {
					let payload = {
						error: {
							type: "code mistake",
							message: res.message,
						},
					};

					dispatch(getTeamPopupError(payload));
				}
			})
			.catch((res) => {
				let payload = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getTeamPopupError(payload));
			});
	};
};
