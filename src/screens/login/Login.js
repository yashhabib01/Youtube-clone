import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/authAction";

import "./_login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const history = useHistory();

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube-thumbnail"
          className="thumbnail"
        />
        <button onClick={handleLogin} className="login-with-google-btn">
          Login with Google
        </button>
        {/* <p>
          This project is made by{" "}
          <a
            href="https://github.com/Aniket2107"
            target="_blank"
            rel="noreferrer"
          >
            Aniket Habib
          </a>{" "}
        </p> */}
      </div>
    </div>
  );
};

export default Login;
