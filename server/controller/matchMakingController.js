import MatchMakingModel from "../model/matchMakingModel.js";
import StartUpModel from "../model/startUpModel.js";
import InvestorFirmModel from "../model/investorModel.js";

import {
  checkIntersection,
  scoreMatching,
} from "../services/matchMakingServices.js";

export async function StartUpMatchMaking(req, res) {
  try {
    const newStartups = await StartUpModel.find({ synced: false });
    const investorFirms = await InvestorFirmModel.find();

    await Promise.all(
      newStartups.map(async (startup) => {
        await Promise.all(
          investorFirms.map(async (investor) => {
            let score = 0;
            if (checkIntersection(investor.sector_focus, startup.sector) &&investor.min_ticket_size <= startup.investorMinimumTicketSize &&investor.rounds_invest_in.includes(startup.currentRound)) {
              if (investor.startup_location_preference.global == true) {

                scoreMatching(score, investor, startup);
                const query = { investorId: investor._id };
                const update = {
                  $push: {
                    emailQueue: {
                      startUpId: startup._id,
                      send: {
                        primaryEmail: false,
                        followUpEmail: false,
                        timeline: [],
                      },
                      score: score,
                      response: false,
                    },
                  },
                };
                const options = { new: true, upsert: true }; // Upsert will create if document doesn't exist

                const updateOrCreateInvestor =
                  await MatchMakingModel.findOneAndUpdate(
                    query,
                    update,
                    options
                  );
                  await StartUpModel.findByIdAndUpdate(startup._id,{synced:true})
              } else if ( checkIntersection( investor.startup_location_preference.state,startup.investorLocationPreference.state ) && checkIntersection( investor.startup_location_preference.country,startup.investorLocationPreference.country)) {
                scoreMatching(score, investor, startup);
              
                const query = { investorId: investor._id };
                const update = {
                  $push: {
                    emailQueue: {
                      startUpId: startup._id,
                      send: {
                        primaryEmail: false,
                        followUpEmail: false,
                        timeline: [],
                      },
                      score: score,
                      response: false,
                    },
                  },
                };
                const options = { new: true, upsert: true }; // Upsert will create if document doesn't exist

                const updateOrCreateInvestor =
                  await MatchMakingModel.findOneAndUpdate(
                    query,
                    update,
                    options
                  );
                  await StartUpModel.findByIdAndUpdate(startup._id,{synced:true})
              }
            }
          })
        );
      })
    );
  } catch (error) {
    // Handle any errors that occur during the matchmaking process
  }
}
export function InvestorMatchMaking(req, res) {}
