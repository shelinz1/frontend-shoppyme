import axios from "axios";
import {
  ADMIN_PRODUCT_CREATE_FAILURE,
  ADMIN_PRODUCT_CREATE_REQUEST,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAILURE,
  ADMIN_PRODUCT_DELETE_REQUEST,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DETAIL_FAILURE,
  ADMIN_PRODUCT_DETAIL_REQUEST,
  ADMIN_PRODUCT_DETAIL_SUCCESS,
  ADMIN_PRODUCT_EDIT_FAILURE,
  ADMIN_PRODUCT_EDIT_REQUEST,
  ADMIN_PRODUCT_EDIT_SUCCESS,
  ADMIN_PRODUCT_LIST_FAILURE,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAILURE,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productsTypes";

//PRODUCT LIST
export const productLists =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&keyword=${keyword}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//PRODUCT DETAIL
export const productDetails = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const response = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//PRODUCT REVIEW
export const productDetailsReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

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

      await axios.post(`/api/products/${productId}/review`, review, config);

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//ADMIN
export const productsList =
  (searchProduct = " ") =>
  async (dispatch, getState) => {
    dispatch({
      type: ADMIN_PRODUCT_LIST_REQUEST,
    });
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
        `/api/products/all/products?searchProduct=${searchProduct}`,
        config
      );

      dispatch({
        type: ADMIN_PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productDelete = (productId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_PRODUCT_DELETE_REQUEST });

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

    await axios.delete(`/api/products/${productId}`, config);

    dispatch({
      type: ADMIN_PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productAdd =
  (name, price, countInStock, category, description, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/add`,
        { name, price, countInStock, category, description, image },
        config
      );

      dispatch({
        type: ADMIN_PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productEdit = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_EDIT_REQUEST });

    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: ADMIN_PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_EDIT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productUpdate = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_UPDATE_REQUEST });

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
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: ADMIN_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ADMIN_PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetail = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/${productId}`, config);

    dispatch({
      type: ADMIN_PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_DETAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
