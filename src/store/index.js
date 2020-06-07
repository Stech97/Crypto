import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { formReducer } from '../comingsoon/reducers/comingsoon'
import { routerReducer } from 'react-router-redux'
import { dashHeaderReducer } from '../dashboard/reducers/header'
import { BalanceReducer } from '../dashboard/reducers/contentBalance'
import { BTCRateReducer } from '../dashboard/reducers/ContentBalanceBTC'
import { USDRateReducer } from '../dashboard/reducers/ContentBalanceUSD'
import { DETRateReducer } from '../dashboard/reducers/ContentBalanceDET'

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	ComingSoon: formReducer,
	FooterNewsletter: formReducer,
	routing: routerReducer,
	DashHeader: dashHeaderReducer, 
	ContentBalanceContainer: BalanceReducer,
	BTCSquare: BTCRateReducer,
	USDSquare: USDRateReducer,
	DETSquare: DETRateReducer,
})
