import {
    DO_LOGIN,
    DO_SIGNUP,
    DO_LOGOUT,
    GET_LOGIN_FROM,
    GET_SIGNUP_FROM,
    GET_USER_LIST,
    JUST_FOR_TEST
} from "../constants/index";

const initialState = {
  navigationAuthArea: null,
  username: null,
  userList: [],
  errorMessage: null,
  restApiToken: null
};

const rootReducer = (state = initialState, action) => {
  alert('rootReducer: ' + action.type);
  switch (action.type) {

    case GET_LOGIN_FROM:

      return { ...state, navigationAuthArea: [...state.navigationAuthArea] };

    case GET_SIGNUP_FROM:

      return { ...state, navigationAuthArea: [...state.navigationAuthArea] };

    case GET_USER_LIST:

      return { ...state, users: [...state.users] };

    case DO_LOGIN:

      alert('DO_LOGIN action.username: ' + action.username);
      alert('DO_LOGIN action.password: ' + action.password);
      alert('DO_LOGIN action.data: ' + action.data);
      alert(JSON.stringify({username: action.username, password: action.password}));
      alert(JSON.stringify({username: action.username, password: action.password}));
//      alert('DO_LOGIN state.username: ' + state.username);
//      alert('DO_LOGIN state.password: ' + state.password);
//      console.log(action);
//      console.log(state);
      state = { ...state };
      fetch('http://localhost:8000/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: action.username, password: action.password})
      })
      .then(
        responce => {
          try {
            const json = responce.json();
            alert('Yo');
            alert('json.user = ' + json.user);
            alert('json.token = ' + json.token);
            alert(JSON.stringify(json));
            return json;
          } catch (e) {
            throw e;
          }
        }
      )
      .then(json => {
        if(json.token) {
          return {
            ...state,
            username: json.user.username,
            errorMessage: null,
            restApiToken: json.token
          };
        } else {
          console.log('Incorrect username / password pair or user not registered.');
          return {
            ...state,
            errorMessage: 'Incorrect username / password pair or user not registered.'
          };
        }
      })
      .catch( e => {
        console.log('catch:' + e);
        return {
          ...state,
          errorMessage: ''+e
        };
      });
      return state;

    case DO_SIGNUP:

      state = { ...state };
      fetch('http://localhost:8000/core_app/users/', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: state.username, password: state.password})
      })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          return {
            ...state,
            username: json.user.username,
            errorMessage: null,
            restApiToken: json.token
          };
        } else {
          return {
            ...state,
            errorMessage: json.username,
          };
        }
      })
      .catch( e => {
        alert('' + e);
        return {
          ...state,
          errorMessage: ''+e
        };
      });
      return state;

    case DO_LOGOUT:

      return { ...state, username: '', restApiToken: null };

    case JUST_FOR_TEST:
      alert('JUST_FOR_TEST');
      return state;

    default:

      return state;
  }
};
export default rootReducer;