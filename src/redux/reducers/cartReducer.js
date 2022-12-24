import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_CART_SHIPPING_ADDRESS,
  SAVE_CART_PAYMENT_METHOD,
  CLEAR_CART_ITEM,
} from "../constants/cartTypes";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CART_ITEM:
      const newItem = payload;

      const itemAlreadyExist = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (itemAlreadyExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === itemAlreadyExist.product ? newItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };

    case SAVE_CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case SAVE_CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    case CLEAR_CART_ITEM:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
