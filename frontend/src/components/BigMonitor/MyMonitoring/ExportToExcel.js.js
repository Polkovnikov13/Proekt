import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'reactstrap';

export function ExportToExcel({ apiData, fileName }) {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    XLSX.utils.sheet_add_aoa(ws, [['Группа объектов', 'Всего', 'Построенные ОКС', '', '', 'Строящиеся ОКС', '', '']], { origin: 'A1' });

    XLSX.utils.sheet_add_aoa(ws, [['', '', 'Было', 'Стало', 'Факт', 'Было', 'Стало', 'Факт']], { origin: 'A2' });

    ws['!merges'] = [
      // merge A1-A2 into one cell
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      // merge B1-B2 into one cell
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
      // merge C1-E1 into one cell
      { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
      // merge F1-H1 into one cell
      { s: { r: 0, c: 5 }, e: { r: 0, c: 7 } },
    ];
    ws['!cols'] = [{ width: 25 }, { width: 20 }, { width: 10 }, {}, {}, {}, {}, {}];
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
