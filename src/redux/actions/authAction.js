import firebase from "firebase/app";
import auth from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../types";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl"); //for youtube

    const response = await auth.signInWithPopup(provider);
    // console.log(response);

    const accessToken = response.credential.accessToken;
    const profile = {
      name: response.additionalUserInfo.profile.name,
      photoUrl: response.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("yt-accessToken", accessToken);
    sessionStorage.setItem("yt-profile", JSON.stringify(profile));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();

  dispatch({
    type: LOGOUT,
  });

  sessionStorage.removeItem("yt-accessToken");
  sessionStorage.removeItem("yt-profile");
};
