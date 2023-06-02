import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQ,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION,
  SET_SUBSID,
} from "../types";

const channelInitialState = {
  channel: null,
  loading: false,
  error: null,
  subscriptionStatus: false,
  subscriptionId: null,
};

export const channelDetailsReducer = (state = channelInitialState, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        channel: action.payload,
      };

    case CHANNEL_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };

    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channel: null,
        loading: false,
        error: action.payload,
      };

    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscriptionStatus: action.payload,
      };

    case SET_SUBSID:
      return {
        ...state,
        subscriptionId: action.payload,
      };

    default:
      return state;
  }
};
