import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
// import Skeleton from "react-loading-skeleton";

import CategoryBar from "../components/categoryBar/CategoryBar";
import Video from "../components/video/Video";
import {
  getPopularVideos,
  getUserLikedVideos,
  getVideosByCategory,
} from "../redux/actions/videoActions";
import LoadSkeleton from "../components/loader/LoadSkeleton";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    dispatch(getPopularVideos());
    dispatch(getUserLikedVideos());
    console.log("yash");
  }, [dispatch]);

  const fetchNextData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoryBar />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchNextData}
        hasMore={true}
        className="row"
      >
        {!loading
          ? videos.map((video) => {
              const _videoId = video.id?.videoId || video.id;

              return (
                <Col lg={3} md={4} key={_videoId}>
                  <Video video={video} />
                </Col>
              );
            })
          : [...Array(20)].map(() => (
              <Col lg={3} md={4} key={Math.random()}>
                <LoadSkeleton />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
