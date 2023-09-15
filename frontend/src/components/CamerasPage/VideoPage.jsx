import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
import './VideoPage.css';

export default function VideoPage() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  console.log(video);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (!video.length) {
      dispatch(fetchCameraDataID(id));
    }
  }, [dispatch, id, video]);
  if (!video.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-container">
      <video width="1280" height="720" controls autoPlay muted>
        <track kind="captions" src="" label="Empty" default />
        <source src={video[0]['ссылка']} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
