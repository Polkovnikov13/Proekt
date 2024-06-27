import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';

export default function SaveLog() {
  const sendDataToServer = async (data) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/savelog`, {
      });
      console.log('Server response:', response.status);
      console.log('Server response message:', response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  return (
    <>
      <Button onClick={sendDataToServer}>Process videos and create logs</Button>
      <Button>LK-2B2</Button>
    </>
  );
}
