import {
  ADMIN_PRODUCT_CREATE_FAILURE,
  ADMIN_PRODUCT_CREATE_REQUEST,
  ADMIN_PRODUCT_CREATE_RESET,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAILURE,
  ADMIN_PRODUCT_DELETE_REQUEST,
  ADMIN_PRODUCT_DELETE_RESET,
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
  ADMIN_PRODUCT_UPDATE_RESET,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productsTypes";

//PRODUCTS LIST
export const productListsReducer = (
  state = { products: [], loading: false },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        page: payload.page,
        pages: payload.pages,
        products: payload.products,
      };
    case PRODUCT_LIST_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

//SINGLE PRODUCTS
export const productDetailsReducer = (
  state = { loading: false, product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_DETAIL_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//PRODUCT REVIEW
export const productDetailsReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN PRODUCT REDUCERS

// GET PRODUCTS
export const adminProductsListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        page: payload.page,
        pages: payload.pages,
        products: payload.products,
      };
    case ADMIN_PRODUCT_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

//DELETE PRODUCT
export const adminProductDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADMIN_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_PRODUCT_DELETE_FAILURE:
      return { loading: false, error: payload };
    case ADMIN_PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

//ADD PRODUCT
export const adminProductAddReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADMIN_PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case ADMIN_PRODUCT_CREATE_FAILURE:
      return { loading: false, error: payload };
    case ADMIN_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//EDIT PRODUCT
export const adminProductEditReducer = (
  state = { product: {  } },
  action
) => {
  switch (action.type) {
    case ADMIN_PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true };
    case ADMIN_PRODUCT_EDIT_SUCCESS:
      return { loading: false, product: action.payload };
    case ADMIN_PRODUCT_EDIT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//UPDATE PRODUCT
export const adminProductUpdateReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case ADMIN_PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: payload };
    case ADMIN_PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

//DETAIL PRODUCT
export const adminProductDetailReducer = (
  state = { loading: false, product: { } },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case ADMIN_PRODUCT_DETAIL_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
