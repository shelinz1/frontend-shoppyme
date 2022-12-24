import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_CART_PAYMENT_METHOD,
  SAVE_CART_SHIPPING_ADDRESS,
} from "../constants/cartTypes";
import axios from "axios";

//ADD CARTS
export const addCartItem =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: ADD_CART_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

//REMOVE CART ITEMS
export const removeCartItem = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE CART SHIPPING ADDRESS
export const cartShippingAddress = (data) => (dispatch) => {
  dispatch({ type: SAVE_CART_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//SAVE CART PAYMENT METHOD
export const cartPaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_CART_PAYMENT_METHOD, payload: data });
  // localStorage.setItem("paymentMethod", JSON.stringify(data));
};
