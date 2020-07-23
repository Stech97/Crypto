import React from "react";
import axios from "axios";
import InDevelopment from "./InDevelopment";
import Pages from "./pages/account/Pages";
import Dashboard from "./pages/account/components/Dashboard";
import Finance from "./pages/account/components/Finance";
import Users from "./pages/account/components/Users";
import Files from "./pages/account/components/Files";
import Homescreen from "./pages/account/components/Homescreen";
import OurMission from "./pages/account/components/OurMission";
import HowItWorks from "./pages/account/components/HowItWorks";
import Portfolio from "./pages/account/components/Portfolio";
import CareerTeam from "./pages/account/components/CareerTeam";
import DefimaToken from "./pages/account/components/DefimaToken";
import AboutUs from "./pages/account/components/AboutUs";
import JoinUs from "./pages/account/components/JoinUs";
import FAQ from "./pages/account/components/FAQ";
import Terms from "./pages/account/components/Terms";
import Privacy from "./pages/account/components/Privacy";
import News from "./pages/account/components/News";
import { Redirect } from "react-router-dom";

const DOMAIN_URL_TEST = "localhost:3000";
const DOMAIN_URL_PROD = "https://defima.io";

export const DOMAIN_URL = DOMAIN_URL_TEST;
const API_URL_PROD = "https://back.defima.io/";
const API_URL_TEST = "http://84.201.132.112/";
export const API_URL = API_URL_PROD;

const requestTemplate = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const requestTemplateFile = axios.create({
  baseURL: API_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
  },
});

export const API = async (path, mode = "get", body = null) => {
  //console.log(path)
  switch (mode) {
    case "file":
      try {
        let request = await requestTemplateFile.get(path);
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
      break;
    case "patch":
      try {
        //console.log(body)
        if (body) {
          let bodyJson = JSON.stringify(body);
          let request = await requestTemplate.patch(path, bodyJson);
          return { ok: true, status: request.status, data: request.data };
        } else {
          let request = await requestTemplate.patch(path);
          return { ok: true, status: request.status };
        }
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

const RedirectDash = () => {
  return <Redirect to="/pages/account/dashboard" />;
};

export const routes = [
  {
    path: "/pages",
    component: Pages,
    Private: true,
    routes: [
      {
        path: "/pages/account/dashboard",
        component: Dashboard,
        Private: true,
        header: "Dashboard",
      },
      {
        path: "/pages/account/finance",
        component: Finance,
        Private: true,
        header: "Finance",
      },
      {
        path: "/pages/account/users",
        component: Users,
        Private: true,
        header: "Users",
      },
      {
        path: "/pages/account/files",
        component: Files,
        Private: true,
        header: "Files",
      },
      {
        path: "/pages/account/homescreen",
        component: Homescreen,
        Private: true,
        header: "Homescreen",
      },
      {
        path: "/pages/account/our_mission",
        component: OurMission,
        Private: true,
        header: "OurMission",
      },
      {
        path: "/pages/account/how_it_works",
        component: HowItWorks,
        Private: true,
        header: "HowItWorks",
      },
      {
        path: "/pages/account/portfolio",
        component: Portfolio,
        Private: true,
        header: "Portfolio",
      },
      {
        path: "/pages/account/career_team",
        component: CareerTeam,
        Private: true,
        header: "CareerTeam",
      },
      {
        path: "/pages/account/defima_token",
        component: DefimaToken,
        Private: true,
        header: "DefimaToken",
      },
      {
        path: "/pages/account/about_us",
        component: AboutUs,
        Private: true,
        header: "AboutUs",
      },
      {
        path: "/pages/account/join_us",
        component: JoinUs,
        Private: true,
        header: "JoinUs",
      },
      {
        path: "/pages/account/faq",
        component: FAQ,
        Private: true,
        header: "FAQ",
      },
      {
        path: "/pages/account/terms",
        component: Terms,
        Private: true,
        header: "Terms",
      },
      {
        path: "/pages/account/privacy",
        component: Privacy,
        Private: true,
        header: "Privacy",
      },
      {
        path: "/pages/account/news",
        component: News,
        Private: true,
        header: "News",
      },
      {
        path: "/pages/finance",
        component: Finance,
        Private: false,
        header: "Finance",
      },
    ],
  },
  {
    path: "/",
    component: RedirectDash,
    Private: true,
  },
];
