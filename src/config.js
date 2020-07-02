import axios from 'axios';
import InDevelopment from './InDevelopment';
import PagesContent from './pages/account/Pages';
import Dashboard from './pages/account/components/Dashboard';
import Finance from './pages/account/components/Finance';

const DOMAIN_URL_TEST = 'localhost:3000';
const DOMAIN_URL_PROD = 'https://defima.io';

export const DOMAIN_URL = DOMAIN_URL_TEST;
const API_URL_PROD = 'https://back.defima.io/';
const API_URL_TEST = 'http://84.201.132.112/';
export const API_URL = API_URL_TEST;

const requestTemplate = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API = async (path, mode = 'get', body = null) => {
  //console.log(path)
  switch (mode) {
    case 'get':
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
    case 'post':
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
    case 'patch':
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
      return 'Ъуъ';
  }
};

export const routes = [
  {
    path: '/pages',
    component: PagesContent,
    Private: true,
    routes: [
      {
        path: '/pages/account/',
        component: PagesContent,
        Private: true,
        routes: [
          {
            path: '/pages/account/dashboard',
            component: Dashboard,
            Private: true,
          },
          {
            path: '/pages/account/finance',
            component: Finance,
            Private: true,
          },
          {
            path: '/pages/account/faq',
            component: InDevelopment,
            Private: true,
          },
          {
            path: '/pages/account/marketing',
            component: InDevelopment,
            Private: true,
          },
          {
            path: '/pages/account/team',
            component: InDevelopment,
            Private: true,
          },
          {
            path: '/pages/account/settings',
            component: InDevelopment,
            Private: true,
          },
          {
            path: '/pages/account/history',
            component: InDevelopment,
            Private: true,
          },
        ],
      },
      {
        path: '/pages/main/',
        component: InDevelopment,
        Private: true,
      },
    ],
  },
  {
    path: '/login',
    component: InDevelopment,
    Private: false,
  },
  {
    path: '/finance',
    component: InDevelopment,
    Private: false,
  },
];
