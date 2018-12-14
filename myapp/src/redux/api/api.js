import {
    BACKEND_API_URL
} from "../constants/index";

function ResponseStatusException(message) {
   this.message = message;
   this.name = "ResponseStatusException";
}

export default function fetchRestJson(restUrl, objectedParams = null) {
    const fullRestUrl = (restUrl.startsWith('http://') || restUrl.startsWith('https://')) ?
                        restUrl :
                        '' + BACKEND_API_URL + restUrl;
    const defaultParams = { headers: { Authorization: `JWT ${localStorage.getItem('restApiToken')}` } };
    const params = objectedParams ? objectedParams : defaultParams;
    return fetch(fullRestUrl, params)
    .then(response => {
      if (response.status !== 200) {
        // Почему сюда нельзя написать: console.log('response.status ' + response.status);
        throw new ResponseStatusException("Response status is " + response.status);
      }
      // Почему сюда нельзя написать: console.log('response.json() ' + response.json());
      return response.json();
    })
}