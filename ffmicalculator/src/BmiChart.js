import React, { useEffect, useRef } from 'react';
import { Chart, Title, Tooltip, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
Chart.register(Title, Tooltip, CategoryScale, LinearScale, BarController, BarElement);

const BmiBarChart = ({ bmiValue }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const destroyChart = () => {
      const chart = Chart.getChart(chartRef.current);
      if (chart) {
        chart.destroy();
      }
    };

    const initializeChart = () => {
      destroyChart(); // Destroy existing chart instance

      const ctx = chartRef.current.getContext('2d');

      const bmiCategories = [
        { label: 'Underweight', min: 0, max: 18.5, color: 'rgba(106,183,242,1' },
        { label: 'Normal Weight', min: 18.5, max: 24.9, color: 'rgba(106,183,242,1' },
        { label: 'Overweight', min: 25, max: 29.9, color: 'rgba(106,183,242,1' },
        { label: 'Obese', min: 30, max: 100, color: 'rgba(106,183,242,1' },
      ];

      const bmiCategory = bmiCategories.find(
        (category) => bmiValue >= category.min && bmiValue <= category.max
      );

      const totalPopulation = 100; // Total population percentage

      const chartConfig = {
        type: 'bar',
        data: {
          labels: bmiCategories.map((category) => category.label),
          datasets: [
            {
              data: [
                7.2,   // Percentage for "Underweight"
                33,    // Percentage for "Normal Weight"
                35,    // Percentage for "Overweight"
                24.8,  // Percentage for "Obese"
              ],
              backgroundColor: bmiCategories.map((category) =>
                category.label === bmiCategory.label ? '#2196F3' : category.color
              ),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            x: {
              title: {
                display: true,
                text: 'BMI Category',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Percentage of Population',
              },
              min: 0,
              max: totalPopulation,
              ticks: {
                stepSize: 10, // Adjust step size as needed
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const category = bmiCategories[context.dataIndex];
                  return `${category.label}: ${category.label === bmiCategory.label ? category.max : category.min}-${category.max}`;
                },
              },
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    };

    initializeChart();
  }, [bmiValue]);

  return (
    <div className="bmiBarChart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BmiBarChart;
