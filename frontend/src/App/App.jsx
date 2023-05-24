import React, { useState } from 'react';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyMonitoring from '../components/BigMonitor/MyMonitoring/MyMonitoring';
import MyGraficsUp from '../components/Grafics/MyGraficsUp/MyGraficsUp';
import MyGraficsDown from '../components/Grafics/MyGraficsDown/MyGraficsDown';
import MyMap from '../components/MyMap/MyMap';
import BackToMap from '../components/MyMap/BackToMap';
// import './App.css';

function App() {
  const [half, setHalf] = useState(false);
  return (
    <>
      <MyNavbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          height: '883px',
          backgroundColor: ' rgb(202, 202, 202)',
          paddingTop: '11px',
          paddingBottom: '11px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >

        <div
          className="div-list-container"
          style={{
            width: '25%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '15px',
            border: '6px solid  rgb(202, 202, 202)',
          }}
        >
          <MyGraficsUp />
          <MyGraficsDown />
        </div>
        {half === false ? (
          <>
            <div
              className="div-list-container"
              style={{
                width: '75%',
                height: '50%',
                backgroundColor: 'white',
                borderRadius: '15px',
                border: '6px solid  rgb(202, 202, 202)',
                overflowY: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              <MyMonitoring half={half} setHalf={setHalf} />
            </div>

            <div
              className="div-list-container"
              style={{
                width: '74.5%',
                height: '49.5%',
                backgroundColor: 'white',
                borderRadius: '15px',
                border: '6px solid white',
              }}
            >
              <MyMap />
            </div>
          </>
        ) : (
          <>
            <div
              className="div-list-container"
              style={{
                width: '75%',
                height: '95%',
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '15px',
                border: '6px solid  rgb(202, 202, 202)',
                overflowY: 'auto',
              }}
            >
              <MyMonitoring half={half} setHalf={setHalf} />
            </div>

            <div
              className="div-list-container"
              style={{
                width: '75%',
                height: '5%',
                backgroundColor: 'white',
                textAlign: 'center',
                border: '4px solid  rgb(202, 202, 202)',
                borderRadius: '15px',
              }}
            >
              <BackToMap half={half} setHalf={setHalf} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
