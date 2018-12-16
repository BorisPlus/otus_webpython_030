// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// setTimeout Promise
export const sleeping = ms => new Promise(resolve => setTimeout(resolve, ms));

// Rough implementation. Untested.
//function timeout(ms, promise) {
//  return new Promise(function(resolve, reject) {
//    setTimeout(function() {
//      reject(new Error("timeout"))
//    }, ms)
//    promise.then(resolve, reject)
//  })
//}