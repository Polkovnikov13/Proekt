import React from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyMonitoring from '../MyMonitoring/MyMonitoring';
import MyGrafics from '../MyGrafics/MyGrafics';
// import './App.css';

function App() {
  return (
    <>
      <MyNavbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: 'center',
        flexWrap: 'wrap',
        height: '900px',
      }}
      >
        <div
          className="div-list-container"
          style={{
            width: '25%', height: '50%', alignItems: 'center',
          }}
        >
          <MyGrafics />
        </div>
        <div className="div-list-container" style={{ width: '25%', height: '50%' }}>
          {' '}
          <MyGrafics />
        </div>
        <div className="div-list-container" style={{ width: '75%', height: '50%' }}><MyMonitoring /></div>
        <div
          className="div-list-container"
          style={{
            width: '75%', height: '50%', backgroundColor: 'violet', textAlign: 'center',
          }}
        >
          Здесь будет карта(скорее всего yandex.map)
        </div>
      </div>
    </>
  );
}

export default App;
