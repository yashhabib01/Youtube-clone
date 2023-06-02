import request from "../../api";
import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  VIDEO_COMMENTS_FAIL,
  VIDEO_COMMENTS_REQ,
  VIDEO_COMMENTS_SUCCESS,
} from "../types";

export const getCommentsByVideoId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: VIDEO_COMMENTS_REQ,
    });

    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });

    dispatch({
      type: VIDEO_COMMENTS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: VIDEO_COMMENTS_FAIL,
      payload: error.message,
    });
  }
};

export const addComment = (id, userComment) => async (dispatch, getState) => {
  try {
    const body = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: userComment,
          },
        },
      },
    };

    await request.post("/commentThreads", body, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentsByVideoId(id)), 3000);
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.message,
    });
  }
};
