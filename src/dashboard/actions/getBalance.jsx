import { API } from '../../config'

export const GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST'
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS'

const BalanceRequest = async(ID) => {
		let resp = await API('/Dashboard/GetBalance?Id=' + ID)
	return resp.data;
}

export const getBalance = (ID) => {
	
	return dispatch => {
		dispatch({
			type: GET_BALANCE_REQUEST,
			payload: "Loading...",
		})

		let data = BalanceRequest(ID)
		.then(data => {
			dispatch({
				type: GET_BALANCE_SUCCESS,
				payload: {
					btc: data.btc,
					usd: data.usd,
					det: data.det,
				},
			})	
		})
	}
}