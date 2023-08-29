import React from 'react';
import { Button } from 'reactstrap';
import './SecondApp.css';
import MyMonitoring from '../components/BigMonitor/MyMonitoring/MyMonitoring';
import MyMap from '../components/MyMap/MyMap';
import BackToMap from '../components/MyMap/BackToMap';
import './App.css';

export default function SecondApp({
  input, half, setGrafHalf, setHalf, str2,
}) {
  return (
    <div className="second-app-first">
      <div className="second-app-second">
        <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => setGrafHalf(false)}>
          {str2}
        </Button>
      </div>
      {half === false ? (
        <>
          <div
            className="second-app-zero"
          >
            <div className="my-section" style={{ height: '97.5%' }}>
              <MyMonitoring half={half} setHalf={setHalf} input={input} />
            </div>
          </div>
          <div
            className="second-app-third"
          >
            <div className="second-app-four">
              <Button
                size="sm"
                style={{
                  backgroundColor: 'transparent', color: 'black', border: 'none',
                }}
                onClick={() => {
                  setHalf(!half);
                }}
              >
                V
              </Button>
            </div>
            <div style={{ height: '93.5%' }}>
              <MyMap />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="second-app-fifth"
          >
            <div className="my-section" style={{ height: '92.8%' }}>
              <MyMonitoring half={half} setHalf={setHalf} input={input} />
            </div>
          </div>
          <div
            className="second-app-six"
          >
            <BackToMap half={half} setHalf={setHalf} />
          </div>
        </>
      )}
    </div>
  );
}
