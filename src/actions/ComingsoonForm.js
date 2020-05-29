export const COMINGSOON_ERROR = 'COMINGSOON_ERROR'
export const COMINGSOON_SUCCESS = 'COMINGSOON_SUCCESS'		

export function updateViewSuccess() {
	return (dispatch) => {
		dispatch({
			type: COMINGSOON_SUCCESS,
			payload: false,
			placeholder: "maxmustter@hotmail.com",
		})
	}
}
export function updateViewError() {
	return (dispatch) => {
        dispatch({
           	type: COMINGSOON_ERROR,
           	payload: true,
			placeholder: "Wrong email. Please try again.",
        })
	}
}