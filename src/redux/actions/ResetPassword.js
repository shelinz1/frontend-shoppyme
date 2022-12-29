import axios from "axios";
import {
  GET_REQUEST_PASSWORD_FAILURE,
  GET_REQUEST_PASSWORD_REQUEST,
  GET_REQUEST_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants/ResetPasswordType";

export const resetInfo = (token) => async (dispatch) => {
  dispatch({ type: GET_REQUEST_PASSWORD_REQUEST });

  try {
    const { data } = await axios.get(
      `/api/password/reset/${token}`
    );
    dispatch({ type: GET_REQUEST_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REQUEST_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePassword = (token, password) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: password });

  try {
    const { data } = await axios.post(
      `/api/password/reset/${token}`,
      {
        password,
      }
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
