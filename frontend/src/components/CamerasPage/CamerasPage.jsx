import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';
import OneCamera from './OneCamera';
import './VideoPage.css';

export default function CameraPage() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    if (!camera.length) {
      dispatch(fetchCameraData());
    }
  }, []);
  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  const currentCameras = camera.slice(indexOfFirstCamera, indexOfLastCamera);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (!camera.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="camera-container">
      {Array.isArray(currentCameras) && currentCameras.length > 0 ? (
        currentCameras.map((el) => (
          <OneCamera OneCamera={el} key={el.id} />
        ))
      ) : (
        <div>No cameras to display.</div>
      )}

      <div className="pagination">
        {Array(Math.ceil(camera.length / itemsPerPage))
          .fill(null)
          .map((_, index) => (
            <Button
              key={`page-${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </Button>
          ))}
      </div>
    </div>

  );
}
