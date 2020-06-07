import emailjs from 'emailjs-com'
import { API_URL } from '../../config'

export const COMINGSOON_ERROR = 'COMINGSOON_ERROR'
export const COMINGSOON_SUCCESS = 'COMINGSOON_SUCCESS'		

/*
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
*/
export function updateViewError() {
	return (dispatch) => {
		dispatch({
			type: COMINGSOON_ERROR,
		   	payload: true,
			placeholder: "Wrong email. Please try again.",
		})
	}
}


export function updateView(email) {
	const templateId = 'test'
	return (dispatch) => {
		  // Validate email
		let variables = {message_html: email};
		fetch(API_URL + "Email/AddEmail", {
			method: 'post',
			headers: {
            	'Content-Type': 'application/json',
        	},
			body: JSON.stringify({ Email : 'test' + email })
		}).then(function(response) {
			if (response.ok) {
				emailjs.send(
			  	'gmail', templateId,
			  	variables, 'user_jIExVfMX1Oha7HaXMmsBs'
			  	).then(res => {
			    	console.log('Email successfully sent!')
					dispatch({
						type: COMINGSOON_SUCCESS,
						payload: false,
						placeholder: "maxmustter@hotmail.com",
					})
			  	})
			  	// Handle errors here however you like, or use a React error boundary
			  	.catch(err => {
			  		console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
					dispatch({
						type: COMINGSOON_ERROR,
			           	payload: true,
						placeholder: "Something went wrong. Try again later.",
					})
				})
            } else {
                alert(response.e)
            }
        }).catch((ex) => {
        	console.log(ex)
    		dispatch({
				type: COMINGSOON_ERROR,
	           	payload: true,
				placeholder: "Something went wrong. Try again later.",
			})
        })
	}	        
}