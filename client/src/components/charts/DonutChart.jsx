import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [150, 105, 25, 42],
    options: {
      labels: ["Initial Emails", "1st FollowUp", "2nd FollowUp", "Replies"],
      chart: {
        type: "donut",
        offsetX: 0,
        offsetY: -10,
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
        width: 0,
      },
    },
  });

  return (
    <div className="w-full max-w-[380px]">
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
};

export default DonutChart;
