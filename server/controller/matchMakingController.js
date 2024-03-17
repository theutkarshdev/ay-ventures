import MatchMakingModel from "../model/matchMakingModel.js";
import StartUpModel from "../model/startUpModel.js";
import InvestorFirmModel from "../model/investorModel.js";

import {
  checkIntersection,
  scoreMatching,
} from "../services/matchMakingServices.js";

export async function getAllMatchMaking(req, res) {
  try {
    const allMatch = await MatchMakingModel.find()
      .populate("investorId", "employees.first_name employees.email")
      .populate("emailQueue.startUpId", "companyName");
    res.json({ data: allMatch });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
}

async function inserQueueData(investor, startup, score) {
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
                inserQueueData(investor, startup, score);
              } else if (
                checkIntersection(
                  investor.startup_location_preference.country,
                  startup.location.country
                ) &&
                checkIntersection(
                  investor.startup_location_preference.state,
                  startup.location.state
                )
              ) {
                score = scoreMatching(score, investor, startup);

                inserQueueData(investor, startup, score);
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

                inserQueueData(investor, startup, score);
              } else if (
                checkIntersection(
                  investor.startup_location_preference.country,
                  startup.location.country
                ) &&
                checkIntersection(
                  investor.startup_location_preference.state,
                  startup.location.state
                )
              ) {
                scoreMatching(score, investor, startup);

                inserQueueData(investor, startup, score);
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
    {investorId:id},
    {

      $pull: {
        emailQueue: {
         
          "send.primaryEmail": false,
          "send.followUpEmail": false,
          response: false,
        },
      },
    },
    
  );

  InvestorMatchMaking()
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

  StartUpMatchMaking()
}
