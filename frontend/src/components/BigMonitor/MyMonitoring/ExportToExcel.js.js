import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'reactstrap';

export function ExportToExcel({ apiData, fileName }) {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    XLSX.utils.sheet_add_aoa(ws, [['Группа объектов', 'Всего', 'Построенные ОКС', 'Строящиеся ОКС']], { origin: 'A1' });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      color="primary"
      outline
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      📥 Экспорт в Excel
    </Button>
  );
}
