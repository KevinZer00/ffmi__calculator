//import React and hooks
import React, { useEffect, useRef } from 'react';
//import Chart.js components
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip } from 'chart.js';
//register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip);

//main React component for the bell curve chart
const BellCurveChartMen = ({ adjustedFFMI }) => {
//ref for the chart element
  const chartRef = useRef(null);

//useEffect hook to run code after component mounts
  useEffect(() => {
//function to generate bell curve data
    const generateBellCurveData = (mean, standardDeviation) => {
      const data = [];
      const step = 0.1;

      for (let x = mean - 3 * standardDeviation; x <= mean + 3 * standardDeviation; x += step) {
        const y = (1 / (Math.sqrt(2 * Math.PI) * standardDeviation)) * Math.exp(-0.5 * Math.pow((x - mean) / standardDeviation, 2));
        data.push({ x, y });
      }

      return data;
    };

    const destroyChart = () => {
      const chart = Chart.getChart(chartRef.current);
      if (chart) {
        chart.destroy();
      }
    };

    const initializeChart = () => {
      destroyChart(); //destroy existing chart instance

      const ctx = chartRef.current.getContext('2d');

      const mean = 19; 
      const standardDeviation = 2.5

      const bellCurveData = generateBellCurveData(mean, standardDeviation);

      const adjustedDataIndex = bellCurveData.findIndex((data) => data.x >= adjustedFFMI); //find the index of the data point with x >= adjustedFFMI

      const chartConfig = {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Bell Curve',
              data: bellCurveData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              fill: true,
              tension: 0,
              pointRadius: 0,
            },
            {
              label: 'Adjusted FFMI',
              data: [{ x: adjustedFFMI, y: bellCurveData[adjustedDataIndex]?.y || 0 }],
              backgroundColor: 'rgba(54, 162, 235, 1)', 
              borderColor: 'rgba(54, 162, 235, 1)', 
              borderWidth: 2,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)', 
              pointBorderColor: 'rgba(54, 162, 235, 1)', 
              pointRadius: 10,
              pointHoverRadius: 15, 
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'FFMI',
              },
              min: mean - 3 * standardDeviation, //adjust the min value based on the data range
              max: mean + 3 * standardDeviation, //adjust the max value based on the data range
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Probability Density',
              },
              min: 0, //adjust the min value based on the data range
            },
          },
          plugins: {
            tooltip: {
                callbacks: {
                  label: (context) => `Adjusted FFMI: ${context.parsed.x.toFixed(2)}`,
                },
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    };

    initializeChart();
  }, [adjustedFFMI]);

  return (
    <div className="bellCurve">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BellCurveChartMen;
