import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageNav from "../../../components/header/PageNav";
import { Icon } from "@iconify/react";

const ViewInvestor = () => {
  const [investorApi, setInvestorApi] = useState({});
  const { id } = useParams();

  const fetchInvestor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/investor/get/${id}`);

      if (response.status === 200) {
        setInvestorApi(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvestor();
  }, []);

  return (
    <>
      <PageNav
        label={"Investor Information"}
        btnText={"Investor List"}
        btnIcon={"solar:users-group-rounded-outline"}
        btnLink="/investor"
      />
      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Basic Info</h2>
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex justify-center items-center w-full md:w-auto">
            <div className="relative">
              <img
                className="size-[150px] object-cover rounded-full border-2 border-sky-600"
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg"
              />
              <Icon className="absolute right-1 top-2/3 text-3xl text-green-500" icon={"ph:seal-check-fill"} />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-2xl">{investorApi.firm_name}</h1>
            <p className="flex gap-1 text-sm opacity-70 mb-5 items-center">
              <Icon className="mt-1" icon="solar:letter-outline" /> {investorApi.firm_email}
            </p>
            <div>
              <p className="flex gap-1 text-sm opacity-70 items-center">
                <Icon className="mt-1" icon="solar:map-point-rotate-linear" />
                {investorApi?.geography?.state + ", " + investorApi?.geography?.country}
              </p>

              <p className="flex gap-1 text-sm opacity-70 items-center">
                <Icon className="mt-1" icon="solar:link-minimalistic-2-linear" /> {investorApi.website}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Investment Info</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Type</h4>
            <p className="text-sm opacity-70">{investorApi.type}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Ticket Size</h4>
            <p className="text-sm opacity-70">{investorApi.ticket_size}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Date Onboarded</h4>
            <p className="text-sm opacity-70">{investorApi.date_onboarded}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Revenue</h4>
            <p className="text-sm opacity-70">{investorApi.revenue}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Company Age</h4>
            <p className="text-sm opacity-70">{investorApi.company_age} Years</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Valuation Cap</h4>
            <p className="text-sm opacity-70">{investorApi.valuation_cap}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Employees Info</h2>
        {investorApi?.employees?.length > 0 &&
          investorApi?.employees?.map((emp, index) => (
            <div className="mt-5 bg-slate-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold">Employee {index + 1}</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">First Name</h4>
                  <p className="text-sm opacity-70">{emp.first_name}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  <p className="text-sm opacity-70">{emp.last_name}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Email</h4>
                  <p className="text-sm opacity-70">{emp.email}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Phone Number</h4>
                  <p className="text-sm opacity-70">{emp.phone_number}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">LinkedIn</h4>
                  <p className="text-sm opacity-70">{emp.linkedin}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ViewInvestor;
