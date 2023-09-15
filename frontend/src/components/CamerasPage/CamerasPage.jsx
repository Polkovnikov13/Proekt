import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';
import OneCamera from './OneCamera';
import './VideoPage.css';

export default function CameraPage() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera);
  console.log(camera);
  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    console.log('camera state:', camera, camera.length, !camera.length); // Add this line
    if (!camera.length) {
      dispatch(fetchCameraData());
    }
  }, []);

  useEffect(() => {
    console.log('Component is re-rendering');
    console.log('camera state:', camera);
    // Rest of your useEffect code
  }, [camera]);

  // Calculate the range of cameras to display on the current page
  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  const currentCameras = camera.slice(indexOfFirstCamera, indexOfLastCamera);
  console.log(currentCameras);
  // Function to handle page change
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

      {/* Pagination buttons */}
      <div className="pagination">
        {Array(Math.ceil(camera.length / itemsPerPage))
          .fill(null)
          .map((_, index) => (
            <Button
              key={`page-${index + 1}`} // Use a unique key
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
