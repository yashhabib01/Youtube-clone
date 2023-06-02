import React from "react";

import { MdSubscriptions, MdThumbUp, MdHome } from "react-icons/md";

import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

import "./_sidebar.scss";

const SideBar = ({ sideBar, handleSideBar }) => {
  return (
    <nav
      className={sideBar ? "sidebar open" : "sidebar"}
      onClick={() => handleSideBar(false)}
    >
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>

      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscription</span>
        </li>
      </Link>

      <Link to="/feed/liked-videos">
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
      </Link>

      <a
        href="https://github.com/Aniket2107/youtube-clone"
        target="_blank"
        rel="noreferrer"
      >
        <li>
          <FaGithub size={23} />
          <span>Project Repo.</span>
        </li>
      </a>
      {/*
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li> */}

      {/* <hr /> */}
      {/* <li onClick={handleLogout}>
        <MdExitToApp size={23} />
        <span>Logout</span>
      </li> */}
      {/* <hr /> */}
    </nav>
  );
};

export default SideBar;
