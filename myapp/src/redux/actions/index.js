import {
    DO_LOGIN,
    DO_SIGNUP,
    DO_LOGOUT,
    GET_LOGIN_FROM,
    GET_SIGNUP_FROM,
    GET_USER_LIST,
    JUST_FOR_TEST
} from "../constants/index";

export const doLogin = (username, password) => ({ type: DO_LOGIN, username: username, password: username });
export const doSignup = (username, password) => ({ type: DO_SIGNUP, username: username, password: username });
export const doLogout = () => ({ type: DO_LOGOUT });
export const getLoginForm = () => ({ type: GET_LOGIN_FROM });
export const getSignupForm = () => ({ type: GET_SIGNUP_FROM });
export const getUserList = userList => ({ type: GET_USER_LIST, userList: userList });
export const justForTest = () => ({ type: JUST_FOR_TEST });