import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { userReducer } from '../login/reducers/login'
import { signupReducer } from '../signup/reducers/signup'
import { formReducer } from '../comingsoon/reducers/comingsoon'
import { forgotPasswordReducer } from '../signup/reducers/forgotpassword'
import { routerReducer } from 'react-router-redux'
import { dashHeaderReducer } from '../dashboard/reducers/header'
import { BalanceReducer } from '../dashboard/reducers/contentBalance'
import { BTCRateReducer } from '../dashboard/reducers/ContentBalanceBTC'
import { USDRateReducer } from '../dashboard/reducers/ContentBalanceUSD'
import { DETRateReducer } from '../dashboard/reducers/ContentBalanceDET'
import { NewsReducer } from '../dashboard/reducers/news'
import { loginHistoryReducer } from '../dashboard/reducers/loginHistory'

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	ComingSoon: formReducer,
	FooterNewsletter: formReducer,
	routing: routerReducer,
	user: userReducer,
	createUser: signupReducer,
	forgot: forgotPasswordReducer,
	DashHeader: dashHeaderReducer, 
	ContentBalanceContainer: BalanceReducer,
	BTCSquare: BTCRateReducer,
	USDSquare: USDRateReducer,
	DETSquare: DETRateReducer,
	News: NewsReducer,
	loginHistory: loginHistoryReducer,
})
