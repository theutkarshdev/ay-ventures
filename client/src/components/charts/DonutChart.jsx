import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [34, 65, 81, 27],
    options: {
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
      chart: {
        type: "donut",
        offsetX: 0,
        offsetY: -20,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "60%",
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 0,
              },
              value: {
                show: true,
                offsetY: 5,
                fontSize: 13,
                fontWeight: 600,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total Records",
                color: "#121212",
                fontSize: 15,
                fontWeight: 600,
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return Math.round(val) + "%";
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      stroke: {
        width: 10,
        colors: "#fff",
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
