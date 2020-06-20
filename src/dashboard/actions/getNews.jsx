import { API } from '../../config'

export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS'
export const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST'
export const GET_NEWS_ERROR = 'GET_NEWS_ERROR'

const getNewsRequest = () => ({
	type: GET_NEWS_REQUEST,
	payload: true,	
})

const getNewsError = (error) => ({
	type: GET_NEWS_ERROR,
	payload: error,
})

const getNewsSuccess = (news) => ({
	type: GET_NEWS_SUCCESS,
	payload: news,
})

const getNewsFetch = async(amount) => {
	let response = await API('/Dashboard/GetNews?Take=' + amount.toString() + '&Skip=0')
	return response
}

export const getNews = () => {
	return dispatch => {
		dispatch(getNewsRequest)
		let amount = 2
		let res = getNewsFetch(2)
		.then(res => {
			dispatch(getNewsSuccess(res.data))
		}).catch(error => {
			dispatch(getNewsError({
				type: "server",
				message: error.message,
			}))
		})
	}
}