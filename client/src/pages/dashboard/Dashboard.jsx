import React from "react";
import { Icon } from "@iconify/react";
import BarChart from "./../../components/charts/BarChart";
import DonutChart from "./../../components/charts/DonutChart";

const barChartdata = [
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-5 px-3 md:px-5">
        <div className="relative p-5 bg-gradient-to-r from-teal-400 to-green-500 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">150</div>
          <div className="text-xl text-white leading-none font-bold">Total Investors</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-600 opacity-50"
            icon="solar:users-group-two-rounded-line-duotone"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">130</div>
          <div className="text-xl text-white leading-none font-bold">Total StartUps</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
            icon="solar:shop-linear"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-red-400 to-red-600 rounded-lg overflow-hidden">
          <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">300</div>
          <div className="text-xl text-white leading-none font-bold">Sent Emails</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
            icon="solar:circle-bottom-up-outline"
          />
        </div>
        <div className="relative p-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
          <div className=" mb-4 text-white text-4xl leading-none font-semibold">83</div>
          <div className="text-xl text-white leading-none font-bold">Responded Emails</div>
          <Icon
            className="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-yellow-700 opacity-50"
            icon="solar:mailbox-linear"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-5 gap-3 mx-3 md:mx-5 mt-3">
        <div className="col-span-4 lg:col-span-3 bg-white rounded-xl shadow border">
          <div className="p-3 border-b mb-3">
            <h4 className="text-lg opacity-80 font-semibold">Email Monthly Report</h4>
          </div>
          <div className="px-3">
            <BarChart data={barChartdata} />
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
