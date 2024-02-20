import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Mails",
        data: data.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false, // Removing the top menu
        },
        offsetX: -10, // Set the horizontal offset to 0
        offsetY: 0, // Set the vertical offset to 0
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 4,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 13,
          bottom: 0,
          left: 14,
        },
      },
      xaxis: {
        categories: data.map((item) => item.month),
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
      colors: ["#0766f3"],
    },
  });

  return <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="100%" height="300" />;
};

export default BarChart;
