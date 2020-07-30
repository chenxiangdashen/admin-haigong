import api from "../api";
import { post } from "../api/request";
import Api from "../api/apiUrl";

export const FETCH_PROFILE_PENDING = "FETCH_PROFILE_PENDING";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const complateLogin = (rspMap = {}) => ({
  type: "LOGIN",
  isAuth: true,
  rspMap,
});

export function fetchProfile() {
  let uid = window.localStorage.getItem("uid");

  if (uid === undefined) {
    return { type: "UID_NOT_FOUND" };
  }

  return {
    type: "FETCH_PROFILE",
    payload: {
      promise: api.get("/my"),
    },
  };
}

export const login = (username, password) => {
  return async (dispatch, getState) => {
    const res = await post(Api.login, { username, password });
    console.log(res);

    dispatch(complateLogin());
  };
};

export function logout() {
  return {
    type: "LOGOUT",
    payload: {
      promise: api.get("/logout"),
    },
  };
}
