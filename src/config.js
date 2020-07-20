import axios from "axios";
import Cookies from "js-cookie";

import ComingSoon from "./comingsoon/Comingsoon";
import MainPage from "./main/Main";
import LoginPage from "./login/Login";
import SignupPage from "./signup/Signup";
import DashContent from "./dashboard/components/dashcontent/content";
import InvestmentContent from "./dashboard/components/investment/content";
import FaqsContent from "./dashboard/components/FAQs/content_new";

import MarketingContent from "./dashboard/components/marketing/content_new";

import TeamContent from "./dashboard/components/team/content_new";
import SettingsContent from "./dashboard/components/settings/content_new";
import HistoryContent from "./dashboard/components/history/content_new";
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
import ReferalComponent from "./signup/Referal";
import NewDash from "./dashboard/NewDash";

const DOMAIN_URL_TEST = "localhost:3000";
const DOMAIN_URL_PROD = "https://defima.io";

export const DOMAIN_URL = DOMAIN_URL_PROD;
const API_URL_PROD = "https://back.defima.io/";
const API_URL_TEST = "http://84.201.132.112/";
export const API_URL = API_URL_PROD;

const requestTemplateAuthed = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

const requestTemplateUnauthed = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const requestTemplateFile = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export const API = async (path, mode = "get", body = null, authed = true) => {
  //console.log(path)
  const requestTemplate = authed
    ? requestTemplateAuthed
    : requestTemplateUnauthed;
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
    case "delete":
      try {
        let request = await requestTemplate.delete(path);
        console.log(request);
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
    case "put":
      try {
        //console.log(body)
        let request = await requestTemplateFile.put(path, body);
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
    component: NewDash,
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
    path: "/referal/:parent",
    component: ReferalComponent,
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
    path: "/newdash",
    component: NewDash,
    Private: true,
    public: false,
  },
  {
    path: "/",
    component: ComingSoon,
    Private: false,
    public: true,
  },
];
