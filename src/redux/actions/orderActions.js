import axios from "axios";
import { CLEAR_CART_ITEM } from "../constants/cartTypes";
import {
  ADMIN_ORDER_DELIVERED_FAILURE,
  ADMIN_ORDER_DELIVERED_REQUEST,
  ADMIN_ORDER_DELIVERED_SUCCESS,
  ADMIN_ORDER_DETAILS_FAILURE,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_LIST_FAILURE,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/orderTypes";

//CREATE AN ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER_REQUEST, payload: order });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
    dispatch({ type: CLEAR_CART_ITEM });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET DETAILS ABOUT THE ORDER
export const orderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/orders/${orderId}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: response.data });
    // console.log(response.data)
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET ORDER LIST
export const myOrderList = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/me", config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//DELETE AN ORDER
export const deleteOrder = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST });

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMIN ORDER ACTIONS
export const ordersList =
  (searchorder = " ") =>
  async (dispatch, getState) => {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST });

    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/orders/all/orders/?searchorder=${searchorder}`,
        config
      );

      dispatch({
        type: ADMIN_ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ORDER_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//GET DETAILS ABOUT THE ORDER
export const orderDetail = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ORDER_DETAILS_REQUEST, payload: orderId });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);
    console.log(data);
    dispatch({ type: ADMIN_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//DELIVER THE ORDER
export const orderDeliver = (order) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ORDER_DELIVERED_REQUEST });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    console.log(data);
    dispatch({ type: ADMIN_ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_DELIVERED_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
