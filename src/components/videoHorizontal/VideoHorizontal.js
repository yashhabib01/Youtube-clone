import React, { useState, useEffect } from "react";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./_videohr.scss";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen, subscriptionScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails,
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subscriptionScreen);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    if (isVideo) {
      getVideoDetails();
    }
  }, [id, isVideo]);

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

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };

  const thumb = !isVideo && "videoHorizontal__thumbnail-channel";

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subscriptionScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={thumbnails?.medium.url}
          effect="blur"
          alt="video-thumbnail"
          className={`videoHorizontal__thumbnail ${thumb}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />

        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>

      <Col
        xs={6}
        md={searchScreen || subscriptionScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videoHorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •{"  "}
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {(searchScreen || subscriptionScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}

        <div className="videoHorizontal__channel d-flex align-items-center">
          {isVideo && (
            <LazyLoadImage
              src={channelIcon?.url}
              effect="blur"
              alt="video-thumbnail"
            />
          )}
          <p className="mb-0">{channelTitle}</p>
        </div>

        {subscriptionScreen && (
          <p className="mt-2">
            {video?.contentDetails.totalItemCount}
            {"  "}Videos
          </p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
