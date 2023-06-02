import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQ,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION,
  SET_SUBSID,
} from "../types";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQ,
    });

    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const checkSubscription = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,id,subscriberSnippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    console.log("Subscription data", data);

    dispatch({
      type: SET_SUBSCRIPTION,
      payload: data.items.length !== 0,
    });

    dispatch({
      type: SET_SUBSID,
      payload: data.items[0].id,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const subscribeChannel = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      method: "POST",
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
      data: {
        snippet: {
          resourceId: {
            kind: "youtube#channel",
            channelId: id,
          },
        },
      },
    });

    console.log(data);

    dispatch({
      type: SET_SUBSCRIPTION,
      payload: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const unSubscribeChannel = (id) => async (dispatch, getState) => {
  // console.log(id);
  try {
    await request("/subscriptions", {
      method: "DELETE",
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SET_SUBSCRIPTION,
      payload: false,
    });
  } catch (error) {
    console.error(error.message);
  }
};
