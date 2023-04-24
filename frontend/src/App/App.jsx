import React from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyMonitoring from '../MyMonitoring/MyMonitoring';
import MyGraficsUp from '../MyGraficsUp/MyGraficsUp';
import MyGraficsDown from '../MyGraficsDown/MyGraficsDown';
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
        backgroundColor: 'grey',
        paddingTop: '11px',
        paddingBottom: '11px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
      >
        <div
          className="div-list-container"
          style={{
            width: '25%', height: '50%', alignItems: 'center', backgroundColor: 'white', borderRadius: '15px',
          }}
        >
          <MyGraficsUp />
        </div>
        <div
          className="div-list-container"
          style={{
            width: '25%', height: '50%', backgroundColor: 'white', borderRadius: '15px',
          }}
        >
          <MyGraficsDown />
        </div>
        <div
          className="div-list-container"
          style={{
            width: '75%', height: '50%', backgroundColor: 'white', borderRadius: '15px',
          }}
        >
          <MyMonitoring />
        </div>
        <div
          className="div-list-container"
          style={{
            width: '75%', height: '50%', backgroundColor: 'green', textAlign: 'center', borderRadius: '15px',
          }}
        >
          Здесь будет карта(скорее всего yandex.map)
        </div>
      </div>
    </>
  );
}

export default App;
