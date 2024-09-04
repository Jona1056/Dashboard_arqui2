import { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

// eslint-disable-next-line react/prop-types
const TemperatureChart = ({ data }) => {
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
          label: 'Temperatura',
          // eslint-disable-next-line react/prop-types
          data: data.map(item => item.Temperatura),
          borderColor: 'RED',
          backgroundColor: 'rgb(221, 95, 68 )',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Temperatura',
            font: {
              size: 18,
              weight: 'bold',
              color: '#fff', // White text for the title
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Temperatura: ${context.raw}°C`;
              },
              title: function(context) {
                return `Fecha: ${context[0].label}`;
              },
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14,
              weight: 'bold',
              color: '#fff', // White text for the tooltip title
            },
            bodyFont: {
              size: 12,
              color: '#fff', // White text for the tooltip body
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
                color: '#fff', // White text for x-axis labels
              },
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Light grid lines for visibility
            },
            beginAtZero: true,
            ticks: {
              font: {
                size: 12,
                color: '#fff', // White text for y-axis labels
              },
              callback: function(value) {
                return `${value}°C`;
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
        elements: {
          line: {
            tension: 0.4, // Smooth lines
          },
        },
        backgroundColor: '#000', // Black background for the chart area
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

export default TemperatureChart;