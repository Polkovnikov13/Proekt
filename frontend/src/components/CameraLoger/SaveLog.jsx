import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';

export default function SaveLog() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera);
  const newArray = camera.map((obj) => ({
    id: obj.id,
    ссылка: obj.link,
  }));
  // console.log(camera);

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
          if (index === videoUrls.length - 1) {
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
          if (index === videoUrls.length - 1) {
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
