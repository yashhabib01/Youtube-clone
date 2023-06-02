import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videoActions";

import "./_categoryBar.scss";

const keywords = [
  "All",
  "React.js",
  "Node",
  "Javascript",
  "Typescript",
  "MongoDb",
  "Angular",
  "MySql",
  "Aws",
  "Tarak Mehta",
  "Comedy",
];

const CategoryBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();

  const changeActiveElement = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="categoryBar">
      {keywords.map((value, idx) => {
        return (
          <span
            key={idx}
            onClick={() => changeActiveElement(value)}
            className={activeElement === value ? "active" : ""}
          >
            {" "}
            {value}
          </span>
        );
      })}
    </div>
  );
};

export default CategoryBar;
