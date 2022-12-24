import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { forgotpasswordReducer } from "./reducers/forgotPasswordReducer";
import {
  adminOrderDeliveredReducer,
  adminOrderDetailsReducer,
  adminOrderListReducer,
  createOrderReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducer";
import {
  productListsReducer,
  productDetailsReducer,
  productDetailsReviewReducer,
  adminProductsListReducer,
  adminProductDeleteReducer,
  adminProductAddReducer,
  adminProductEditReducer,
  adminProductUpdateReducer,
  adminProductDetailReducer,
} from "./reducers/productsReducer";
import { resetPasswordReducer, updatePasswordReducer } from "./reducers/resetPasswordReducer";
import {
  adminUserListReducer,
  userLoginReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducer";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },
};

const reducer = combineReducers({
  productsList: productListsReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  createdOrders: createOrderReducer,
  createdOrdersDetails: orderDetailsReducer,
  deleteOrders: orderDeleteReducer,
  payOrder: orderPayReducer,
  ordersList: orderListReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userProfileUpdateReducer,
  productReview: productDetailsReviewReducer,
  forgotPassword: forgotpasswordReducer,
  resetPassword: resetPasswordReducer,
  updatePassword: updatePasswordReducer,

  // admin reducer
  adminproductsList: adminProductsListReducer,
  productDelete: adminProductDeleteReducer,
  addProduct: adminProductAddReducer,
  editProduct: adminProductEditReducer,
  updateProduct: adminProductUpdateReducer,
  detailProduct: adminProductDetailReducer,
  adminUsersList: adminUserListReducer,
  adminOrdersList: adminOrderListReducer,
  detailOrder: adminOrderDetailsReducer,
  deliverOrder: adminOrderDeliveredReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
