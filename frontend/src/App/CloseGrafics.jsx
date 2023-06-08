import React from 'react';
import { Button } from 'reactstrap';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyMonitoring from '../components/BigMonitor/MyMonitoring/MyMonitoring';
import MyMap from '../components/MyMap/MyMap';
import BackToMap from '../components/MyMap/BackToMap';

export default function CloseGrafics({
  input, half, setGrafHalf, setHalf, str2,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '883px',
        backgroundColor: 'rgb(202, 202, 202)',
        paddingTop: '11px',
        paddingBottom: '11px',
        paddingLeft: '1px',
        paddingRight: '1px',
      }}
    >
      <div style={{
        position: 'relative', top: '49.9%', left: '0.5%', transform: 'translateY(-50%)', width: '2.0%', height: '99%', margin: 'auto', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px 0 0 15px', textAlign: 'center', fontSize: '20px',
      }}
      >
        <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => setGrafHalf(false)}>
          {str2}
        </Button>
      </div>
      {half === false ? (
        <>
          <div
            className="div-list-container"
            style={{
              width: '92.8%',
              height: '50%',
              left: '-15px',
              backgroundColor: 'white',
              borderRadius: '15px',
              border: '6px solid rgb(202, 202, 202)',
              overflowX: 'auto',
              position: 'relative',
            }}
          >
            <MyMonitoring half={half} setHalf={setHalf} input={input} />
          </div>
          <div
            className="div-list-container"
            style={{
              position: 'relative',
              width: '92.5%',
              height: '49.5%',
              left: '-13px',
              backgroundColor: 'white',
              borderRadius: '15px',
              border: '6px solid white',
            }}
          >
            <div style={{
              borderRadius: '15px 15px 0 0', position: 'relative', width: '100.55%', top: '-0.5%', left: '-0.3%', backgroundColor: 'white', height: '6.5%', borderBottom: '5px solid rgb(202, 202, 202)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
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
            className="div-list-container"
            style={{
              width: '95%',
              height: '95%',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '15px',
              border: '6px solid rgb(202, 202, 202)',
              overflowX: 'auto',
            }}
          >
            <MyMonitoring half={half} setHalf={setHalf} input={input} />
          </div>
          <div
            className="div-list-container"
            style={{
              width: '95%',
              height: '5%',
              backgroundColor: 'white',
              textAlign: 'center',
              border: '4px solid rgb(202, 202, 202)',
              borderRadius: '15px',
            }}
          >
            <BackToMap half={half} setHalf={setHalf} />
          </div>
        </>
      )}
    </div>
  );
}
