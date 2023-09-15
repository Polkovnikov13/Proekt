import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';
import OneCamera from './OneCamera';
import './VideoPage.css';

export default function CameraPage() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!camera.length) {
      dispatch(fetchCameraData());
    }
  }, []);

  // Calculate the range of cameras to display on the current page
  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  const currentCameras = camera.slice(indexOfFirstCamera, indexOfLastCamera);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="camera-container">
      {currentCameras.map((el) => (
        <OneCamera OneCamera={el} key={el.id} />
      ))}

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
