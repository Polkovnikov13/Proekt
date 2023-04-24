import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart, Doughnut } from 'react-chartjs-2';
import { Button } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend);
const rub = 'трл ₽';
export const data = {
  datasets: [
    {
      label: 'Фраза при наведении и цифра',
      data: [3.15, 2.03, 1.55, 1.89],
      backgroundColor: [
        'rgba(128, 0, 128, 0.2)',
        'rgba(243,71,35,0.2)',
        'rgba(0, 255, 255, 0.2)',
        'rgba( 0, 100,0, 0.2)',
      ],
      borderColor: [
        'rgba(128, 0, 128, 0.2)',
        'rgba(243,71,35,0.2)',
        'rgba(0, 255, 255, 0.2)',
        'rgba( 0, 100,0, 0.2)',
      ],
      borderWidth: 2,
    },
  ],
  labels: [`Федеральный бюджет ${rub}`, `Региональный бюджет ${rub}`, `Инвестирование ${rub}`, `Софинансирование ${rub}`],

};
const textCenter = {
  id: 'text-center',
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;

    ctx.save();
    ctx.font = 'bolder 35px sans-serif';
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.justifyContent = 'center';
    // data.datasets[0].data[0] - обратиться к массиву значений
    ctx.fillText('10%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
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
      <div style={{ fontWeight: '900', fontSize: '22px' }}>
        Финансирование
        {' '}
        <Button
          color="light"
          size="sm"
        >
          9,42 трл ₽
        </Button>

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
            options={{ maintainAspectRatio: false }} // Отключаем сохранение пропорций для графика
            plugins={[textCenter]}
          />
        </div>
      </div>
    </div>
  );
}
