import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageNav from "../../../components/header/PageNav";
import { Icon } from "@iconify/react";

const ViewInvestor = () => {
  const [investorApi, setInvestorApi] = useState({});
  const { id } = useParams();

  const fetchInvestor = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/investor/get/${id}`);

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
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl mb-3">{investorApi.firm_name}</h1>
          <p className="flex gap-1 text-sm opacity-70 items-center">
            <Icon className="mt-1" icon="solar:letter-outline" /> {investorApi.firm_email}
          </p>
          <Link to={investorApi.website || "#"} className="text-sky-600 flex gap-1 text-sm items-center">
            <Icon className="mt-1" icon="solar:link-minimalistic-2-linear" /> {investorApi.website}
          </Link>

          <p className="flex gap-1 text-sm opacity-70 items-center">
            <Icon icon="solar:calendar-outline" />
            Date Onboarded : {investorApi.date_onboarded}
          </p>
        </div>
      </div>

      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Investment Info</h2>
        <div className="grid grid-cols-4 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Sector Focus</h4>
            <p className="text-sm opacity-70">{investorApi.sector_focus}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Rounds Invest In</h4>
            <p className="text-sm opacity-70">{investorApi.rounds_invest_in}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Deal Structure</h4>
            <p className="text-sm opacity-70">{investorApi.deal_structure}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Type</h4>
            <p className="text-sm opacity-70">{investorApi.type}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Ticket Size</h4>
            <p className="text-sm opacity-70">$ {investorApi.ticket_size}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Company Revenue</h4>
            <p className="text-sm opacity-70">$ {investorApi.revenue}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Minimum Company Age</h4>
            <p className="text-sm opacity-70">{investorApi.company_age} Years</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Valuation Cap</h4>
            <p className="text-sm opacity-70">$ {investorApi.valuation_cap}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Global</h4>
            <p className="text-sm opacity-70">{investorApi.geography?.global ? "true" : "false"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Country</h4>
            <p className="text-sm opacity-70">{investorApi.geography?.country}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">State</h4>
            <p className="text-sm opacity-70">{investorApi.geography?.state}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Lead Investor Required</h4>
            <p className="text-sm opacity-70">{investorApi.lead_investor_required ? "true" : "false"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">SC/ST/OBC Preference</h4>
            <p className="text-sm opacity-70">{investorApi.preference?.sc_st_obc ? "true" : "false"}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Women Prefrence</h4>
            <p className="text-sm opacity-70">{investorApi.preference?.women ? "true" : "false"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border break-all">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Employees Info</h2>
        {investorApi?.employees?.length > 0 &&
          investorApi?.employees?.map((emp, index) => (
            <div className="mt-5 bg-slate-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold">Employee {index + 1}</h3>
              <div className="grid grid-cols-4 gap-4 mt-4 break-all">
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
