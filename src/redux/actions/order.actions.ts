import clientAxios from "@/apis";
import { createLoggerHistory } from "@/apis/mothod";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
} from "@/constants/redux.contants";

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.get("api/v1/order/admin", config);

    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.post("api/v1/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.get("api/v1/order/me", config);

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.get(`api/v1/order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const updateStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STATUS_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.get(
      `api/v1/order/updateStatus/${id}`,
      config
    );

    dispatch({ type: UPDATE_STATUS_SUCCESS, payload: data.success });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: UPDATE_STATUS_FAILURE,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};
