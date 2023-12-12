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
  // console.log(video);
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
      try {
        if (!video.length) {
          await dispatch(fetchCameraDataID(id));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAndInitialize();
    if (isVideoPlaying && !hasSentStatus) {
      const timer = setTimeout(() => {
        sendVideoStatus(true);
      }, 50000);
      return () => clearTimeout(timer);
    }
    if (!isVideoPlaying && !hasSentStatus) {
      const timer = setTimeout(() => {
        sendVideoStatus(false);
      }, 50000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, video, isVideoPlaying, hasSentStatus, dispatch]);

  // const iframeRef = useRef();
  // const handleButtonClick = () => {
  //   if (iframeRef.current) {
  //     iframeRef.current.contentWindow.postMessage('play', '*');
  //   }
  // };

  const handleVideoPlay = () => {
    setIsLoading(false);
    setIsVideoPlaying(true);
  };
  const handleVideoLoad = () => {
    setIsLoading(true);
  };
  const iframeVideoLoad = () => {
    setIsVideoPlaying(true);
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
    || video[0].link.includes('saferegion.net')
    || video[0].link.includes('cam_share')
    || video[0].link.includes('ucams')
    || video[0].link.includes('cams.is74.ru/realtime')
    || video[0].link.includes('https://krkvideo1')
    || video[0].link.includes('public.ivideon');

  const videoSource = video[0].link;

  if (videoSource.startsWith('https://cctv.cit23.ru/') || videoSource.startsWith('http:')) {
    const iframeScale = 0.5;
    return (
      <div className="video-container" style={{ position: 'absolute', top: -130, left: 0 }}>
        <iframe
          title="Video"
          width={2600 * iframeScale}
          height={1500 * iframeScale}
          src={videoSource}
          autoPlay
          allowFullScreen
          allow="autoplay" // Add this line
          // onLoad={handleButtonClick}
          style={{ transform: `scale(${iframeScale})`, transformOrigin: '0 0' }}
        />

      </div>
    );
  } if (isMjpegVideo) {
    return (
      <div className="video-container-fixed" style={{ position: 'absolute', top: -130, left: 0 }}>
        <iframe
          title="Video"
          width="1280"
          height="720"
          src={videoSource}
          autoPlay
          allowFullScreen
          allow="autoPlay"
          // onLoad={handleButtonClick}
        />
      </div>
    );
  }
  return (
    <div className="video-container-fixed" style={{ position: 'absolute', top: -130, left: 0 }}>
      <video
        width="1280"
        height="720"
        controls
        autoPlay
        muted
        onPlay={() => setIsVideoPlaying(true)}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        src={videoSource}
      >
        <track kind="captions" src={videoSource} label="Empty" default />
        <source src={videoSource} type="video/mp4" />
        <source src={videoSource} type="video/webm" />
        <source src={videoSource} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
