/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';
import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
import './VideoPage.css';

export default function VideoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      try {
        if (!video.length) {
          await dispatch(fetchCameraDataID(id));
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchDataAndInitialize();
  }, [id, video, dispatch]);

  useEffect(() => {
    if (video.length > 0) {
      const videoSource = video[0].link;
      console.log(videoSource);
      let { n_url } = video[0];

      if (videoSource.includes('rtsp.me/embed')) {
        console.log('!!!!', videoSource, 'videoSource');
        const modifiedURL = videoSource.replace(/\+hash\.sub\+/g, videoSource.includes('ip=195.181.164.34') ? 'Ga8fIYIKPsEk14_Iq-BI1w' : 'IzQApTsiMyYuXb1c5GNznw');
        modifiedURL.replace(/["]/g, '');
        console.log('!!!!', modifiedURL, 'modifiedURL');
        console.log(video[0]);
        console.log(n_url, 'n_url');
      } else if (videoSource.includes('https://lk-b2b.camera')) {
        n_url = `https://streamer.camera.rt.ru/public/master.m3u8?sid=${video[0].n_url}`;
        console.log(n_url, 'n_url');
      } else if (videoSource.includes('https://camera.rt.ru/sl')) {
        n_url = `https://live-smh-vdk4.camera.rt.ru/public/variant.m3u8?sid=${video[0].n_url}`;
        console.log(n_url, 'n_url');
      } else if (videoSource.startsWith('https://cctv.cit23')) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      }
      // Не нужно сюда добавлять, только если изменяем N_URL
      //   else if (videoSource.includes('https://mlsonline.tv/cam_share')) {
      //   n_url = 'https://streamer1                                                                                   .mlsonline.tv:8443/vsaas/cameras/mira13kbs/hls/best/stream.m3u8?token=4c0bc39ab3b6fcec01106daa4d63529f681bfc52-1719240738';
      // }

      if (Hls.isSupported() && (!videoSource.startsWith('https://cctv.cit23'))) {
        const hls = new Hls();
        console.log('HLS!!!!!!!!!');
        console.log(n_url, 'url');
        hls.loadSource(n_url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      }
    }
  }, [video]);

  if (!video.length) {
    return <div>Loading...</div>;
  }

  const videoSourceA = video[0].link;
  console.log(videoSourceA, 'AAA');
  if (videoSourceA.startsWith('https://cctv.cit23') || videoSourceA.startsWith('http:')) {
    const iframeScale = 0.5;
    return (
      <div className="video-container" style={{ position: 'absolute', top: -130, left: 0 }}>
        <iframe
          title="Video"
          width={2600 * iframeScale}
          height={1500 * iframeScale}
          src={videoSourceA}
          autoPlay
          allowFullScreen
          allow="autoplay"
          style={{ transform: `scale(${iframeScale})`, transformOrigin: '0 0' }}
        />
      </div>
    );
  }

  if (videoSourceA.startsWith('https://rtsp.me/embed') || videoSourceA.startsWith('https://lk-b2b.camera') || videoSourceA.startsWith('https://camera.rt.ru/sl')
  || videoSourceA.startsWith('https://mlsonline.tv/cam_share') || videoSourceA.startsWith('https://wowza.klgd.ru') || videoSourceA.startsWith('https://mavis.ru')
  || videoSourceA.includes('trassir')
  ) {
    return (
      <div
        className="video-container-fixed"
        style={{ position: 'absolute', top: -1, left: 0 }}
      >
        <video
          style={{ backgroundColor: 'black' }}
          width="263"
          height="147"
          controls
          autoPlay
          muted
          ref={videoRef}
        >
          <track kind="captions" src={videoSourceA} label="Empty" default />
          <source src={videoSourceA} type="video/mp4" />
          <source src={videoSourceA} type="video/webm" />
          <source src={videoSourceA} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
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
        src={videoSourceA}
      >
        <track kind="captions" src={videoSourceA} label="Empty" default />
        <source src={videoSourceA} type="video/mp4" />
        <source src={videoSourceA} type="video/webm" />
        <source src={videoSourceA} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'reactstrap';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
// import './VideoPage.css';

// export default function VideoPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const video = useSelector((state) => state.video);
//   // console.log(video);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSentStatus, setHasSentStatus] = useState(false);
//   const [timeShow, setTimeShow] = useState('');
//   const sendVideoStatus = async (isPlaying) => {
//     try {
//       const message = isPlaying ? 'Видео проигрывается' : 'Видео НЕ проигрывается';
//       setTimeShow('Время проверки вышло, статус отправлен!');
//       const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/${id}`, {
//         message,
//       });
//       if (response.status === 200 || response.status === 400) {
//         setHasSentStatus(true);
//       }
//       if (!isPlaying) {
//         console.log('Error');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     const fetchDataAndInitialize = async () => {
//       try {
//         if (!video.length) {
//           await dispatch(fetchCameraDataID(id));
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchDataAndInitialize();
//     if (isVideoPlaying && !hasSentStatus) {
//       const timer = setTimeout(() => {
//         sendVideoStatus(true);
//       }, 50000);
//       return () => clearTimeout(timer);
//     }
//     if (!isVideoPlaying && !hasSentStatus) {
//       const timer = setTimeout(() => {
//         sendVideoStatus(false);
//       }, 50000);
//       return () => clearTimeout(timer);
//     }
//     return undefined;
//   }, [id, video, isVideoPlaying, hasSentStatus, dispatch]);

//   const handleVideoPlay = () => {
//     setIsLoading(false);
//     setIsVideoPlaying(true);
//   };
//   const handleVideoLoad = () => {
//     setIsLoading(true);
//   };
//   const iframeVideoLoad = () => {
//     setIsVideoPlaying(true);
//   };
//   if (!video.length) {
//     return <div>Loading...</div>;
//   }
//   const isMjpegVideo = video[0].link.includes('mjpeg')
//     || video[0].link.includes('video.enforta.ru/embed/v3')
//     || video[0].link.includes('php/iframe.php?')
//     || video[0].link.includes('lk-b2b.')
//     || video[0].link.includes('ru.cloud')
//     || video[0].link.includes('rtsp.me')
//     || video[0].link.includes('stream')
//     || video[0].link.includes('vs.domru.ru')
//     || video[0].link.includes('watcher')
//     || video[0].link.includes('tattelecom')
//     || video[0].link.includes('.rt.ru')
//     || video[0].link.includes('frame_player')
//     || video[0].link.includes('saferegion.net')
//     || video[0].link.includes('cam_share')
//     || video[0].link.includes('ucams')
//     || video[0].link.includes('cams.is74.ru/realtime')
//     || video[0].link.includes('https://krkvideo1')
//     || video[0].link.includes('public.ivideon');

//   const videoSource = video[0].link;

//   if (videoSource.startsWith('https://cctv.cit23.ru/') || videoSource.startsWith('http:')) {
//     const iframeScale = 0.5;
//     return (
//       <div className="video-container" style={{ position: 'absolute', top: -130, left: 0 }}>
//         <iframe
//           title="Video"
//           width={2600 * iframeScale}
//           height={1500 * iframeScale}
//           src={videoSource}
//           autoPlay
//           allowFullScreen
//           allow="autoplay" // Add this line
//           // onLoad={handleButtonClick}
//           style={{ transform: `scale(${iframeScale})`, transformOrigin: '0 0' }}
//         />

//       </div>
//     );
//   } if (isMjpegVideo) {
//     return (
//       <div className="video-container-fixed" style={{ position: 'absolute', top: -130, left: 0 }}>
//         <iframe
//           title="Video"
//           width="1280"
//           height="720"
//           src={videoSource}
//           autoPlay
//           allowFullScreen
//           allow="autoPlay"
//           // onLoad={handleButtonClick}
//         />
//       </div>
//     );
//   }
//   return (
//     <div className="video-container-fixed" style={{ position: 'absolute', top: -130, left: 0 }}>
//       <video
//         width="1280"
//         height="720"
//         controls
//         autoPlay
//         muted
//         onPlay={() => setIsVideoPlaying(true)}
//         onLoadStart={() => setIsLoading(true)}
//         onLoadedData={() => setIsLoading(false)}
//         src={videoSource}
//       >
//         <track kind="captions" src={videoSource} label="Empty" default />
//         <source src={videoSource} type="video/mp4" />
//         <source src={videoSource} type="video/webm" />
//         <source src={videoSource} type="video/ogg" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

/* eslint-disable camelcase */
// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'reactstrap';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Hls from 'hls.js';
// import { fetchCameraDataID } from '../../redux/Slices/VideoSlice';
// import './VideoPage.css';

// export default function VideoPage() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const n_url = 'https://spb.rtsp.me/Ga8fIYIKPsEk14_Iq-BI1w/1718028107/hls/R6n22NRY.m3u8?ip=195.181.164.34';

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(n_url);
//       hls.attachMedia(videoRef.current);
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         videoRef.current.play();
//       });
//       hls.on(Hls.Events.ERROR, (event, data) => {
//         if (data.fatal) {
//           switch (data.type) {
//             case Hls.ErrorTypes.NETWORK_ERROR:
//               hls.startLoad();
//               break;
//             case Hls.ErrorTypes.MEDIA_ERROR:
//               hls.recoverMediaError();
//               break;
//             default:
//               hls.destroy();
//               break;
//           }
//         }
//       });
//     }
//   }, []);

//   return (
//     <div className="video_wrapper">
//       <video ref={videoRef} className="video" muted autoPlay />
//     </div>
//   );
// }
