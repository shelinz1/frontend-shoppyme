import {
  ADMIN_ORDER_DELIVERED_FAILURE,
  ADMIN_ORDER_DELIVERED_REQUEST,
  ADMIN_ORDER_DELIVERED_RESET,
  ADMIN_ORDER_DELIVERED_SUCCESS,
  ADMIN_ORDER_DETAILS_FAILURE,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_LIST_FAILURE,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderTypes";

export const createOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: payload };
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case CREATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: payload };

    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };

    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload };

    case ORDER_LIST_FAILURE:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const orderDeleteReducer = (
  state = { },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };

    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ORDER_DELETE_FAILURE:
      return { loading: false, error: payload };

    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_PAY_FAILURE:
      return { loading: false, error: payload };

    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN REDUCERS

export const adminOrderListReducer = (
  state = { orders: [] },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ADMIN_ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload };
    case ADMIN_ORDER_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const adminOrderDetailsReducer = (
  state = { loading: true, orderProducts: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ADMIN_ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: payload };

    case ADMIN_ORDER_DETAILS_FAILURE:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const adminOrderDeliveredReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADMIN_ORDER_DELIVERED_REQUEST:
      return { loading: true };

    case ADMIN_ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };

    case ADMIN_ORDER_DELIVERED_FAILURE:
      return { loading: false, error: payload };

    case ADMIN_ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
