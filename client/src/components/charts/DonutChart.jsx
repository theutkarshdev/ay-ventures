import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 41, 17],
    options: {
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
      chart: {
        type: "donut",
        offsetX: 0,
        offsetY: -10,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "50%",
            labels: {
              show: false,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
    },
  });

  return (
    <div className="w-full">
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
};

export default DonutChart;
