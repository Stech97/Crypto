import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { dashInfoReducer } from "../pages/account/reducers/dashinfo";
import { KYCReducer } from "../pages/account/reducers/kyc";
import { WithdrawReducer } from "../pages/account/reducers/withdraw";
import { FinanceReducer } from "../pages/account/reducers/finance";
import { NewsReducer } from "../pages/account/reducers/news";
import { MainpageReducer } from "../pages/account/reducers/mainpage";
import { UsersReducer } from "../pages/account/reducers/users";

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	routing: routerReducer,
	DashInfo: dashInfoReducer,
	KYC: KYCReducer,
	Withdraw: WithdrawReducer,
	finance: FinanceReducer,
	News: NewsReducer,
	Mainpage: MainpageReducer,
	users: UsersReducer,
});
