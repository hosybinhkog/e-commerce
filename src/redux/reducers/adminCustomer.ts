import {
  CLEAR_ERRORS_FETCH_CUSTOMER,
  FETCH_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
} from "@/constants/redux.contants";

interface StateFetchCustomerReducer {
  loading?: boolean;
  error?: string;
  customers?: any[];
}

export const fetchCustomerReducer = (
  state: StateFetchCustomerReducer = { customers: [] },
  action
) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
      return {
        error: undefined,
        loading: true,
        customers: [],
      };
    case FETCH_CUSTOMER_FAILURE:
      return {
        error: action.payload,
        loading: false,
        customer: undefined,
      };
    case FETCH_CUSTOMER_SUCCESS:
      return {
        loading: false,
        customers: action.payload,
        error: undefined,
      };
    case CLEAR_ERRORS_FETCH_CUSTOMER:
      return {
        error: undefined,
        ...state,
      };
    default:
      return { ...state };
  }
};
