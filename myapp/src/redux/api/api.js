import {
    BACKEND_API_URL
} from "../constants/config/index";

// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
  console.log(response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// setTimeout Promise
export const sleeping = ms => new Promise(resolve => setTimeout(resolve, ms));


function ResponseStatusException(message) {
   this.message = message;
   this.name = "ResponseStatusException";
}
export let defaultObjectedParams = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('restApiToken')}`,
        'Content-Type': 'application/json'
    }
}
export function fetchRestJson(restUrl, objectedParams = null) {
    const fullRestUrl = (restUrl.startsWith('http://') || restUrl.startsWith('https://')) ?
                        restUrl :
                        '' + BACKEND_API_URL + restUrl;
    const defaultParams = {
        headers: {
            Authorization: `JWT ${localStorage.getItem('restApiToken')}`,
            'Content-Type': 'application/json'
        }
    };
    const params = objectedParams ? objectedParams : defaultParams;
    return fetch(fullRestUrl, params)
        .then(handleErrors)
        .then(response => {
          if (!response.ok) {
            // Почему сюда нельзя написать: console.log('response.status ' + response.status);
            throw new ResponseStatusException("Response status is " + response.status);
          }
          // Почему сюда нельзя написать: console.log('response.json() ' + response.json());
          return response;
        });

};

export function postRestJson(restUrl, objectedParams = null, objectedBody = null) {
    const fullRestUrl = (restUrl.startsWith('http://') || restUrl.startsWith('https://')) ?
                        restUrl :
                        '' + BACKEND_API_URL + restUrl;
    let defaultParams = {
        method: 'POST',
        headers: {
            Authorization: `JWT ${localStorage.getItem('restApiToken')}`,
            'Content-Type': 'application/json'
        }
    };
    const params = objectedParams ? objectedParams : defaultParams;
    const body = objectedBody ? JSON.stringify(objectedBody) : JSON.stringify({});
    params[body] = body;
    return fetch(fullRestUrl, params)
    .then(handleErrors)
    .then(response => {
      if (!response.ok) {
        // Почему сюда нельзя написать: console.log('response.status ' + response.status);
        throw new ResponseStatusException("Response status is " + response.status);
      }
      // Почему сюда нельзя написать: console.log('response.json() ' + response.json());
      return response.json();
    })
};