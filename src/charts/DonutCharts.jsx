import React from 'react';
import Plot from 'react-plotly.js';

const DonutCharts = () => {
  const data = [
    {
      values: [25, 30, 20, 25], // Data values
      labels: ['Category A', 'Category B', 'Category C', 'Category D'], // Labels
      type: 'pie',
      hole: 0.4, // Hole size for donut chart
      textinfo: 'label+percent', // Display labels and percentages
      hoverinfo: 'label+value+percent', // Hover information
      marker: {
        colors: ['#636EFA', '#EF553B', '#00CC96', '#AB63FA'], // Custom colors
      },
    },
  ];

  const layout = {
    title: 'Donut Chart Example',
    height: 200,
    width: 500,
  };

  return <Plot data={data} layout={layout} />;
};

export default DonutCharts;
