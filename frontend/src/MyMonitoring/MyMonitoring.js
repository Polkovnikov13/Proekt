import React from 'react';
import { Button } from 'reactstrap';
import MyTable from '../MyTable/MyTable';

export default function MyMonitoring() {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px',
      }}
      >
        <div style={{ fontWeight: '900', fontSize: '22px' }}>Мониторинг Строительства</div>
        <div style={{ }}>
          <Button
            color="primary"
            outline
          >
            📥 Экспорт в Excel
          </Button>
          {' '}
          {' '}
          {' '}
          <Button
            color="primary"
            outline
          >
            🖥
          </Button>
        </div>
      </div>
      <MyTable />
    </>
  );
}
