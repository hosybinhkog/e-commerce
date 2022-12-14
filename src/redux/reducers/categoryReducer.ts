import {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_RESET,
  NEW_CATEGORY_FAIL,
  CLEAR_ERRORS_CATEGORY,
  ALL_CATEGORY_REQUESTS,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAILURE,
  CATEGORY_DETAIL_REQUESTS,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  CLEAR_ERRROR_UPDATE_CATEGORY,
} from "@/constants/redux.contants";

export const createCategoryReducer = (state: any = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        loading: true,
        error: null,
        newCategory: {},
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        error: null,
        newCategory: action.payload,
        success: true,
      };
    case NEW_CATEGORY_RESET:
      return {
        ...state,
        success: false,
        error: null,
      };
    case NEW_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CLEAR_ERRORS_CATEGORY:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export const getAllCategory = (state: any = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUESTS:
      return {
        loading: true,
        error: null,
        categories: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        error: null,
        categories: action.payload,
      };
    case ALL_CATEGORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
        success: false,
        ...state,
      };
    case CLEAR_ERRORS_CATEGORY:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export const categoryDetailsReducer = (
  state: any = { category: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUESTS:
      return {
        error: null,
        loading: true,
        ...state,
      };
    case CATEGORY_DETAIL_SUCCESS:
      return {
        error: null,
        loading: false,
        category: action.payload,
      };
    case CATEGORY_DETAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS_CATEGORY:
      return {
        error: null,
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export const updateCategoryDetails = (
  state: any = { category: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
        error: null,
        category: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        error: null,
        category: action.payload,
        success: true,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        success: null,
      };

    case CLEAR_ERRROR_UPDATE_CATEGORY:
      return {
        ...state,
        error: null,
      };
    default: {
      return { ...state };
    }
  }
};
