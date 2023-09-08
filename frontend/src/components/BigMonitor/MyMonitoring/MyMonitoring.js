/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
  Spinner,
} from 'reactstrap';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import MyTable from '../MyTable/MyTable';
import MyHeader from '../MyHeader/MyHeader';
import { ExportToExcel } from './ExportToExcel.js';
import MyFilters from './MyFilters';

export default function MyMonitoring({
  half, setHalf, input, changeHandler,
}) {
  const exampl = useSelector((state) => state.example.array1);
  const mapiName = useSelector((state) => state.mapSlice);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileName = `Мониторинг Строительства : ${new Date().toLocaleDateString()}`; // here enter the filename for your excel file
  const filteredArr = exampl.filter((obj) => obj.NAME === mapiName);
  filteredArr.sort((a, b) => a['ID Категории'] - b['ID Категории']);
  useEffect(() => {
    if (exampl && exampl.length > 0) {
      const updatedDataExc = [];
      const categoryMap = new Map();
      filteredArr.forEach((item, index) => {
        const categoryName = item['Наименование Категории'];
        let subcategoryName = item['Наименование ПодКатегории'];
        if (!subcategoryName) {
          subcategoryName = categoryName;
        }
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, new Map());
        }
        const subcategoryMap = categoryMap.get(categoryName);

        if (!subcategoryMap.has(subcategoryName)) {
          subcategoryMap.set(subcategoryName, {
            Subcategory: subcategoryName,
            Всего: 0,
            'Построенные ОКС1': 0,
            'Построенные ОКС2': 0,
            'Построенные ОКС3': 0,
            'Строящиеся ОКС1': 0,
            'Строящиеся ОКС2': 0,
            'Строящиеся ОКС3': 0,
          });
        }

        const subcategoryData = subcategoryMap.get(subcategoryName);
        subcategoryData['Всего'] += +item['1_Всего'];
        subcategoryData['Построенные ОКС1'] += +item['1_Построено'] || 0;
        subcategoryData['Строящиеся ОКС1'] += +item['1_Строительство'] || 0;

        // Check if it's the first item in the array or if the category has changed
        if (index === 0 || item['Наименование Категории'] !== filteredArr[index - 1]['Наименование Категории']) {
          updatedDataExc.push({}); // Add an empty object as a separator
        }

        updatedDataExc.push(subcategoryData);
      });

      console.log(updatedDataExc);

      // Now, updatedDataExc should contain separators only when a new category is encountered

      setData(updatedDataExc);
      setIsLoading(false);
    }
  }, [exampl, mapiName]);

  const handlerHalf = () => {
    setHalf(!half);
  };
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
          {exampl && exampl.length > 0 && (
          <ExportToExcel apiData={data} fileName={fileName} />
          )}
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
      <div style={{ padding: '1px 20px', marginTop: '-14px' }}>
        {isLoading ? (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', marginTop: '-70px',
          }}
          >
            <Spinner color="primary" style={{ height: '100px', width: '100px' }} />
            {' '}
            Загрузка...
          </div>
        ) : (
          <MyTable style={{ backdrop: 'blur(20px)' }} />
        )}
      </div>
    </>
  );
}
