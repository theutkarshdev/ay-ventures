
import EmailModel from "../model/emailModel.js";
import MatchMakingModel from "../model/matchMakingModel.js";
import { getCurrentDateInFormat, mailFiringDate } from "../utils/customFunctions.js";
export const getInitialEmailsToSend = async () => {
  const mailDate=mailFiringDate(2)

  try {
    
    const emails =await  MatchMakingModel.aggregate([
      // Unwind the emailQueue array
      { $unwind: "$emailQueue" },
    
      // Filter out documents where send.primaryEmail is true or lastInitialMail is not null and not older than two days
      {
        $match: {
          "emailQueue.send.primaryEmail": false,
          $or: [
            { lastinitalMail: "" },
            {
              lastinitalMail: {
                $exists: true,
                $eq: mailDate
              }
            }
          ]
        }
      },
    
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
export const getFollowUp1EmailsToSend = async () => {
  const mailDate=mailFiringDate(7)

  try {
    
    const emails =await  MatchMakingModel.aggregate([
      // Unwind the emailQueue array
      { $unwind: "$emailQueue" },
    
      // Filter out documents where send.primaryEmail is true or lastInitialMail is not null and not older than two days
      {
        $match: {
          "emailQueue.send.primaryEmail": true,
          "emailQueue.send.followUpEmail": false,
          "emailQueue.response": false,

          lastfollowUpMail: {
            $exists: true,
            $eq: mailDate
          }
        }
      },
    
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
export const getFollowUp2EmailsToSend = async () => {
  const mailDate=mailFiringDate(7)

  try {
    
    const emails =await  MatchMakingModel.aggregate([
      // Unwind the emailQueue array
      { $unwind: "$emailQueue" },
    
      // Filter out documents where send.primaryEmail is true or lastInitialMail is not null and not older than two days
      {
        $match: {
          "emailQueue.send.primaryEmail": true,
          "emailQueue.send.followUpEmail": true,
          "emailQueue.response": false,
          $expr: { $eq: [{ $size: "$emailQueue.send.timeline" }, 2] },
          
           
            
              lastfollowUpMail: {
                $exists: true,
                $eq: mailDate
              }
            
          
        }
      },
    
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
export const getInitial2EmailsToSend = async () => {
  const mailDate=mailFiringDate(7)

  try {
    
    const emails =await  MatchMakingModel.aggregate([
      // Unwind the emailQueue array
      { $unwind: "$emailQueue" },
    
      // Filter out documents where send.primaryEmail is true or lastInitialMail is not null and not older than two days
      {
        $match: {
          "emailQueue.send.primaryEmail": true,
          "emailQueue.send.followUpEmail": true,
          "emailQueue.response": false,
          $expr: { $eq: [{ $size: "$emailQueue.send.timeline" }, 3] },//check length of timeline array
           
            
              lastfollowUpMail: {
                $exists: true,
                $eq: mailDate
              }
            
          
        }
      },
    
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
export const mailQueueGenerator=async(email,type)=>{
  const data={
    emailType:type,
    investorId:email.investorId[0]._id,
    startupId:email.startUpId[0]._id,
    emailId:email.emailId

  }
  const newMailQueue=EmailModel.create(data)
}

export const matchMailQueueUpdater = async (data) => {
  const currentTime=getCurrentDateInFormat()
  try {
    const {  emailQueueId, lastinitalMail, lastfollowUpMail, primaryEmail, followUpEmail,messageId } = data;

    const updateQuery = {
      "emailQueue._id": emailQueueId,
    };

    const updateFields = {
      $set: {},
      
    };

    if (primaryEmail ) {
      updateFields.$set["emailQueue.$.send.primaryEmail"] = primaryEmail;
    }
    if (followUpEmail ) {
      updateFields.$set["emailQueue.$.send.followUpEmail"] = followUpEmail;
    }

 
      if (lastinitalMail) {
        updateFields.$set["lastinitalMail"] = lastinitalMail;
      }
      if (lastfollowUpMail) {
        updateFields.$set["lastfollowUpMail"] = lastfollowUpMail;
      }
    

      updateFields.$push = {
        "emailQueue.$.send.timeline": {
          $each: [
            
            currentTime
             
            
          ],
        },
      };
  
      if (messageId) {
        updateFields.$push["emailQueue.$.send.messageIds"] = { $each: [messageId] };
      }
    
      
      const result = await MatchMakingModel.updateOne(updateQuery, updateFields);
      
      if (result.modifiedCount === 1) {
        console.log("Email queue updated successfully");
        // Check and update lastFollowUpMail if it's an empty string
        const updatedDocument = await MatchMakingModel.findOne(updateQuery);
        if (updatedDocument.lastfollowUpMail === '') {
          await MatchMakingModel.updateOne(
            updateQuery,
            { $set: { lastfollowUpMail: currentTime } }
          );
          console.log("Updated lastFollowUpMail with current date");
        }
      }
  } catch (error) {
    console.error("Error updating email queue:", error);
  }
};