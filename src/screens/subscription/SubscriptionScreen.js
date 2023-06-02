import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscribedChannels } from "../../redux/actions/videoActions";

import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";

import "./_subscription.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSubscribedChannels());
  }, [dispatch]);

  const { channels, loading } = useSelector((state) => state.userSubscriptions);

  return (
    <Container fluid>
      {!loading ? (
        channels?.map((channel) => (
          <VideoHorizontal
            video={channel}
            key={channel.id}
            subscriptionScreen
          />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SubscriptionScreen;
