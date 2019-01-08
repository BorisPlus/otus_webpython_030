import {
    BACKEND_API_URL
} from "../../src/config";

import {
  CONSOLE_LOG_ACTIONS,
} from "../../src/settings";


// setTimeout Promise
export const sleeping = ms => new Promise(resolve => setTimeout(resolve, ms));

export function buildRestRequestParams(body=null, method='GET') {
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method
  };
  let authorizationHeader = localStorage.getItem('restApiToken');
  if (authorizationHeader) {
    params.headers.Authorization = `JWT ${authorizationHeader}`;
  }
  if (body) {
    params.body = JSON.stringify(body);
  }

  const myNameIs = 'src.api.buildParams';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.group('ACTION# ' + myNameIs + '.handleErrors(response)');
    console.log('params = ' + params);
    console.groupEnd();
  }

  return params;
};

function ResponseException(message='ResponseException', response=null) {
   this.name = "ResponseException";
   this.message = message;
   this.response = response.clone();
   this.toString = function() {
      return this.message;
   };
};

export function fetchRestResponse(restUrl, objectedParams = null) {
    const restFullUrl = (restUrl.startsWith('http://') || restUrl.startsWith('https://')) ?
                        restUrl :
                        '' + BACKEND_API_URL + restUrl;
    const params = {
      ...buildRestRequestParams(),
      ...objectedParams
    };

    const myNameIs = 'src.api.fetchRestJson';

    return fetch(restFullUrl, params)
      .then(response => {
        if (!response.ok) {
          // alert('!response.ok');
          throw new ResponseException(response.status + ': ' + response.statusText, response);
        }
        return response;
      })
      .catch( error => {
        if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
          console.group('API# ' + myNameIs);
          console.log('error.message = ', error.message);
          console.log('error.response = ', error.response);
          console.groupEnd();
        }
        throw error;
      })
};
