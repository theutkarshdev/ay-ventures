import MatchMakingModel from "../model/matchMakingModel.js";
import StartUpModel from "../model/startUpModel.js";
import InvestorFirmModel from "../model/investorModel.js";

import {
  checkIntersection,
  scoreMatching,
} from "../services/matchMakingServices.js";

export async function getAllMatchMaking(req, res) {
  try {
    const { limit, skip } = req.query;
    const allMatch = await MatchMakingModel.find()
      .populate("investorId", "employees firm_name firm_email")
      .populate("emailQueue.startUpId", "companyName email");

    const formattedData = {
      message: "Matching fetched...",
      total:0,
      limit: limit,
      skip: skip,
      data: [],
    };

    allMatch.forEach((match, index) => {
      match.emailQueue.forEach((email) => {
        const mailArray = email.send.timeline?.map((time, timeIndex) => {
          const employee =
            timeIndex === 2
              ? match.investorId.employees[1] || match.investorId.employees[0]
              : match.investorId.employees[0];

          return {
            sentTo: employee.email,
            empName: employee.first_name,
            sentDate: time,
            mailType:
              timeIndex === 2
                ? "followUp2"
                : timeIndex === 0
                ? "primary"
                : "followUp1",
          };
        }) || [];

        formattedData.data.push({
          _id: email._id,
          
          firmName: match.investorId.firm_name,
          firmEmail: match.investorId.firm_email,
          companyName: email.startUpId.companyName,
          companyEmail: email.startUpId.email,
          mailArray: mailArray,
          respond: email.response,
        });
      });
    });
    formattedData.total=formattedData.data.length
    const limitedData = formattedData.data.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
    formattedData.data = limitedData.map((data, index) => ({
      ...data,
      serial_no: index + 1 + parseInt(skip), // Adding skip to the serial number
    }));
    res.json(formattedData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
}

async function insertQueueData(investor, startup, score) {
  const query = { investorId: investor._id };
  const update = {
    $addToSet: {
      emailQueue: {
        $each: [],
        $filter: {
          input: "$emailQueue",
          as: "item",
          cond: { $not: { $eq: ["$$item.startUpId", startup._id] } },
        },
      },
    },
  };

  const newEmailQueue = {
    startUpId: startup._id,
    send: {
      primaryEmail: false,
      followUpEmail: false,
      timeline: [],
    },
    score: score,
    response: false,
    remark: "",
  };

  update.$addToSet.emailQueue.$each.push(newEmailQueue);

  const options = { new: true, upsert: true }; // Upsert will create if document doesn't exist

  const updateOrCreateInvestor = await MatchMakingModel.findOneAndUpdate(
    query,
    update,
    options
  );
}

export async function StartUpMatchMaking() {
  try {
    const newStartups = await StartUpModel.find({ synced: false });
    const investorFirms = await InvestorFirmModel.find();
    if (newStartups.length == 0) {
      return console.log("New Startups not found.");
    }
    await Promise.all(
      newStartups.map(async (startup) => {
        await Promise.all(
          investorFirms.map(async (investor) => {
            let score = 0;
            if (
              checkIntersection(investor.sector_focus, startup.sector) &&
              investor.min_ticket_size <= startup.investorMinimumTicketSize &&
              investor.rounds_invest_in.includes(startup.currentRound)
            ) {
              if (investor.startup_location_preference.global == true) {
                score = scoreMatching(score, investor, startup);
                insertQueueData(investor, startup, score);
              } else if (
                investor.startup_location_preference.country.includes(
                  startup.location.country
                )
              ) {
                if (
                  investor.startup_location_preference.country.includes(
                    "India"
                  ) &&
                  investor.startup_location_preference.state.includes(
                    startup.location.state
                  )
                ) {
                  score = scoreMatching(score, investor, startup);

                  insertQueueData(investor, startup, score);
                } else if (
                  !investor.startup_location_preference.country.includes(
                    "India"
                  )
                ) {
                  score = scoreMatching(score, investor, startup);
                  insertQueueData(investor, startup, score);
                }
              }
            }
          })
        );
      })
    );
    await StartUpModel.updateMany(
      { synced: false },
      { $set: { synced: true } }
    );
    console.log("Startup matching done");
  } catch (error) {
    console.log(error);
  }
}
export async function InvestorMatchMaking() {
  try {
    const newInvestors = await InvestorFirmModel.find({ synced: false });
    const startups = await StartUpModel.find();
    console.log(newInvestors.length);
    if (newInvestors.length == 0) {
      console.log("New investors not found.");
    }
    await Promise.all(
      newInvestors.map(async (investor) => {
        await Promise.all(
          startups.map(async (startup) => {
            let score = 0;

            if (
              checkIntersection(investor.sector_focus, startup.sector) &&
              investor.min_ticket_size <= startup.investorMinimumTicketSize &&
              investor.rounds_invest_in.includes(startup.currentRound)
            ) {
              if (investor.startup_location_preference.global == true) {
                score = scoreMatching(score, investor, startup);

                insertQueueData(investor, startup, score);
              } else if (
                investor.startup_location_preference.country.includes(
                  startup.location.country
                )
              ) {
                if (
                  investor.startup_location_preference.country.includes(
                    "India"
                  ) &&
                  investor.startup_location_preference.state.includes(
                    startup.location.state
                  )
                ) {
                  score = scoreMatching(score, investor, startup);

                  insertQueueData(investor, startup, score);
                } else if (
                  !investor.startup_location_preference.country.includes(
                    "India"
                  )
                ) {
                  score = scoreMatching(score, investor, startup);
                  insertQueueData(investor, startup, score);
                }
              }
            }
          })
        );
      })
    );
    await InvestorFirmModel.updateMany(
      { synced: false },
      { $set: { synced: true } }
    );
    console.log("Investor matching done");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteStartUpFromQueue(startupId) {
  const result = await MatchMakingModel.updateMany(
    {},
    {
      $pull: {
        emailQueue: { startUpId: startupId },
      },
    },
    { multi: true }
  );
  console.log("delete success");
}

export async function deletInvestorMatch(id) {
  const match = await MatchMakingModel.findOneAndDelete({ investorId: id });
  console.log("delete investor match");
}

export async function updateInvestorMatch(id) {
  const result = await MatchMakingModel.updateOne(
    { investorId: id },
    {
      $pull: {
        emailQueue: {
          "send.primaryEmail": false,
          "send.followUpEmail": false,
          response: false,
        },
      },
    }
  );

  InvestorMatchMaking();
}
export async function updateStartupMatch(id) {
  const result = await MatchMakingModel.updateMany(
    {},
    {
      $pull: {
        emailQueue: {
          startUpId: id,
          "send.primaryEmail": false,
          "send.followUpEmail": false,
          response: false,
        },
      },
    },
    { multi: true }
  );

  StartUpMatchMaking();
}
