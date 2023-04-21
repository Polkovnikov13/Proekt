import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['Строится', 'Построено'],
  datasets: [
    {
      label: 'Фраза при наведении и цифра',
      data: [1697, 2966],
      backgroundColor: [
        'rgba(128, 0, 128, 0.2)',
        'rgba(0, 255, 255, 0.2)',
      ],
      borderColor: [
        'rgba(128, 0, 128, 0.2)',
        'rgba(0, 255, 255, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function MyGrafics() {
  return (
    <>
      <div style={{ fontWeight: '700' }}>Объекты</div>
      <Doughnut data={data} />
    </>
  );
}
