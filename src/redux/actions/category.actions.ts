import clientAxios from "@/apis";
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
    dispatch({ type: NEW_CATEGORY_FAIL, payload: error.response.data.message });
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
    dispatch({
      type: ALL_CATEGORY_FAILURE,
      payload: error.response.data.message,
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
    dispatch({
      type: CATEGORY_DETAIL_FAILURE,
      payload: error.response.data.message,
    });
  }
};
