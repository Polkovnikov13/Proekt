import React, { useState } from 'react';
import { Button, Input, Table } from 'reactstrap';
import MonitorModal from '../MonitorModal/MonitorModal';

export default function MyHeader() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Table
      bordered
    >
      <tbody>
        <tr>
          <th rowSpan="2" style={{ verticalAlign: 'bottom', alignContent: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              Группа объектов
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px', marginLeft: '2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                style={{
                  color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
                }}
                onClick={toggle}
              >
                🔍
              </Button>
            </div>
          </th>

          <th rowSpan="2" style={{ verticalAlign: 'bottom', alignContent: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              Всего
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>

          </th>

          <th colSpan="3">Построенные ОКС</th>
          <th colSpan="3">Строящиеся ОКС</th>
        </tr>
        <tr>
          <th>
            <div style={{ textAlign: 'left' }}>
              Факт
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>

          </th>
          <th>
            <div style={{ textAlign: 'left' }}>
              План
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>
          </th>
          <th>
            <div style={{ textAlign: 'left' }}>
              Риски
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>
          </th>
          <th>
            <div style={{ textAlign: 'left' }}>
              Факт
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>
          </th>

          <th>
            <div style={{ textAlign: 'left' }}>
              План
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>
          </th>
          <th>
            <div style={{ textAlign: 'left' }}>
              Риски
              <Button style={{
                color: 'black', backgroundColor: 'rgb(211,211,211)', borderColor: 'white', float: 'right', padding: '0px 2px 2px 2px',
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                  <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Button>
            </div>
          </th>
        </tr>
      </tbody>
      <MonitorModal modal={modal} toggle={toggle} />
    </Table>

  );
}
