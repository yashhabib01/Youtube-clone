import React from "react";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";

import "./_header.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const Header = ({ handleSideBar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length === 0) {
      return;
    }

    history.push(`/search/${searchQuery}`);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header">
      <FaBars
        className="header_menu"
        size={20}
        onClick={() => handleSideBar()}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="yt-icon"
        className="header_logo"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header_icons">
        {/* <MdNotifications size={28} />
        <MdApps size={28} /> */}
        <img src={user?.photoUrl} alt="avatar" />

        <div onClick={handleLogout} className="logout">
          <MdExitToApp size={23} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
