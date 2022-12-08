import clientAxios from "@/apis";
import { createLoggerHistory } from "@/apis/mothod";
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "@/constants/redux.contants";

export const login = (email: string, password: string) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-control-allow-origin": "http://localhost:6969",
      },
      withCredentials: true,
    };
    const { data } = await clientAxios.post(
      `/api/v1/user/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: LOGIN_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await clientAxios.post(`/api/v1/user/register`, userData);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await clientAxios.get(`/api/v1/user/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.message || "error server inteval",
    });
    dispatch({ type: CLEAR_ERRORS });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await clientAxios.get(`/api/v1/user/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await clientAxios.put(`/api/v1/user/me/update`, userData);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await clientAxios.put(
      `/api/v1/user/password/update`,
      password
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await clientAxios.post(`api/v1/user/change-password`, {
      email,
    });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await clientAxios.put(
      `/api/v1/user/password/reset/${token}`,
      password
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error?.response?.data?.message || "error server inteval",
    });
  }
};
