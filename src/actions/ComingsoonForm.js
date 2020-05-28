export const COMINGSOON_ERROR = 'COMINGSOON_ERROR'
export const COMINGSOON_SUCCESS = 'COMINGSOON_SUCCESS'		

export function updateView(payload) {
	return (dispatch) => {
		dispatch({
			type: COMINGSOON_SUCCESS,
			payload: true,
		})
        dispatch({
           	type: COMINGSOON_ERROR,
           	payload: false
        })
	}
}