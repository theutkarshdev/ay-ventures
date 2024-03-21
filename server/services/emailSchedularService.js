
import MatchMakingModel from "../model/matchMakingModel.js";
export const getInitialEmailsToSend = async () => {
  try {
    
    const emails =await  MatchMakingModel.aggregate([
      // Unwind the emailQueue array
      { $unwind: "$emailQueue" },
      // Filter out documents where send.primaryEmail is true
      { $match: { "emailQueue.send.primaryEmail": false } },

      // Sort the documents in descending order based on score
      { $sort: { "emailQueue.score": -1 } },

      // Group the documents by investorId and pick the first document from each group
      {
        $group: {
          _id: "$investorId",
          startUpId: { $first: "$emailQueue.startUpId" },
          emailQueue: { $first: "$emailQueue" },
          emailId: { $first: "$emailQueue._id" },
        },
      },

      // Project the desired fields
      {
        $project: {
          _id: 0,
          investorId: "$_id",
          startUpId: 1,
          emailQueue: 1,
          emailId: 1,
        },
      },
    ])
    .lookup({ from: "startups", localField: "startUpId", foreignField: "_id", as: "startUpId" }).lookup({ from: "investorfirms", localField: "investorId", foreignField: "_id", as: "investorId" })
   
 
    return emails
  } catch (error) {
    console.log(error);
   return null
  }
};
