import InvestorFirmModel from "../model/investorModel.js";

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
    const { limit, skip } = req.query;

    let investorsQuery = InvestorFirmModel.find({}, { __v: 0 });

    // Count total documents before applying limit and skip
    let totalCount = await InvestorFirmModel.countDocuments();

    // Apply limit and skip if provided
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      investorsQuery = investorsQuery.limit(parsedLimit);
    }

    if (skip) {
      const parsedSkip = parseInt(skip, 10);
      investorsQuery = investorsQuery.skip(parsedSkip);
    }

    // Execute the query
    const investors = await investorsQuery.exec();

    // Format the data to match the desired structure
    const formattedInvestors = investors.map((investor, index) => {
      const investorSerialNo = (skip ? parseInt(skip, 10) : 0) + index + 1;

      return {
        _id: investor._id,
        serial_no: investorSerialNo,
        firm_name: investor.firm_name,
        firm_email: investor.firm_email,
        type: investor.type,
        geography: investor.geography,
        preference: investor.preference,
        sector_focus: investor.sector_focus,
        ticket_size: investor.ticket_size,
        website: investor.website,
        date_onboarded: investor.date_onboarded,
        rounds_invest_in: investor.rounds_invest_in,
        lead_investor_required: investor.lead_investor_required,
        deal_structure: investor.deal_structure,
        revenue: investor.revenue,
        company_age: investor.company_age,
        valuation_cap: investor.valuation_cap,
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

    // Format the data to match the desired structure
    const formattedInvestor = {
      _id: investor._id,
      firm_name: investor.firm_name,
      firm_email: investor.firm_email,
      type: investor.type,
      geography: investor.geography,
      preference: investor.preference,
      sector_focus: investor.sector_focus,
      ticket_size: investor.ticket_size,
      website: investor.website,
      date_onboarded: investor.date_onboarded,
      rounds_invest_in: investor.rounds_invest_in,
      lead_investor_required: investor.lead_investor_required,
      deal_structure: investor.deal_structure,
      revenue: investor.revenue,
      company_age: investor.company_age,
      valuation_cap: investor.valuation_cap,
      already_emailed: investor.already_emailed,
      no_response_at_all: investor.no_response_at_all,
      open_dealflow_count: investor.open_dealflow_count,
      closed_dealflow_count: investor.closed_dealflow_count,
      total_dealflow_count: investor.total_dealflow_count,
      employees: investor.employees.map((employee) => ({
        _id: employee._id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        phone_number: employee.phone_number,
        email: employee.email,
        linkedin: employee.linkedin,
        initial_email: employee.initial_email,
        company_email_done: employee.company_email_done,
      })),
    };

    res.status(200).json({ message: "Investor Fetched Successfully", data: formattedInvestor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const delInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInvestor = await InvestorFirmModel.findByIdAndDelete(id); // Use findByIdAndDelete to delete by ID
    if (!deletedInvestor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    res.status(200).json({ message: "Successfully Deleted...", deletedInvestor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
