import React from 'react';
import Plot from 'react-plotly.js';

const EllipsePlot = () => {
    // Define the ellipse parameters
    const a = 5;  // semi-major axis
    const b = 3;  // semi-minor axis
    const t = Array.from({ length: 100 }, (_, i) => (i / 100) * 2 * Math.PI); // Parameter t

    // Parametric equations for the ellipse
    const x = t.map(tValue => a * Math.cos(tValue));
    const y = t.map(tValue => b * Math.sin(tValue));

    const data = [
        {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            name: 'Ellipse',
            line: {
                color: 'blue',
                width: 2,
            },
        }
    ];

    const layout = {
        title: 'Ellipse Plot',
        xaxis: {
            title: 'X Axis',
            range: [-a - 1, a + 1],
        },
        yaxis: {
            title: 'Y Axis',
            range: [-b - 1, b + 1],
        },
        height: 400,
        width: 400,
    };

    return (
        <div>
            <Plot
                data={data}
                layout={layout}
                style={{ height: '400px', width: '400px' }}
            />
        </div>
    );
};

export default EllipsePlot;
