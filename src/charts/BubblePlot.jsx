import React from 'react';
import Plot from 'react-plotly.js';

const BubblePlot = () => {
    // Data for the bubble plot
    const x = [10, 20, 30, 40, 50];
    const y = [15, 25, 35, 45, 55];
    const size = [20, 40, 60, 80, 100];  // Bubble sizes
    const color = [1, 2, 3, 4, 5]; // Color values (optional)

    const data = [
        {
            x: x,
            y: y,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: size,  // Sizes of the bubbles
                color: color, // Color of the bubbles (optional)
                colorscale: 'Viridis', // Color scale for coloring
                showscale: true, // Show color scale
            },
            name: 'Bubble Data',
        }
    ];

    const layout = {
        title: 'Bubble Plot Example',
        xaxis: {
            title: 'X Axis',
        },
        yaxis: {
            title: 'Y Axis',
        },
        height: 400,
        width: 600,
    };

    return (
        <div>
            <Plot
                data={data}
                layout={layout}
                style={{ height: '400px', width: '600px' }}
            />
        </div>
    );
};

export default BubblePlot;
