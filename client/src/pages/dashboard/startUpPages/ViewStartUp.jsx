import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            <h1 className="font-semibold text-3xl mb-3">{startUpApi?.companyName}</h1>
            <p className="flex gap-1 text-sm opacity-70 items-center">
              <Icon className="mt-1" icon="solar:letter-outline" /> {startUpApi?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Financial Info</h2>
        <div className="p-4 grid md:grid-cols-2 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Revenue</h4>
            <p className="text-sm opacity-70">{startUpApi?.revenue || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investment Ask</h4>
            <p className="text-sm opacity-70">{startUpApi?.investmentAsk || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Valuation</h4>
            <p className="text-sm opacity-70">{startUpApi?.valuation || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Market Size</h4>
            <p className="text-sm opacity-70">{startUpApi?.marketSize || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Company Linkedin</h4>
            <p className="text-sm opacity-70">{startUpApi?.companyLinkedin || "NA"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Other Info</h2>
        <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Incorporation/Founding Date</h4>
            <p className="text-sm opacity-70">{startUpApi?.foundingDate || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Sector</h4>
            <p className="text-sm opacity-70">{startUpApi?.sector || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Current Round</h4>
            <p className="text-sm opacity-70">{startUpApi?.sector || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold"> Location Country</h4>
            <p className="text-sm opacity-70">{startUpApi?.location?.country || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Location State</h4>
            <p className="text-sm opacity-70">{startUpApi?.location?.state || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Any Of The Cofounders SC/ST/OBC</h4>
            <p className="text-sm opacity-70">{startUpApi?.anyOfTheCofounders_sc_st_obc?.toString()}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Any Of The Cofounders Woman </h4>
            <p className="text-sm opacity-70">{startUpApi?.anyOfTheCofoundersWoman?.toString()}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Any Lead Investor</h4>
            <p className="text-sm opacity-70">{startUpApi?.anyLeadInvestor?.toString()}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Deadline To Close</h4>
            <p className="text-sm opacity-70">{startUpApi?.deadlineToClose || "NA"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Preferences</h2>
        <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Deal Structure</h4>
            <p className="text-sm opacity-70">{startUpApi?.dealStructure || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investor Type Preference</h4>
            <p className="text-sm opacity-70">{startUpApi?.investorTypePreference || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investor Minimum Ticket Size</h4>
            <p className="text-sm opacity-70">{startUpApi?.investorMinimumTicketSize || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investor Location Preference Country</h4>
            <p className="text-sm opacity-70">{startUpApi?.investorLocationPreference?.country || "NA"}</p>
          </div>
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investor Location Preference State</h4>
            <p className="text-sm opacity-70">{startUpApi?.investorLocationPreference?.state || "NA"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Documents</h2>
        <div className="p-4 grid md:grid-cols-2 gap-4 break-all">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Pitch Deck</h4>
            <p className="text-sm opacity-70">{startUpApi?.pitchDeck || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Business Plan</h4>
            <p className="text-sm opacity-70">{startUpApi?.businessPlan || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">MIS</h4>
            <p className="text-sm opacity-70">{startUpApi?.mIS || "NA"}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Other Documents</h4>
            <p className="text-sm opacity-70">{startUpApi?.otherDocuments || "NA"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border break-all">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Founders Info</h2>
        <div className="mt-5 bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold">Founder</h3>
          <div className="grid grid-cols-4 gap-4 mt-4 break-all">
            <div className="border rounded-lg p-3 bg-white">
              <h4 className="text-sm font-semibold">Full Name</h4>
              <p className="text-sm opacity-70">{startUpApi.founder || "NA"}</p>
            </div>
            <div className="border rounded-lg p-3 bg-white">
              <h4 className="text-sm font-semibold">Email</h4>
              <p className="text-sm opacity-70">{startUpApi.email || "NA"}</p>
            </div>

            <div className="border rounded-lg p-3 bg-white">
              <h4 className="text-sm font-semibold">Phone Number</h4>
              <p className="text-sm opacity-70">{startUpApi.phoneNumber || "NA"}</p>
            </div>
            <div className="border rounded-lg p-3 bg-white">
              <h4 className="text-sm font-semibold">LinkedIn</h4>
              <p className="text-sm opacity-70">{startUpApi.founderLinkedin || "NA"}</p>
            </div>
          </div>
        </div>
        {startUpApi?.coFounders?.length > 0 &&
          startUpApi?.coFounders?.map((cof, index) => (
            <div key={index} className="mt-5 bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold">Co-Founder {index + 1}</h3>
              <div className="grid grid-cols-4 gap-4 mt-4 break-all">
                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">First Name</h4>
                  <p className="text-sm opacity-70">{cof.first_name}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  <p className="text-sm opacity-70">{cof.last_name}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Email</h4>
                  <p className="text-sm opacity-70">{cof.email}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">Phone Number</h4>
                  <p className="text-sm opacity-70">{cof.phone_number}</p>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <h4 className="text-sm font-semibold">LinkedIn</h4>
                  <Link to={cof.linkedin || "##"} className="text-sm text-sky-600">
                    {cof.linkedin || "NA"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">About the company</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.aboutTheCompany || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Business Model</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.businessModel || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Traction</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi?.traction || "NA" }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Problem And Solution</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.problemAndSolution || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">USP And Competitors</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.uSPAndCompetitors || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">About the team</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.aboutTheTeam || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Market Size</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi?.marketSize || "NA" }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Commitments</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi?.commitments || "NA" }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Previous Rounds</h2>
        <div className="p-4">
          <div
            className="no-more-tailwind"
            dangerouslySetInnerHTML={{ __html: startUpApi?.previousRounds || "NA" }}
          ></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">GTM</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi?.gTM || "NA" }}></div>
        </div>
      </div>

      <div className="mt-5 mx-5 bg-white rounded-xl border">
        <h2 className="border-b p-4 font-semibold text-xl opacity-80">Future Plans</h2>
        <div className="p-4">
          <div className="no-more-tailwind" dangerouslySetInnerHTML={{ __html: startUpApi?.futurePlans || "NA" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ViewStartUp;
