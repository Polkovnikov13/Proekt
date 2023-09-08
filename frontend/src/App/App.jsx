import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyMonitoring from '../components/BigMonitor/MyMonitoring/MyMonitoring';
import MyGraficsUp from '../components/Grafics/MyGraficsUp/MyGraficsUp';
import MyGraficsDown from '../components/Grafics/MyGraficsDown/MyGraficsDown';
import MyMap from '../components/MyMap/MyMap';
import BackToMap from '../components/MyMap/BackToMap';
import MyCololors from '../components/Grafics/MyCololors';
import './App.css';
import { fetchExampleData } from '../redux/Slices/ExampleSlice';
import SecondApp from './SecondApp';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExampleData());
  }, [dispatch]);
  const str = '<';
  const str2 = '>';
  const [half, setHalf] = useState(false);
  const [grafHalf, setGrafHalf] = useState(false);
  const [input, setInput] = useState({
    money: '1', region: 'Российская Федерация', role: '1', finance: '1',
  });
  // eslint-disable-next-line max-len
  const changeHandler = useCallback((e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);
  return (
    <>
      <MyNavbar changeHandler={changeHandler} input={input} setInput={setInput} />
      {grafHalf === false
        ? (
          <div
            className="div-Grafics"
          >
            <div
              className="div-grafics-first"
            >
              <MyGraficsUp />
              <MyGraficsDown />
              <MyCololors />
              <div className="div-left-to-grafics">
                <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => setGrafHalf(true)}>
                  {str}
                </Button>
              </div>
            </div>

            {half === false ? (
              <>
                <div
                  className="div-list-containerMonitor-first"
                >
                  <div className="my-section" style={{ height: '97.5%' }}>
                    <MyMonitoring half={half} setHalf={setHalf} input={input} style={{ paddingTop: '374px' }} />
                  </div>
                </div>
                <div
                  className="div-main-map"
                >
                  <div className="div-upper-map">
                    <Button
                      size="sm"
                      style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }}
                      onClick={() => { setHalf(!half); }}
                    >
                      V
                    </Button>
                  </div>
                  <div style={{ height: '95.6%' }}>
                    <MyMap />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="div-list-containerMonitor-second"
                >
                  <div className="my-section" style={{ height: '92.8%' }}>
                    <MyMonitoring half={half} setHalf={setHalf} input={input} />
                  </div>
                </div>
                <div
                  className="div-back-to-map"
                >
                  <BackToMap half={half} setHalf={setHalf} />
                </div>
              </>
            )}
          </div>
        )
        : (
          <SecondApp
            input={input}
            half={half}
            setGrafHalf={setGrafHalf}
            setHalf={setHalf}
            str2={str2}
          />
        )}
    </>
  );
}

export default App;
