import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

export default function SendVideo() {
  const camera = useSelector((state) => state.camera);
  const newArray = camera.map((obj) => ({
    id: obj.id,
    ссылка: obj['ссылка'],
  }));
  console.log(newArray);
  let completedVideos = 0;
  const videoUrls = newArray.map((el) => el['ссылка']);
  const logData = [];

  const sendDataToServer = () => {
    try {
      const response = axios.post(`${process.env.REACT_APP_BASEURL}/api/camera/savelog`, {
        logContent: JSON.stringify(logData),
      });
      console.log('Сервер вернул:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  };

  const handleVideoProcessing = () => {
    videoUrls.forEach((url, index) => {
      const videoElement = document.createElement('video');
      videoElement.src = url;
      videoElement.autoplay = true;
      document.body.appendChild(videoElement);

      videoElement.addEventListener('play', () => {
        console.log(`Видео ${index + 1} начало воспроизводиться`);
        logData.push({ id: newArray[index].id, статус: 1 });
        completedVideos += 1;
        if (index === videoUrls.length) {
          console.log('Все видео завершили воспроизведение. + 2 минуты');
          setTimeout(() => {
            sendDataToServer(); // Call sendDataToServer with a 2-minute delay
          }, 2 * 60 * 1000); // 2 minutes in milliseconds
        }
      });

      videoElement.addEventListener('error', () => {
        console.error(`Произошла ошибка при загрузке видео ${index + 1}`);
        logData.push({ id: newArray[index].id, статус: 0 });
        completedVideos += 1;
        if (index === videoUrls.length) {
          console.log('Все видео завершили воспроизведение. + 2 минуты');
          setTimeout(() => {
            sendDataToServer(); // Call sendDataToServer with a 2-minute delay
          }, 2 * 60 * 1000); // 2 minutes in milliseconds
        }
      });
    });
  };
  return (
    <Button onClick={handleVideoProcessing}>Обработать видео и создать логи</Button>
  );
}
