import React from 'react';
import Plot from 'react-plotly.js';

const Bandplot = () => {
    // Sample data
    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const y = [2, 3, 4, 5, 6, 5, 7, 6, 8, 9];
    const yUpper = [3, 4, 5, 6, 7, 6, 8, 7, 9, 10]; // Upper bound
    const yLower = [1, 2, 3, 4, 5, 4, 6, 5, 7, 8]; // Lower bound

    const data = [
        {
            x: x,
            y: yUpper,
            fill: 'tonexty', // Fill the area between the curves
            fillcolor: 'rgba(0, 100, 80, 0.2)', // Color of the band
            type: 'scatter',
            mode: 'lines',
            name: 'Upper Bound'
        },
        {
            x: x,
            y: yLower,
            fill: 'tonexty', // Fill the area between the curves
            fillcolor: 'rgba(0, 100, 80, 0.2)', // Color of the band
            type: 'scatter',
            mode: 'lines',
            name: 'Lower Bound'
        },
        {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            name: 'Main Data'
        }
    ];

    const layout = {
        title: 'Band Plot Example',
        xaxis: {
            title: 'X Axis'
        },
        yaxis: {
            title: 'Y Axis'
        },
        height:300,
        width:500,
    };

    return (
        <div>
            <Plot
                data={data}
                layout={layout}
                style={{height:'300px',width:'500px'}}
            />
        </div>
    );
}

export default Bandplot;
