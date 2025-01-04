import React from 'react';
import Plot from 'react-plotly.js';

const SpiderGraph = () => {
  const data = [
    {
      type: 'scatterpolar',
      r: [3, 4, 5, 4, 3],  // Data points for each axis
      theta: ['Math', 'Science', 'English', 'History', 'Art'], // Axis labels
      fill: 'toself',
      name: 'Student A'
    },
    {
      type: 'scatterpolar',
      r: [4, 3, 2, 5, 4],
      theta: ['Math', 'Science', 'English', 'History', 'Art'],
      fill: 'toself',
      name: 'Student B'
    }
  ];

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 5]
      }
    },
    title: 'Spider Graph Example',
    width: 500,  // Set width for the graph
    height: 200, // Set height for the graph
    margin: { t: 20, r: 20, b: 20, l: 20 } // Add margin to prevent clipping
  };

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Plot
        data={data}
        layout={layout}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default SpiderGraph;
