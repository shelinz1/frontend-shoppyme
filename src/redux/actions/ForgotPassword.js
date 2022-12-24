import axios from "axios";
import { toast } from "react-toastify";
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "../constants/ForgotPassword";

export const forgotPasswordUpdate = (email) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 5000,
  };

  dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: email });

  try {
    const { data } = await axios.post("/api/password/forgotpassword", {
      email,
    });

    console.log(data);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    if (data === "Recovery link sent to your email.") {
      toast.success("Recovery link sent to your email.", ToastObjects);
    }
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.data.message === "Error sending reset link.") {
      toast.error("Error sending reset link.", ToastObjects);
    } else if (error.response.data.message === "Email is not registered.") {
      toast.error("Email is not registered.", ToastObjects);
    }
  }
};
