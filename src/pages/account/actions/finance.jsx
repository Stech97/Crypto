import { API } from "../../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";

export const GetRate = "/GetRate";
export const UpdateRate = "/UpdateRate";
export const GetCommission = "/GetCommission";
export const UpdateCommission = "/UpdateCommission";
export const GetProfit = "/GetProfit";
export const UpdateProfit = "/UpdateProfit";

const ActionGetFetch = async (type) => {
	let response = await API("/Administrator" + type);
	return response;
};

const ActionPatchFetch = async (type, data) => {
	let response = await API("/Administrator" + type, data);
	return response;
};

const ActionRequest = (type) => ({
	type: type + REQUEST,
});

const ActionError = (type, error) => ({
	type: type + ERROR,
	payload: error,
});

const ActionSuccess = (type, data) => ({
	type: type + SUCCESS,
	payload: data,
});

const ActionGet = (type, dispatch) => {
	dispatch(ActionRequest(type));

	ActionGetFetch(type)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(type, res.data));
			} else {
				dispatch(
					ActionError(type, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(type, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

const ActionPatch = (type, data, dispatch) => {
	dispatch(ActionRequest(type));

	ActionPatchFetch(type, data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(type, null));
			} else {
				dispatch(
					ActionError(type, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(type, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const GetFinance = () => (dispatch) => {
	[GetRate, GetCommission, GetProfit].map((type) => {
		ActionGet(type, dispatch);
	});
};

export const PatchFinance = (rate, comission, profit) => (dispatch) => {
	ActionPatch(UpdateRate, rate, dispatch);
	ActionPatch(UpdateCommission, comission, dispatch);
	ActionPatch(UpdateProfit, profit, dispatch);
};
