import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageNav from "../../../components/header/PageNav";
import { Icon } from "@iconify/react";
import "../../../styles/default.css";

const ViewStartUp = () => {
  const [startUpApi, setStartUpApi] = useState({});
  const { id } = useParams();

  const fetchInvestor = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/startup/get/${id}`);

      if (response.status === 200) {
        setStartUpApi(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvestor();
  }, []);

  return (
    <div>
      <PageNav
        label={"StartUp Information"}
        btnText={"StartUp List"}
        btnIcon={"solar:users-group-rounded-outline"}
        btnLink="/startup"
      />

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Basic Info</h2>
        <div className="flex flex-wrap gap-5 items-center p-4">
          <div>
            <h1 className="font-semibold text-3xl mb-3">{startUpApi.companyName}</h1>
            <p className="flex gap-1 text-sm opacity-70 items-center">
              <Icon className="mt-1" icon="solar:letter-outline" /> {startUpApi.email}
            </p>
            <p className="flex gap-1 text-sm opacity-70 items-center">
              <Icon className="mt-1" icon="solar:user-rounded-outline" />
              Founder : {startUpApi.founder}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Other Info</h2>
        <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Revenue</h4>
            <p className="text-sm opacity-70">{startUpApi.revenue}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">dateOnboarded</h4>
            <p className="text-sm opacity-70">{startUpApi.dateOnboarded}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">phoneNumber</h4>
            <p className="text-sm opacity-70">{startUpApi.phoneNumber}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">pitchDeck</h4>
            <p className="text-sm opacity-70">{startUpApi.pitchDeck}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">businessPlan</h4>
            <p className="text-sm opacity-70">{startUpApi.businessPlan}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">mIS</h4>
            <p className="text-sm opacity-70">{startUpApi.mIS}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">otherDocuments</h4>
            <p className="text-sm opacity-70">{startUpApi.otherDocuments}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">foundingDate</h4>
            <p className="text-sm opacity-70">{startUpApi.foundingDate}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">investmentAsk</h4>
            <p className="text-sm opacity-70">{startUpApi.investmentAsk}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">valuation</h4>
            <p className="text-sm opacity-70">{startUpApi.valuation}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">sector</h4>
            <p className="text-sm opacity-70">{startUpApi.sector}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">marketSize</h4>
            <p className="text-sm opacity-70">{startUpApi.marketSize}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">previousRounds</h4>
            <p className="text-sm opacity-70">{startUpApi.previousRounds}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">currentRound</h4>
            <p className="text-sm opacity-70">{startUpApi.currentRound}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">locationCountry</h4>
            <p className="text-sm opacity-70">{startUpApi.locationCountry}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">locationState</h4>
            <p className="text-sm opacity-70">{startUpApi.locationState}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">deadlineToClose</h4>
            <p className="text-sm opacity-70">{startUpApi.deadlineToClose}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">investorTypePreference</h4>
            <p className="text-sm opacity-70">{startUpApi.investorTypePreference}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">investorMinimumTicketSize</h4>
            <p className="text-sm opacity-70">{startUpApi.investorMinimumTicketSize}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">dealStructure</h4>
            <p className="text-sm opacity-70">{startUpApi.dealStructure}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">investorLocationCountry</h4>
            <p className="text-sm opacity-70">{startUpApi.investorLocationCountry}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">investorLocationState</h4>
            <p className="text-sm opacity-70">{startUpApi.investorLocationState}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">anyOfTheCofounders_sc_st_obc</h4>
            <p className="text-sm opacity-70">{startUpApi.anyOfTheCofounders_sc_st_obc ? "true" : "false"}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">anyOfTheCofoundersWoman </h4>
            <p className="text-sm opacity-70">{startUpApi.anyOfTheCofoundersWoman ? "true" : "false"}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">anyLeadInvestor</h4>
            <p className="text-sm opacity-70">{startUpApi.anyLeadInvestor ? "true" : "false"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">About the team</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.aboutTheTeam }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">About the company</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.aboutTheCompany }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Business Model</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.businessModel }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Commitments</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.commitments }}></div>
        </div>
      </div>
      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">GTM</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.gTM }}></div>
        </div>
      </div>
      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">USP And Competitors</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.uSPAndCompetitors }}></div>
        </div>
      </div>
      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Future Plans</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.futurePlans }}></div>
        </div>
      </div>
      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Problem And Solution</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi.problemAndSolution }}></div>
        </div>
      </div>
    </div>
  );
};

export default ViewStartUp;
