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
  const sendVideoStatus = async (isPlaying) => {
    try {
      const message = isPlaying ? 'Видео проигрывается' : 'Видео НЕ проигрывается';
      setTimeShow('Время проверки вышло, статус отправлен!');
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/${id}`, {
        message,
      });
      if (response.status === 200 || response.status === 400) {
        setHasSentStatus(true);
      }
      if (!isPlaying) {
        console.log('Error');
      }
    } catch (error) {
      console.error(error);
    }
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
        sendVideoStatus(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
    if (!isVideoPlaying && !hasSentStatus) {
      const timer = setTimeout(() => {
        sendVideoStatus(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, video, isVideoPlaying, hasSentStatus, dispatch]);
  const handleVideoPlay = () => {
    setIsLoading(false);
    setIsVideoPlaying(true);
  };
  const handleVideoLoad = () => {
    setIsLoading(true);
  };
  const iframeVideoLoad = () => {
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
  const videoSource = video[0].link;
  return (
    <div className="video-container">
      {isMjpegVideo ? (
        <iframe
          title="Video"
          // width="1280"
          // height="720"
          width="100%"
          height="100%"
          src={videoSource}
          autoPlay
          allowFullScreen
          allow="autoPlay"
          onLoad={iframeVideoLoad}
        />
      ) : (
        <video
          // width="1280"
          // height="720"
          width="100%"
          height="100%"
          controls
          autoPlay
          muted
          onPlay={handleVideoPlay}
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={handleVideoLoad}
        >
          <track kind="captions" src={videoSource} label="Empty" default />
          <source src={videoSource} type="video/mp4" />
          <source src={videoSource} type="video/webm" />
          <source src={videoSource} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      )}
      {/* <div style={{ marginLeft: '15px' }}>
        {isVideoPlaying && <h1>Видео проигрывается</h1>}
        {!isVideoPlaying && <h1>Пытаемся загрузить...</h1>}
        <div>{timeShow}</div>
      </div> */}
    </div>
  );
}
