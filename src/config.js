import axios from "axios";
import ComingSoon from "./comingsoon/Comingsoon";
import MainPage from "./main/Main";
import LoginPage from "./login/Login";
import SignupPage from "./signup/Signup";
import DashContent from "./dashboard/components/dashcontent/content";
import InvestmentContent from "./dashboard/components/investment/content";
import FaqsContent from "./dashboard/components/FAQs/content";
import MarketingContent from "./dashboard/components/marketing/content";
import TeamContent from "./dashboard/components/team/content";
import SettingsContent from "./dashboard/components/settings/content";
import HistoryContent from "./dashboard/components/history/content";
import waveimage from "./styles/utils/img/waveimage.png";
import stealthlogo from "./styles/utils/img/stealth-logo.png";
import worldmap2 from "./styles/utils/img/worldmap2.png";
import joinusbackground from "./styles/utils/img/joinus.png";
import ConfirmEmail from "./signup/ConfirmEmail";
import AccountPage from "./dashboard/Account";
import InDevelopment from "./dashboard/components/inDevelopment";
import { ForgotPassword } from "./signup/ForgotPassword";
import { RestorePassword } from "./signup/RestorePassword";
import TechPage from "./techpages/techpages";
import Privacy from "./techpages/privacy";

const DOMAIN_URL_TEST = "localhost:3000";
const DOMAIN_URL_PROD = "https://defima.io";

export const DOMAIN_URL = DOMAIN_URL_TEST;
const API_URL_PROD = "https://back.defima.io/";
const API_URL_TEST = "http://84.201.132.112/";
export const API_URL = API_URL_TEST;

const requestTemplate = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const API = async (path, mode = "get", body = null) => {
  //console.log(path)
  switch (mode) {
    case "get":
      try {
        let request = await requestTemplate.get(path);
        //console.log(request)
        return { ok: true, status: request.status, data: request.data };
      } catch (error) {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          //console.log(error.request);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else {
          // Something happened in setting up the request and triggered an Error
          //console.log('Error', error.message);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        }
        //console.log(error);
      }
      break;
    case "post":
      try {
        //console.log(body)
        let bodyJson = JSON.stringify(body);
        let request = await requestTemplate.post(path, bodyJson);
        return { ok: true, status: request.status, data: request.data };
      } catch (error) {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          //console.log(error.request);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else {
          // Something happened in setting up the request and triggered an Error
          //console.log('Error', error.message);
          return {
            ok: false,
            data: error.response.data,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        }
        //console.log(error);
      }
      break;
    case "patch":
      try {
        //console.log(body)
        let bodyJson = JSON.stringify(body);
        let request = await requestTemplate.patch(path, bodyJson);
        return { ok: true, status: request.status, data: request.data };
      } catch (error) {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          return {
            ok: false,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          //console.log(error.request);
          return {
            ok: false,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        } else {
          // Something happened in setting up the request and triggered an Error
          //console.log('Error', error.message);
          return {
            ok: false,
            error: {
              status: error.response.status,
              message: error.message,
            },
          };
        }
        //console.log(error);
      }
      break;
    default:
      return "Ъуъ";
  }
};

export const routes = [
  {
    path: "/main",
    component: MainPage,
    Private: false,
    public: true,
  },
  {
    path: "/terms&conditions",
    component: TechPage,
    Private: false,
    public: true,
  },
  {
    path: "/privacy",
    component: Privacy,
    Private: false,
    public: true,
  },
  {
    path: "/account",
    component: AccountPage,
    Private: true,
    public: false,
    routes: [
      {
        path: "/account/dashboard",
        component: DashContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/investment",
        component: InvestmentContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/faq",
        component: FaqsContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/marketing",
        component: MarketingContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/team",
        component: TeamContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/settings",
        component: SettingsContent,
        Private: true,
        public: false,
      },
      {
        path: "/account/history",
        component: HistoryContent,
        Private: true,
        public: false,
      },
    ],
  },
  {
    path: "/login",
    component: LoginPage,
    Private: false,
    public: false,
  },
  {
    path: "/signup",
    component: SignupPage,
    Private: false,
    public: false,
  },
  {
    path: "/confirmEmail/:hash",
    component: ConfirmEmail,
    Private: false,
    public: false,
  },
  {
    path: "/restorePassword/:hash",
    component: RestorePassword,
    Private: false,
    public: false,
  },
  {
    path: "/forgot",
    component: ForgotPassword,
    Private: false,
    public: false,
  },
  {
    path: "/",
    component: ComingSoon,
    Private: false,
    public: true,
  },
];
