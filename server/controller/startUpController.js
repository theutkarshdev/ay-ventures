import StartUpModel from "../model/startUpModel.js";

export const multiAddStartUp = async (req, res) => {
  const startUpData = req.body;
  try {
    const startUpPromises = startUpData.map(async (data) => {
      const existingStartUp = await StartUpModel.findOne({ email: data.email });
      if (existingStartUp) {
        throw new Error(`StartUp with email ${data.email} already exists`);
      }

      const newStartUp = new StartUpModel(data);
      return await newStartUp.save();
    });

    const results = await Promise.all(startUpPromises);
    res.status(201).json({ message: "All StartUps successfully added", results });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getAllStartUp = async (req, res) => {
  try {
    // Check for query parameters
    const { limit, skip, email } = req.query;

    let startUpQuery = {};

    // If email is provided, add it to the query
    if (email) {
      startUpQuery = { ...startUpQuery, email: { $regex: `^${email}`, $options: "i" } };
    }

    // Create the initial query
    let query = StartUpModel.find(startUpQuery, { __v: 0 });

    // Count total documents before applying limit and skip
    let totalCount = await StartUpModel.countDocuments(startUpQuery);

    // Apply limit and skip if provided
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      query = query.limit(parsedLimit);
    }

    if (skip) {
      const parsedSkip = parseInt(skip, 10);
      query = query.skip(parsedSkip);
    }

    // Execute the query
    const startUps = await query.exec();

    // Format the data to match the desired structure
    const formattedStartUps = startUps.map((startUp, index) => {
      const startUpSerialNo = (skip ? parseInt(skip, 10) : 0) + index + 1;

      return {
        _id: startUp._id,
        serial_no: startUpSerialNo,
        companyName: startUp.companyName,
        founder: startUp.founder,
        email: startUp.email,
        location: startUp.location,
        phoneNumber: startUp.phoneNumber,
        aboutTheCompany: startUp.aboutTheCompany,
        businessModel: startUp.businessModel,
        revenue: startUp.revenue,
        traction: startUp.traction,
        pitchDeck: startUp.pitchDeck,
        businessPlan: startUp.businessPlan,
        mIS: startUp.mIS,
        otherDocuments: startUp.otherDocuments,
        foundingDate: startUp.foundingDate,
        investmentAsk: startUp.investmentAsk,
        valuation: startUp.valuation,
        aboutTheTeam: startUp.aboutTheTeam,
        sector: startUp.sector,
        marketSize: startUp.marketSize,
        previousRounds: startUp.previousRounds,
        commitments: startUp.commitments,
        currentRound: startUp.currentRound,
        investorLocationPreference: startUp.investorLocationPreference,
        deadlineToClose: startUp.deadlineToClose,
        investorTypePreference: startUp.investorTypePreference,
        investorMinimumTicketSize: startUp.investorMinimumTicketSize,
        anyLeadInvestor: startUp.anyLeadInvestor,
        uSPAndCompetitors: startUp.uSPAndCompetitors,
        dealStructure: startUp.dealStructure,
        investorLocationCountry: startUp.investorLocationCountry,
        investorLocationState: startUp.investorLocationState,
        gTM: startUp.gTM,
        futurePlans: startUp.futurePlans,
        problemAndSolution: startUp.problemAndSolution,
        anyOfTheCofounders_sc_st_obc: startUp.anyOfTheCofounders_sc_st_obc,
        anyOfTheCofoundersWoman: startUp.anyOfTheCofoundersWoman,
        whoHasBeenMailed: startUp.whoHasBeenMailed,
        whoRejected: startUp.whoRejected,
        openDealflowCount: startUp.openDealflowCount,
        closedDealflowCount: startUp.closedDealflowCount,
        totalDealflowCount: startUp.totalDealflowCount,
        coFounders: startUp.coFounders.map((coFounder, empIndex) => {
          const coFounderSerialNo = startUpSerialNo * 100 + empIndex + 1;
          return {
            _id: coFounder._id,
            serial_no: coFounderSerialNo,
            first_name: coFounder.first_name,
            last_name: coFounder.last_name,
            phone_number: coFounder.phone_number,
            email: coFounder.email,
            linkedin: coFounder.linkedin,
            intial_email: coFounder.intial_email,
            company_email_done: coFounder.company_email_done,
          };
        }),
      };
    });

    // Send the response
    res.status(200).json({
      message: "StartUps successfully fetched",
      total: totalCount,
      limit: limit ? parseInt(limit, 10) : totalCount,
      skip: skip ? parseInt(skip, 10) : 0,
      data: formattedStartUps,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStartUp = async (req, res) => {
  const { id } = req.params;
  try {
    const startUp = await StartUpModel.findById(id);
    if (!startUp) {
      return res.status(404).json({ message: "StartUp not found" });
    }

    res.status(200).json({ message: "StartUp Fetched Successfully", data: startUp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStartUp = async (req, res) => {
  const { id } = req.params;
  const startUpData = req.body;
  try {
    const existingStartUp = await StartUpModel.findById(id);
    if (!existingStartUp) {
      return res.status(404).json({ message: `StartUp with ID ${id} not found` });
    }

    // Check if the request body is empty
    if (Object.keys(startUpData).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    // Update investor fields
    Object.keys(startUpData).forEach((key) => {
      existingStartUp[key] = startUpData[key];
    });

    // Save updated StartUp
    const updatedStartUp = await existingStartUp.save();

    return res.status(200).json({ message: "Updated Successfully...", startUp: updatedStartUp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const delStartUp = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStartUp = await StartUpModel.findByIdAndDelete(id);
    if (!deletedStartUp) {
      return res.status(404).json({ message: "StartUp not found" });
    }
    res.status(200).json({ message: "Successfully Deleted...", deletedStartUp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
