import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
import './VideoPage.css';

export default function VideoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasSentStatus, setHasSentStatus] = useState(false);

  const sendVideoStatus = async (isPlaying) => {
    try {
      const message = isPlaying ? 'Видео проигрывается' : 'Видео НЕ проигрывается';
      // console.log('Sending message:', message);

      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/${id}`, {
        message,
      });
      // console.log('Server response:', response);

      if (response.status === 200) {
        setHasSentStatus(true); // Mark the status as sent
      } else if (response.status === 400) {
        setHasSentStatus(true); // Mark the status as sent
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
    // If video is playing and status hasn't been sent
      const timer = setTimeout(() => {
        sendVideoStatus(true); // Video is playing
      }, 17000); // 10 seconds delay
      return () => clearTimeout(timer);
    }

    if (!isVideoPlaying && !hasSentStatus) {
      // If video is not playing and status hasn't been sent
      const timer = setTimeout(() => {
        sendVideoStatus(false); // Video is not playing
      }, 17000); // 10 seconds delay
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [id, video, isVideoPlaying, hasSentStatus, dispatch]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };
  if (!video.length) {
    return <div>Loading...</div>;
  }
  const isMjpegVideo = video[0]['ссылка'].includes('mjpeg')
    || video[0]['ссылка'].includes('lk-b2b.')
    || video[0]['ссылка'].includes('ru.cloud')
    || video[0]['ссылка'].includes('rtsp.me')
    || video[0]['ссылка'].includes('stream')
    || video[0]['ссылка'].includes('vs.domru.ru')
    || video[0]['ссылка'].includes('watcher')
    || video[0]['ссылка'].includes('tattelecom')
    || video[0]['ссылка'].includes('.rt.ru')
    || video[0]['ссылка'].includes('frame_player')
    || video[0]['ссылка'].includes('cam_share');

  const videoSource = video[0]['ссылка'];

  return (
    <div className="video-container">
      {isMjpegVideo ? (
        <iframe
          title="Video"
          width="1280"
          height="720"
          src={videoSource}
          autoPlay
          allowFullScreen
          allow="autoPlay"
        />
      ) : (
        <video
          width="1280"
          height="720"
          controls
          autoPlay
          muted
          onPlay={handleVideoPlay}
        >
          <track kind="captions" src="" label="Empty" default />
          <source src={videoSource} type="video/mp4" />
          <source src={videoSource} type="video/webm" />
          <source src={videoSource} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      )}
      {isVideoPlaying && <h1>Видео проигрывается</h1>}
      {!isVideoPlaying && <h1>Ждем...</h1>}
    </div>
  );
}
//  const urlToCheck = `${process.env.REACT_APP_BASEURL}/api/camera/${id}`;
//         axios.get(urlToCheck)
//           .then((response) => {
//             if (response.status === 200) {
//               console.log('Видео доступно и работает.');
//               setIsVideoPlaying(true);
//             } else {
//               console.log('Проблемы с доступностью видео.');
//             }
//           })
//           .catch((error) => {
//             console.error('Произошла ошибка при проверке видео:', error);
//           });
