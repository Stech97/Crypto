import axios from 'axios'
import ComingSoon from './comingsoon/Comingsoon'
import MainPage from './main/Main'
import LoginPage from './login/Login'
import SignupPage from './signup/Signup'
import DashContent from './dashboard/components/dashcontent/content'
import InvestmentContent from './dashboard/components/investment/content'
import waveimage from './styles/utils/img/waveimage.png'
import stealthlogo from './styles/utils/img/stealth-logo.png'
import worldmap2 from './styles/utils/img/worldmap2.png'
import joinusbackground from './styles/utils/img/joinus.png'
import ConfirmEmail from './signup/ConfirmEmail'
import AccountPage from './dashboard/Account'
import InDevelopment from './dashboard/components/inDevelopment'
import FaqsContent from './dashboard/components/FAQs/content'
import { ForgotPassword } from './signup/ForgotPassword'
import { RestorePassword } from './signup/RestorePassword'


export const DOMAIN_URL = "https://defima.io"
const API_URL_PROD = "https://back.defima.io/"
const API_URL_TEST = "http://84.201.132.112/"
export const API_URL = API_URL_PROD

const requestTemplate = axios.create({
	baseURL: API_URL,
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
	}
})

export const API = async(path, mode = "get", body = null) => {
	console.log(path)
	switch (mode) {
		case 'get':
			try {
				let request = await requestTemplate.get(path)
				return { ok: true, data: request.data}
			} catch(error) {
	       	    // Error 😨
			    if (error.response) {
			        /*
			         * The request was made and the server responded with a
			         * status code that falls out of the range of 2xx
			         */
			        console.log(error.response.data);
			        console.log(error.response.status);
			        console.log(error.response.headers);
			        return { ok: false, error: error.message }
			    } else if (error.request) {
			        /*
			         * The request was made but no response was received, `error.request`
			         * is an instance of XMLHttpRequest in the browser and an instance
			         * of http.ClientRequest in Node.js
			         */
			        console.log(error.request);
			        return { ok: false, error: error.message }
			    } else {
			        // Something happened in setting up the request and triggered an Error
			        console.log('Error', error.message);
			        return { ok: false, error: error.message }
			    }
	    		console.log(error);
			}
			break
		case 'post':
			try {
				console.log(body)
				let bodyJson = JSON.stringify(body)
				let request = await requestTemplate.post(path, bodyJson )
				return { ok: true, data: request.data }
			} catch(error) {
	       	    	       	    // Error 😨
			    if (error.response) {
			        /*
			         * The request was made and the server responded with a
			         * status code that falls out of the range of 2xx
			         */
			        console.log(error.response.data);
			        console.log(error.response.status);
			        console.log(error.response.headers);
			        return { ok: false, error: error.message }
			    } else if (error.request) {
			        /*
			         * The request was made but no response was received, `error.request`
			         * is an instance of XMLHttpRequest in the browser and an instance
			         * of http.ClientRequest in Node.js
			         */
			        console.log(error.request);
			        return { ok: false, error: error.message }
			    } else {
			        // Something happened in setting up the request and triggered an Error
			        console.log('Error', error.message);
			        return { ok: false, error: error.message }
			    }
	    		console.log(error);
	    	}
	    	break
	    case 'patch':
			try {
				console.log(body)
				let bodyJson = JSON.stringify(body)
				let request = await requestTemplate.patch(path, bodyJson )
				return { ok: true, data: request.data }
			} catch(error) {
	       	    	       	    // Error 😨
			    if (error.response) {
			        /*
			         * The request was made and the server responded with a
			         * status code that falls out of the range of 2xx
			         */
			        console.log(error.response.data);
			        console.log(error.response.status);
			        console.log(error.response.headers);
			        return { ok: false, error: error.message }
			    } else if (error.request) {
			        /*
			         * The request was made but no response was received, `error.request`
			         * is an instance of XMLHttpRequest in the browser and an instance
			         * of http.ClientRequest in Node.js
			         */
			        console.log(error.request);
			        return { ok: false, error: error.message }
			    } else {
			        // Something happened in setting up the request and triggered an Error
			        console.log('Error', error.message);
			        return { ok: false, error: error.message }
			    }
	    		console.log(error);
	    	}
	    	break
	    default:
	    	return "Ъуъ"
	}
}

export const routes = [
    {
        path: "/main",
        component: MainPage,
        Private: false,
    },
    {
        path: "/account",
        component: AccountPage,
        Private: true,
        routes: [
            {
                path: "/account/dashboard",
                component: DashContent,
                Private: true,
            },
            {
                path: "/account/investment",
                component: InvestmentContent,
                Private: true,
            },
            {
                path: "/account/faq",
                component: FaqsContent,
                Private: true,
            },
            {
            	path: "/account/development",
            	component: InDevelopment,
            	Private: true,
            }
        ]
    },
    {
        path: "/login",
        component: LoginPage,
        Private: false,
    },
    {
        path: "/signup",
        component: SignupPage,
        Private: false,
    },
    {
        path: "/confirmEmail/:hash",
        component: ConfirmEmail,
        Private: false,
    },
    {
        path: "/restorePassword/:hash",
        component: RestorePassword,
        Private: false,
    },
    {
        path: "/forgot",
        component: ForgotPassword,
        Private: false,
    },
    {
        path: "/",
        component: ComingSoon,
        Private: false,        
    }
]