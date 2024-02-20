import React from "react";
import { Icon } from "@iconify/react";
import BarChart from './../../components/charts/BarChart';
import DonutChart from './../../components/charts/DonutChart';

const data = [
  { month: "JAN", value: 2000 },
  { month: "FEB", value: 3500 },
  { month: "MAR", value: 4500 },
  { month: "APR", value: 2500 },
  { month: "MAY", value: 3000 },
  { month: "JUN", value: 2800 },
  { month: "JUL", value: 3200 },
  { month: "AUG", value: 4000 },
  { month: "SEP", value: 3700 },
  { month: "OCT", value: 3900 },
  { month: "NOV", value: 4200 },
  { month: "DEC", value: 3800 },
];

const Dashboard = () => {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-6xl mt-5 px-3 md:px-5">
        <div className="relative p-5 bg-gradient-to-r from-teal-400 to-green-500 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">$5000.00</div>
          <div className="relative z-10 text-green-200 leading-none font-semibold">Next month's income</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-600 opacity-50"
            icon="solar:user-linear"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">110</div>
          <div className="relative z-10 text-blue-200 leading-none font-semibold">Members</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
            icon="solar:user-linear"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-red-400 to-red-600 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">60%</div>
          <div className="relative z-10 text-red-200 leading-none font-semibold">Upcoming cancellations</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
            icon="solar:user-linear"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
          <div className=" mb-4 text-white text-4xl leading-none font-semibold">97.00%</div>
          <div className="text-yellow-200 leading-none font-semibold">Retention rate</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-yellow-700 opacity-50"
            icon="solar:user-linear"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-5 gap-3 mx-3 md:mx-5 mt-3">
        <div className="col-span-4 lg:col-span-3 bg-white rounded-xl shadow border">
          <div className="p-3 border-b mb-3">
            <h4 className="text-lg opacity-80 font-semibold">Email Monthly Report</h4>
          </div>
          <div className="px-3">
            <BarChart data={data} />
          </div>
        </div>

        <div className="col-span-4 lg:col-span-2 bg-white rounded-xl shadow border flex flex-col w-full">
          <div className="p-3 border-b mb-3">
            <h4 className="text-lg opacity-80 font-semibold">Users Monthly Report</h4>
          </div>
          <div className="grid place-items-center flex-grow py-5 lg:p-0">
            <DonutChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
