import {
  VIDEO_COMMENTS_FAIL,
  VIDEO_COMMENTS_REQ,
  VIDEO_COMMENTS_SUCCESS,
} from "../types";

const commentsInitialState = {
  comments: null,
  loading: false,
  error: null,
};

export const commentListReducer = (state = commentsInitialState, action) => {
  switch (action.type) {
    case VIDEO_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    case VIDEO_COMMENTS_REQ:
      return {
        ...state,
        loading: true,
      };

    case VIDEO_COMMENTS_FAIL:
      return {
        ...state,
        comments: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
