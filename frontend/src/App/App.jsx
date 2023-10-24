import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import './App.css';
import { fetchExampleData } from '../redux/Slices/ExampleSlice';
import FirstApp from './FirstApp';
import ProtectedRoute from '../HOCs/ProtectedRoute';
import AuthPage from '../components/AuthPage/AuthPage';
// import { checkAuth } from '../redux/actions/userActions';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import CameraPage from '../components/CamerasPage/CamerasPage';
import VideoPage from '../components/CamerasPage/VideoPage';
import SaveLog from '../components/CameraLoger/SaveLog';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const camera = useSelector((state) => state.camera);

  useEffect(() => {
    // dispatch(checkAuth());
    dispatch(fetchExampleData());
  }, []);

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
      {/* {user.id && ( */}
      {/* <MyNavbar changeHandler={changeHandler} input={input} setInput={setInput} /> */}
      {/* )} */}
      <Routes>
        <Route element={<ProtectedRoute redirect="/" isAllowed={!user.id} />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>
        {/* <Route element={<ProtectedRoute redirect="/login" isAllowed={!!user.id} />}> */}
        <Route
          path="/"
          element={(
            <FirstApp
              grafHalf={grafHalf}
              setHalf={setHalf}
              half={half}
              str={str}
              str2={str2}
              input={input}
              setGrafHalf={setGrafHalf}
            />
)}
        />
        {/* {user.id && ( */}
        <>
          <Route path="/saveLog" element={<SaveLog />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/camera/:id" element={<VideoPage />} />
        </>
        {/* )} */}
        {/* </Route> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
