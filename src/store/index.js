import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { loginReducer } from "../login/reducers/login";
import { signupReducer } from "../signup/reducers/signup";
import { formReducer } from "../comingsoon/reducers/comingsoon";
import { forgotPasswordReducer } from "../signup/reducers/forgotpassword";
import { routerReducer } from "react-router-redux";
import { dashHeaderReducer } from "../dashboard/reducers/header";
import { BalanceReducer } from "../dashboard/reducers/contentBalance";
import { BTCRateReducer } from "../dashboard/reducers/ContentBalanceBTC";
import { USDRateReducer } from "../dashboard/reducers/ContentBalanceUSD";
import { DETRateReducer } from "../dashboard/reducers/ContentBalanceDET";
import { NewsReducer } from "../dashboard/reducers/news";
import { loginHistoryReducer } from "../dashboard/reducers/loginHistory";
import { ExchangeReducer } from "../dashboard/reducers/ExchangeForm";
import { RefsReducer } from "../dashboard/reducers/RefLinks";
import { EarningsReducer } from "../dashboard/reducers/contentEarnings";
import { FooterFormReducer } from "../main/reducers/FooterForm";
import { InvestPopupReducer } from "../dashboard/reducers/investForm";

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	ComingSoon: formReducer,
	footerForm: FooterFormReducer,
	routing: routerReducer,
	login: loginReducer,
	createUser: signupReducer,
	forgot: forgotPasswordReducer,
	user: dashHeaderReducer,
	ContentBalanceContainer: BalanceReducer,
	BTCSquare: BTCRateReducer,
	USDSquare: USDRateReducer,
	DETSquare: DETRateReducer,
	News: NewsReducer,
	loginHistory: loginHistoryReducer,
	Exchange: ExchangeReducer,
	Refs: RefsReducer,
	Earnings: EarningsReducer,
	InvestPopup: InvestPopupReducer,
});
