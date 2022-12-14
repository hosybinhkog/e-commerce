import clientAxios from "@/apis";
import { createLoggerHistory } from "@/apis/mothod";
import {
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  ALL_CATEGORY_REQUESTS,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAILURE,
  CATEGORY_DETAIL_REQUESTS,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "@/constants/redux.contants";

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.post(
      `api/v1/category`,
      categoryData,
      config
    );

    dispatch({ type: NEW_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_CATEGORY_REQUESTS,
    });

    const { data } = await clientAxios.get(`api/v1/category`);

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: ALL_CATEGORY_FAILURE,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const getDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAIL_REQUESTS });

    const { data } = await clientAxios.get(`api/v1/category/${id}`);

    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: CATEGORY_DETAIL_FAILURE,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};

export const updateCategoryDetails = (id, dataForm) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const { data } = await clientAxios.put(`api/v1/category/${id}`, dataForm);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error?.response?.data?.message || "Error server interval",
    });
  }
};
