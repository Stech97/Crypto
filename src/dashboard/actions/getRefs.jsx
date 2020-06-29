import { API } from '../../config'

export const GET_REFS_SUCCESS = 'GET_REFS_SUCCESS'
export const GET_REFS_REQUEST = 'GET_REFS_REQUEST'
export const GET_REFS_ERROR = 'GET_REFS_ERROR'

const getRefsRequest = () => ({
	type: GET_REFS_REQUEST,
	payload: true,	
})

const getRefsError = (error) => ({
	type: GET_REFS_ERROR,
	payload: error,
})

const getRefsSuccess = (data) => ({
	type: GET_REFS_SUCCESS,
	payload: data,
})

const getRefsFetch = async() => {
	let response = await API('/Dashboard/GetRefLink?Id=' + localStorage.getItem('id'))
	return response
}

export const getRefs = () => {
	return dispatch => {
		dispatch(getRefsRequest)

		let res = getRefsFetch()
		.then(res => {
			console.log("####### :", res)
			dispatch(getRefsSuccess(res.data))
		}).catch(error => {
			dispatch(getRefsError({
				type: 'code',
				message: error.message,
			}))
		})
	}
}