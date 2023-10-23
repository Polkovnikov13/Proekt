import React from 'react';
import { Button, Table } from 'reactstrap';

export default function CameraTable({ currentCameras, clinkHandler }) {
  return (
    <div>
      {' '}
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Айди Камеры</th>
            <th>Статус Камеры</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {currentCameras.map((el, index) => (
            <tr key={el.id}>
              <th scope="row">{index + 1}</th>
              <td>{el.id}</td>
              <td>{el.working_camera}</td>
              <td>
                <Button color="white" onClick={() => clinkHandler(el.id)}>
                  {el.link}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}
