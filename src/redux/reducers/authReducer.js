import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../types";

const inititlState = {
  accessToken: sessionStorage.getItem("yt-accessToken")
    ? sessionStorage.getItem("yt-accessToken")
    : null,
  user: sessionStorage.getItem("yt-profile")
    ? JSON.parse(sessionStorage.getItem("yt-profile"))
    : null,
  loading: false,
  error: null,
};

export const authReducer = (state = inititlState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: action.payload,
      };

    case LOAD_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
