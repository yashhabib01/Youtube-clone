import React from "react";

import VideoMeta from "../../components/videoMeta/VideoMeta";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import "./_watchScreen.scss";
import { useEffect } from "react";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videoActions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading, isLiked } = useSelector(
    (state) => state.selectedVideo
  );

  const relatedVideos = useSelector((state) => state.relatedVideos);

  // console.log(video);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {!loading && video && Object.keys(video).length !== 0 ? (
          <VideoMeta video={video} videoId={id} isLiked={isLiked} />
        ) : (
          <h3>Loading...</h3>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!relatedVideos?.loading ? (
          relatedVideos?.videos
            ?.filter((video) => video.snippet)
            .map((vdo) => <VideoHorizontal video={vdo} key={vdo.id.videoId} />)
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
