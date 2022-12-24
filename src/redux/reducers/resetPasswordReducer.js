import {
  GET_REQUEST_PASSWORD_FAILURE,
  GET_REQUEST_PASSWORD_REQUEST,
  GET_REQUEST_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants/ResetPasswordType";

export const resetPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_REQUEST_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case GET_REQUEST_PASSWORD_SUCCESS:
      return {
        loading: false,
        user: payload,
      };

    case GET_REQUEST_PASSWORD_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const updatePasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        user: payload,
      };

    case UPDATE_PASSWORD_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
