import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Video from "../../components/video/Video";
import { getUserLikedVideos } from "../../redux/actions/videoActions";

const LikedVideos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLikedVideos());
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.likedVideos);

  return (
    <>
      <Container>
        <Row className="mt-2">
          {!loading
            ? videos?.map((video) => (
                <Col md={4} lg={3}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map(() => (
                <Col md={4} lg={3}>
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

export default LikedVideos;
