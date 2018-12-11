// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// setTimeout Promise
export const sleeping = ms => new Promise(resolve => setTimeout(resolve, ms));