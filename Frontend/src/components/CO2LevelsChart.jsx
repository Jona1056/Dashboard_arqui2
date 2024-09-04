import  { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// eslint-disable-next-line react/prop-types
const CO2LevelsChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        // eslint-disable-next-line react/prop-types
        labels: data.map(item => {
          const date = new Date(`${item.Fecha}T${item.Hora}`);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }),
        datasets: [{
          label: 'Nivel de CO₂',
          // eslint-disable-next-line react/prop-types
          data: data.map(item => item.CO2),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(153, 102, 255, 1)',
          fill: true, // Fills the area under the line
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Niveles de CO₂',
            font: {
              size: 18,
              weight: 'bold',
              color: '#fff',
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Nivel de CO₂: ${context.raw} ppm`;
              },
              title: function(context) {
                return `Fecha: ${context[0].label}`;
              },
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14,
              weight: 'bold',
              color: '#fff',
            },
            bodyFont: {
              size: 12,
              color: '#fff',
            },
            padding: 10,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                color: '#fff',
              },
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            beginAtZero: true,
            ticks: {
              font: {
                size: 12,
                color: '#fff',
              },
              callback: function(value) {
                return `${value} ppm`;
              },
            },
          },
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        },
        backgroundColor: '#000',
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative', height: '60vh', width: '50vw' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CO2LevelsChart;
