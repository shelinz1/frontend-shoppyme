import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "../constants/ForgotPassword";

export const forgotpasswordReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        user: payload,
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
