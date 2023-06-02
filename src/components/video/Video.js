import React, { useState, useEffect } from "react";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./_video.scss";
import { useHistory } from "react-router-dom";

const Video = ({ video, channelScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const history = useHistory();

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });

      setChannelIcon(items[0].snippet.thumbnails.default);
    };

    getChannelDetails();
  }, [channelId]);

  const handleClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  const handleChannelClick = () => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <div className="video">
      <div onClick={handleClick}>
        <div className="video_top">
          {/* <img src={medium.url} alt="video-thumbnail" /> */}
          <LazyLoadImage src={medium.url} effect="blur" alt="video-thumbnail" />
          <span className="video_top_duration">{_duration}</span>
        </div>
        <div className="video_title">{title}</div>
        <div className="video_details">
          <span>
            <AiFillEye /> {numeral(views).format("0.a")} Views •
          </span>

          <span>
            {"        "}
            {moment(publishedAt).fromNow()}
          </span>
        </div>
      </div>

      {!channelScreen && (
        <div className="video_channel" onClick={handleChannelClick}>
          {/* <img src={channelIcon?.url} alt="channel-avatar" /> */}
          <LazyLoadImage
            src={channelIcon?.url}
            effect="blur"
            alt="channel-avatar"
          />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
