/* eslint-disable no-param-reassign */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Doughnut } from 'react-chartjs-2';
import { Badge } from 'reactstrap';
import { useSelector } from 'react-redux';

export default function MyGraficsUp() {
  const exampl = useSelector((state) => state.example.array1);
  const res = [];
  if (exampl && exampl[0]) {
    res.push(
      `Построено: ${exampl[0]['2_Построено']}                                              `,
      `Строится : ${exampl[0]['2_Строится']}`,
    );
  }
  const arrFromBD = [985, 9850, 5000, 2500];
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: res,
    datasets: [
      {
        label: 'Фраза при наведении1',
        data: arrFromBD,
        backgroundColor: [
          'rgb(210, 162, 235)',
          'rgb(92%, 40%, 58%)',
          'rgb(6%, 85%, 16%)',
          'rgb(8%, 92%, 91%)',
        ],
        borderColor: [
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
        ],
        borderWidth: 2,
        cutout: '25%',
      },
      {
        label: 'Фраза при наведении2',
        data: arrFromBD,
        backgroundColor: [
          'rgb(166, 15, 242);',
          'rgb(73%, 5%, 28%)',
          'rgb(2%, 51%, 9%)',
          'rgb(1%, 56%, 55%)',
        ],
        borderColor: [
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
          'rgb(100%, 100%, 100%)',
        ],
        borderWidth: 2,
        cutout: '35%',
      },
    ],
  };

  const sliceThickness = {
    id: 'sliceThickness',
    beforeDraw(chart, plugins) {
      chart.getDatasetMeta(0).data[0].innerRadius = 100;
      chart.getDatasetMeta(0).data[0].outerRadius = 121;
      chart.getDatasetMeta(1).data[0].innerRadius = 40;
      chart.getDatasetMeta(1).data[0].outerRadius = 120;

      chart.getDatasetMeta(0).data[1].innerRadius = 90;
      chart.getDatasetMeta(0).data[1].outerRadius = 121;
      chart.getDatasetMeta(1).data[1].innerRadius = 40;
      chart.getDatasetMeta(1).data[1].outerRadius = 120;

      chart.getDatasetMeta(0).data[2].innerRadius = 80;
      chart.getDatasetMeta(0).data[2].outerRadius = 121;
      chart.getDatasetMeta(1).data[2].innerRadius = 40;
      chart.getDatasetMeta(1).data[2].outerRadius = 120;

      chart.getDatasetMeta(0).data[3].innerRadius = 70;
      chart.getDatasetMeta(0).data[3].outerRadius = 121;
      chart.getDatasetMeta(1).data[3].innerRadius = 40;
      chart.getDatasetMeta(1).data[3].outerRadius = 120;
    },
  };

  const textCenter = {
    id: 'text-center',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = 'bolder 27px sans-serif';
      ctx.fillStyle = 'blue';
      ctx.textAlign = 'center';

      ctx.textBaseline = 'middle';
      ctx.justifyContent = 'center';
      // data.datasets[0].data[0] - обратиться к массиву значений
      ctx.fillText('10%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    },
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      height: '100%', // Добавляем высоту для родительского div
    }}
    >
      <div style={{
        fontWeight: '900', fontSize: '22px', marginRight: '55px',
      }}
      >
&nbsp;
        Объекты
        &nbsp;
        <Badge
          color="lightgrey"
          size="sm"
          style={{
            border: '1px solid grey', color: 'grey', borderRadius: '15px',
          }}
        >
          {exampl && exampl[0]
            ? (exampl[0]['2_Запланировано']) : null }
          {'    '}
          шт

        </Badge>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      </div>

      <div style={{
        width: '95%',
        flexGrow: 0,
        height: '92%', // Добавляем высоту для дочернего div
      }}
      >
        <div style={{ height: '90%' }}>
          {' '}
          {/* Добавляем новый div для установки высоты графика */}
          <Doughnut
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  align: 'start',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    fontStyle: 'bold',
                    align: 'end',
                    padding: 15, // что переноса легенд на новою строчку
                    maxWidth: 100, // что переноса легенд на новою строчку
                  },
                },
              },
            }}
            plugins={[textCenter, sliceThickness]}
          />
        </div>

      </div>
    </div>

  );
}
