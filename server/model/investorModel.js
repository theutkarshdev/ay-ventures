import { mongoose } from "mongoose";
const { Schema } = mongoose;

// Define schema for employees
const EmployeeSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  linkedin: String,
});

// Define main schema for firms
const FirmSchema = new Schema({
  firm_name: String,
  firm_email: String,
  type: String,
  sector_focus: [String],
  ticket_size: String,
  website: String,
  date_onboarded: String,
  rounds_invest_in: [String],
  lead_investor_required: Boolean,
  deal_structure: [String],
  revenue: Number,
  company_age: Number,
  valuation_cap: Number,
  geography: {
    country: [String],
    state: [String],
    global: Boolean,
  },
  preference: {
    sc_st_obc: Boolean,
    women: Boolean,
  },
  employees: [EmployeeSchema], // Embed the Employee schema
});

// Create the model
const InvestorFirmModel = mongoose.model("InvestorFirm", FirmSchema);

export default InvestorFirmModel; 
