import MatchMakingModel from "../model/matchMakingModel.js";
import StartUpModel from "../model/startUpModel.js";
import InvestorFirmModel from "../model/investorModel.js";

import { checkIntersection,scoreMatching} from "../services/matchMakingServices.js";

async function inserQueueData(investor,startup,score) {
  const query = { investorId: investor._id };
  const update = {
    $addToSet: {
      emailQueue: {
        $each: [
          {
            startUpId: startup._id,
            send: {
              primaryEmail: false,
              followUpEmail: false,
              timeline: [],
            },
            score: score,
            response: false,
          },
        ],
      },
    },
  };
  const options = { new: true, upsert: true }; // Upsert will create if document doesn't exist

  const updateOrCreateInvestor = await MatchMakingModel.findOneAndUpdate(
    query,
    update,
    options
  );
}

export async function StartUpMatchMaking(req, res) {
  try {
    const newStartups = await StartUpModel.find({ synced: false });
    const investorFirms = await InvestorFirmModel.find();
    if (newStartups.length == 0) {
      return res.json({ message: "New Startups not found." });
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
                  investor.startup_location_preference.state,
                  startup.investorLocationPreference.state
                ) &&
                checkIntersection(
                  investor.startup_location_preference.country,
                  startup.investorLocationPreference.country
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
    await StartUpModel.updateMany({ synced: false }, { $set: { synced: true } });
    res.json({ message: "Investor matching done" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Server Error" });
  }
}
export async function InvestorMatchMaking(req, res) {
  try {
    const newInvestors = await InvestorFirmModel.find({ synced: false });
    const startups = await StartUpModel.find();
    console.log(newInvestors.length);
    if (newInvestors.length == 0) {
      return res.json({ message: "New investors not found." });
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
                  investor.startup_location_preference.state,
                  startup.investorLocationPreference.state
                ) &&
                checkIntersection(
                  investor.startup_location_preference.country,
                  startup.investorLocationPreference.country
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
    res.json({ message: "Investor matching done" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Server Error" });
  }
}

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
