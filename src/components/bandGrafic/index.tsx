import { useContext, useEffect, useState } from 'react';
import { Chart, BarController, registerables, CategoryScale } from 'chart.js';
import { SocketContext } from '../../context';
import { type Band } from '../../models/band';

Chart.register(CategoryScale, BarController, ...registerables);
const labels = ['enero', 'febrero', 'marzo'];

const data = {
  labels,
  datasets: [
    {
      label: 'My First Dataset',
      axis: 'y',
      data: [65, 59, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: 'bar',
  options: {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // scales: {
    //   xAxes: [{ stacked: true }],
    // },
    indexAxis: 'y',
  },
  // options: {
  //
  // },
};

export const BandGrafic = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on('current-bands', bands => {
      setBands(bands);
    });
    return () => {
        console.log('object22');
      socket.off('current-bands');
    };
  }, [socket]);

  useEffect(() => {
    const ctx = document.getElementById('myChart');
    if (!ctx) return; 
    const myChart = new Chart(ctx, {
      ...config,
      data: {
        ...data,
        labels: bands.map(band => band.name),
        datasets: [
          {
            ...data.datasets[0],
            data: bands.map(band => band.votes),
          },
        ],
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [bands]);

  return <canvas id='myChart' />;
};
