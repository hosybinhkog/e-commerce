import clientAxios from "@/apis";
import { createLoggerHistory } from "@/apis/mothod";
import {
  FETCH_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
} from "@/constants/redux.contants";

export const fetchCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CUSTOMER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await clientAxios.get(`api/v1/user/admin/users`, config);

    dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: data.users });
  } catch (error) {
    createLoggerHistory(error?.response?.data?.message || "Error server");
    dispatch({
      type: FETCH_CUSTOMER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
