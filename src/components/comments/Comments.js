import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsByVideoId,
} from "../../redux/actions/commentActions";
import Comment from "../comment/Comment";

import "./_comments.scss";

const Comments = ({ videoId, totalComments }) => {
  const [userComment, setUserComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByVideoId(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.commentList);

  let _comments;

  if (comments) {
    _comments = comments?.comments?.map(
      (comment) => comment.snippet?.topLevelComment?.snippet
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userComment.length === 0) {
      return;
    }

    dispatch(addComment(videoId, userComment));
    setUserComment("");
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="comments">
      <p>{totalComments} comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src={user?.photoUrl}
          alt="avatar"
          className="rounded-circle mr-3"
        />
        <form onSubmit={handleSubmit} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment.."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <button className="border-0 p-2" type="submit">
            Comment
          </button>
        </form>
      </div>

      <div className="comments__list">
        {_comments?.map((comment, idx) => (
          <Comment comment={comment} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
