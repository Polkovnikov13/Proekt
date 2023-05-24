import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Doughnut } from 'react-chartjs-2';
import { Alert, Badge } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend);
const rub = 'трл ₽';
export const data = {
  labels: ['Федеральный бюджет', 'Региональный бюджет', 'Инвестирование', 'Софинансирование'],
  labels2: ['1 2', '3 4'],
  datasets: [
    {
      label: 'Фраза при наведении2',
      data: [3.15, 2.03, 1.55, 1.89],
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
      data: [3.15, 2.03, 1.55, 1.89],
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
    ctx.fillText('15%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  },
};

export default function MyGraficsDown() {
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
        fontWeight: '900', fontSize: '22px',
      }}
      >
        Финансирование
        &nbsp;
        &nbsp;
        <Badge
          color="lightgrey"
          size="sm"
          style={{ border: '1px solid grey', color: 'grey', borderRadius: '15px' }}
        >
          9,42 трл ₽
        </Badge>

      </div>

      <div style={{
        width: '95%',
        flexGrow: 0,
        height: '88%', // Добавляем высоту для дочернего div
      }}
      >
        <div style={{ height: '80%' }}>
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
                  align: 'end',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    fontColor: '#333',
                    fontStyle: 'bold',
                    padding: 10,
                    fontFamily: "'Open Sans', sans-serif",
                    align: 'start',
                    display: 'flex',
                    flexDirection: 'column',
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
