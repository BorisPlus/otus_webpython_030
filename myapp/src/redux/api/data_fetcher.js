import {
    BACKEND_API_URL
} from "../constants/index";

function ResponseStatusException(message) {
   this.message = message;
   this.name = "ResponseStatusException";
}

//export default function fetch_rest(endpoint, token = null) {
//  const fullEndpoint = (endpoint.startsWith('http:\\\\') || endpoint.startsWith('https:\\\\')) ?
//    endpoint :
//    '' + BACKEND_API_URL + endpoint;
//  console.log('fetch_rest: ' + fullEndpoint + ' with TOKEN: ' + token);
//  return fetch(fullEndpoint,
//  {
//    method: "GET",
//    headers: {
//      'Authorization': `JWT ${token}`
//    }
//  })
//  .then(response => {
//    if (response.status !== 200) {
//      console.log('response.status: ' + response.status);
//      throw new ResponseStatusException("Response status is " + response.status);
//    }
//    console.log('response.json(): ' + response.json());
//    return response.json();
//  });
//};

export default function fetch_rest(endpoint) {
  const fullEndpoint = (endpoint.startsWith('http:\\\\') || endpoint.startsWith('https:\\\\')) ?
    endpoint :
    '' + BACKEND_API_URL + endpoint;
  console.log('fetch_rest: ' + fullEndpoint);
  return fetch(fullEndpoint)
  .then(response => {
    if (response.status !== 200) {
      console.log('response.status: ' + response.status);
      throw new ResponseStatusException("Response status is " + response.status);
    }
    console.log('response.json(): ' + response.json());
    return response.json();
  });
};
