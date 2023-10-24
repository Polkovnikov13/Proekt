import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
import './VideoPage.css';

export default function VideoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  console.log(video);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentStatus, setHasSentStatus] = useState(false);
  const [timeShow, setTimeShow] = useState('');

  const handleVideoPlay = () => {
    setIsLoading(false);
    setIsVideoPlaying(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(true);

    // Add your username and password here
    const username = 'RT';
    const password = '1243';

    // Create the Basic Authentication header
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

    // Define videoSource here
    const videoSource = video[0].link.replace('RT:1243@', '');

    // Find the video element
    const videoElement = document.querySelector('video');

    // Use the fetch API to set the Authorization header
    fetch(videoSource, {
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((response) => {
        if (response.ok) {
          videoElement.src = URL.createObjectURL(response);
        } else {
          console.error('Error loading video:', response.status);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      if (!video.length) {
        await dispatch(fetchCameraDataID(id));
      }
    };
    fetchDataAndInitialize();

    if (isVideoPlaying && !hasSentStatus) {
      const timer = setTimeout(() => {
        // sendVideoStatus(true);
      }, 50000);
      return () => clearTimeout(timer);
    }
    if (!isVideoPlaying && !hasSentStatus) {
      const timer = setTimeout(() => {
        // sendVideoStatus(false);
      }, 50000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, video, isVideoPlaying, hasSentStatus, dispatch]);

  const iframeVideoLoad = () => {
    // Define videoSource here as well
    const videoSource = video[0].link.replace('RT:1243@', '');
  };

  if (!video.length) {
    return <div>Loading...</div>;
  }

  const isMjpegVideo = video[0].link.includes('mjpeg')
    || video[0].link.includes('lk-b2b.')
    || video[0].link.includes('ru.cloud')
    || video[0].link.includes('rtsp.me')
    || video[0].link.includes('stream')
    || video[0].link.includes('vs.domru.ru')
    || video[0].link.includes('watcher')
    || video[0].link.includes('tattelecom')
    || video[0].link.includes('.rt.ru')
    || video[0].link.includes('frame_player')
    || video[0].link.includes('cam_share');
  const videoSource = video[0].link.replace('RT:1243@', '');
  console.log(videoSource, '!!!!');

  return (
    <div className="video-container" style={{ position: 'absolute', top: -130, left: 0 }}>
      {isMjpegVideo ? (
        <iframe
          title="Video"
          width="1280"
          height="720"
          src={videoSource}
          autoPlay
          allowFullScreen
          allow="autoPlay"
          onLoad={iframeVideoLoad}
        />
      ) : (
        <video
          width="1280"
          height="720"
          controls
          autoPlay
          muted
          onPlay={handleVideoPlay}
          onLoadStart={handleVideoLoad}
        >
          <track kind="captions" src={videoSource} label="Empty" default />
          <source src={videoSource} type="video/mp4" />
          <source src={videoSource} type="video/webm" />
          <source src={videoSource} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
