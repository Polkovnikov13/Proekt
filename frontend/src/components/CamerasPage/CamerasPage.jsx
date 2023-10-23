import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { fetchCameraData } from '../../redux/Slices/cameraSlice';
import './CamerasPage.css';
import CameraTable from './CameraTable';

export default function CameraPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const camera = useSelector((state) => state.camera);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;
  const maxButtonsToShow = 10; // Максимальное количество видимых кнопок на пагинации
  const totalPages = Math.ceil(camera.length / itemsPerPage);

  useEffect(() => {
    if (!camera.length) {
      dispatch(fetchCameraData());
    }
  }, []);

  const clinkHandler = (id) => {
    navigate(`${id}`);
  };

  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  // Определение currentCameras
  const currentCameras = camera.slice(indexOfFirstCamera, indexOfLastCamera);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!camera.length) {
    return <div>Loading...</div>;
  }

  const renderPaginationButtons = () => {
    const buttons = [];

    // Добавляем кнопку для первой страницы
    buttons.push(
      <Button
        key="page-1"
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </Button>,
    );

    if (totalPages <= maxButtonsToShow) {
      for (let i = 2; i <= totalPages - 1; i += 1) {
        buttons.push(
          <Button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </Button>,
        );
      }
    } else {
      // Разбиваем на две группы: видимые кнопки и скрытые кнопки
      const visibleButtons = [];
      const hiddenButtons = [];

      // Определяем граничные значения для видимых кнопок
      let start = currentPage - Math.floor(maxButtonsToShow / 2);
      let end = currentPage + Math.floor(maxButtonsToShow / 2);

      // Проверяем граничные значения и корректируем их, чтобы они не выходили за пределы
      if (start < 1) {
        start = 1;
        end = maxButtonsToShow;
      }
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxButtonsToShow + 1;
      }

      for (let i = 2; i <= totalPages - 1; i += 1) {
        const button = (
          <Button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </Button>
        );

        if (i >= start && i <= end) {
          visibleButtons.push(button);
        } else {
          hiddenButtons.push(button);
        }
      }

      if (start > 2) {
        hiddenButtons.unshift(
          <Button key="start-ellipsis" disabled>
            ...
          </Button>,
        );
      }

      if (end < totalPages - 1) {
        hiddenButtons.push(
          <Button key="end-ellipsis" disabled>
            ...
          </Button>,
        );
      }

      buttons.push(...visibleButtons);

      if (hiddenButtons.length > 0) {
        buttons.push(
          <Button key="hidden-buttons" disabled>
            ...
          </Button>,
        );
      }
    }

    buttons.push(
      <Button
        key={`page-${totalPages}`}
        onClick={() => handlePageChange(totalPages)}
        className={totalPages === currentPage ? 'active' : ''}
      >
        {totalPages}
      </Button>,
    );

    return buttons;
  };
  return (
    <div style={{ textAlign: 'center', marginLeft: '40px', marginTop: '20px' }}>
      {Array.isArray(currentCameras) && currentCameras.length > 0 ? (
        <CameraTable currentCameras={currentCameras} clinkHandler={clinkHandler} />
      ) : (
        <div>No cameras to display.</div>
      )}

      <div className="pagination">
        <Button onClick={handlePreviousPage}>Предыдущая</Button>
        {renderPaginationButtons()}
        <Button onClick={handleNextPage}>Следующая</Button>
      </div>
    </div>
  );
}
