import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';

export default function SaveLog() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera).slice(151, 160);
  console.log(camera);
  const newArray = camera.map((obj) => ({
    id: obj.id,
    ссылка: obj.link,
  }));

  useEffect(() => {
    if (!camera.length) {
      dispatch(fetchCameraData());
    }
  }, []);

  const videoUrls = newArray.map((el) => el['ссылка']);
  const logData = [];
  // console.log(videoUrls);
  const sendDataToServer = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/saveLog`, {
        logContent: JSON.stringify(data),
      });
      console.log('Server response:', response.status);
      console.log('Server response message:', response.data.message);
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };
  let counter = 0;
  const handleVideoProcessing = () => {
    try {
      for (let index = 0; index < videoUrls.length; index += 1) {
        const url = videoUrls[index];
        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.setAttribute('autoplay', 'true');
        document.body.appendChild(videoElement);

        videoElement.addEventListener('play', () => {
          console.log(`Video ${index + 1} started playing`);
          logData.push({ id: newArray[index].id, status: 1 });
          counter += 1;
          console.log(counter, '<=>', index);
          if (index === videoUrls.length - 5) {
            console.log('===================start');
            // Check if it's the last video
            setTimeout(() => {
              sendDataToServer(logData); // Send data to the server after a 15-second delay
            }, 60000);
          }
        });

        videoElement.addEventListener('error', () => {
          console.error(`Error loading video ${index + 1}`);
          logData.push({ id: newArray[index].id, status: 0 });
          counter += 1;
          console.log(counter, '<=>!', index);
          if (index === videoUrls.length - 5) {
          // Check if it's the last video
            console.log('===================start');
            setTimeout(() => {
              sendDataToServer(logData); // Send data to the server after a 15-second delay
            }, 60000);
          }
        });
      }
    } catch (error) {
      console.error('An error occurred during video processing:', error);
    }
  };

  return (
    <Button onClick={handleVideoProcessing}>Process videos and create logs</Button>
  );
}
//  const iframeUrls = newArray.map((el) => el['ссылка']);
//   const logData = [];
//   let counter = 0;
//   // console.log(videoUrls);
//   const sendDataToServer = async (data) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/savelog`, {
//         logContent: JSON.stringify(data),
//       });
//       console.log('Server response:', response.status);
//       console.log('Server response message:', response.data.message);
//     } catch (error) {
//       console.error('Error sending data to the server:', error);
//     }
//   };

//   const handleIframeProcessing = () => {
//     try {
//       for (let index = 0; index < iframeUrls.length; index += 1) {
//         const url = iframeUrls[index];
//         const iframeElement = document.createElement('iframe');
//         iframeElement.src = url;
//         document.body.appendChild(iframeElement);

//         iframeElement.addEventListener('load', () => {
//           console.log(`Iframe ${index + 1} loaded successfully`);
//           logData.push({ id: newArray[index].id, status: 1 });
//           counter += 1;
//           console.log(counter, '<=>', index);
//           if (index === iframeUrls.length - 1) {
//             console.log('===================start');
//             // Check if it's the last iframe
//             setTimeout(() => {
//               sendDataToServer(logData); // Send data to the server after a 15-second delay
//             }, 60000);
//           }
//         });

//         iframeElement.addEventListener('error', () => {
//           console.error(`Error loading iframe ${index + 1}`);
//           logData.push({ id: newArray[index].id, status: 0 });
//           counter += 1;
//           console.log(counter, '<=>!', index);
//           if (index === iframeUrls.length - 1) {
//             // Check if it's the last iframe
//             console.log('===================start');
//             setTimeout(() => {
//               sendDataToServer(logData); // Send data to the server after a 15-second delay
//             }, 60000);
//           }
//         });
//       }
//     } catch (error) {
//       console.error('An error occurred during iframe processing:', error);
//     }
//   };
