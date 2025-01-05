import React from "react";
import Plot from "react-plotly.js";

const TumorSizeGraph = () => {
  return (
    <Plot
      data={[
        {
          x: [
            "Screening",
            "Week 6",
            "Week 12",
            "Week 18",
            "Week 24",
            "Week 30",
            "Week 36",
          ],
          y: [17, 15, 12, 9, 6, 3, 1], // Bar data for lesion diameter
          type: "bar",
          name: "Lesion Diameter",
          marker: { color: "rgba(54, 162, 235, 0.5)" },
        },
        {
          x: [
            "Screening",
            "Week 6",
            "Week 12",
            "Week 18",
            "Week 24",
            "Week 30",
            "Week 36",
          ],
          y: [17, 13, 10, 8, 5, 2, 0], // Line data for tumor size trend
          type: "scatter",
          mode: "lines+markers",
          name: "Tumor Size Trend",
          line: { color: "rgba(255, 99, 132, 1)", width: 2 },
          marker: { color: "rgba(255, 99, 132, 1)", size: 6 },
        },
      ]}
      layout={{
        title: "Bar Graph for Tumor Size",
        xaxis: { title: "Time" },
        yaxis: { title: "Lesion Diameter (mm)" },
        barmode: "group",
        height: "300px",
        width: "500px",
      }}
      style={{ width: "100%", height: "300px" }}
    />
  );
};

export default TumorSizeGraph;
