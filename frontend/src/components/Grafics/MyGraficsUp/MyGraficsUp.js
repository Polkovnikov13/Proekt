import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Doughnut } from 'react-chartjs-2';
import { Badge } from 'reactstrap';

const arrFromBD = [985, 9850, 5000, 2500];
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: [`Построено: ${arrFromBD[0]} `, `Строится :${arrFromBD[1]} `],
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

export default function MyGraficsUp() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      height: '100%', // Добавляем высоту для родительского div
    }}
    >
      <div style={{
        fontWeight: '900', fontSize: '22px', marginRight: '165px',
      }}
      >

        Объекты
        &nbsp;
        <Badge
          color="lightgrey"
          size="sm"
          style={{
            border: '1px solid grey', color: 'grey', borderRadius: '15px',
          }}
        >
          9,850 шт
        </Badge>

      </div>

      <div style={{
        width: '95%',
        flexGrow: 0,
        height: '88%', // Добавляем высоту для дочернего div
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
                  position: 'left',
                  align: 'start',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    fontColor: '#333',
                    fontStyle: 'bold',
                    // padding: 10,
                    fontFamily: "'Open Sans', sans-serif",
                    align: 'end',
                    display: 'flex',
                  },
                },
              },
            }}
            plugins={[textCenter]}
          />
        </div>

      </div>
    </div>

  );
}
