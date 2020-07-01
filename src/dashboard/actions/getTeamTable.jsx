import { API } from "../../config";
export const TEAM_TABLE_REQUEST = "TEAM_TABLE_REQUEST";
export const TEAM_TABLE_ERROR = "TEAM_TABLE_ERROR";
export const TEAM_TABLE_SUCCESS = "TEAM_TABLE_SUCCESS";

const getTeamTableRequest = () => ({
	type: TEAM_TABLE_REQUEST,
});

const getTeamTableError = (payload) => ({
	type: TEAM_TABLE_ERROR,
	payload,
});

const getTeamTableSuccess = (payload) => ({
	type: TEAM_TABLE_SUCCESS,
	payload,
});

const getTeamTableFetch = async () => {
	let response = API(
		"/Investment/GetTeamLevel?UserId=" + localStorage.getItem("id")
	);
	return response;
};

export const getTeamTable = () => {
	return (dispatch) => {
		dispatch(getTeamTableRequest());

		getTeamTableFetch()
			.then((res) => {
				if (res.ok) {
					let payload = res.data;

					dispatch(getTeamTableSuccess(payload));
				} else {
					let payload = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getTeamTableError(payload));
				}
			})
			.catch((res) => {
				let payload = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getTeamTableError(payload));
			});
	};
};
