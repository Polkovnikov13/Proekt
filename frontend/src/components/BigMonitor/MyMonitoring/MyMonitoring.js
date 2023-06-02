import React, { useEffect, useState } from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import MyTable from '../MyTable/MyTable';
import MyHeader from '../MyHeader/MyHeader';
import { ExportToExcel } from './ExportToExcel.js';
import dataExc from './MyExcel';
import MyFilters from './MyFilters';

export default function MyMonitoring({
  half, setHalf, input, changeHandler,
}) {
  const [data, setData] = React.useState([]);
  const fileName = `Мониторинг Строительства : ${new Date().toLocaleDateString()}`; // here enter filename for your excel file
  // console.log(dataExc);
  useEffect(() => {
    const fetchData = () => {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((postData) => {
        // reshaping the array Массив!!!
        // console.log('!!!', postData);
        // const customHeadings = postData.data.map((item) => ({
        //   'Article Id': item.id,
        //   'Article Title': item.title,
        //   'Article body': item.body,
        // }));
        setData(dataExc);
      });
    };
    fetchData();
  }, []);

  const handlerHalf = () => {
    setHalf(!half);
  };
  // console.log(half);
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '20px',
      }}
      >
        <div style={{ fontWeight: '900', fontSize: '22px' }}>Мониторинг Строительства</div>

        <div style={{ }}>
          <ExportToExcel apiData={data} fileName={fileName} />
          {' '}
          {' '}
          {' '}
          <Button
            color="primary"
            outline
            onClick={handlerHalf}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
            </svg>
          </Button>
        </div>
      </div>

      <div style={{
        padding: '20px', marginTop: '-14px',
      }}
      >
        <MyFilters input={input} changeHandler={changeHandler} />
        <MyHeader />
      </div>
      <div style={{
        padding: '1px 20px', marginTop: '-14px',
      }}
      >
        <MyTable />
      </div>
    </>
  );
}
