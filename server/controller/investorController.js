import InvestorFirmModel from "../model/investorModel.js";
import { arrayEqualityCheck, objectsEqual } from "../services/matchMakingServices.js";

export const multiAddInvestor = async (req, res) => {
  const investorData = req.body;
  try {
    const investorPromises = investorData.map(async (data) => {
      const existingInvestor = await InvestorFirmModel.findOne({ firm_email: data.firm_email });
      if (existingInvestor) {
        throw new Error(`Investor with email ${data.firm_email} already exists`);
      }

      const newInvestor = new InvestorFirmModel(data);
      return await newInvestor.save();
    });

    const results = await Promise.all(investorPromises);
    res.status(201).json({ message: "All Investors successfully added", results });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getAllInvestor = async (req, res) => {
  try {
    // Check for query parameters
    const { limit, skip, email } = req.query;

    let investorsQuery = {};

    // If email is provided, add it to the query
    if (email) {
      investorsQuery = { ...investorsQuery, firm_email: { $regex: `^${email}`, $options: "i" } };
    }

    // Create the initial query
    let query = InvestorFirmModel.find(investorsQuery, { __v: 0 });

    // Count total documents before applying limit and skip
    let totalCount = await InvestorFirmModel.countDocuments(investorsQuery);

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
    const investors = await query.exec();

    // Format the data to match the desired structure
    const formattedInvestors = investors.map((investor, index) => {
      const investorSerialNo = (skip ? parseInt(skip, 10) : 0) + index + 1;

      return {
        _id: investor._id,
        serial_no: investorSerialNo,
        firm_name: investor.firm_name,
        firm_email: investor.firm_email,
        type: investor.type,
        location: investor.location,
        preference: investor.preference,
        sector_focus: investor.sector_focus,
        min_ticket_size: investor.min_ticket_size,
        max_ticket_size: investor.max_ticket_size,
        website: investor.website,
        date_onboarded: investor.date_onboarded,
        rounds_invest_in: investor.rounds_invest_in,
        lead_investor_required: investor.lead_investor_required,
        deal_structure: investor.deal_structure,
        startup_min_revenue: investor.startup_min_revenue,
        startup_min_company_age: investor.startup_min_company_age,
        startup_max_valuation_cap: investor.startup_max_valuation_cap,
        startup_location_preference: investor.startup_location_preference,
        already_emailed: investor.already_emailed,
        no_response_at_all: investor.no_response_at_all,
        open_dealflow_count: investor.open_dealflow_count,
        closed_dealflow_count: investor.closed_dealflow_count,
        total_dealflow_count: investor.total_dealflow_count,
        employees: investor.employees.map((employee, empIndex) => {
          const employeeSerialNo = investorSerialNo * 100 + empIndex + 1;
          return {
            _id: employee._id,
            serial_no: employeeSerialNo,
            first_name: employee.first_name,
            last_name: employee.last_name,
            phone_number: employee.phone_number,
            email: employee.email,
            linkedin: employee.linkedin,
            intial_email: employee.intial_email,
            company_email_done: employee.company_email_done,
          };
        }),
      };
    });

    // Send the response
    res.status(200).json({
      message: "Investors successfully fetched",
      total: totalCount,
      limit: limit ? parseInt(limit, 10) : totalCount,
      skip: skip ? parseInt(skip, 10) : 0,
      data: formattedInvestors,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const investor = await InvestorFirmModel.findOne({ _id: id });
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.status(200).json({ message: "Investor Fetched Successfully", data: investor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateInvestor = async (req, res) => {
  const investorData = req.body;
  const{sector_focus,min_ticket_size,rounds_invest_in,startup_location_preference}=req.body
  const { id } = req.params;
  try {
    const existingInvestor = await InvestorFirmModel.findById(id);
    if (!existingInvestor) {
      return res.status(404).json({ message: `Investor with ID ${id} not found` });
    }
    // Check if the request body is empty
    if (Object.keys(investorData).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }
   

  

    if(!arrayEqualityCheck(sector_focus,existingInvestor.sector_focus)||min_ticket_size!=existingInvestor.min_ticket_size||!arrayEqualityCheck(rounds_invest_in,existingInvestor.rounds_invest_in)||!objectsEqual(startup_location_preference,existingInvestor.startup_location_preference)){
      investorData.synced=false
      console.log("changed")
    }
    else{
      investorData.synced=true
    }
    // Update investor fields
    Object.keys(investorData).forEach((key) => {
      existingInvestor[key] = investorData[key];
    });

    // Save updated investor
    const updatedInvestor = await existingInvestor.save();

    return res.status(200).json({ message: "Updated Successfully...", investor: updatedInvestor, investorData });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const delInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInvestor = await InvestorFirmModel.findByIdAndDelete(id);
    if (!deletedInvestor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    res.status(200).json({ message: "Successfully Deleted...", deletedInvestor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
