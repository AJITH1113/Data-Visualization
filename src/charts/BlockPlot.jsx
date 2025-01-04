import React from 'react';
import Plot from 'react-plotly.js';

const BlockPlot = () => {
    // Example data for a block plot
    const x = ['A', 'B', 'C', 'D', 'E']; // Categories
    const y = [4, 7, 3, 5, 6]; // Block heights

    const data = [
        {
            x: x,
            y: y,
            type: 'bar', // Bar chart type for block plot
            marker: {
                color: 'rgb(0, 128, 255)', // Color for the blocks
            },
        },
    ];

    const layout = {
        title: 'Block Plot Example',
        xaxis: {
            title: 'Categories',
        },
        yaxis: {
            title: 'Values',
        },
        barmode: 'stack', // If you want to stack the blocks on top of each other
        height: 400,
        width: 500,
    };

    return (
        <div>
            <Plot
                data={data}
                layout={layout}
                style={{ height: '400px', width: '500px' }}
            />
        </div>
    );
};

export default BlockPlot;
