import React from 'react';
import Plot from 'react-plotly.js';

const ParameterizedLine = () => {
  // Sample data representing two subgroups (e.g., "Male" and "Female")
  const data = [
    { sex: 'Male', intercept: 50, slope: 3.89 },
    { sex: 'Female', intercept: 45, slope: 2.5 },
  ];

  // Data points for scatter plot
  const heights = [150, 160, 170, 180, 190];
  const weightsMale = heights.map(h => 50 + 3.89 * h);
  const weightsFemale = heights.map(h => 45 + 2.5 * h);

  // Create parameterized lines for each group
  const traces = data.map(group => {
    const x = heights;
    const y = x.map(h => group.intercept + group.slope * h);
    
    return {
      x: x,
      y: y,
      mode: 'lines',
      type: 'scatter',
      name: group.sex,
      line: {
        width: 4, // Line width, could vary based on other parameters like severity
        color: group.sex === 'Male' ? 'blue' : 'pink', // Color based on group
      },
    };
  });

  // Scatter plot for the actual data points
  const scatterTrace = {
    x: heights,
    y: [...weightsMale, ...weightsFemale],
    mode: 'markers',
    type: 'scatter',
    name: 'Data points',
    marker: {
      color: 'black',
    },
  };

  // Combine all traces
  const allTraces = [...traces, scatterTrace];

  // Layout configuration
  const layout = {
    title: 'Parameterized Lines with Subgroup Comparison',
    xaxis: { title: 'Height (cm)' },
    yaxis: { title: 'Weight (kg)' },
    showlegend: true,
  };

  return (
    <div>
      <Plot
        data={allTraces}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ParameterizedLine;
