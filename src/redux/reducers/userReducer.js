import {
  ADMIN_USERS_LIST_FAILURE,
  ADMIN_USERS_LIST_REQUEST,
  ADMIN_USERS_LIST_RESET,
  ADMIN_USERS_LIST_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userTypes";

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (
  state = { loading: true },
  { type, payload }
) => {
  switch (type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };

    case USER_PROFILE_SUCCESS:
      return { loading: false, user: payload };
    case USER_PROFILE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };

    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_PROFILE_UPDATE_FAILURE:
      return { loading: false, error: payload };
    case USER_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


//ADMIN GETTING ALL THE USERS
export const adminUserListReducer = (
  state = { users: [] },
  { type, payload }
) => {
  switch (type) {
    case ADMIN_USERS_LIST_REQUEST:
      return { loading: true };
    case ADMIN_USERS_LIST_SUCCESS:
      return { loading: false, users: payload };
    case ADMIN_USERS_LIST_FAILURE:
      return { loading: false, error: payload };
    case ADMIN_USERS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};