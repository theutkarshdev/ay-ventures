import React, { useEffect, useState } from "react";
import PageNav from "./../../../components/header/PageNav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Step, StepIcon, StepLabel, Stepper } from "@mui/material";
import { Icon } from "@iconify/react";
import FilledBtn from "../../../components/buttons/FilledBtn";

const ViewMatch = () => {
  const [matchApi, setMatchApi] = useState({});
  const { id } = useParams();

  const fetchMatch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/match/get/${id}`);

      if (response.status === 200) {
        setMatchApi(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  return (
    <>
      <PageNav
        label={"Match Information"}
        btnText={"Match List"}
        btnIcon={"solar:users-group-rounded-outline"}
        btnLink="/match-making"
      />
      <div className="mt-5 mx-5 p-5 pt-3 bg-white rounded-xl border">
        <h2 className="border-b pb-3 mb-5 font-semibold text-xl opacity-80">Match Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Investor Details</h4>
            <p className="text-sm opacity-70">{matchApi?.firmName}</p>
            <p className="text-sm opacity-70">{matchApi?.firmEmail}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold">Company Details</h4>
            <p className="text-sm opacity-70">{matchApi?.companyName}</p>
            <p className="text-sm opacity-70">{matchApi?.companyEmail}</p>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Email Queue</h4>
              <div className="flex gap-3">
                <p className="text-yellow-500 bg-yellow-50 rounded-full text-xs py-1 px-3">
                  Respond: {matchApi.respond?.toString()}
                </p>
                <p className="text-orange-500 bg-orange-50 rounded-full text-xs py-1 px-3">Score : {matchApi.score}</p>
              </div>
            </div>

            <Stepper activeStep={matchApi?.mailArray?.length} orientation="vertical">
              {matchApi?.mailArray?.map((step, idx) => (
                <Step key={idx}>
                  <StepLabel>
                    <div>
                      <p>{step.sentDate}</p>
                      <p>
                        {step.empName}
                        <span className="mx-2 text-sky-600">({step.sentTo})</span>
                        <span className="text-green-500 bg-green-50 rounded-full text-xs py-1 px-3">
                          {step.mailType}
                        </span>
                      </p>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="border rounded-lg p-3 bg-white">
            <h4 className="text-sm font-semibold mb-3">Add Remarks</h4>
            <textarea
              placeholder="Type you remarks here..."
              className="p-4 w-full border rounded-lg mb-2"
              rows={6}
            ></textarea>
            <div className="flex justify-end">
              <FilledBtn text="Add Remarks" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMatch;
