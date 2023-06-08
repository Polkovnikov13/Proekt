/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import { Button } from 'reactstrap';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyMonitoring from '../components/BigMonitor/MyMonitoring/MyMonitoring';
import MyGraficsUp from '../components/Grafics/MyGraficsUp/MyGraficsUp';
import MyGraficsDown from '../components/Grafics/MyGraficsDown/MyGraficsDown';
import MyMap from '../components/MyMap/MyMap';
import BackToMap from '../components/MyMap/BackToMap';
import MyClolors from '../components/Grafics/MyClolors';
import './App.css';
import CloseGrafics from './CloseGrafics';

function App() {
  const str = '<';
  const str2 = '>';
  const [half, setHalf] = useState(false);
  const [grafHalf, setGrafHalf] = useState(false);
  const [input, setInput] = useState({
    money: '1', region: '1', role: '1', finance: '1',
  });
  // eslint-disable-next-line max-len
  const changeHandler = useCallback((e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);

  return (
    <>
      <MyNavbar changeHandler={changeHandler} input={input} setInput={setInput} />
      {grafHalf === false
        ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
              height: '880px',
              backgroundColor: 'rgb(202, 202, 202)',
              paddingTop: '11px',
              paddingBottom: '11px',
              paddingLeft: '1px',
              paddingRight: '1px',
            }}
          >

            <div
              className="div-list-container"
              style={{
                width: '23%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: '15px 15px 0 15px', border: '6px solid rgb(202, 202, 202)', borderLeft: '8px', position: 'relative',
              }}
            >
              <MyGraficsUp />
              <MyGraficsDown />
              <MyClolors />

              <div style={{
                position: 'absolute', top: '50%', right: '-2.2%', transform: 'translateY(-50%)', width: '9%', borderLeft: '5px solid rgb(202, 202, 202)', height: '100%', margin: 'auto', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 15px 15px 0', textAlign: 'center', fontSize: '20px',
              }}
              >
                <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => setGrafHalf(true)}>
                  {str}
                </Button>
              </div>
            </div>

            {half === false ? (
              <>
                <div
                  className="div-list-containerMonitor"
                  style={{
                    width: '75%',
                    height: '50%',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    border: '6px solid rgb(202, 202, 202)',
                    // position: 'relative',
                  }}
                >
                  <div className="my-section" style={{ height: '92.8%' }}>
                    <MyMonitoring half={half} setHalf={setHalf} input={input} style={{ paddingTop: '374px' }} />
                  </div>
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
                  <div style={{
                    borderRadius: '15px 15px 0 0', position: 'relative', width: '101%', top: '-0.5%', left: '-0.49%', backgroundColor: 'white', height: '5.5%', borderBottom: '5px solid rgb(202, 202, 202)', display: 'flex', justifyContent: 'center', alignItems: 'center',
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
                  <div style={{ height: '95.8%' }}>
                    <MyMap />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="div-list-containerMonitor"
                  style={{
                    width: '75%',
                    height: '95%',
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    border: '6px solid rgb(202, 202, 202)',
                    overflowX: 'auto',
                  }}
                >
                  <div className="my-section" style={{ height: '92.8%' }}>
                    <MyMonitoring half={half} setHalf={setHalf} input={input} />
                  </div>
                </div>
                <div
                  className="div-list-container"
                  style={{
                    width: '75%',
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
        )
        : <CloseGrafics input={input} half={half} setGrafHalf={setGrafHalf} setHalf={setHalf} str2={str2} />}
    </>
  );
}

export default App;
