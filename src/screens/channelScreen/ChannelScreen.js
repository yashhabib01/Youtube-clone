import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosByChannelId } from "../../redux/actions/videoActions";

import Video from "../../components/video/Video";

import "./_channelScreen.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  checkSubscription,
  getChannelDetails,
  subscribeChannel,
  unSubscribeChannel,
} from "../../redux/actions/channelActions";
import numeral from "numeral";

const ChannelScreen = () => {
  const { channelId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannelId(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscription(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos);

  const channelData = useSelector((state) => state.channelDetails);

  if (
    !channelData ||
    !channelData.channel ||
    !channelData.channel.snippet ||
    !channelData.channel.statistics
  ) {
    return <h3>Loading....</h3>;
  }

  const { snippet, statistics } = channelData.channel;
  const isSubscribed = channelData.subscriptionStatus;

  const handleSubscribeBtn = () => {
    if (isSubscribed) {
      dispatch(unSubscribeChannel(channelData.subscriptionId));
    } else {
      dispatch(subscribeChannel(channelData.channel.id));
    }
  };

  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img
            src={snippet?.thumbnails?.default?.url}
            alt=""
            className="mx-3"
          />

          <div className="ml-4 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} Subscribers
            </span>
          </div>
        </div>

        <button
          className={`btn ${isSubscribed ? "btn-secondary" : "btn-danger"}`}
          onClick={handleSubscribeBtn}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <Container>
        <Row className="mt-2">
          {!loading
            ? videos?.map((video, idx) => (
                <Col md={4} lg={3} key={idx}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map(() => (
                <Col md={4} lg={3} key={Math.random() * 10}>
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
